import CustomError from '../errors/customError'
const globalErrorHandler = (err, req, res, next) => {
    console.log(process.env.NODE_ENV)
    if (err) {
        if (err instanceof CustomError) {
            const errorMsg = err.serialize()
            return res.status(err.status).send({ 'message': err.msg, "code": err.code })
        }

        /**
         * Global Error handling
         */

        console.log(err)
        res.status(500).send({ 'message': "Invalid Request data" })
    } else {
        next()
    }
}

export default globalErrorHandler