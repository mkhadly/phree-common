export enum LOGIN_METHODS {
    LOCAL,
    FACEBOOK,
    GOOGLE
}

export enum ADMINISTRATION_LVL {
    NONE,
    CREATOR,
    MODERATOR,
    ADMIN,
    SUPER_ADMIN
}

export enum Services {
    AUTH_SERVICE = 'auth-service',
    USER_SERVICE = 'user-service',
    MODEL_SERVICE = 'model-service',
    SUBSCRIPTION_SERVICE = 'subscription-service',
    SERVING_SERVICE = 'serving-service'
}

export interface UserToken {
    id: string,
    email: string,
    avatar: string,
    verified_email: boolean,
    login_method: LOGIN_METHODS,
    admin_lvl: ADMINISTRATION_LVL
}

export interface DBConfig {
    host: string,
    port: string,
    db: string
}