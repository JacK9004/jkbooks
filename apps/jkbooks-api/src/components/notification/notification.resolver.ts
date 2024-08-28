import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { NotificationDto, Notifications } from '../../libs/dto/notification/notification';
import { WithoutGuard } from '../auth/guards/without.guard';
import { NotificationUpdate } from '../../libs/dto/notification/notification.update';
import { NotificationsInquiry } from '../../libs/dto/notification/notification.input';


@Resolver()
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}
	@UseGuards(WithoutGuard)
	@Query(() => NotificationDto)
	public async getNotification(
		@Args('notificationId') input: string,
		@AuthMember('_id') authorId: ObjectId,
	): Promise<NotificationDto> {
		console.log('Query => getNotification');
		const notificationId = shapeIntoMongoObjectId(input);
		return await this.notificationService.getNotification(authorId, notificationId);
	}

	@UseGuards(WithoutGuard)
	@Mutation(() => NotificationDto )
	public async updateNotification(
		@Args('input') input: NotificationUpdate,
		@AuthMember('_id') authorId: ObjectId,
	): Promise<NotificationDto> {
		console.log('Mutation: updateNotification');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.notificationService.updateNotification(authorId, input);
	}

	@UseGuards(WithoutGuard)
	@Query((returns) => Notifications)
	public async getNotifications(
		@Args('input') input: NotificationsInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notifications> {
		console.log('Query: getNotifications');
		return await this.notificationService.getNotifications(memberId, input);
	}

}
