// create-movimientoinventario.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMovimientoinventarioDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cantidadM: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idTipoMovimiento: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  idInventario: number;
}
