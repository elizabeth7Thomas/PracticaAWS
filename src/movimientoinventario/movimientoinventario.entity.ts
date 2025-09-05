import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, // Importante: Importar DeleteDateColumn
} from 'typeorm';
import { Tipomovimiento } from 'src/tipomovimiento/tipomovimiento.entity';
import { Inventario } from 'src/inventario/inventario.entity';

@Entity()
export class MovimientoInventario {
  @PrimaryGeneratedColumn()
  idMovimientoInventario: number;

  @Column({ type: 'int' })
  cantidadM: number;

  @ManyToOne(() => Tipomovimiento)
  @JoinColumn({ name: 'idTipoMovimiento' }) // Se asume que la FK se llama así
  tipoMovimiento: Tipomovimiento;

  @ManyToOne(() => Inventario)
  @JoinColumn({ name: 'idInventario' }) // Se asume que la FK se llama así
  inventario: Inventario;

  // --- Columnas de Auditoría y Borrado Lógico ---

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Clave del borrado lógico: TypeORM gestionará esta columna automáticamente.
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}