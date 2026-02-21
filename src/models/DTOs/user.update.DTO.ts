import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UserUpdateDTO {

    @IsString()
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

}