import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioClienteDto } from 'src/common/create-usuario-cliente.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { emit } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly clienteService: ClienteService,
    private readonly jwtService: JwtService
  ) { }

  async create(createUsuarioClienteDto: CreateUsuarioClienteDto) {
    console.log('[1] Inicio de creacion - DTO: recibido: ', JSON.stringify(createUsuarioClienteDto, null, 2));

    //creacion de usuario y cliente en transaccion
    const { usuario, cliente } = await this.clienteService.create(createUsuarioClienteDto);

    const usuarioConRol = await this.usuarioService.findOne(usuario.idUsuario, { relations: ['rol'] });

    //generacion de token
    const payload = {
      sub: usuario.idUsuario,
      email: usuario.email,
      rol: usuarioConRol.rol.nombreR
    };

    const access_token = this.jwtService.sign(payload);

    //respuesta
    const usuarioResponse = this.removePassword(usuario);

    return {
      access_token,
      usuario: usuarioResponse,
      cliente,
      message: 'Registro exitoso'
    };
  }

  private removePassword(usuario: Partial<Usuario> & { idUsuario: number, email: string }) {
    const { password, ...result } = usuario;

    return result;
  }

  //para clientes
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usuarioService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return {
        ...result,
        idUsuario: user.idUsuario,
        nombre: user.cliente.nombre,
      }
    }
  }

  async login(user: any) {
    console.log('Datos de usuario recibidos en login: ', user);
    const usuarioCompleto = await this.usuarioService.findOne(user.id, { 
      relations: ['rol', 'cliente'] 
    });

    if (!usuarioCompleto) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if(usuarioCompleto.estadoUsuario === false){
      throw new UnauthorizedException('El usuario se encuentra desactivado');
    }

    const payload = { 
      sub: usuarioCompleto.idUsuario,
      email: usuarioCompleto.email,
      rol: usuarioCompleto.rol?.nombreR || 'user' };

      const usuarioResponse = this.removePassword(usuarioCompleto);
      const cliente = usuarioCompleto.cliente;

    return {
      access_token: this.jwtService.sign(payload),
      usuario: usuarioResponse,
      cliente,
      message: 'Inicio de sesión exitoso'
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
