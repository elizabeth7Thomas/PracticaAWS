import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataBaseConfig } from './config/database.config';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/categoria.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductoModule } from './producto/producto.module';
import { InventarioModule } from './inventario/inventario.module';
import { FacturaModule } from './factura/factura.module';
import { Factura } from './factura/entities/factura.entity';
import { DetalleFactura } from './detalle-factura/entities/detalle-factura.entity';
import { Producto } from './producto/producto.entity';
import { Inventario } from './inventario/inventario.entity';

import { MovimientoInventario } from './movimientoinventario/movimientoinventario.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { ClienteModule } from './cliente/cliente.module';
import { AuthModule } from './auth/auth.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { DepartamentoModule } from './departamento/departamento.module';
import { Departamento } from './departamento/entities/departamento.entity';
import { MunicipioModule } from './municipio/municipio.module';
import { Municipio } from './municipio/entities/municipio.entity';
import { Tipomovimiento } from './tipomovimiento/tipomovimiento.entity';
import { MovimientoinventarioModule } from './movimientoinventario/movimientoinventario.module';
import { TipomovimientoModule } from './tipomovimiento/tipomovimiento.module';
import { Rol } from './rol/entities/rol.entity';
import { APP_GUARD } from '@nestjs/core';
import { CompraModule } from './compra/compra.module';
import { DetalleCompraModule } from './detalle-compra/detalle-compra.module';
import { Compra } from './compra/entities/compra.entity';
import { DetalleCompra } from './detalle-compra/detalle-compra.entity';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';
import { RolModule } from './rol/rol.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DataBaseConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        driver: require('mysql2'),
        entities: [
          Categoria,
          Factura,
          DetalleFactura,
          Producto,
          Inventario,
          MovimientoInventario,
          Usuario,
          Tipomovimiento,
          Cliente,
          Departamento,
          Municipio,
          Compra,
          DetalleCompra,
          Rol,
        ],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),

    CategoriaModule,
    ProductoModule,
    InventarioModule,
    FacturaModule,
    MovimientoinventarioModule,
    UsuarioModule,
    TipomovimientoModule,
    ClienteModule,
    AuthModule,
    DepartamentoModule,
    MunicipioModule,

    CompraModule, 
    DetalleCompraModule, 
    DetalleFacturaModule, 
    RolModule, 
    CompraModule,
    DetalleCompraModule,
    DetalleFacturaModule,
    RolModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
