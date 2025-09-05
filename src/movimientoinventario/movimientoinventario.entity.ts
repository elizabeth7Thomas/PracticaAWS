

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Inventario } from 'src/inventario/inventario.entity';
import { Tipomovimiento } from 'src/tipomovimiento/tipomovimiento.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('movimientoinventario') 
export class MovimientoInventario {  
  @PrimaryGeneratedColumn({ name: 'idMovimientoInventario' })
  @ApiProperty()
  idMovimientoInventario: number;

  @Column({ name: 'cantidadM' })
  @ApiProperty()
  cantidadM: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  fecha: Date;

  @ManyToOne(() => Tipomovimiento)
  @JoinColumn({ name: 'idTipoMovimiento' })
  tipoMovimiento: Tipomovimiento;

  @ManyToOne(() => Inventario)
  @JoinColumn({ name: 'idInventario' })
  inventario: Inventario;
}