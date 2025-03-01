export declare class BCryptService {
    hash(password: string): Promise<String>;
    compare(password: string, passwordHash: string): Promise<Boolean>;
}
