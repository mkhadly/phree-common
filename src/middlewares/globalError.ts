import { CustomError } from '../errors/customError'
import * as express from 'express'
import { logger } from '../helpers/logger'


const globalErrorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err) {
        if (err instanceof CustomError) {
            return res.status(err.status).send({ 'message': err.msg, "code": err.code })
        }

        /**
         * Global Error handling
         */
        logger.error(err)
        res.status(500).send({ 'message': "Invalid Request data" })
    } else {
        next()
    }
}

export { globalErrorHandler }