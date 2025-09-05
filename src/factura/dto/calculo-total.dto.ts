import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { DetalleFacturaDto } from '../../detalle-factura/dto/detalle-factura.dto';

export class CalcutoTotalDto {
  @ApiProperty({
    description: 'Detalles de los productos en la factura',
    type: [DetalleFacturaDto],
  })
  @ValidateNested({ each: true })
  @Type(() => DetalleFacturaDto)
  @IsArray()
  detalles: DetalleFacturaDto[];

  @ApiProperty({
    description: 'Total a pagar de la factura',
    example: 200.0,
  })
  @IsNumber()
  @IsOptional()
  total?: number;

}
