export enum Topic {

    USER_SUCCESSFUL_SIGNIN = 'user-success-signin',
    USER_INFO_UPDATED = 'user-info-updated',
    USER_USES_MODEL = 'user-uses-model',

    NOTIFY_USER = 'notify-user',

    USER_SUBSCRIBE_PLAN = 'user-subscribe-plan',

    UPDATE_USER_SUBSCRIPTION = 'update-user-subscription',

    USER_SUCCESS_PAY = 'user-success-pay',
    USER_FAIL_PAY = 'user-fail-pay'

}

export interface Message {
    topic: Topic,
    userId: string,  //added to gurantee order of ther user's transaction
    payload: Object

}

