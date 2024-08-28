import { registerEnumType } from "@nestjs/graphql";

export enum FaqCategory {
    BOOK = 'BOOK',
    PAYMENTS = 'PAYMENTS',
    BUYERS = 'BUYERS',
    AGENTS = 'AGENTS',
    MEMBERSHIP = 'MEMBERSHIP',
    COMMUNITY = 'COMMUNITY',
    OTHER = 'OTHER'  
}

registerEnumType(FaqCategory, {
	name: 'FaqCategory',
});


export enum FaqStatus {
	HOLD = 'HOLD',
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(FaqStatus, {
	name: 'FaqStatus',
});
