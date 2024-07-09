import { registerEnumType } from "@nestjs/graphql";

export enum Message {
    SOMETHING_WENT_WRONG = 'SOMETHING WENT WRONG',
    NO_DATA_FOUND = 'NO_DATA FOUND',
    CREATE_FAILED = 'CREATE FAILED',
    UPDATE_FAILED = 'UPDATE FAILED',
    REMOVE_FAILED = 'REMOVE FAILED',
    UPLOAD_FAILED = 'UPLOAD FAILED',
    BAD_REQUEST = 'BAD REQUEST',

    USED_MEMBER_NICK_OR_PHONE = 'Already used member nick or phone',
    NO_MEMBER_NICK = 'No member with that member nick!',
    BLOCKED_USER = 'You have been blocked',
    WRONG_PASSWORD = 'Wrong password, try again',
    NOT_AUTHENTICATED = 'You are not authenticated, please login first',
    TOKEN_NOT_EXIST = 'Bearer Token is not provided',
    ONLY_SPECIFIC_ROLES_ALLOWED = 'Allowed only for member with specific roles',
    NOT_ALLOWD_REQUEST = 'Not Allowed Request!',
    PROVIDE_ALLOWED_FORMAT = 'Please provide jpg, jpeg or png images',
    SELF_SUBSCRIPTION_DENIED = 'Self subscription is denied',
}

export enum Direction {
    ASC = 1,
    DESC = -1
}
registerEnumType(Direction, {
    name: 'Direction',
});