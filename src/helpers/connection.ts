// @ts-ignore

import mongoose from 'mongoose'
import { DBConfig } from '../types/general'
import { logger } from './logger'


const dbInitilizing = (config: DBConfig) => new Promise((resolve, reject) => {
    var poll = setInterval(async () => {
        try{
        await mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`)

        clearInterval(poll)
        resolve(null)

        }catch(e){
            logger.warn("Can't connect to MongoDB, Trying again in 5 sec")
        }

    }, 5000)
});

export {
    dbInitilizing
}