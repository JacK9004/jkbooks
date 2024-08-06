import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { AgeCategory, BookCollection, BookLanguage, BookStatus, BookType } from "../../enums/book.enum";
import { ObjectId } from "mongoose";



@InputType()
export class BookUpdate {
    @IsNotEmpty()
    @Field(() => String)
    _id: ObjectId;

    @IsOptional()
    @Field(() => BookType, { nullable: true })
    bookType?: BookType;

    @IsOptional()
    @Field(() => BookStatus, { nullable: true })
    bookStatus?: BookStatus;

    @IsOptional()
    @Field(() => BookCollection, { nullable: true })
    bookCollection?: BookCollection;

    @IsOptional()
    @Field(() => AgeCategory, { nullable: true })
    ageCategory?: AgeCategory;

    @IsOptional()
    @Length(3, 100)
    @Field(() => String, { nullable: true })
    bookTitle?: string;

    @IsOptional()
    @Length(3, 100)
    @Field(() => String, { nullable: true })
    bookAuthor?: string;

    @IsOptional()    
    @Field(() => Number, { nullable: true })
    bookPrice?: number;

    @IsOptional()    
    @Field(() => String, { nullable: true })
    bookDate?: string;

    @IsOptional()    
    @Field(() => String, { nullable: true })
    bookISBN?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Field(() => Int, { nullable: true })
    bookPages?: number;

    @IsOptional()
    @Field(() => [BookLanguage],  { nullable: true })
    bookLanguages?: BookLanguage[];     

    @IsOptional()
    @Field(() => [String], { nullable: true })
    bookImages?: string[];

    @IsOptional()
    @Length(5, 500)
    @Field(() => String, { nullable: true })
    bookDesc?: string;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    bookRent?: boolean;

    soldAt?: Date;

    deletedAt?: Date;

    @IsOptional()
    @Field(() => Date, { nullable: true })
    discontinuedAt?: Date;

}