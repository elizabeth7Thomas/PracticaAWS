// update-movimientoinventario.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateMovimientoinventarioDto } from './create-movimientoinventario.dto';

export class UpdateMovimientoinventarioDto extends PartialType(CreateMovimientoinventarioDto) {}
