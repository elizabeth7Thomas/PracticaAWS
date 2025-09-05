import { Cliente } from "src/cliente/entities/cliente.entity";
import { Departamento } from "src/departamento/entities/departamento.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('municipio')
export class Municipio {
    @PrimaryGeneratedColumn()
    idMunicipio: number;

    @Column({nullable: false, unique: true})
    nombreM: string;    

    @Column({name: 'idDepartamento'})
    idDepartamento: number;

    @CreateDateColumn({type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
    
    @UpdateDateColumn({type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToOne(() => Departamento, departamento => departamento.municipio)
    @JoinColumn({name: 'idDepartamento'})
    departamento: Departamento;

    @OneToMany(() => Cliente, cliente => cliente.municipio)
    clientes: Cliente[];
}
