import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private municipioRepository: Repository<Municipio>
  ) { }

  async create(createMunicipioDto: CreateMunicipioDto) {
    try {
      console.log('DTO recibido: ', createMunicipioDto);

      const newMunicipio = this.municipioRepository.create(createMunicipioDto);

      const municipio = await this.municipioRepository.save(newMunicipio);

      return municipio;
    } catch (error) {
      throw new HttpException('Error al crear Municipio', HttpStatus.BAD_REQUEST);
    }

  }

  async findAll() {
    const municipios = await this.municipioRepository.find();

    return municipios;
  }

  async findOne(id: number) {
    try {
      const municipio = await this.municipioRepository.findOne({ where: { idMunicipio: id }, relations: ['departamento'] });

      if (!municipio) {
        throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
      }

      return municipio;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al buscar el municipio');
    }
  }

  async findByDepartamento(id: number) {
    try {
      const municipios = await this.municipioRepository.find({where: { idDepartamento: id}});

      if(!municipios){
        throw new NotFoundException(`Municipios con ID ${id} de departamento no encontrado`);
      }

      return municipios;
    } catch(error){
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new Error('Error al encontrar Municipios relacionados');
    }
  }

  update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
    return `This action updates a #${id} municipio`;
  }

  remove(id: number) {
    return `This action removes a #${id} municipio`;
  }
}
