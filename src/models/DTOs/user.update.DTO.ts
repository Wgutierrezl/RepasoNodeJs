import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UserUpdateDTO {

    @IsString()
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsNumber()
    @IsOptional()
    roleId?: number;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

}