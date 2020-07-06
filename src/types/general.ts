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

export interface UserToken {
    id: string,
    email: string,
    avatar: string,
    verified_email: boolean,
    login_method: LOGIN_METHODS,
    admin_lvl: ADMINISTRATION_LVL
}

export interface DBConfig{
    host:string,
    port:string,
    db:string
}