import { Module } from '@nestjs/common';
import { MovimientoinventarioService } from './movimientoinventario.service';
import { MovimientoinventarioController } from './movimientoinventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoInventario } from './movimientoinventario.entity';
import { Inventario } from 'src/inventario/inventario.entity';
import { Tipomovimiento } from 'src/tipomovimiento/tipomovimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoInventario, Inventario, Tipomovimiento])],
  controllers: [MovimientoinventarioController],
  providers: [MovimientoinventarioService],
})
export class MovimientoinventarioModule {}
