import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClienteService } from 'src/cliente/cliente.service';
import { CreateUsuarioClienteDto } from 'src/common/create-usuario-cliente.dto';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { Public } from './decorators/public.decorators';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService
  ) {}

  @Public()
  @Post('/POST/crear')
  @ApiOperation({
      summary: 'Endpoint principal para crear a un nuevo Cliente con Usuario',
      description: 'A este endpoint accede Login del frontend para crear a un nuevo Cliente con Usuario'
  })
  @ApiBody({ type: CreateUsuarioClienteDto})
  @ApiResponse({
      status: 201,
      description: 'status: 201, access_token: [token], etc.',
    })
  /*@UsePipes( new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))*/
  async create(@Body() body: any) {
    try{
      console.log('Body recibido: ', JSON.stringify(body, null, 2));

      const createUsuarioClienteDto: CreateUsuarioClienteDto = {
        usuario: {
          email: body.email,
          password: body.password,
          idRol: body.idRol
        },
        cliente: {
          nombre: body.nombre,
          apellido: body.apellido,
          nit: body.nit || 'CF',
          direccion: body.direccion || '',
          telefono: body.telefono || '',
          mayorista: body.mayorista || false,
          estadoCliente: true,
          idMunicipio: body.idMunicipio || '',
        }
      }

      console.log('DTO transformado: ', JSON.stringify(createUsuarioClienteDto, null, 2));

      const result = await this.authService.create(createUsuarioClienteDto);

      return{
        status: HttpStatus.CREATED,
        ...result
      };
    } catch(error){
      console.error('Error en AuthController: ', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      throw error;
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/POST/login')
  @ApiOperation({
      summary: 'Endpoint para Iniciar Sesion',
      description: 'Para Iniciar Sesion y generar token'
  })
  @ApiBody({ type: CreateAuthDto})
  @ApiResponse({
      status: 201,
      description: 'access_token: [token], usuario [objeto]:, etc.',
    })
  async login(@Body() createAuthDto: CreateAuthDto, @Request() req){
    console.log('Usuario recibido en controller: ', req.user);
    
    const result =  this.authService.login(req.user);
    console.log('Resultado antes de enviar: ', result);

    return result;
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
