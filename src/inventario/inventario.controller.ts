import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CrearInventarioDto } from './dto/crear-inventario.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Inventario')
@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get('/listar')
  @ApiOperation({ summary: 'Listar todos los registros de inventario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de inventario obtenida correctamente',
  })
  findAll() {
    return this.inventarioService.findAll();
  }

  @Get('/buscar/:id')
  @ApiOperation({ summary: 'Buscar un inventario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Inventario encontrado' })
  @ApiResponse({ status: 404, description: 'Inventario no encontrado' })
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
  }

  @Post('/crear')
  @ApiOperation({ summary: 'Crear un nuevo registro de inventario' })
  @ApiBody({ type: CrearInventarioDto })
  @ApiResponse({ status: 201, description: 'Inventario creado exitosamente' })
  create(@Body() dto: CrearInventarioDto) {
    return this.inventarioService.create(dto);
  }

  @Patch('/editar/:id')
  @ApiOperation({ summary: 'Editar un inventario existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CrearInventarioDto })
  @ApiResponse({ status: 200, description: 'Inventario actualizado' })
  @ApiResponse({ status: 404, description: 'Inventario no encontrado' })
  update(@Param('id') id: string, @Body() dto: Partial<CrearInventarioDto>) {
    return this.inventarioService.update(+id, dto);
  }

  @Delete('/eliminar/:id')
  @ApiOperation({ summary: 'Eliminar un inventario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Inventario eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Inventario no encontrado' })
  remove(@Param('id') id: string) {
    return this.inventarioService.remove(+id);
  }

  @Get('/reportes/vencidos')
  @ApiOperation({
    summary: 'Listar todos los inventarios con productos vencidos',
  })
  @ApiResponse({ status: 200, description: 'Reporte obtenido correctamente' })
  findAllVencidos() {
    return this.inventarioService.findInventariosVencidos();
  }

  @Get('/reportes/stock-disponible')
  @ApiOperation({ summary: 'Listar el stock de todos los productos ' })
  @ApiResponse({ status: 200, description: 'Reporte obtenido correctamente' })
  findStock() {
    return this.inventarioService.findStock();
  }

  @Get('/por-producto/:idProducto')
  @ApiOperation({ summary: 'Listar todos los inventarios activos de un producto' })
  @ApiResponse({ status: 200, description: 'Inventarios encotrados correctamente' })
  @ApiResponse({ status: 404, description: 'No se encontraron inventarios para el producto' })
  @ApiParam({ name: 'idProducto', type: Number })
  findInventariosPorProducto(@Param('idProducto') idProducto: number) {
    return this.inventarioService.findInventariosPorProducto(idProducto);
  }
}
