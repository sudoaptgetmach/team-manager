import { HashingService } from "./hashing.service";
import * as bcrypt from 'bcryptjs';

export class BCryptService {
    async hash(password: string): Promise<String> {
        const salt = await bcrypt.genSalt();

        return bcrypt.hash(password, salt);
    }
    async compare(password: string, passwordHash: string): Promise<Boolean> {
        return bcrypt.compare(password, passwordHash);
    }
}