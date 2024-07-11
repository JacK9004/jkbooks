import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { AgeCategory, BookCollection, BookLanguage, BookStatus, BookType } from "../../enums/book.enum";
import { ObjectId } from "mongoose";
import { availableBookSorts, availableOptions } from "../../config";
import { Direction } from "../../enums/common.enum";



@InputType()
export class BookInput {
    @IsNotEmpty()
    @Field(() => BookType)
    bookType: BookType;

    @IsNotEmpty()
    @Field(() => BookCollection)
    bookCollection: BookCollection;

    @IsOptional()
    @Field(() => AgeCategory, { nullable: true })
    ageCategory?: AgeCategory;

    @IsNotEmpty()
    @Length(3, 100)
    @Field(() => String)
    bookTitle: string;

    @IsNotEmpty()
    @Length(3, 100)
    @Field(() => String)
    bookAuthor: string;

    @IsNotEmpty()    
    @Field(() => Int)
    bookPrice: number;

    @IsNotEmpty()    
    @Field(() => String)
    bookDate: string;

    @IsNotEmpty()
    @Length(10, 13)
    @Field(() => String)
    bookISBN: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Field(() => Int)
    bookPages: number;

    @IsNotEmpty()
    @Field(() => [BookLanguage])
    bookLanguages: BookLanguage[];

    @IsOptional()
    @Length(5, 500)
    @Field(() => String, { nullable: true })
    bookDesc?: string;

    @IsNotEmpty()
    @Field(() => [String])
    bookImages: string[];

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    bookRent?: boolean;

    memberId?: ObjectId;

    @IsOptional()
    @Field(() => Date, { nullable: true })
    discontinuedAt?: Date;
}

    @InputType()
    export class PricesRange {
        @Field(() => Int)
        start: number;

        @Field(() => Int)
        end: number;
    }

    @InputType()
    export class ISBNRange {
        @Field(() => Int)
        start: number;

        @Field(() => Int)
        end: number;
    }

    @InputType()
    export class PeriodsRange {
        @Field(() => Date)
        start: Date;

        @Field(() => Date)
        end: Date;
    }


        @InputType()
        class BISearch {
        @IsOptional()
        @Field(() => String, { nullable: true })
        memberId?: ObjectId;

        @IsOptional()
        @Field(() => [BookCollection], { nullable: true })
        collectionList?: BookCollection[];

        @IsOptional()
        @Field(() => [String], { nullable: true })
        titleList?: String[];

        @IsOptional()
        @Field(() => [String], { nullable: true })
        authorList?: String[];

        @IsOptional()
        @Field(() => [BookType], { nullable: true })
        typeList?: BookType[];

        @IsOptional()
        @Field(() => [BookLanguage], { nullable: true })
        languageList?: BookLanguage[];

        @IsOptional()
        @Field(() => PricesRange, { nullable: true })
        pricesRange?: PricesRange;

        @IsOptional()
        @Field(() => PeriodsRange, { nullable: true })
        periodsRange?: PeriodsRange;

        @IsOptional()
        @IsIn(availableOptions, { each: true })
        @Field(() => [String], { nullable: true })
        options?: string[];

        @IsOptional()
        @Field(() => String, { nullable: true })
        text?: string;
        }


    @InputType()
    export class BooksInquiry {
        @IsNotEmpty()
        @Min(1)
        @Field(() => Int)
        page: number;

        @IsNotEmpty()
        @Min(1)
        @Field(() => Int)
        limit: number;

        @IsOptional()
        @IsIn(availableBookSorts)
        @Field(() => String, { nullable: true })
        sort?: string;

        @IsOptional()   
        @Field(() => Direction, { nullable: true })
        direction?: Direction;

        @IsNotEmpty()
        @Field(() => BISearch)
        search: BISearch;
    }


    @InputType()
    class ABISearch {
        @IsOptional()
        @Field(() => BookStatus, { nullable: true })
        bookStatus?: BookStatus;
    }

    @InputType()
    export class AgentBooksInquiry {
        @IsNotEmpty()
        @Min(1)
        @Field(() => Int)
        page: number;

        @IsNotEmpty()
        @Min(1)
        @Field(() => Int)
        limit: number;

        @IsOptional()
        @IsIn(availableBookSorts)
        @Field(() => String, { nullable: true })
        sort?: string;

        @IsOptional()
        @Field(() => Direction, { nullable: true })
        direction?: Direction;

        @IsNotEmpty()
        @Field(() => ABISearch)
        search: ABISearch;
    }