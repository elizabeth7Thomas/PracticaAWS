import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, MaxLength } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateClienteDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly apellido: string;

    @MaxLength(8, { message: 'NIT: max 8 caracteres o CF'})
    readonly nit: string;

    @IsString()
    readonly direccion: string;

    @IsString()
    @MaxLength(10, {message: 'Ingrese un numero valido'})
    readonly telefono: string;

    @IsBoolean()
    readonly mayorista: boolean;

    @IsBoolean()
    readonly estadoCliente: boolean;

    @IsNumber()
    readonly idMunicipio: number;

}
