import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Book, Books } from '../../libs/dto/book/book';
import { MemberService } from '../member/member.service';
import { AgentBooksInquiry, AllBooksInquiry, BookInput, BooksInquiry } from '../../libs/dto/book/book.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { ViewService } from '../view/view.service';
import { StatisticModifier, T } from '../../libs/types/common';
import { BookStatus } from '../../libs/enums/book.enum';
import { ViewGroup } from '../../libs/enums/view.enum';
import * as moment from 'moment';
import { BookUpdate } from '../../libs/dto/book/book.update';
import { lookupMember, shapeIntoMongoObjectId } from '../../libs/config';
import { LikeService } from '../like/like.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';

@Injectable()
export class BookService {
    constructor(
        @InjectModel('Book') private readonly bookModel: Model<Book>,
        private memberService: MemberService,
        private viewService: ViewService,
        private likeService: LikeService,      
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


public async getBooks(memberId: ObjectId, input: BooksInquiry): Promise<Books> {
    const match: T = { bookStatus: BookStatus.AVAILABLE };
    const sort: T = { [ input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };
   
    this.shapeMatchQuery(match, input);
    console.log('match:', match);

    const result = await this.bookModel
        .aggregate([
            { $match: match },
            { $sort: sort },
            {
                $facet: {
                    list: [
                        { $skip: (input.page - 1) * input.limit },
                        { $limit: input.limit },
                        // meLiked
                        lookupMember,
                        { $unwind: '$memberData' },
                    ],
                    metaCounter: [{ $count: 'total' }],
                },
            },
        ])
        .exec();
        if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        return result[0];
}
private shapeMatchQuery(match: T, input: BooksInquiry): void {
    const {
        memberId,
        collectionList,
        titleList,
        authorList,
        typeList,
        languageList,
        periodsRange,
        pricesRange,
        options,
        text,
    } = input.search;
    if (memberId) match.memberId = shapeIntoMongoObjectId(memberId);
    if (collectionList) match.bookCollection = { $in: collectionList };
    if (titleList) match.bookTitle = { $in: titleList };
    if (authorList) match.bookAuthor = { $in: authorList };
    if (typeList) match.bookType = { $in: typeList };
    if (languageList) match.bookLanguages = { $in: languageList };

    if (pricesRange) match.bookPrice = { $gte: pricesRange.start, $lte: pricesRange.end };
    if (periodsRange) match.createdAt = { $gte: periodsRange.start, $lte: periodsRange.end };

    if (text) match.bookTitle = { $regex: new RegExp(text, 'i') };
    if (options) {
        match['$or'] = options.map((ele) => {
            return { [ele]: true };
        });
    }
}

public async getAgentBooks(memberId: ObjectId, input: AgentBooksInquiry): Promise<Books> {
    const { bookStatus } = input.search;
    if (bookStatus === BookStatus.DISCONTINUED) throw new BadRequestException(Message.NOT_ALLOWD_REQUEST);

    const match: T = {
        memberId: memberId,
        bookStatus: bookStatus ?? { $ne: BookStatus.DISCONTINUED},
    };

    const sort: T = {[ input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC};

    const result = await this.bookModel.
        aggregate([
            { $match: match},
            { $sort: sort},
            {
                $facet: {
                    list: [
                        { $skip: (input.page - 1) * input.limit},
                        { $limit: input.limit },
                        lookupMember,
                        { $unwind: '$memberData' },
                    ],
                    metaCounter: [{ $count: 'total' }],
                },
            },

        ])
        .exec()
        if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        return result[0];
}

     //Likes
     public async likeTargetMember(memberId: ObjectId, likeRefId: ObjectId): Promise<Book> {
        const target: Book = await this.bookModel.findOne({ _id: likeRefId, bookStatus: BookStatus.AVAILABLE }).exec();
        if (!target) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        const input: LikeInput = {
            memberId: memberId,
            likeRefId: likeRefId,
            likeGroup: LikeGroup.BOOK,
        };

        // LIKE TOGGLE via like modules
        const modifier: number = await this.likeService.toggleLike(input);
        const result = await this.bookStatsEditor({ _id: likeRefId, targetKey: 'bookLikes', modifier: modifier });

        if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
        return result;
    }

public async getAllBooksByAdmin(input: AllBooksInquiry): Promise<Books> {
    const { bookStatus, bookCollectionList } = input.search;
    const match: T = {};
    const sort: T = {[input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

    if (bookStatus) match.bookStatus = bookStatus;
    if (bookCollectionList) match.bookCollection = { $in: bookCollectionList };

    const result = await this.bookModel
         .aggregate([
            { $match: match},
            { $sort: sort},
            {
                $facet: {
                    list: [
                        { $skip: (input.page - 1) * input.limit},
                        { $limit: input.limit },
                        lookupMember,
                        { $unwind: '$memberData' },
                    ],
                    metaCounter: [{ $count: 'total' }],
                },
            },

        ])
        .exec()
        if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        return result[0];
}

public async updateBookByAdmin(input: BookUpdate): Promise<Book> {
    let { bookStatus, soldAt, deletedAt } = input;
    const search: T = {
        _id: input._id,
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
                _id: result.memberId,
                targetKey:'memberBooks',
                modifier: -1,
            });
        }

        return result;
    }

    public async removeBookByAdmin(bookId: ObjectId): Promise<Book> {
        const search: T = { _id: bookId, bookStatus: BookStatus.DISCONTINUED };
        const result = await this.bookModel.findOneAndDelete(search).exec();
        if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);

        return result;
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

}
