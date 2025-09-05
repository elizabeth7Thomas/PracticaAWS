import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CrearCategoriaDto } from './dto/create-categoria.dto';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';

@ApiTags('Categorías')
@ApiBearerAuth('access-token')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post('/crear')
  @ApiOperation({
    summary: 'Crear una nueva categoría',
    description: 'Este endpoint permite crear una nueva categoría.',
  })
  @ApiBody({ type: CrearCategoriaDto })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada con éxito.',
    type: Categoria,
  })
  async create(
    @Body() crearCategoriaDto: CrearCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriaService.create(crearCategoriaDto);
  }

  @Get('/listar')
  @ApiOperation({ summary: 'Listar todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías obtenida con éxito.',
    type: [Categoria],
  })
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }



}
