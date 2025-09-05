import { Municipio } from "src/municipio/entities/municipio.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";

@Entity('departamento')
export class Departamento {
    @PrimaryGeneratedColumn()
    idDepartamento: number;

    @Column({nullable: true, unique: true})
    nombreD: string;

    @CreateDateColumn({type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    //relaciones
    @OneToMany(() => Municipio, municipio => municipio.departamento )
    municipio: Municipio;
}
