//@ts-ignore
import { UserToken } from '../types/general'
import { CustomError } from '../errors/customError'
import { decodeToken } from '../helpers/jwt'
import * as express from 'express'


export const attachUser = async (req: any, res: express.Response, next: express.NextFunction) => {

    try {
        const token = req.headers['authorization']

        if (!token) {
            throw new CustomError("Need to provide a valid access token", 0, 401)
        }

        try {
            const user: UserToken = decodeToken(token)
            req.user = user

            return next()
        } catch (e) {
            throw new CustomError("Invalid token!", 0, 401)
        }

    } catch (e) {
        next(e)
    }


}