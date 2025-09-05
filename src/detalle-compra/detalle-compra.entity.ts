import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IsNumber } from 'class-validator';

@Entity('detallecompra')
export class DetalleCompra {
  @PrimaryGeneratedColumn()
  idDetalleCompra: number;

  @Column()
  @IsNumber()
  cantidad: number;


  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @IsNumber()
  precio: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @IsNumber()
  subTotal: number;

  @Column()
  @IsNumber()
  idInventario: number;

  @Column()
  @IsNumber()
  idCompra: number;
}
