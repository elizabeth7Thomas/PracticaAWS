import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { Inventario } from 'src/inventario/inventario.entity';
import { Factura } from 'src/factura/entities/factura.entity';

@Entity('detallefactura')
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  idDetalleFactura: number;

  @Column()
  @IsNumber()
  cantidad: number;

  @CreateDateColumn({
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  fecha: Date;

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
  idFactura: number;

  @ManyToOne(() => Inventario, (inventario) => inventario.detallesFacturas)
  @JoinColumn({ name: 'idInventario' })
  inventario: Inventario;

  @ManyToOne(() => Factura, (factura) => factura.detallesFacturas)
    @JoinColumn({ name: 'idFactura' })
    factura: Factura;
}
