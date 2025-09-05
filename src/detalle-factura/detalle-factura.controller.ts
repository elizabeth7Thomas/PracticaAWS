import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { DetalleFacturaService } from './detalle-factura.service';
import { RangoFechasDto } from './dto/reportes/rango-fechas.dto';
import { VentasPorProductoDto } from './dto/reportes/ventas-por-producto.dto';

@ApiTags('DetalleFactura')
@ApiBearerAuth('access-token')
@Controller('detalle-factura')
export class DetalleFacturaController {
  constructor(private readonly detalleFacturaService: DetalleFacturaService) {}

  @Get('/obtener/:idFactura')
  @ApiOperation({ summary: 'Obtener los detalles de una factura por su id' })
  @ApiParam({ name: 'idFactura', description: 'ID de la factura' })
  @ApiResponse({
    status: 200,
    description: 'Factura obtenido con éxito.',
    type: [DetalleFactura],
  })
  findDetallesFactura(@Param('idFactura') idFactura: number) {
    return this.detalleFacturaService.findDetallesFactura(idFactura);
  }

  @Post('/reportes/mas-vendidos/')
  @ApiOperation({ summary: 'Obtener los productos más vendidos por fecha' })
  @ApiBody({ type: RangoFechasDto })
  @ApiResponse({
    status: 200,
    description: 'Consulta realizada con éxito.'
  })
  findProductosMasVendidos(@Body() rangoFechasDto: RangoFechasDto) {
    return this.detalleFacturaService.findProductosMasVendidos(rangoFechasDto);
  }

  @Post('/reportes/ventas-por-producto/')
  @ApiOperation({ summary: 'Obtener los datos de ventas de un producto en específico por fecha' })
  @ApiBody({ type: VentasPorProductoDto })
  @ApiResponse({
    status: 200,
    description: 'Consulta realizada con éxito.'
  })
  findVentasPorProducto(@Body() ventasPorProductoDto: VentasPorProductoDto) {
    return this.detalleFacturaService.findCantidadVendidaProducto(ventasPorProductoDto);
  }
}
