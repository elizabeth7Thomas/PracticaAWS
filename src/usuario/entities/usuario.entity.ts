import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Compra } from 'src/compra/entities/compra.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

    @Column({default: 1})
    idRol: number;

  @Column({ default: true })
  estadoUsuario: boolean;

  @CreateDateColumn({
     type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP', 
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente: Cliente;

  @OneToMany(() => Compra, (compra) => compra.usuario)
  compras: Compra[];

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'idRol' })
  rol: Rol;
}
