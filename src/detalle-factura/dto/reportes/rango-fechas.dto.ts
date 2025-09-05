import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RangoFechasDto {
  @ApiProperty({
    description: 'Fecha de inicio del reporte',
    example: '2025-01-01',
  })
  @IsString()
  fechaInicio: string;

  @ApiProperty({
    description: 'Fecha de fin del reporte',
    example: '2025-09-01',
  })
  @IsString()
  fechaFin: string;
}
