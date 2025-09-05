import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { IsNull } from "typeorm";

export class CreateMunicipioDto {
    @IsNotEmpty()
    @IsString()
    readonly nombreM: string;

    @IsNotEmpty()
    @IsNumber()
    readonly idDepartamento: number;
}
