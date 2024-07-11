import { registerEnumType } from '@nestjs/graphql';

export enum BoardArticleCategory {
    REVIEWS = 'REVIEWS',
    INTERVIEWS = 'INTERVIEWS',
    NEWS = 'NEWS',
    EVENTS = 'EVENTS',
}
registerEnumType(BoardArticleCategory, {
	name: 'BoardArticleCategory',
});

export enum BoardArticleStatus {
    ACTIVE = 'ACTIVE',
    ADELETE = 'DELETE',
}
registerEnumType(BoardArticleStatus, {
	name: 'BoardArticleStatus',
});
