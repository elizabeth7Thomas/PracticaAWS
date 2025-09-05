import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
      private departamentoRepository: Repository<Departamento>
  ){}

  async create(createDepartamentoDto: CreateDepartamentoDto): Promise<Departamento> {
    try{
      //crear la nueva instancia
      const departamento = this.departamentoRepository.create(createDepartamentoDto);

      const savedDepartamento = await this.departamentoRepository.save(departamento);

      return savedDepartamento;
    } catch(error){
      throw new Error(`No se pudo crear el departamento, por ${error.message}`);
    }
  }

  async findAll() {
    const municipios = await this.departamentoRepository.find();

    return municipios;
  }

  findOne(id: number) {
    return `This action returns a #${id} departamento`;
  }

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return `This action updates a #${id} departamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
