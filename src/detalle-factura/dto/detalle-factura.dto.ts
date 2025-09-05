import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class DetalleFacturaDto {
  @ApiProperty({
    description: 'Cantidad solicitada de un producto',
    example: 4,
  })
  @IsNumber()
  cantidad: number;

  @ApiProperty({
    description: 'Id del producto solicitado',
    example: 4,
  })
  @IsNumber()
  idProducto: number;

   @ApiProperty({
    description: 'Subtotal del producto solicitado',
    example: 30.0,
  })
  @IsNumber()
  @IsOptional()
  subTotal?: number;
}
