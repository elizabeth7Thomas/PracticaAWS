import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsString, IsOptional, IsNumber, isNumber } from 'class-validator';
import { Categoria } from '../categoria/categoria.entity';
import { Inventario } from 'src/inventario/inventario.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  idProducto: number;

  @Column()
  @IsString()
  nombreP: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @IsNumber()
  precio: number;

  @Column()
  @IsNumber()
  stockActual: number;

  @Column()
  @IsString()
  @IsOptional()
  descripcion: string;

  @Column()
  @IsNumber()
  @IsOptional()
  stockMinimo: number;

  @Column()
  @IsString()
  imagen: string;

  @Column()
  @IsString()
  marca: string;

  @Column()
  @IsNumber()
  estadoProducto: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @IsNumber()
  precioMayoreo: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @IsNumber()
  precioCompra: number;

  @Column()
  @IsNumber()
  idCategoria: number;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  @OneToMany(() => Inventario, (inventario) => inventario.producto)
  inventarios: Inventario[];
}
