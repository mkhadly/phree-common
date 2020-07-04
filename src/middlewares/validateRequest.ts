import { validationResult } from 'express-validator'
import * as express from 'express'

const performValidation = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0]["msg"]
        return res.status(422).json({ "msg": errorMessage[0], "code": errorMessage[1] });
    }
    next()
}

export default performValidation