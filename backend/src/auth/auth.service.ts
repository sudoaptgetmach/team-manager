import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/departments/entities/department.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import jwtConfig from './config/jwt.config';
import { LoginDto } from './dto/login.dto';
import { HashingService } from './hash/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, departmentId } = createUserDto;

    let department: Department | undefined = undefined;
    if (departmentId) {
      const foundDepartment = await this.departmentRepository.findOne({
        where: { id: departmentId },
      });
      if (!foundDepartment) {
        throw new NotFoundException(
          `Department with ID ${departmentId} not found`,
        );
      }
      department = foundDepartment;
    } else {
      const foundDepartment = await this.departmentRepository.findOne({
        where: { name: 'Placeholder' },
      });
      department = foundDepartment ?? undefined;
      if (!department) {
        throw new NotFoundException('Placeholder department not found');
      }
    }

    const passwordHash = await this.hashingService.hash(password);

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
      email: loginDto.email,
    });

    if (user) {
      validPassword = await this.hashingService.compare(
        loginDto.password,
        user.password,
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
          expiresIn: this.jwtConfiguration.ttl,
        },
      );

      return {
        message: `Usuário logado com sucesso.
                          Token: ${accessToken}`,
      };
    }

    if (throwError) {
      throw new UnauthorizedException('Invalid user or password.');
    }
  }
}
