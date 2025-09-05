import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateClienteDto } from "src/cliente/dto/create-cliente.dto";
import { CreateUsuarioDto } from "src/usuario/dto/create-usuario.dto";

export class CreateUsuarioClienteDto {
    @ValidateNested()
    @Type(() => CreateUsuarioDto)
    usuario: CreateUsuarioDto;

    @ValidateNested()
    @Type(() => CreateClienteDto)
    cliente: CreateClienteDto;
}