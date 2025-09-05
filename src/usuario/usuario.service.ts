import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioClienteDto } from 'src/common/create-usuario-cliente.dto';
import { Rol } from 'src/rol/entities/rol.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
type Tokens = {
  access_token: string;
  refresh_token: string;
};

type UsuarioWithCliente = Usuario & {
  idUsuario: number;
  nombre?: string;
};

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {      
    console.log(
      '[3] DTO recibido de ClienteService: ',
      JSON.stringify(createUsuarioDto, null, 2),
    );

      //verificar si el usuario ya existe
      const existingUser = await this.usuarioRepository.findOne({
        where: { email: createUsuarioDto.email },
      });

      if (existingUser) {
        throw new ConflictException('El email ya esta registrado');
      }

      const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

      const newUser = this.usuarioRepository.create({
        ...createUsuarioDto,
        password: hashedPassword,
      });

      const user = await this.usuarioRepository.save(newUser);
      /*const { access_token, refresh_token} = await this.generateToken(user);
S   
      return {
        access_token,
        //refresh_token,
        user: this.removePassword(user),
        idUsuario: user.idUsuario,
        email: user.email,
        status: HttpStatus.CREATED,
        message: 'User created successfully'
      }*/
      return user;
    } catch (error) {
      //if(error.code == 11000){
      console.error('Error en create:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      //}
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const user = this.jwtService.verify(refreshToken, {
        secret: 'jwt_secret_refresh',
      });
      const payload = { sub: user.idUsuario, email: user.email };
      const { access_token, refresh_token } = await this.generateToken(payload);

      return {
        access_token,
        refresh_token,
        status: 200,
        message: 'Refresh token successfully',
      };
    } catch (error) {
      throw new HttpException('Refresh token failed', HttpStatus.UNAUTHORIZED);
    }
  }


  private async generateToken(user): Promise<Tokens> {
    const jwtPayload = { sub: user.idUsuario, email: user.email };
    const jwtSecret = process.env.JWT_SECRET;
    const jwtSecretRefresh = process.env.JWT_SECRET_REFRESH;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtSecret,
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtSecretRefresh,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await this.usuarioRepository.findOne({
        where: { email: email },
      });
      const isPasswordValid = await bcrypt.compare(password, user?.password);

      if (!isPasswordValid) {
        throw new HttpException(
          'Credentials not found',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (user && isPasswordValid) {
        const payload = { sub: user.idUsuario, email: user.email };
        const { access_token, refresh_token } =
          await this.generateToken(payload);

        return {
          access_token,
          refresh_token,
          user: this.removePassword(user),
          status: HttpStatus.ACCEPTED,
          message: 'Login successful',
        };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Check out your credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private removePassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  findAll() {
    return `This action returns all usuario`;
  }
  
  /*async findOne(
  idUsuario: number,
  options?: { relations?: string[] }
): Promise<Usuario & { rol?: Rol }> {
    const usuario = await this.usuarioRepository.findOne({
    where: { idUsuario },
    relations: options?.relations || ['rol']});

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }

    return usuario;
  }*/

    async findOne(
  idUsuario: number,
  options?: { relations?: string[] }
): Promise<Usuario & { rol?: Rol; cliente?: Cliente }> {
  const usuario = await this.usuarioRepository.findOne({
    where: { idUsuario },
    relations: options?.relations || ['rol', 'cliente']
  });

  if (!usuario) {
    throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
  }

  return usuario;
}


  /*async update(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>{
    const usuario = await this.usuarioRepository.findOne({where: {idUsuario}})

    if(!usuario){
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }

    const updateUsuario = this.usuarioRepository.merge(usuario, updateUsuarioDto);

    try{
      await this.usuarioRepository.save(updateUsuario);
      return updateUsuario;
    } catch(error){
      throw new Error(`Error al actualizar usuario: ${error.messag}`)
    };

  }*/

  async update(
  idUsuario: number,
  updateUsuarioDto: UpdateUsuarioDto
): Promise<any> {
  const usuarioExiste = await this.usuarioRepository.findOne({
    where: { idUsuario },
  });

  if (!usuarioExiste) {
    throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
  }

  console.log('dto recibido, ', updateUsuarioDto);

  let hashedPassword: string | null = null;
      if (updateUsuarioDto.password) {
        hashedPassword = await bcrypt.hash(updateUsuarioDto.password, 10);
      }

  try {
    const result = await this.usuarioRepository.query(
      `CALL sp_ActualizarClienteParcialPorUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        idUsuario,
        updateUsuarioDto.nombre || null,
        updateUsuarioDto.apellido || null,
        updateUsuarioDto.nit || null,
        updateUsuarioDto.direccion || null,
        updateUsuarioDto.telefono || null,
        updateUsuarioDto.mayorista ?? null,
        updateUsuarioDto.idMunicipio || null,
        updateUsuarioDto.email || null,
        updateUsuarioDto.estadoUsuario ?? null,
        updateUsuarioDto.idRol || null,
        hashedPassword || null,
      ]
    );

    return result[0];
  } catch (error) {
    throw new Error(`Error al actualizar usuario y cliente: ${error.message}`);
  }
}

  async findOneByEmail(  email: string,  options?: {    withRol?: boolean;    withCliente?: boolean;  }): Promise<(Usuario & { nombre?: string; rol?: Rol }) | null> {
    try {
    const findOptions: any = {
      where: { email },
      select: [
        'idUsuario',
        'email',
        'password'
      ],
      relations: []
    };

    if (options?.withCliente !== false) {
      findOptions.relations.push('cliente');
    }
    
    if (options?.withRol) {  // Solo si withRol es explícitamente true
      findOptions.relations.push('rol');
    }

    const user = await this.usuarioRepository.findOne(findOptions);

    if (!user) {
      return null;
    }

      const userWithData = user as Usuario & {
      nombre?: string;
      rol?: Rol;
    };

      if (user?.cliente) {
      userWithData.nombre = user.cliente.nombre;
    }

    return userWithData;

    } catch(error){
    console.error('Error finding user by email:', {
      error,
      email,
      options
    });
    throw new HttpException(
      'Error retrieving user', 
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async verificarPassword(
  idUsuario: number, 
  currentPassword: string
): Promise<{ isValid: boolean; message?: string }> {
  try {
    // 1. Buscar usuario incluyendo su contraseña
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario },
      select: ['idUsuario', 'password']
      });

     if (!usuario) {
      return { 
        isValid: false, 
        message: 'Usuario no encontrado' 
      };
    }
    
    const isValid = await bcrypt.compare(currentPassword, usuario.password);
    
    return { 
      isValid,
      message: isValid ? 'Contraseña válida' : 'Contraseña incorrecta'
    };

  } catch (error) {
    console.error('Error en verificarPassword (usuario):', error);
    return { 
      isValid: false, 
      message: 'Error al verificar la contraseña' 
    };
  }
}
}
