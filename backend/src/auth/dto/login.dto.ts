import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @IsEmail()
    @IsNotEmpty({ message: "" })
    email: string;

    @IsString()
    @IsNotEmpty({ message: "" })
    password: string;

}