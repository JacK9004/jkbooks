import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {
    constructor(@InjectModel('Member') private readonly memberModel: Model<null>) {}
    
    public async signup(): Promise<string> {
        console.log('Service: signup');
        return'signup executed';
    }

    public async login(): Promise<string> {
        console.log('Service: login');
        return 'login executed';
    }

    public async updateMember(): Promise<string> {
        console.log('Service: updateMember');
        return 'updateMember executed';
    }

    public async getMember(): Promise<string> {
        console.log('Service: getMember');
        return 'getMember executed';
    }
}
