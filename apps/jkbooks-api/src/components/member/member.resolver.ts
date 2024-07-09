import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) {}

    @Mutation(() => Member)   
    public async signup(@Args('input') input: MemberInput): Promise<Member> {
        console.log('Mutation: signup');
        return this.memberService.signup(input);        
    }       

    @Mutation(() => Member)    
    public async login(@Args('input') input: LoginInput): Promise<Member> {
        console.log('Mutation: login');
        return this.memberService.login(input);
    }

    //Authentication
    @UseGuards(AuthGuard)
    @Mutation(() => String)
    public async updateMember(@AuthMember('_id') memberId: ObjectId): Promise<string> {
        console.log('Mutation: updateMember');
        console.log(typeof memberId);
        console.log(memberId);
        return this.memberService.updateMember();
    }

    //Example for chackAuth
    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
        console.log('Query: getMember');
        console.log("memberNick: ", memberNick);
        return `Hi ${memberNick}`;
    }

    @Roles(MemberType.USER, MemberType.AGENT)
    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuthRoles(@AuthMember() authMember: Member): Promise<string> {
        console.log('Query: checkAuthRoles');       
        return `Hi ${authMember.memberNick}, you are ${authMember.memberType} (memberId: ${authMember._id})`;
    }

    @Query(() => String)
    public async getMember(): Promise<string> {
        console.log('Query: getMember');
        return this.memberService.getMember();
    }

    //Authoreization: ADMIN
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async getAllMembersByAdmin(): Promise<string> {       ;
        return this.memberService.getAllMembersByAdmin();
    }

    //Authorization: ADMIN
    @Mutation(() => String)
    public async updateMemberByAdmin(): Promise<string> {
        console.log('Mutation: updateMemberByAdmin');
        return this.memberService.updateMemberByAdmin();
    }
}
