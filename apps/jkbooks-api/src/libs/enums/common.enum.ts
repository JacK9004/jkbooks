export enum Message {
    SOMETHING_WENT_WRONG = 'SOMETHING WENT WRONG',
    NO_DATA_WRONG = 'NO_DATA WRONG',
    CREATE_FAILED = 'CREATE FAILED',
    UPDATE_FAILED = 'UPDATE FAILED',
    REMOVE_FAILED = 'REMOVE FAILED',
    UOLOAD_FAILED = 'UOLOAD FAILED',
    BAD_REQUEST = 'BAD REQUEST',

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