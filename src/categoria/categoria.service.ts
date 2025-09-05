import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { Repository } from 'typeorm';
import { CrearCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

    async create(crearCategoriaDto: CrearCategoriaDto): Promise<Categoria> {
        const categoria = this.categoriaRepository.create(crearCategoriaDto);
        return this.categoriaRepository.save(categoria);
    }

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find();
    }

}
