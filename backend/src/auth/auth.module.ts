import { Global, Module } from "@nestjs/common";
import { HashingService } from "./hash/hashing.service";
import { BCryptService } from "./hash/bcrypt.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import jwtConfig from "./config/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { DepartmentsService } from "src/departments/departments.service";
import { Department } from "src/departments/entities/department.entity";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User, Department]), 
              ConfigModule.forFeature(jwtConfig),
              JwtModule.registerAsync(jwtConfig.asProvider())],
    controllers: [AuthController],
    providers: [
       {
          provide: HashingService,
          useClass: BCryptService
       },
       AuthService,
       DepartmentsService
    ],
    exports: [HashingService, AuthService, JwtModule, ConfigModule],
})
export class AuthModule {}