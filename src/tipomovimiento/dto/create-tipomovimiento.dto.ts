import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTipomovimientoDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  idTipoMovimiento: number;

  @ApiProperty({ example: 'Entrada' })
  @IsNotEmpty()
  tipoM: string;
}
