import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../../libs/dto/book/book';
import { MemberService } from '../member/member.service';
import { BookInput } from '../../libs/dto/book/book.input';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class BookService {
    constructor(
        @InjectModel('Book') private readonly bookModel: Model<Book>,
        private memberService: MemberService,    
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
}
