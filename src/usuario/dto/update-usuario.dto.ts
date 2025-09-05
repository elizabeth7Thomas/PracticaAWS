import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

/*export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsString()
    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsOptional()
    @IsString()
    readonly password: string;

    @IsOptional()
    @IsBoolean()
    readonly estadoUsuario?: boolean;

    @IsOptional()
    @IsNumber()
    readonly idRol: number;
}*/

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsString()
  readonly apellido?: string;

  @IsOptional()
  @IsString()
  readonly nit?: string;

  @IsOptional()
  @IsString()
  readonly direccion?: string;

  @IsOptional()
  @IsString()
  readonly telefono?: string;

  @IsOptional()
  @IsBoolean()
  readonly mayorista?: boolean;

  @IsOptional()
  @IsNumber()
  readonly idMunicipio?: number;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsBoolean()
  readonly estadoUsuario?: boolean;

  @IsOptional()
  @IsNumber()
  readonly idRol?: number;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  readonly password?: string;
}
