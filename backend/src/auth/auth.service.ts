import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashingService } from "./hash/hashing.service";
import jwtConfig from "./config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Department } from "src/departments/entities/department.entity";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User)
                private readonly userRepository: Repository<User>,
                @InjectRepository(Department)
                private readonly departmentRepository: Repository<Department>,
                private readonly hashingService: HashingService,
                @Inject(jwtConfig.KEY)
                private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
                private readonly jwtService: JwtService){
                }

    async create(createUserDto: CreateUserDto) {
        const { name, email, password, departmentId } = createUserDto;
      
        const department = await this.departmentRepository.findOne({ where: { id: departmentId } });
        if (!department) {
          throw new NotFoundException(`Department with ID ${departmentId} not found`);
        }
    
        const passwordHash = await this.hashingService.hash(
          createUserDto.password
        );
      
        const newUser = this.userRepository.create({
          name,
          email,
          password: passwordHash,
          department,
        });
      
        try {
          await this.userRepository.save(newUser);
          return newUser;
        } catch (error) {
          if (error.code === '23505') {
            throw new ConflictException('Email already exists');
          }
          throw error;
        }
      }

    async login(loginDto: LoginDto) {
        let validPassword = false;
        let throwError = true;

        const user = await this.userRepository.findOneBy({ 
            email: loginDto.email
        });

        if (user) {
            validPassword = await this.hashingService.compare(
                loginDto.password,
                user.password
            );
        }

        if (validPassword) {
            throwError = false;

            const accessToken = await this.jwtService.signAsync(
                {
                    sub: user?.id,
                },
                {
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuer,
                    secret: this.jwtConfiguration.secret,
                    expiresIn: this.jwtConfiguration.ttl
                }
            )

            return {
                message: `Usuário logado com sucesso.
                          Token: ${accessToken}`,
            };
        }

        if (throwError) {
            throw new UnauthorizedException('Invalid user or password.');
        };
    }
}