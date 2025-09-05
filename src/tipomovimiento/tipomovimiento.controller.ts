import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TipomovimientoService } from './tipomovimiento.service';
import { CreateTipomovimientoDto } from './dto/create-tipomovimiento.dto';
import { UpdateTipomovimientoDto } from './dto/update-tipomovimiento.dto';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('TipoMovimiento')
@ApiBearerAuth('access-token')
@Controller('tipomovimiento')
export class TipomovimientoController {
  constructor(private readonly service: TipomovimientoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tipo de movimiento' })
  create(@Body() dto: CreateTipomovimientoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los tipos de movimiento' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de movimiento por ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de movimiento' })
  update(@Param('id') id: string, @Body() dto: UpdateTipomovimientoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de movimiento' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
