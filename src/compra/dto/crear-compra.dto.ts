import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DetalleCompraDto } from '../../detalle-compra/dto/detalle-compra.dto';
import { CalculoCompraDto } from './calculo-compra.dto';

export class CrearCompraDto {
  @ApiProperty({
    description: 'ID del usuario que realizó la compra',
    example: 1,
  })
  @IsNumber()
  idUsuario: number;

  @ApiProperty({
    description: 'Calculos de la compra y detalles',
    type: CalculoCompraDto,
  })
  @ValidateNested()
  @Type(() => CalculoCompraDto)
  @IsObject()
  calculoCompra: CalculoCompraDto;
}
