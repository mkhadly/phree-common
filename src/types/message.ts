import { NOTIFICATION_METHODS, NOTIFICATION_TEMPLATES } from './notification'

export interface USER_INFO_UPDATED_PAYLOAD {
    id: string,
    email?: string,
    avatar?: string,
    banned?: boolean
}
export interface USER_SUCCESSFUL_SIGNIN_PAYLOAD {
    id: string,
    email: string,
    phone?: string,
    deviceId?: string
}

export interface NOTIFY_USER_PAYLOAD {
    id: string,
    email?: string,
    phone?: string,
    deviceId?: string,
    template: NOTIFICATION_TEMPLATES,
    method: NOTIFICATION_METHODS[]
}