import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { AgeCategory, BookCollection, BookLanguage, BookType } from "../../enums/book.enum";
import { ObjectId } from "mongoose";



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