import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRolDto {
    @IsNotEmpty()
    @IsString()
    readonly nombreR: string;

    @IsString()
    @MaxLength(255)
    readonly descripcion: string;
}
