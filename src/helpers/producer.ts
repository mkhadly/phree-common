import { Services } from '../types/general'
import { Message } from '../types/topic'
import { Kafka } from 'kafkajs'
const uid = require('random-token');



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
            console.log(e)
            throw new Error("[PRODUCER] Error while connecting to the kafka cluster")
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
            await (this.producer as any).send({
                topic: msg.topic,
                messages: [
                    { key: msg.userId, value: JSON.stringify(msg.payload) },
                ],
            })
        } catch (e) {
            console.log(e)
            throw new Error("[PRODUCER] Error while sending a message")
        }
    }

    /**
     * End the client connection with the brokers
     */
    public async close() {
        await (this.producer as any).disconnect()
    }

}
