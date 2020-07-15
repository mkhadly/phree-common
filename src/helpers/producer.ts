import { Services } from '../types/general'
import { Message } from '../types/topic'
import { Kafka } from 'kafkajs'
const uid = require('random-token');
import { logger } from './logger'


export class ProducerClient {
    kafka: Object
    producer: Object = {}
    clientId: string = ""

    /**
     * Construct a new events' publisher
     * @param serviceName replica set associated name
     */
    constructor(public serviceName: Services) {

        this.clientId = "producer-" + (process.env.POD_NAME as string)
        const brokers = (process.env.KAFKA_BROKERS as any).split(" ")

        this.kafka = new Kafka({
            clientId: this.clientId,
            brokers: brokers
        })

        this.producer = (this.kafka as any).producer()
    }

    /**
     * Connect the client to Kafka cluster
     */
    public async init() {
        try {

            await (this.producer as any).connect()
        } catch (e) {
            logger.error("[PRODUCER] Error while connecting to the kafka cluster " + e)
        }
    }

    /**
     * 
     * @param msg contained of 
     * key : an identifier to the parition
     * topic : the queue name
     * payload : the actual message (JSON object)
     *
     */
    public async sendMessage(msg: Message) {
        try {
            const o = {
                topic: msg.topic,
                messages: [
                    { key: msg.userId.toString(), value: JSON.stringify(msg.payload) },
                ],
            }

            await (this.producer as any).send(o)
            logger.info("[PRODUCER] Send: "+ o)

        } catch (e) {
            logger.error("[PRODUCER] Error while sending a message "+e)
        }
    }

    /**
     * End the client connection with the brokers
     */
    public async close() {
        await (this.producer as any).disconnect()
    }

}
