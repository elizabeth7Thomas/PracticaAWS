import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FacturaService } from './factura.service';
import { CrearFacturaDto } from './dto/crear-factura.dto';
import { Factura } from './entities/factura.entity';
import { DetalleFacturaDto } from '../detalle-factura/dto/detalle-factura.dto';
import { CalcutoTotalDto } from './dto/calculo-total.dto';

@ApiTags('Facturas')
@ApiBearerAuth('access-token')
@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post('/crear')
  @ApiOperation({
    summary: 'Crear una nueva venta',
    description:
      'Este endpoint permite crear una nueva venta con su respectiva factura.',
  })
  @ApiBody({ type: CrearFacturaDto })
  @ApiResponse({
    status: 201,
    description: 'Venta generado con éxito.',
    type: Factura,
  })
  @ApiResponse({
    status: 500,
    description: 'Error al crear la venta. Verifique los datos proporcionados.',
  })
  async create(@Body() crearFacturaDto: CrearFacturaDto): Promise<Factura> {
    return this.facturaService.create(crearFacturaDto);
  }

  @Post('/calcular-total')
  @ApiOperation({
    summary: 'Calcula el total de una venta',
    description:
      'Este endpoint permite calcular el total de una venta para mostrarlo al usaurio.',
  })
  @ApiBody({ type: CalcutoTotalDto })
  @ApiResponse({
    status: 200,
    description: 'Cálculo generado',
    type: CalcutoTotalDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Error al crear la venta. Verifique los datos proporcionados.',
  })
  async calcularTotal(
    @Body() calculoTotalDto: CalcutoTotalDto,
  ): Promise<CalcutoTotalDto> {
    return this.facturaService.calcularTotal(calculoTotalDto);
  }

  @Get('/listar')
  @ApiOperation({ summary: 'Obtener todos las facturas' })
  @ApiResponse({
    status: 200,
    description: 'Facturas obtenidas con éxito.',
    type: [Factura],
  })
  findAllFactura(): Promise<Factura[]> {
    return this.facturaService.findAllFactura();
  }

  @Get('/obtener/:idFactura')
  @ApiOperation({ summary: 'Obtener una factura por su id' })
  @ApiParam({ name: 'idFactura', description: 'ID de la factura' })
  @ApiResponse({
    status: 200,
    description: 'Factura obtenido con éxito.',
    type: Factura,
  })
  findOneFactura(@Param('idFactura') idFactura: number): Promise<Factura> {
    return this.facturaService.findOneFactura(idFactura);
  }
}
