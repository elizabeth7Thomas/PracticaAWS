import { IsDateString, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearInventarioDto {
  @ApiProperty({ example: '2025-08-01T00:00:00Z', description: 'Fecha de ingreso del producto' })
  @IsDateString()
  fechaIngreso: string;

  @ApiProperty({ example: '2026-08-01T00:00:00Z', description: 'Fecha de caducidad del producto' })
  @IsDateString()
  fechaCaducidad: string;

  @ApiProperty({ example: 'L123', description: 'Código del lote (único)' })
  @IsString()
  lote: string;

  @ApiProperty({ example: 100, description: 'Cantidad del producto' })
  @IsInt()
  cantidad: number;

  @ApiProperty({ example: 1, description: 'ID del producto relacionado' })
  @IsInt()
  idProducto: number;
}
