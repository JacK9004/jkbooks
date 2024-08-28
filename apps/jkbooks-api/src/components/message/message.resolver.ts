import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Messages } from '../../libs/dto/send-message/message';
import { MessageInput } from '../../libs/dto/send-message/message.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';

@Resolver()
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {}
	@UseGuards(AuthGuard)
	@Mutation((returns) => Messages)
	public async createMessage(
		@Args('input') input: MessageInput,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Messages> {
		console.log('Mutation: createMessage');
		return await this.messageService.createMessage(memberId, input);
	}
}
