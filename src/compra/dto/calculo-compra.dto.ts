import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DetalleCompraDto } from '../../detalle-compra/dto/detalle-compra.dto';

export class CalculoCompraDto {
  @ApiProperty({
    description: 'Total de la compra',
    example: 1000.00,
  })
  @IsNumber()
  @IsOptional()
  total?: number;

  @ApiProperty({
    description: 'Detalles de la compra',
    type: [DetalleCompraDto],
  })
  @ValidateNested({ each: true })
  @Type(() => DetalleCompraDto)
  @IsArray()
  detalles: DetalleCompraDto[];
}
