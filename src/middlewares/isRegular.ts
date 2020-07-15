import { UserToken, ADMINISTRATION_LVL } from '../types/general'
import { CustomError } from '../errors/customError'
import * as express from 'express'


export const isRegular = async (req: any, res: express.Response, next: express.NextFunction) => {

    try {
        if ((req.user as UserToken).admin_lvl == ADMINISTRATION_LVL.NONE)
            return next()

        throw new CustomError("Only regular users can access", 0, 401)

    } catch (e) {
        next(e)
    }


}