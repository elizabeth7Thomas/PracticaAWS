import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioClienteDto } from 'src/common/create-usuario-cliente.dto';
import { Public } from 'src/auth/decorators/public.decorators';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Public()
  @Post('/POST/crear')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Public()
  @Post('/POST/login')
  login(@Body() createUsuarioDto: CreateUsuarioDto){
    const { email, password} = createUsuarioDto;
    return this.usuarioService.loginUser(email, password);
  }

  //endpoint para renovar el token
  @Post('/POST/refresh')
  refreshToken(@Req() request: Request){
    const [type, token] = request.headers['authorization'] ?.split(' ') || []
    return this.usuarioService.refreshToken(token);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  } 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  @Post('verificar-password')
  async verifyPassword(
  @Body() body: { idUsuario: number, currentPassword: string }
) {
  return this.usuarioService.verificarPassword(
    body.idUsuario, 
    body.currentPassword
  );
}
}
