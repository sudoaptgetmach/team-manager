import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    create(@Body() createUserDto: CreateUserDto) {
      return this.authService.create(createUserDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

}