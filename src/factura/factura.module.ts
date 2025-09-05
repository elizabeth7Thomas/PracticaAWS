import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { Type } from 'class-transformer';
import { Factura } from './entities/factura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Factura])],
  providers: [FacturaService],
  controllers: [FacturaController]
})
export class FacturaModule {}
