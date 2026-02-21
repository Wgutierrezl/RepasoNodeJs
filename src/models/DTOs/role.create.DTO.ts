import { IsString,IsNotEmpty, IsOptional } from "class-validator";

export class CreateRoleDTO{
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    description?: string;
}