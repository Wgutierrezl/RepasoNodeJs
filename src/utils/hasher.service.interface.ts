export interface IHasherService {
    hashPassword(password: string) : string;
    comparePassword(password: string, hashedPassword: string) : Promise<boolean>;
}