import { Module } from '@nestjs/common';
import { DetalleCompraService } from './detalle-compra.service';
import { DetalleCompraController } from './detalle-compra.controller';
import { DetalleCompra } from './detalle-compra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleCompra])],
  providers: [DetalleCompraService],
  controllers: [DetalleCompraController],
})
export class DetalleCompraModule {}
