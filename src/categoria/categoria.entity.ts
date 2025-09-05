import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import {
  IsString,
  IsOptional,
} from 'class-validator';


@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @Column()
  @IsString()
  nombreC: string;

  @Column()
  @IsString()
  @IsOptional()
  descripcionC: string;
}
