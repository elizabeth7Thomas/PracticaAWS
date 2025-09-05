import { Factura } from 'src/factura/entities/factura.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Municipio } from "src/municipio/entities/municipio.entity";

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: true })
  nit: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: false, type: 'boolean', default: false })
  mayorista: boolean;

  @Column({ nullable: false, type: 'boolean', default: true})
  estadoCliente: boolean;

  @Column({ nullable: false, type: 'boolean', default: true })
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

  @OneToOne(() => Usuario, (usuario) => usuario.cliente)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura[];

  @ManyToOne(() => Municipio, municipio => municipio.clientes)
  @JoinColumn({ name: 'idMunicipio'})
  municipio: Municipio;
}
