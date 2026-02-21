import { IsString,IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserCreateDTO {

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string;
}