import { Field, ObjectType } from '@nestjs/graphql';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';
import { ObjectId } from 'mongoose';
import { Member, TotalCounter } from '../member/member';

@ObjectType()
export class NotificationDto {

	@Field(() => String)
	_id: ObjectId;

	@Field(() => NotificationType , { nullable: true })
	notificationType?: NotificationType;

	@Field(() => NotificationStatus , { nullable: true })
	notificationStatus?: NotificationStatus

	@Field(() => NotificationGroup , { nullable: true })
	notificationGroup?: NotificationGroup;

	@Field()
	notificationTitle: string;

	@Field()
	notificationDesc: string;

	@Field()
	authorId: string;

	@Field()
	receiverId: string;

	@Field(() => String, { nullable: true })
	propertyId?: string;

	@Field(() => String, { nullable: true })
	articleId?: string;

	@Field(() => Member, { nullable: true })
	memberData?: Member;
}


@ObjectType()
export class Notifications {
	@Field(() => [NotificationDto])
	list: NotificationDto[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}