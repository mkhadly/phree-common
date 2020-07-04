// @ts-ignore

import * as mongoose from 'mongoose'
import * as express from 'express'
import { DBConfig } from '../types/general'

export default async (app: express.Application, config: DBConfig) => {
    try {
        await mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`)
        console.log("Connected to DB")
    } catch (e) {
        console.log(e)
    }
}