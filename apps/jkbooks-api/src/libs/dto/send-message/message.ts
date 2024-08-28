import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class Messages {
@Field(() => String)
	_id: ObjectId;

	@Field(() => String)
    name: string;


	@Field(() => String)
    phone: string;


	@Field(() => String)
    email: string;


	@Field(() => String)
    message: string;


	@Field(() => String)
    bookId: string;

	@Field(() => String)
    memberId:ObjectId



}