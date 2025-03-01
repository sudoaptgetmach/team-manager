import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import jwtConfig from "../config/jwt.config";
export declare class AuthTokenGuard implements CanActivate {
    private readonly jwtService;
    private jwtConfiguration;
    constructor(jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    extractTokenFromHeader(request: Request): string | undefined;
}
