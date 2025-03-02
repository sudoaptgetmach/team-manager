import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Department } from 'src/departments/entities/department.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import jwtConfig from './config/jwt.config';
import { LoginDto } from './dto/login.dto';
import { HashingService } from './hash/hashing.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly departmentRepository;
    private readonly hashingService;
    private readonly jwtConfiguration;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, departmentRepository: Repository<Department>, hashingService: HashingService, jwtConfiguration: ConfigType<typeof jwtConfig>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        message: string;
    } | undefined>;
}
