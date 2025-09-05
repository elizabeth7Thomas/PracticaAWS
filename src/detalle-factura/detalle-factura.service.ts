import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RangoFechasDto } from './dto/reportes/rango-fechas.dto';
import { VentasPorProductoDto } from './dto/reportes/ventas-por-producto.dto';

@Injectable()
export class DetalleFacturaService {
  constructor(
    @InjectRepository(DetalleFactura)
    private detalleFacturaRepository: Repository<DetalleFactura>,
  ) {}

  async findDetallesFactura(idFactura: number): Promise<any[]> {
    const detalles = await this.detalleFacturaRepository
      .createQueryBuilder('detalle')
      .innerJoin('detalle.inventario', 'inventario')
      .innerJoin('inventario.producto', 'producto')
      .where('detalle.idFactura = :idFactura', { idFactura })
      .select([
        'producto.idProducto AS idProducto',
        'producto.nombreP AS nombreProducto',
        'SUM(detalle.cantidad) AS cantidadTotal',
        'detalle.precio AS precioUnitario',
        'SUM(detalle.subTotal) AS subTotalTotal',
      ])
      .groupBy('producto.idProducto')
      .addGroupBy('producto.nombreP')
      .addGroupBy('detalle.precio')
      .getRawMany();

    return detalles;
  }

  async findProductosMasVendidos(rangoFechasDto: RangoFechasDto): Promise<any[]> {
    const resultados = this.detalleFacturaRepository
      .createQueryBuilder('detalle')
      .innerJoin('detalle.inventario', 'inventario')
      .innerJoin('inventario.producto', 'producto')
      .select([
        'producto.idProducto AS idProducto',
        'producto.nombreP AS nombreProducto',
        'SUM(detalle.cantidad) AS cantidadVendida',
        'SUM(detalle.subTotal) AS totalGenerado',
      ])
      .where('detalle.fecha BETWEEN :desde AND :hasta', {
        desde: rangoFechasDto.fechaInicio,
        hasta: rangoFechasDto.fechaFin,
      })
      .groupBy('producto.idProducto')
      .addGroupBy('producto.nombreP')
      .orderBy('cantidadVendida', 'DESC')
      .limit(3)
      .getRawMany();

    return resultados;
  }

  async findCantidadVendidaProducto(ventasPorProductoDto: VentasPorProductoDto): Promise<any[]> {
    const resultados = this.detalleFacturaRepository
      .createQueryBuilder('detalle')
      .innerJoin('detalle.inventario', 'inventario')
      .innerJoin('inventario.producto', 'producto')
      .select([
        'producto.idProducto AS idProducto',
        'producto.nombreP AS nombreProducto',
        'SUM(detalle.cantidad) AS cantidadVendida',
        'SUM(detalle.subTotal) AS totalGenerado',
      ])
      .where('detalle.fecha BETWEEN :desde AND :hasta', {
        desde: ventasPorProductoDto.fechaInicio,
        hasta: ventasPorProductoDto.fechaFin,
      })
      .andWhere('producto.idProducto = :idProducto', { idProducto: ventasPorProductoDto.idProducto })
      .groupBy('producto.idProducto')
      .addGroupBy('producto.nombreP')
      .orderBy('cantidadVendida', 'DESC')
      .getRawOne();

    return resultados;
  }
}
