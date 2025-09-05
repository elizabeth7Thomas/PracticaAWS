
import { Module } from '@nestjs/common';
import { TipomovimientoService } from './tipomovimiento.service';
import { TipomovimientoController } from './tipomovimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipomovimiento } from './tipomovimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tipomovimiento])], 
  controllers: [TipomovimientoController],
  providers: [TipomovimientoService],
  exports: [TipomovimientoService] 
})
export class TipomovimientoModule {}
