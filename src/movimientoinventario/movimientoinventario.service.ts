import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm'; // Importar IsNull para las consultas
import { MovimientoInventario } from './movimientoinventario.entity';
import { CreateMovimientoinventarioDto } from './dto/create-movimientoinventario.dto';
import { UpdateMovimientoinventarioDto } from './dto/update-movimientoinventario.dto';
import { Tipomovimiento } from 'src/tipomovimiento/tipomovimiento.entity';
import { Inventario } from 'src/inventario/inventario.entity';

@Injectable()
export class MovimientoinventarioService {
  constructor(
    @InjectRepository(MovimientoInventario)
    private readonly movimientoRepo: Repository<MovimientoInventario>,
    @InjectRepository(Tipomovimiento)
    private readonly tipoRepo: Repository<Tipomovimiento>,
    @InjectRepository(Inventario)
    private readonly inventarioRepo: Repository<Inventario>,
  ) {}

  async create(
    dto: CreateMovimientoinventarioDto,
  ): Promise<MovimientoInventario> {
    const tipoMovimiento = await this.tipoRepo.findOne({
      where: { idTipoMovimiento: dto.idTipoMovimiento },
    });
    if (!tipoMovimiento)
      throw new NotFoundException('Tipo de movimiento no encontrado');

    const inventario = await this.inventarioRepo.findOne({
      where: { idInventario: dto.idInventario },
    });
    if (!inventario) throw new NotFoundException('Inventario no encontrado');

    const movimiento = this.movimientoRepo.create({
      cantidadM: dto.cantidadM,
      tipoMovimiento,
      inventario,
    });

    return this.movimientoRepo.save(movimiento);
  }

  async createDeshabilitado(
    inventarioId: number,
  ): Promise<MovimientoInventario> {
    const inventario = await this.inventarioRepo.findOne({
      where: { idInventario: inventarioId },
    });
    if (!inventario) {
      throw new NotFoundException('Inventario no encontrado');
    }

    const tipoMovimiento = await this.tipoRepo.findOne({
      where: { tipoM: 'Deshabilitado' },
    });
    if (!tipoMovimiento) {
      throw new NotFoundException(
        'Tipo de movimiento "Deshabilitado" no encontrado',
      );
    }

    const movimiento = this.movimientoRepo.create({
      cantidadM: inventario.cantidad ?? 0,
      tipoMovimiento,
      inventario,
    });

    return this.movimientoRepo.save(movimiento);
  }

  findAll(): Promise<MovimientoInventario[]> {
    // Busca solo los registros que no han sido borrados lógicamente
    return this.movimientoRepo.find({
      where: { deletedAt: IsNull() }, // Asegura traer solo los activos
      relations: ['tipoMovimiento', 'inventario'],
    });
  }

  async findOne(id: number): Promise<MovimientoInventario> {
    const movimiento = await this.movimientoRepo.findOne({
      where: {
        idMovimientoInventario: id,
        deletedAt: IsNull(), // Asegura traer solo si no está borrado
      },
      relations: ['tipoMovimiento', 'inventario'],
    });
    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado');
    }
    return movimiento;
  }

  async update(
    id: number,
    dto: UpdateMovimientoinventarioDto,
  ): Promise<MovimientoInventario> {
    // findOne ya verifica que el registro no esté borrado lógicamente
    const movimiento = await this.findOne(id);

    if (dto.idTipoMovimiento) {
      const tipoMovimiento = await this.tipoRepo.findOne({
        where: { idTipoMovimiento: dto.idTipoMovimiento },
      });
      if (!tipoMovimiento)
        throw new NotFoundException('Tipo de movimiento no encontrado');
      movimiento.tipoMovimiento = tipoMovimiento;
    }

    if (dto.idInventario) {
      const inventario = await this.inventarioRepo.findOne({
        where: { idInventario: dto.idInventario },
      });
      if (!inventario) throw new NotFoundException('Inventario no encontrado');
      movimiento.inventario = inventario;
    }

    if (dto.cantidadM !== undefined) {
      movimiento.cantidadM = dto.cantidadM;
    }

    return this.movimientoRepo.save(movimiento);
  }

  /**
   * Realiza un borrado lógico del movimiento.
   * TypeORM establecerá la fecha actual en la columna `deletedAt`.
   */
  async remove(id: number): Promise<void> {
    const movimiento = await this.findOne(id);
    await this.movimientoRepo.softRemove(movimiento); // Usar softRemove es más explícito
  }

  /**
   * Restaura un movimiento que fue borrado lógicamente.
   * TypeORM establecerá la columna `deletedAt` a NULL.
   */
  async restore(id: number): Promise<void> {
    const result = await this.movimientoRepo.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException('Movimiento no encontrado para restaurar');
    }
  }
}
