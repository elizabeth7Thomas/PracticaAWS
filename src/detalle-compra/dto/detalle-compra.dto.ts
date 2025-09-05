import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DetalleFacturaDto } from 'src/detalle-factura/dto/detalle-factura.dto';
import { CrearInventarioDto } from 'src/inventario/dto/crear-inventario.dto';

export class DetalleCompraDto extends DetalleFacturaDto {
  @ApiProperty({
    description: 'Número del lote de la compra',
    example: 'Lote123',
  })
  @IsString()
  lote: string;

  @ApiProperty({
    description: 'Nuevo lote de la compra',
    type: CrearInventarioDto,
  })
  @ValidateNested()
  @Type(() => CrearInventarioDto)
  @IsObject()
  @IsOptional()
  nuevoLote?: CrearInventarioDto;
}
