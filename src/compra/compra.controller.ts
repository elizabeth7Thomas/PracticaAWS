import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompraService } from './compra.service';
import { Compra } from './entities/compra.entity';
import { CalcutoTotalDto } from 'src/factura/dto/calculo-total.dto';
import { CrearCompraDto } from './dto/crear-compra.dto';
import { CalculoCompraDto } from './dto/calculo-compra.dto';

@ApiTags('Compras')
@ApiBearerAuth('access-token')
@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post('/crear')
  @ApiOperation({
    summary: 'Crear una nueva compra',
    description:
      'Este endpoint permite crear una nueva compra con su respectiva factura.',
  })
  @ApiBody({ type: CrearCompraDto })
  @ApiResponse({
    status: 201,
    description: 'Compra generada con éxito.',
    type: Compra,
  })
  @ApiResponse({
    status: 500,
    description:
      'Error al crear la compra. Verifique los datos proporcionados.',
  })
  async createCompra(@Body() crearCompraDto: CrearCompraDto): Promise<Compra> {
    return this.compraService.createCompra(crearCompraDto);
  }

  @Get('/listar')
  @ApiOperation({ summary: 'Obtener todos las facturas' })
  @ApiResponse({
    status: 200,
    description: 'Facturas obtenidas con éxito.',
    type: [Compra],
  })
  findAllFactura(): Promise<Compra[]> {
    return this.compraService.findAllCompra();
  }

  @Get('/obtener/:idCompra')
  @ApiOperation({ summary: 'Obtener una compra por su id' })
  @ApiParam({ name: 'idCompra', description: 'ID de la compra' })
  @ApiResponse({
    status: 200,
    description: 'Compra obtenido con éxito.',
    type: Compra,
  })
  findOneCompra(@Param('idCompra') idCompra: number): Promise<Compra> {
    return this.compraService.findOneCompra(idCompra);
  }

  @Post('/calcular-total')
  @ApiOperation({
    summary: 'Calcula el total de una compra',
    description:
      'Este endpoint permite calcular el total de una compra para mostrarlo al usaurio.',
  })
  @ApiBody({ type: CalculoCompraDto })
  @ApiResponse({
    status: 200,
    description: 'Cálculo generado',
    type: CalculoCompraDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Error al calcular el total. Verifique los datos proporcionados.',
  })
  async calcularTotal(
    @Body() calculoTotalDto: CalculoCompraDto,
  ): Promise<CalculoCompraDto> {
    return this.compraService.calcularTotal(calculoTotalDto);
  }
}
