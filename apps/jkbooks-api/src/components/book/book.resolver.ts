import { Args, Mutation,Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Book, Books } from '../../libs/dto/book/book';
import { AgentBooksInquiry, BookInput, BooksInquiry } from '../../libs/dto/book/book.input';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { BookUpdate } from '../../libs/dto/book/book.update';

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

    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation(() => Book)
    public async updateBook(
        @Args('input') input: BookUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Book> {
        console.log('Mutation: updateBook');
        input._id = shapeIntoMongoObjectId(input._id);
        return await this.bookService.updateBook(memberId, input);
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Books)
    public async getBooks(
        @Args('input') input: BooksInquiry,
        @AuthMember('_id') memberId: ObjectId,        
    ): Promise<Books> {
        console.log('Query: getBooks');
        return await this.bookService.getBooks(memberId, input);
    }


    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Query((returns) => Books)
    public async getAgentBooks(
        @Args('input') input: AgentBooksInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Books> {
        console.log('Query: getAgentBooks');
        return await this.bookService.getAgentBooks(memberId, input);
    }

}
