import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { DetalleFactura } from 'src/detalle-factura/entities/detalle-factura.entity';

@Entity('factura')
export class Factura {
  @PrimaryGeneratedColumn()
  idFactura: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @IsNumber()
  total: number;

  @Column()
  @IsNumber()
  numFactura: string;

  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date;

  @Column()
  @IsNumber()
  idCliente: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.facturas)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.factura)
  detallesFacturas: DetalleFactura[];
}
