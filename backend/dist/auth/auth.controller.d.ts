import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        message: string;
    } | undefined>;
}
