import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
constructor(
  @InjectRepository(Rol)
  private rolRepository: Repository<Rol>
){}

  async create(createRolDto: CreateRolDto) {
    const rol = this.rolRepository.create(createRolDto);

    const rolSaved = await this.rolRepository.save(rol);

    return rolSaved;
  }

  async findAll() {
    const roles = await this.rolRepository.find();

    return roles;
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
