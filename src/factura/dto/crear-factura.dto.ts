import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { CalcutoTotalDto } from './calculo-total.dto';

export class CrearFacturaDto {
  @ApiProperty({ description: 'Código de la factura', example: 'AAAE1' })
  @IsString()
  numFactura: string;

  @ApiProperty({
    description: 'ID del cliente asociado a la factura',
    example: 1,
  })
  @IsNumber()
  idCliente: number;

  @ApiProperty({
    description: 'Total y detalles de la factura',
    type: CalcutoTotalDto,
  })
  @ValidateNested()
  @Type(() => CalcutoTotalDto)
  @IsObject()
  calculoTotal: CalcutoTotalDto;
}
