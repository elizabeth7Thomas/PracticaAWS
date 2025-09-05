import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CrearProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Tabcin Extra Fuerte',
  })
  @IsString()
  nombreP: string;

  @ApiProperty({ description: 'Precio', example: 2.0 })
  @IsNumber()
  precio: number;

  @ApiProperty({
    description: 'Precio para cuando se compran 4 o más',
    example: 1.5,
  })
  @IsNumber()
  precioMayoreo: number;

  @ApiProperty({ description: 'Precio para pedir el producto', example: 1.2 })
  @IsNumber()
  precioCompra: number;

  @ApiProperty({ description: 'Stock Actual', example: 3 })
  @IsNumber()
  stockActual: number;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Para la gripe y tos',
  })
  @IsString()
  @IsOptional()
  descripcion: string;

  @ApiProperty({
    description: 'Imágen del producto',
    example:
      'https://distribuidoraalcance.com/wp-content/uploads/Tabcin-Extra-Fuerte.jpg',
  })
  @IsString()
  imagen: string;

  @ApiProperty({ description: 'Estado del producto', example: 1 })
  @IsNumber()
  estadoProducto: number;

  @ApiProperty({
    description: 'Marca del producto',
    example: 'Bayern',
  })
  @IsString()
  marca: string;

  @ApiProperty({
    description: 'Id de la categoría del producto',
    example: 1,
  })
  @IsNumber()
  idCategoria: number;
}
