import { UUID } from "crypto";

export class TokenPayloadDto {
    sub: UUID;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
}