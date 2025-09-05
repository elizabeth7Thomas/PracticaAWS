import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { DataSource, Repository } from 'typeorm';
import { CrearCompraDto } from './dto/crear-compra.dto';
import { Producto } from 'src/producto/producto.entity';
import { Inventario } from 'src/inventario/inventario.entity';
import { DetalleCompra } from '../detalle-compra/detalle-compra.entity';
import { MovimientoInventario } from '../movimientoinventario/movimientoinventario.entity';
import { CalculoCompraDto } from './dto/calculo-compra.dto';
import { DetalleCompraDto } from 'src/detalle-compra/dto/detalle-compra.dto';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private compraRepository: Repository<Compra>,
    private dataSource: DataSource,
  ) {}

  async createCompra(crearCompraDto: CrearCompraDto): Promise<any> {
    return await this.dataSource.transaction(async (manager) => {
      const compra = manager.create(Compra, {
        idUsuario: crearCompraDto.idUsuario,
        totalCompra: crearCompraDto.calculoCompra.total,
      });
      const compraGuardada = await manager.save(compra);

      let total: number = 0;
      let subTotal: number = 0;

      for (const detalle of crearCompraDto.calculoCompra.detalles) {
        // Buscar lotes de inventario disponibles para el producto
        const producto = await manager
          .getRepository(Producto)
          .findOne({ where: { idProducto: detalle.idProducto } });

        if (!producto) {
          throw new InternalServerErrorException(
            `No se encontró el producto con ID ${detalle.idProducto}`,
          );
        }
        total += detalle.cantidad * producto?.precioCompra;
        subTotal = detalle.cantidad * producto?.precioCompra;

        if (detalle.nuevoLote) {
          // Crear un nuevo lote de inventario
          const nuevoLote = manager.create(Inventario, {
            fechaIngreso: detalle.nuevoLote.fechaIngreso,
            fechaCaducidad: detalle.nuevoLote.fechaCaducidad,
            cantidad: detalle.cantidad,
            lote: detalle.nuevoLote.lote,
            estadoInventario: 1,
            idProducto: producto.idProducto,
          });
          await manager.save(nuevoLote);
          if (!nuevoLote) {
            throw new InternalServerErrorException(
              `No se pudo crear el nuevo lote ${detalle.lote}`,
            );
          } else {
            // Crear el detalle
            const detalleCompra = manager.create(DetalleCompra, {
              cantidad: detalle.cantidad,
              idInventario: nuevoLote.idInventario,
              idCompra: compraGuardada.idCompra,
              precio: producto?.precioCompra,
              subTotal: subTotal,
            });
            await manager.save(detalleCompra);

            // Registrar el log del movimiento de inventario
            const movimientoInventario = manager.create(MovimientoInventario, {
              idInventario: nuevoLote.idInventario,
              cantidadM: detalle.cantidad,
              idTipoMovimiento: 2, // 2 para compra
            });
            await manager.save(movimientoInventario);
          }
        } else {
          const lote = await manager
            .getRepository(Inventario)
            .createQueryBuilder('inv')
            .where('inv.lote = :lote', {
              lote: detalle.lote,
            })
            .andWhere('inv.estadoInventario = true')
            .getOne();

          if (!lote) {
            throw new InternalServerErrorException(
              `No existe el lote con numero  ${detalle.lote}`,
            );
          } else {
            let cantidad = detalle.cantidad + lote.cantidad;

            // Crear el detalle
            const detalleCompra = manager.create(DetalleCompra, {
              cantidad: detalle.cantidad,
              idInventario: lote.idInventario,
              idCompra: compraGuardada.idCompra,
              precio: producto?.precioCompra,
              subTotal: subTotal,
            });
            await manager.save(detalleCompra);

            // Actualizar inventario añadiendo scotk
            await manager.increment(
              Inventario,
              { idInventario: lote.idInventario },
              'cantidad',
              detalle.cantidad,
            );

            // Registrar el log del movimiento de inventario
            const movimientoInventario = manager.create(MovimientoInventario, {
              idInventario: lote.idInventario,
              cantidadM: detalle.cantidad,
              idTipoMovimiento: 2, // 2 para compra
            });
            await manager.save(movimientoInventario);
          }
        }
      }

      if (total !== compraGuardada.totalCompra) {
        throw new InternalServerErrorException(
          `El total de la factura no cuadra con e calcualado`,
        );
      }

      return compraGuardada;
    });
  }

  async calcularTotal(calculoDto: CalculoCompraDto): Promise<CalculoCompraDto> {
    const detalleFacturaDto = calculoDto.detalles;
    let total: number = 0;
    let subtotal: number = 0;
    const productos: DetalleCompraDto[] = [];

    for (const detalle of detalleFacturaDto) {
      subtotal = 0;
      const producto = await this.dataSource
        .getRepository(Producto)
        .findOne({ where: { idProducto: detalle.idProducto } });

      if (!producto) {
        throw new InternalServerErrorException(
          `No se encontró el producto con ID ${detalle.idProducto}`,
        );
      }

      total += detalle.cantidad * producto.precioCompra;
      subtotal = detalle.cantidad * producto.precioCompra;

      productos.push({
        cantidad: detalle.cantidad,
        idProducto: detalle.idProducto,
        subTotal: subtotal,
        lote: detalle.lote,
      });
    }

    const calculoTotalDto: CalculoCompraDto = {
      detalles: productos,
      total: total,
    };
    return calculoTotalDto;
  }

  async findAllCompra(): Promise<Compra[]> {
    const compras = await this.compraRepository
      .createQueryBuilder('compra')
      .innerJoin('compra.usuario', 'usuario')
      .select([
        'compra.idCompra AS idCompra',
        'compra.totalCompra AS total',
        'compra.fechaC AS fecha',
        'usuario.email as email',
      ])
      .getRawMany();

    return compras;
  }

  async findOneCompra(idCompra): Promise<Compra> {
    const compra = await this.compraRepository
      .createQueryBuilder('compra')
      .innerJoin('compra.usuario', 'usuario')
      .select([
        'compra.idCompra AS idCompra',
        'compra.totalCompra AS total',
        'compra.fechaC AS fecha',
        'usuario.email as email',
      ])
      .where('idCompra = :idCompra', { idCompra })
      .getRawOne();

    return compra;
  }
}
