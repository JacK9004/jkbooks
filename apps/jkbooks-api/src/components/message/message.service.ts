import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { Messages } from '../../libs/dto/send-message/message';
import { MemberService } from '../member/member.service';
import { NotificationService } from '../notification/notification.service';
import { MessageInput } from '../../libs/dto/send-message/message.input';
import { NotificationInput } from '../../libs/dto/notification/notification.input';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../libs/enums/notification.enum';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { Message } from '../../libs/enums/common.enum';
import { Book } from '../../libs/dto/book/book';

@Injectable()
export class MessageService {
	constructor(
		@InjectModel('Message') private readonly messageModel: Model<Messages>,
		@InjectModel('Book') private readonly bookModel: Model<Book>,

		private notificationService: NotificationService,
	) {}

	public async createMessage(memberId: ObjectId, input: MessageInput): Promise<Messages> {
		input.memberId = memberId;
		try {
			const result = await this.messageModel.create(input);

			const book = await this.bookModel.findOne({ _id: input.bookId }).exec();
			if (!book) throw new NotFoundException('Book not found');
			const bookId = shapeIntoMongoObjectId(input.bookId);
			const notificationInput: NotificationInput = {
				notificationType: NotificationType.MESSAGE,
				notificationStatus: NotificationStatus.WAIT,
				notificationGroup: NotificationGroup.BOOK,
				notificationTitle: 'New Message',
				notificationDesc: `
                  You have a new message regarding your book ${book.bookTitle}:
                  Name: ${input.name}
                  Email: ${input.email}
                  Phone: ${input.phone}
                  Message: ${input.message}
                `,
				authorId: memberId,
				receiverId: book.memberId,
				bookId: bookId,
			};

			await this.notificationService.createNotification(notificationInput);
			return result;
		} catch (err) {
			console.log('Error service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}
}
