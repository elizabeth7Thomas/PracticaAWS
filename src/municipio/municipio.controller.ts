import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';

@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post('/POST/crear')
  create(@Body() createMunicipioDto: CreateMunicipioDto) {
    return this.municipioService.create(createMunicipioDto);
  }

  @Get()
  findAll() {
    return this.municipioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipioService.findOne(+id);
  }

  @Get('/GET/municipios_por_departamentos/:id')
  findByDepartamento(@Param('id') id: string){
    return this.municipioService.findByDepartamento(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMunicipioDto: UpdateMunicipioDto) {
    return this.municipioService.update(+id, updateMunicipioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.municipioService.remove(+id);
  }
}
