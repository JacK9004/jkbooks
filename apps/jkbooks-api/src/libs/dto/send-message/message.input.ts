import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
@InputType()
export class MessageInput {
	@IsNotEmpty()
	@Field(() => String)
	name: string;

	@IsNotEmpty()
	@Field(() => String)
	phone: string;

	@IsNotEmpty()
	@Field(() => String)
	email: string;

	@IsNotEmpty()
	@Field(() => String)
	message: string;

	@IsNotEmpty()
	@Field(() => String)
	bookId: string;

	memberId: ObjectId;
}
