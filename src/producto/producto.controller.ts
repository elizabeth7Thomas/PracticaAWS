import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductoService } from './producto.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Producto } from './producto.entity';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-productdo.dt';

@ApiTags('Productos')
@ApiBearerAuth('access-token')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post('/crear')
  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description: 'Este endpoint permite crear un nuevo producto.',
  })
  @ApiBody({ type: CrearProductoDto })
  @ApiResponse({
    status: 201,
    description: 'Producto creado con éxito.',
    type: Producto,
  })
  async create(@Body() crearProductoDto: CrearProductoDto): Promise<Producto> {
    return this.productoService.createProducto(crearProductoDto);
  }

  @Get('/listar')
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida con éxito.',
    type: [Producto],
  })
  findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Get('/listar/simples')
  @ApiOperation({ summary: 'Obtener todos los productos sin datos de stock' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida con éxito.',
    type: [Producto],
  })
  findAllSingle(): Promise<Producto[]> {
    return this.productoService.findAllSingle();
  }

  @Patch('/actualizar/:idProducto')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiParam({ name: 'idProducto', description: 'ID del producto' })
  @ApiBody({ type: ActualizarProductoDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado con éxito.',
    type: Producto,
  })
   @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
    type: Error,
  })
  updateProducto(
    @Param('idProducto') idProducto: number,
    @Body() actualizarProductoDto: ActualizarProductoDto,
  ) {
    return this.productoService.updateProducto(
      idProducto,
      actualizarProductoDto,
    );
  }

  @Get('/obtener/:idProducto')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiParam({ name: 'idProducto', description: 'ID del producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido con éxito.',
    type: Producto,
  })
  findOne(@Param('idProducto') idProducto: number) {
    return this.productoService.findOne(idProducto);
  }

  @Get('/listar/categoria/:idCategoria')
  @ApiOperation({ summary: 'Obtener todos los productos de cierta categoria' })
  @ApiParam({ name: 'idCategoria', description: 'ID del tipo de la categoria' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida con éxito.',
    type: [Producto],
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findAllCategory(
    @Param('idCategoria') idCategoria: string,
  ): Promise<Producto[]> {
    return this.productoService.findAllCategory(idCategoria);
  }
}
