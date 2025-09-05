import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { RangoFechasDto } from './rango-fechas.dto';

export class VentasPorProductoDto extends PartialType(RangoFechasDto) {
  @ApiProperty({
    description: 'Id del producto para el reporte',
    example: 2,
  })
  @IsNumber()
  idProducto: number;
}
