import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]),
UsuarioModule],
  controllers: [ClienteController],
  providers: [
    ClienteService
  ],
  exports: [ClienteService]
})
export class ClienteModule {}
