import { PartialType } from '@nestjs/swagger';
import { CreateClienteDto } from './create-cliente.dto';
import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password?: string;

  @IsOptional()
  @IsBoolean()
  estadoUsuario?: boolean;

  @IsOptional()
  @IsNumber()
  idRol?: number;
}

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsOptional()
  @IsNumber()
  idMunicipio?: number;

  @IsOptional()
  @IsBoolean()
  mayorista?: boolean;

  @IsOptional()
  usuario?: UpdateUsuarioDto;
}
