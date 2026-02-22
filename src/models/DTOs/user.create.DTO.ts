import { IsString,IsEmail, IsNotEmpty, MinLength, IsNumber } from "class-validator";

export class UserCreateDTO {

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsNumber()
    @IsNotEmpty()
    roleId!: number;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string;
}