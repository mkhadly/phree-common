
export default class CustomError extends Error {

    constructor(public msg: string, public code: number = 0, public status: number = 422) {
        super()
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    serialize = () => { this.msg, this.code, this.status }

}