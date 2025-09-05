import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Cliente])],
  controllers: [UsuarioController],
  providers: [UsuarioService, JwtService],
  exports: [UsuarioService]
})
export class UsuarioModule {}


