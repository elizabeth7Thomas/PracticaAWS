import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Factura } from './entities/factura.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearFacturaDto } from './dto/crear-factura.dto';
import { DataSource } from 'typeorm';
import { DetalleFactura } from '../detalle-factura/entities/detalle-factura.entity';
import { Inventario } from 'src/inventario/inventario.entity';
import { MovimientoInventario } from '../movimientoinventario/movimientoinventario.entity';
import { Producto } from 'src/producto/producto.entity';
import { DetalleFacturaDto } from '../detalle-factura/dto/detalle-factura.dto';
import { CalcutoTotalDto } from './dto/calculo-total.dto';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>,
    private dataSource: DataSource,
  ) {}

  async create(crearFacturaDto: CrearFacturaDto): Promise<any> {
    return await this.dataSource.transaction(async (manager) => {
      const venta = manager.create(Factura, {
        idCliente: crearFacturaDto.idCliente,
        total: crearFacturaDto.calculoTotal.total,
        numFactura: crearFacturaDto.numFactura,
      });
      const ventaGuardada = await manager.save(venta);

      let total: number = 0;
      let subTotal: number = 0;
      let precioUsado: number = 0;

      for (const detalle of crearFacturaDto.calculoTotal.detalles) {
        // Buscar lotes de inventario disponibles para el producto
        const producto = await manager
          .getRepository(Producto)
          .findOne({ where: { idProducto: detalle.idProducto } });

        if (!producto) {
          throw new InternalServerErrorException(
            `No se encontró el producto con ID ${detalle.idProducto}`,
          );
        }
        if (detalle.cantidad >= 4) {
          total += detalle.cantidad * producto?.precioMayoreo;
          subTotal = detalle.cantidad * producto?.precioMayoreo;
          precioUsado = producto.precioMayoreo;
        } else {
          total += detalle.cantidad * producto?.precio;
          subTotal = detalle.cantidad * producto?.precio;
          precioUsado = producto.precio;
        }
        const lotes = await manager
          .getRepository(Inventario)
          .createQueryBuilder('inv')
          .where('inv.idProducto = :idProducto', {
            idProducto: detalle.idProducto,
          })
          .andWhere('inv.cantidad > 0')
          .andWhere('inv.estadoInventario = true')
          .orderBy('inv.fechaCaducidad', 'ASC')
          .getMany();

        if (!lotes || lotes.length === 0) {
          throw new InternalServerErrorException(
            `No hay inventario disponible para el producto con ID ${detalle.idProducto}`,
          );
        } else {
          let cantidadRestante = detalle.cantidad;

          for (const lote of lotes) {
            if (cantidadRestante <= 0) break;

            const cantidadConsumir = Math.min(lote.cantidad, cantidadRestante);

            // Crear el detalle de factura el lote actual
            const detalleFactura = manager.create(DetalleFactura, {
              cantidad: cantidadConsumir,
              idInventario: lote.idInventario,
              idFactura: ventaGuardada.idFactura,
              precio: precioUsado,
              subTotal: subTotal,
            });
            await manager.save(detalleFactura);

            // Actualizar inventario restando scotk
            await manager.decrement(
              Inventario,
              { idInventario: lote.idInventario },
              'cantidad',
              cantidadConsumir,
            );

            // Registrar el log del movimiento de inventario
            const movimientoInventario = manager.create(MovimientoInventario, {
              idInventario: lote.idInventario,
              cantidadM: cantidadConsumir,
              idTipoMovimiento: 1,
            });
            await manager.save(movimientoInventario);

            cantidadRestante -= cantidadConsumir;
          }
          if (cantidadRestante > 0) {
            throw new InternalServerErrorException(
              `No hay suficiente inventario para el producto con ID ${detalle.idProducto}`,
            );
          }
        }
      }

      if (total !== ventaGuardada.total) {
        throw new InternalServerErrorException(
          `El total de la factura no cuadra con e calcualado`,
        );
      }

      return ventaGuardada;
    });
  }

  // Cálculo del total de la factura para mostrar en el carrito de compras (o checkout) del frontend
  async calcularTotal(calculoDto: CalcutoTotalDto): Promise<CalcutoTotalDto> {
    const detalleFacturaDto = calculoDto.detalles;
    let total: number = 0;
    let subtotal: number = 0;
    const productos: DetalleFacturaDto[] = [];

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

      if (detalle.cantidad >= 4) {
        total += detalle.cantidad * producto.precioMayoreo;
        subtotal = detalle.cantidad * producto.precioMayoreo;
      } else {
        total += detalle.cantidad * producto.precio;
        subtotal = detalle.cantidad * producto.precio;
      }

      productos.push({
        cantidad: detalle.cantidad,
        idProducto: detalle.idProducto,
        subTotal: subtotal,
      });
    }

    const calculoTotalDto: CalcutoTotalDto = {
      detalles: productos,
      total: total,
    };
    return calculoTotalDto;
  }

  async findAllFactura(): Promise<Factura[]> {
    const facturas = await this.facturaRepository
      .createQueryBuilder('factura')
      .innerJoin('factura.cliente', 'cliente')
      .select([
        'factura.idFactura AS idFactura',
        'factura.total AS total',
        'factura.numFactura AS numFactura',
        'factura.fecha AS fecha',
        'cliente.nombre AS nombre',
        'cliente.apellido AS apellido',
      ])
      .getRawMany();

    return facturas;
  }

  async findOneFactura(idFactura): Promise<Factura> {
    const facturas = await this.facturaRepository
      .createQueryBuilder('factura')
      .innerJoin('factura.cliente', 'cliente')
      .select([
        'factura.idFactura AS idFactura',
        'factura.total AS total',
        'factura.numFactura AS numFactura',
        'factura.fecha AS fecha',
        'cliente.nombre AS nombre',
        'cliente.apellido AS apellido',
      ])
      .where('factura.idFactura = :idFactura', { idFactura: idFactura })
      .getRawOne();

    return facturas;
  }
}
