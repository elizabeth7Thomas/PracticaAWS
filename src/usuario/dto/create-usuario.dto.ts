import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNumber()
    readonly idRol: number = 1;

    @IsOptional() //etiqueta importante
    @IsBoolean()
    readonly estadoUsuario?: boolean;

    /*@IsString()
    readonly createdAt: string;

    @IsString()
    readonly updatedAt: string;*/
}
