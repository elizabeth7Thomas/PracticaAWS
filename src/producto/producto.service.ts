import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Repository } from 'typeorm';
import { CrearProductoDto } from './dto/crear-producto.dto';
import {  ActualizarProductoDto } from './dto/actualizar-productdo.dt';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async createProducto(crearProductoDto: CrearProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(crearProductoDto);
    return this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    const productosStock = await this.productoRepository
      .createQueryBuilder('producto')
      .leftJoin('producto.inventarios', 'inventario')
      .select([
        'producto.idProducto AS idProducto',
        'producto.nombreP AS nombreP',
        'producto.precio AS precio',
        'producto.imagen AS imagen',
        'producto.precioCompra AS precioCompra',
        'SUM(inventario.cantidad) AS stockActual',
      ])
      .where('inventario.cantidad > 0')
      .andWhere('inventario.estadoInventario = true')
      .andWhere('inventario.fechaCaducidad > NOW()')
      .andWhere('producto.estadoProducto = true')
      .groupBy('producto.idProducto')
      .addGroupBy('producto.nombreP')
      .addGroupBy('producto.precio')
      .addGroupBy('producto.precioCompra')
      .addGroupBy('producto.imagen')
      .getRawMany();

    return productosStock;
  }

  async findAllSingle(): Promise<Producto[]> {
    const productos = await this.productoRepository
      .createQueryBuilder('producto')
      .select([
        'producto.idProducto AS idProducto',
        'producto.nombreP AS nombreP'
      ])
      .where('producto.estadoProducto = true')
      .getRawMany();

    return productos;
  }

  async findAllCategory(categoriaId): Promise<Producto[]> {
    const productosStock = await this.productoRepository
      .createQueryBuilder('producto')
      .innerJoin('producto.inventarios', 'inventario')
      .where('inventario.cantidad > 0')
      .andWhere('inventario.estadoInventario = true')
      .andWhere('inventario.fechaCaducidad > NOW()')
      .andWhere('producto.estadoProducto = true')
      .innerJoin('producto.categoria', 'categoria')
      .andWhere('categoria.idCategoria = :idCategoria', {
        idCategoria: categoriaId,
      })
      .getMany();

    return productosStock;
  }

  async findOne(idProducto: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: idProducto },
    });
    if (producto == null) {
      throw new InternalServerErrorException(
        `Producto con id ${idProducto} no encontrado`,
      );
    }
    return producto;
  }

  async updateProducto(
    idProducto: number,
    actualizarProductoDto: ActualizarProductoDto,
  ) {
    const result = await this.productoRepository.update(
      { idProducto },
      actualizarProductoDto,
    );

    if (result.affected === 0) {
      throw new InternalServerErrorException(
        `Producto con id ${idProducto} no encontrado`,
      );
    }

    return result;
  }
}
