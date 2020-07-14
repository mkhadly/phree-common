// @ts-ignore

import mongoose from 'mongoose'
import * as express from 'express'
import { DBConfig } from '../types/general'

const initDB = async (app: express.Application, config: DBConfig) => {
    try {
        await mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`)
        console.log("Connected to DB")
    } catch (e) {
        console.log(e)
        console.log("TERMINATING NOW...")
        process.exit(1)
    }
}


const dbInitilizing = (config: DBConfig) => new Promise((resolve, reject) => {
    var poll = setInterval(async () => {
        try{
        await mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`)

        clearInterval(poll)
        resolve(null)

        }catch(e){
            console.log("Can't connect to MongoDB, Trying again in 5 sec")
        }

    }, 5000)
});

export {
    initDB,
    dbInitilizing
}