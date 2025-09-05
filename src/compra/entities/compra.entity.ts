import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('compra')
export class Compra {
  @PrimaryGeneratedColumn()
  idCompra: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @IsNumber()
  totalCompra: number;

  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaC: Date;

  @Column()
  @IsNumber()
  idUsuario: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.compras)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;
}
