import { Schema } from 'mongoose';
import { AgeCategory, BookCollection, BookStatus, BookType, BookLanguage } from '../libs/enums/book.enum';

const BookSchema = new Schema(
	{
		bookType: {
			type: String,
			enum: BookType,
			required: true,
		},

		bookStatus: {
			type: String,
			enum: BookStatus,
			default:BookStatus.AVAILABLE,
		},

		bookCollection: {
			type: String,
			enum: BookCollection,
			required: true,
		},

		ageCategory: {
			type: String,
			enum: AgeCategory,
		  },

		bookTitle: {
			type: String,
			required: true,
		},

		bookAuthor: {
			type: String,
			required: true,
		},

		bookPrice: {
			type: Number,
			required: true,
		},

		bookDate: {
			type: String,
			required: true,
		  },
		  
		  bookISBN: {
			type: String,
			required: true,
		  },

		  bookPages: {
			type: Number,
			required: true,
		  },

		  bookLanguages: {	
			  type: [String],
			  enum: BookLanguage,
			  required: true,
		  },

		bookViews: {
			type: Number,
			default: 0,
		},

		bookLikes: {
			type: Number,
			default: 0,
		},

		bookComments: {
			type: Number,
			default: 0,
		},

		bookRank: {
			type: Number,
			default: 0,
		},

		bookImages: {
			type: [String],
			required: true,
		},

		bookDesc: {
			type: String,
		},

		bookRent: {
			type: Boolean,
			default: false,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		   },

		soldAt: {
			type: Date,
		},

		deletedAt: {
			type: Date,
		},

		discontinuedAt: {
			type: Date,
		  },
	  
	},
	{ timestamps: true, collection: 'books' },
);

BookSchema.index({ bookType: 1, bookCollection: 1, bookTitle: 1, bookAuthor: 1 }, { unique: true });

export default BookSchema;
