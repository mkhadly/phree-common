import { Services } from '../types/general'
import { Topic } from '../types/topic'
import { Kafka } from 'kafkajs'
const uid = require('random-token');




export class AdminClient {
    kafka: Object
    admin: Object = {}

    /**
     * Construct a new admin
     */
    constructor() {

        const clientId = "admin-" + uid(4)
        const brokers = (process.env.KAFKA_BROKERS as any).split(" ")

        this.kafka = new Kafka({
            clientId: clientId,
            brokers: brokers
        })

    }

/**
 * - Connect the client to Kafka cluster
 * - Create all topics
 * @param replicationFactor 
 * @param numPartition 
 */
    public async seedTopics(replicationFactor = 1, numPartition = 3) {
        try {
            const allTopics = Object.values(Topic).map(topic => Object({
                topic,
                numPartition,
                replicationFactor
            }))

            await (this.admin as any).connect()

            await (this.admin as any).createTopics({
                waitForLeaders: true,
                topics: allTopics
            });
        }
        catch (e) {
            console.log(e)
            throw new Error("[ADMIN] Error while creating topics")
        }

    }


    /**
     * End the admin connection with the brokers
     */
    public async close() {
        await (this.admin as any).disconnect()
    }



}