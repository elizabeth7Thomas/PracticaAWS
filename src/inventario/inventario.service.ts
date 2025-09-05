import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './inventario.entity';
import { CrearInventarioDto } from './dto/crear-inventario.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepo: Repository<Inventario>,
  ) {}

  async findAll() {
    // Solo inventarios activos (estadoInventario = 1)
    return this.inventarioRepo.find({
      where: { estadoInventario: 1 },
      relations: ['producto'],
    });
  }

  async findOne(id: number) {
    const inventario = await this.inventarioRepo.findOne({
      where: { idInventario: id },
      relations: ['producto'],
    });
    if (!inventario) throw new NotFoundException('Inventario no encontrado');
    return inventario;
  }

  create(data: CrearInventarioDto) {
    const nuevo = this.inventarioRepo.create({
      ...data,
      producto: { idProducto: data.idProducto },
    });
    return this.inventarioRepo.save(nuevo);
  }

  async update(id: number, data: Partial<CrearInventarioDto>) {
    const inventario = await this.inventarioRepo.preload({
      idInventario: id,
      ...data,
      producto: data.idProducto ? { idProducto: data.idProducto } : undefined,
    });
    if (!inventario) throw new NotFoundException('Inventario no encontrado');
    return this.inventarioRepo.save(inventario);
  }

  async remove(id: number) {
    const inventario = await this.findOne(id);
    if (!inventario) {
      throw new NotFoundException(`Inventario con id ${id} no encontrado`);
    }

    inventario.estadoInventario = 0; // 👈 Borrado lógico
    return this.inventarioRepo.save(inventario);
  }

  async findInventariosVencidos() {
    const vencidos = await this.inventarioRepo
      .createQueryBuilder('inventario')
      .leftJoinAndSelect('inventario.producto', 'producto')
      .where('inventario.estadoInventario = :estado', { estado: 0 }) // Estado 0 para inactivos
      .andWhere('inventario.cantidad > 0')
      .getMany();

    if (!vencidos || vencidos.length === 0) {
      throw new NotFoundException('No se encontraron inventarios vencidos');
    }

    return vencidos;
  }

  async findStock() {
    return this.inventarioRepo
      .createQueryBuilder('inventario')
      .leftJoin('inventario.producto', 'producto')
      .select('producto.idProducto', 'idProducto')
      .addSelect('producto.nombreP', 'nombre')
      .addSelect('SUM(inventario.cantidad)', 'totalDisponible')
      .where('inventario.estadoInventario = :estado', { estado: 1 })
      .andWhere('inventario.cantidad > 0')
      .groupBy('producto.idProducto')
      .addGroupBy('producto.nombreP')
      .getRawMany();
  }

  async findInventariosPorProducto(idProducto: number) {
    const inventarios = await this.inventarioRepo
      .createQueryBuilder('inventario')
      .leftJoinAndSelect('inventario.producto', 'producto')
      .where('producto.idProducto = :idProducto', { idProducto })
      .andWhere('inventario.estadoInventario = :estado', { estado: 1 }) // Solo activos
      .orderBy('inventario.idInventario', 'DESC')
      .getMany();

    if (!inventarios || inventarios.length === 0) {
      throw new NotFoundException(
        `No se encontraron inventarios para el producto con id ${idProducto}`,
      );
    }

    return inventarios;
  }
}
// modificacion de borrado logico primer commit