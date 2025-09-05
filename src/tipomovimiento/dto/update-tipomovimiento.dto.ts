import { PartialType } from '@nestjs/swagger';
import { CreateTipomovimientoDto } from './create-tipomovimiento.dto';

export class UpdateTipomovimientoDto extends PartialType(CreateTipomovimientoDto) {}
