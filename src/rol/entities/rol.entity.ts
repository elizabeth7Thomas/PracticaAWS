import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('rol')
export class Rol {
    @PrimaryGeneratedColumn()
    idRol: number;

    @Column({nullable: false, unique: true})
    nombreR: string;

    @Column({nullable: true})
    descripcion: string;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];

    /*@Column({nullable: false, default: true})
    estadoRol: boolean;

    @CreateDateColumn({type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;*/
}
