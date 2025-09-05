import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleCompra } from './detalle-compra.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleCompraService {
  constructor(
    @InjectRepository(DetalleCompra)
    private detalleCompraRepository: Repository<DetalleCompra>,
  ) {}

  async findDetallesFactura(idCompra: number): Promise<DetalleCompra[]> {
    const detalles = await this.detalleCompraRepository.findBy({
      idCompra: idCompra,
    });

    if (!detalles) {
      throw new InternalServerErrorException(
        `No se encontraron detalles de compra para la compra con ID ${idCompra}`,
      );
    }
    return detalles;
  }
}
