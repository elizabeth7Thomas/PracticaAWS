import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';
import { Producto } from 'src/producto/producto.entity';
import { DetalleFactura } from 'src/detalle-factura/entities/detalle-factura.entity';

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  idInventario: number;

  @Column()
  fechaIngreso: Date;

  @Column()
  fechaCaducidad: Date;

  @Column({ unique: true })
  lote: string;

  @Column()
  cantidad: number;

  @Column({ default: 1 })
  estadoInventario: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

   @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.inventario)
    detallesFacturas: DetalleFactura[];
}
