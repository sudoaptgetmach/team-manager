import { UUID } from "crypto";
export declare class TokenPayloadDto {
    sub: UUID;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
}
