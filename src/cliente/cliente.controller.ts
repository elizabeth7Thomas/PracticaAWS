import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CreateUsuarioClienteDto } from 'src/common/create-usuario-cliente.dto';
import { Public } from 'src/auth/decorators/public.decorators';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RangoFechasDto } from 'src/detalle-factura/dto/reportes/rango-fechas.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Public()
  @Post()
  create(@Body() createClienteDto: CreateUsuarioClienteDto) {
    return this.clienteService.create(createClienteDto);
  }


  @Post('registro-completo')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Crear a un nuevo Cliente con Usuario',
    description: 'Este endpoint permite crear a un nuevo Cliente con Usuario'
  })
  @ApiBody({ type: CreateUsuarioClienteDto})
  @ApiResponse({
    status: 201,
    description: 'Usuario-cliente creado exitosamente',
  })
  async crearConUsuario(@Body() createUsuarioClienteDto: CreateUsuarioClienteDto){
    return this.clienteService.createSp(createUsuarioClienteDto);
  }

  @Get('GET/usuario/:usuarioId')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Obtener Cliente por usuarioId',
    description: 'Informacion del cliente desde el idUsuario'
  })
  @ApiResponse({
    status: 201,
    description: 'idCliente: number, nombre: string, etc.',
  })
  async findByUsuarioId(@Param('usuarioId') usuarioId: number) {
    return this.clienteService.findByUsuarioId(usuarioId);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  //aqui
  
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Obtener Cliente por idCliente',
    description: 'Informacion del cliente desde su id'
  })
  @ApiResponse({
    status: 201,
    description: 'idCliente: number, nombre: string, etc.',
  })
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiBody({ type: UpdateClienteDto})
  @ApiOperation({
    summary: 'Actualizar Cliente por idCliente',
    description: 'Actualizar Informacion del cliente desde su id'
  })
  @ApiResponse({
    status: 201,
    description: 'idCliente: number, nombre: string, etc. (campo actualizado)',
  })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete('/DELETE/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Eliminar cliente desde idCliente',
    description: 'Borrado logico de registro Cliente (estadoCliente)'
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente ID {idCliente} (Usuario ID: {idUsuario} desactivados correctamento)',
  })
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }

  @Post('/reportes/frecuentes/')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Obtener datos sobre los clietes que más han comprado',
  })
  @ApiBody({ type: RangoFechasDto })
  @ApiResponse({
    status: 200,
    description: 'Consulta realizada con éxito.',
  })
  findVentasPorProducto(
    @Body() rangoFechasDto: RangoFechasDto,
  ) {
    return this.clienteService.findClientesFrecuentes(rangoFechasDto);
  }

  @Post('verificar-password')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Verificacion de password desde idCliente',
    description: 'Verifica si el password ingresado coincide con el registrado en la bd'
  })
  @ApiResponse({
    status: 201,
    description: 'Contraseña válida',
  })
  async verifyPassword(
  @Body() body: { idCliente: number, currentPassword: string }
) {
  return this.clienteService.verificarPassword(
    body.idCliente, 
    body.currentPassword
  );
}
}
