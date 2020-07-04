import { validationResult } from 'express-validator'


const performValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0]["msg"]
        return res.status(422).json({ "msg": errorMessage[0], "code": errorMessage[1] });
    }
    next()
}

export default performValidation