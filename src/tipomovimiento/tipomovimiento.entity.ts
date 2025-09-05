import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tipomovimiento {
  @PrimaryColumn()
  @ApiProperty({ example: 1 })
  idTipoMovimiento: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'Entrada' })
  tipoM: string;

  @Column({ nullable: true })
  @ApiProperty({ example: '1' })
  estado: number;
}
