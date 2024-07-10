import { Args, Mutation,Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Book } from '../../libs/dto/book/book';
import { BookInput } from '../../libs/dto/book/book.input';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Resolver()
export class BookResolver {
    constructor(private readonly bookService: BookService) {}

    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation(() => Book)
    public async createBook(
        @Args('input') input: BookInput,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Book> {
        console.log('Mutation: createBook');
        input.memberId = memberId;
        return await this.bookService.createBook(input);
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Book)
    public async getBook(
        @Args('bookId') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Book> {
        console.log('Query: getBook');
        const bookId = shapeIntoMongoObjectId(input);
        return await this.bookService.getBook(memberId, bookId);
    }
}
