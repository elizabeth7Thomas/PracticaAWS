import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tipomovimiento } from './tipomovimiento.entity';
import { CreateTipomovimientoDto } from './dto/create-tipomovimiento.dto';
import { UpdateTipomovimientoDto } from './dto/update-tipomovimiento.dto';

@Injectable()
export class TipomovimientoService {
  constructor(
    @InjectRepository(Tipomovimiento)
    private repo: Repository<Tipomovimiento>,
  ) {}

  async create(dto: CreateTipomovimientoDto) {
    return this.repo.save(dto);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ idTipoMovimiento: id });
  }

  async update (id: number, dto: UpdateTipomovimientoDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const found = await this.findOne(id);
    if (!found) {
      throw new Error(`No se encontró un tipo de movimiento con el id ${id}`);
    }
    return this.repo.remove(found);
  }
}
