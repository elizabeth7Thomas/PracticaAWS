import { Controller, Get, Param } from '@nestjs/common';
import { DetalleCompraService } from './detalle-compra.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DetalleCompra } from './detalle-compra.entity';

@ApiTags('DetalleCompra')
@ApiBearerAuth('access-token')
@Controller('detalle-compra')
export class DetalleCompraController {
  constructor(private readonly detalleCompraService: DetalleCompraService) {}

  @Get('/obtener/:idCompra')
  @ApiOperation({ summary: 'Obtener detalles de una compra por su id' })
  @ApiParam({ name: 'idCompra', description: 'ID de la compra' })
  @ApiResponse({
    status: 200,
    description: 'Compra obtenido con éxito.',
    type: [DetalleCompra],
  })
  findDetallesCompra(@Param('idCompra') idCompra: number): Promise<DetalleCompra[]> {
    return this.detalleCompraService.findDetallesFactura(idCompra);
  }
}
