import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDTO{
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string;
}