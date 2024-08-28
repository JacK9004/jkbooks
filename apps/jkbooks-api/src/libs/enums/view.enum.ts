import { registerEnumType } from '@nestjs/graphql';

export enum ViewGroup {
	MEMBER = 'MEMBER',
	ARTICLE = 'ARTICLE',
	BOOK = 'BOOK',
	FAQ = 'FAQ',
	NOTICE = 'NOTICE',
}
registerEnumType(ViewGroup, {
	name: 'ViewGroup',
});
