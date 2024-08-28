import { Schema } from 'mongoose';


const MessageSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		phone: {
			type: String,
			required: true,


		},
		email: {
			type: String,
			required: true,
		},

		message: {
			type: String,
			required: true,
		},

		bookId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Book',
		},


		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

	},
	{ timestamps: true, collection: 'messages' },
);

export default MessageSchema;
