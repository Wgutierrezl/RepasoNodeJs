import { IHasherService } from "./hasher.service.interface";
import bcrypt from "bcrypt";

export class HasherService implements IHasherService{

    hashPassword(password: string): string {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds);

    }
    comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
    
}