import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import {  NotificationStatus } from '../../enums/notification.enum';
import { Field, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
@InputType()
export class NotificationUpdate {
    @IsNotEmpty()
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
    @Field(() => NotificationStatus, { nullable: true })
	notificationStatus?: NotificationStatus


}


