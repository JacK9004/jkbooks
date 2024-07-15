import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'apps/jkbooks-api/src/libs/dto/member/member';
import { Book } from 'apps/jkbooks-api/src/libs/dto/book/book';
import { MemberStatus, MemberType } from 'apps/jkbooks-api/src/libs/enums/member.enum';
import { BookStatus } from 'apps/jkbooks-api/src/libs/enums/book.enum';
import { Model } from 'mongoose';

@Injectable()
export class BatchService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
    @InjectModel('Member') private readonly memberModel: Model<Member>,
    ) {}

  public async batchRollback(): Promise<void> {
    await this.bookModel
        .updateMany(
          {
            bookStatus: BookStatus.AVAILABLE,
          },
          {bookRank: 0 },
        )
        .exec();

      await this.memberModel
        .updateMany(
          {
            memberStatus: MemberStatus.ACTIVE,
            memberType: MemberType.AGENT,
          },
          {memberRank: 0 },
        )
       .exec();
  }
  public async batchTopBooks(): Promise<void> {
   const books: Book[] = await this.bookModel
        .find({
          bookStatus: BookStatus.AVAILABLE,
          bookRank: 0,
        })
        .exec();

    const promisedList = books.map(async (ele: Book) => {
      const { _id, bookLikes, bookViews } = ele;
      const rank = bookLikes * 2 + bookViews * 1;
      return await this.bookModel.findByIdAndUpdate(_id, {bookRank: rank });
    });
    await Promise.all(promisedList);
  }
  public async batchTopPublishers(): Promise<void> {
    const agents: Member[] = await this.memberModel
     .find({
        memberType: MemberType.AGENT,  
        memberStatus: MemberStatus.ACTIVE,        
        memberRank: 0,
      })
     .exec();

    const promisedList = agents.map(async (ele: Member) => {
      const { _id, memberBooks, memberLikes, memberArticles, memberViews } = ele;
      const rank = memberBooks * 5 + memberArticles * 3 + memberLikes * 2 + memberViews * 1;
      return await this.memberModel.findByIdAndUpdate(_id, { memberRank: rank });
    });
    await Promise.all(promisedList);
  }
  public getHello(): string {
    return 'Welcome to NESTAR BATCH Server!';
  }
}
