// movimientoinventario.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MovimientoinventarioService } from './movimientoinventario.service';
import { CreateMovimientoinventarioDto } from './dto/create-movimientoinventario.dto';
import { UpdateMovimientoinventarioDto } from './dto/update-movimientoinventario.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('movimientoinventario')
export class MovimientoinventarioController {
  constructor(private readonly movimientoService: MovimientoinventarioService) {}

  @Post('crear')
  create(@Body() dto: CreateMovimientoinventarioDto) {
    return this.movimientoService.create(dto);
  }

  @Get('listar')
  findAll() {
    return this.movimientoService.findAll();
  }

  @Get('buscar/:id')
  findOne(@Param('id') id: string) {
    return this.movimientoService.findOne(+id);
  }

  @Put('editar/:id')
  update(@Param('id') id: string, @Body() dto: UpdateMovimientoinventarioDto) {
    return this.movimientoService.update(+id, dto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id') id: string) {
    return this.movimientoService.remove(+id);
  }
}
