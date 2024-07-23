import { registerEnumType } from '@nestjs/graphql';

export enum BookType {
	HARDCOPY = 'HARDCOPY',
	EBOOK = 'EBOOK',
	AUDIOBOOK = 'AUDIOBOOK',
  }
  registerEnumType(BookType, {
	name: 'BookType',
  });

  export enum BookStatus {
	AVAILABLE = 'AVAILABLE',
	SOLD_OUT = 'SOLD_OUT',
	DISCONTINUED = 'DISCONTINUED',
  }
  registerEnumType(BookStatus, {
	name: 'BookStatus',
  });

  export enum BookCollection {
	FICTION = 'FICTION',
	NON_FICTION = 'NON_FICTION',
	SCIENCE = 'SCIENCE',
	TECHNOLOGY = 'TECHNOLOGY',
	BIOGRAPHY = 'BIOGRAPHY',
	FANTASY = 'FANTASY',
	MYSTERY = 'MYSTERY',
	ROMANCE = 'ROMANCE',
	THRILLER = 'THRILLER',
	CHILDREN = 'CHILDREN',
  }
  registerEnumType(BookCollection, {
	name: 'BookCollection',
  });

  export enum AgeCategory {
	AGE_0_2 = 'AGE_0_2',
	AGE_2_PLUS = 'AGE_2_PLUS',
	AGE_3_PLUS = 'AGE_3_PLUS',
	AGE_4_PLUS = 'AGE_4_PLUS',
	AGE_6_PLUS = 'AGE_6_PLUS',
	AGE_8_PLUS = 'AGE_8_PLUS', 
  }
  registerEnumType(AgeCategory, {
	name: 'AgeCategory',
  });

  export enum BookLanguage {
	ENGLISH = 'ENGLISH',
	RUSSIAN = 'RUSSIAN',
	UZBEK = 'UZBEK',
	KOREAN = 'KOREAN',
  }
  registerEnumType(BookLanguage, {
	name: 'BookLanguage',
  });
