import { Injectable } from '@nestjs/common';
import * as bycrpt from 'bcryptjs';

@Injectable()
export class AuthService {
    public async hashPassword(memberPassword: string): Promise<string> {
        const salt = await bycrpt.genSalt();
        return await bycrpt.hash(memberPassword, salt);
    }

    public async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bycrpt.compare(password, hashedPassword);
    }
}
