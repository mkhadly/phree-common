// @ts-ignore

import * as jwt from 'jsonwebtoken'
const uid = require('random-token');
import { UserToken } from '../types/general'


export const generateAccessToken = (payload: UserToken) => jwt.sign(payload, process.env.JWT_SECRET || "secret",
    {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        algorithm: 'HS512'
    }
)
export const generateOpaqueToken = (len: string): string => uid(parseInt(len))


export const decodeToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET)