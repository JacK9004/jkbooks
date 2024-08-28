import { IsNotEmpty, IsString, IsEnum, IsOptional, Min, IsIn } from 'class-validator';
import { ObjectId } from 'mongoose';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Direction } from '../../enums/common.enum';
@InputType()
export class NotificationInput {
	@IsNotEmpty()
	@IsEnum(NotificationType)
	notificationType: NotificationType;

	@IsOptional()
	@IsEnum(NotificationStatus)
	notificationStatus: NotificationStatus

	@IsNotEmpty()
	@IsEnum(NotificationGroup)
	notificationGroup: NotificationGroup;

	@IsNotEmpty()
	@IsString()
	notificationTitle: string;

	@IsOptional()
	@IsString()
	notificationDesc?: string;

	authorId: ObjectId;


	receiverId: ObjectId;

	bookId?: ObjectId;

	articleId?: ObjectId;
}
@InputType()
class NISearch {
	@IsNotEmpty()
	@Field(() => String)
	receiverId: ObjectId;
}


@InputType()
export class NotificationsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;


	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => NISearch)
	search: NISearch;
}

