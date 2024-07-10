import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Book } from '../../libs/dto/book/book';
import { MemberService } from '../member/member.service';
import { BookInput } from '../../libs/dto/book/book.input';
import { Message } from '../../libs/enums/common.enum';
import { ViewService } from '../view/view.service';
import { StatisticModifier, T } from '../../libs/types/common';
import { BookStatus } from '../../libs/enums/book.enum';
import { ViewGroup } from '../../libs/enums/view.enum';
import * as moment from 'moment';
import { BookUpdate } from '../../libs/dto/book/book.update';

@Injectable()
export class BookService {
    constructor(
        @InjectModel('Book') private readonly bookModel: Model<Book>,
        private memberService: MemberService,
        private viewService: ViewService,    
) {}

public async createBook(input: BookInput): Promise<Book> {
    try {
        const result = await this.bookModel.create(input);
        await this.memberService.memberStatsEditor({
            _id: result.memberId,
            targetKey: 'memberBooks',
            modifier: 1,
        });
        return result;
    } catch (err) {
        console.log('Error, Service.model:', err.message);
        throw new BadRequestException(Message.CREATE_FAILED);
    }
}

public async getBook(memberId: ObjectId, bookId: ObjectId): Promise<Book> {
    const search: T = {
        _id: bookId,
        bookStatus: BookStatus.AVAILABLE,
    };

    const targetBook: Book = await this.bookModel.findOne(search).lean().exec();
    if (!targetBook) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

    if (memberId) {
        const viewInput = { memberId: memberId, viewRefId: bookId, viewGroup: ViewGroup.BOOK };
        const newView = await this.viewService.recordView(viewInput);
        if (newView) {
            await this.bookStatsEditor({ _id: bookId, targetKey: 'bookViews', modifier: 1});
            targetBook.bookViews++;
        }

        // meLiked
    }

    targetBook.memberData = await this.memberService.getMember(null, targetBook.memberId);
    return targetBook;
}

public async bookStatsEditor(input: StatisticModifier): Promise<Book> {
    const { _id, targetKey, modifier } = input;
    return await this.bookModel
        .findByIdAndUpdate(
            _id,
            { $inc: { [targetKey]: modifier } },
            {
                new: true,
            },
        )
        .exec();
}

public async updateBook(memberId: ObjectId, input: BookUpdate): Promise<Book> {
    let { bookStatus, soldAt, deletedAt } = input;
    const search: T = {
        _id: input._id,
        memberId: memberId,
        bookStatus: BookStatus.AVAILABLE,
    };

    if (bookStatus === BookStatus.SOLD_OUT) soldAt = moment().toDate();
    else if (bookStatus === BookStatus.DISCONTINUED) deletedAt = moment().toDate();

    const result = await this.bookModel
        .findOneAndUpdate(search, input, {
            new: true,
        })
        .exec();
    if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

    if (soldAt || deletedAt) {
        await this.memberService.memberStatsEditor({
            _id: memberId,
            targetKey:'memberBooks',
            modifier: -1,
        });
    }

    return result;
}


}
