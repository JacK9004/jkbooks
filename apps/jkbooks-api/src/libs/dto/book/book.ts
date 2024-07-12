import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { AgeCategory, BookCollection, BookStatus, BookType, BookLanguage } from "../../enums/book.enum";
import { Member, TotalCounter } from "../member/member";
import { MeLiked } from "../like/like";

@ObjectType()
export class Book {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => BookType)
    bookType: BookType;

    @Field(() => BookStatus)
    bookStatus: BookStatus;

    @Field(() => BookCollection)
    bookCollection: BookCollection;

    @Field(() => AgeCategory, { nullable: true })
    ageCategory?: AgeCategory;

    @Field(() => String)
    bookTitle: string;

    @Field(() => String)
    bookAuthor: string;

    @Field(() => Int)
    bookPrice: number;

    @Field(() => String)
    bookDate: string;

    @Field(() => String)
    bookISBN: string;

    @Field(() => Int)
    bookPages: number;

    @Field(() => [String])
    bookLanguages: string[];

    @Field(() => Int)
    bookViews: number;

    @Field(() => Int)
    bookLikes: number;

    @Field(() => Int)
    bookComments: number;

    @Field(() => Int)
    bookRank: number;

    @Field(() => [String])
    bookImages: string[];

    @Field(() => String, { nullable: true })
    bookDesc?: string;

    @Field(() => Boolean)
    bookRent: boolean;

    @Field(() => String)
    memberId: ObjectId;

    @Field(() => Date, { nullable: true })
    soldAt?: Date;

    @Field(() => Date, { nullable: true })
    deletedAt?: Date;

    @Field(() => Date, { nullable: true })
    discontinuedAt?: Date;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    /** from aggregation **/

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[];

    @Field(() => Member, { nullable: true })
    memberData?: Member;
  }

  @ObjectType()
export class Books {
    @Field(() => [Book])
    list: Book[];

    @Field(() => [TotalCounter], { nullable: true })
    metaCounter: TotalCounter[];
}