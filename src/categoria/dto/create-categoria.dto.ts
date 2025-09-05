import { ApiProperty } from '@nestjs/swagger';
import {  IsOptional, IsString } from 'class-validator';


export class CrearCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoría del medicamento', example: 'Pastillas' })
  @IsString()
  nombreC: string;

  @ApiProperty({ description: 'descripcionC', example: 'Pastillas para el dolor' })
  @IsString()
  @IsOptional()
  descripcionC: string;
}
