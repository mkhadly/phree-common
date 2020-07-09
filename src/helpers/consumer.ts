import { Services } from '../types/general'
import { Topic } from '../types/topic'
import { Kafka } from 'kafkajs'
const uid = require('random-token');




export class ConsumerClient {
    kafka: Object
    consumer: Object = {}

    /**
     * Construct a new event's listener
     * @param serviceName replica set associated name (for grouping)
     * @param topics array of all topic names need which need to subscribe
     */
    constructor(public serviceName: Services, public topics: Topic[]) {

        const clientId = serviceName + "-" + uid(4)
        const brokers = (process.env.KAFKA_BROKERS as any).split(" ")

        this.kafka = new Kafka({
            clientId: clientId,
            brokers: brokers
        })

        this.consumer = (this.kafka as any).consumer({
            groupId: this.serviceName
        })

    }

    /**
     * - Connect the client to Kafka cluster
     * - Subscribe to all provided topics
     */
    public async init() {
        try {

            await (this.consumer as any).connect()

            let topicSubscriptionPromises: Promise<any>[] = this.topics.map(topic => (this.consumer as any).subscribe({ topic: topic }), this)

            if (topicSubscriptionPromises.length > 0)
                await Promise.all(topicSubscriptionPromises)
        }
        catch (e) {
            console.log(e)
            throw new Error("[CONSUMER] Error while conencting/subscribing to topics")
        }

    }

    /**
     * handle incoming messages
     * @param topic topic name
     * @param handler topic callback
     */
    public async listen(topic: Topic, handler: Function) {
        try {
            await (this.consumer as any).run({
                eachMessage: this.eachMsgHandler.bind(null, handler, topic),
            })
        } catch (e) {
            console.log(e)
            throw new Error("[CONSUMER] Error while handling a new incoming message")
        }
    }

    /**
     * End the client connection with the brokers
     */
    public async close() {
        await (this.consumer as any).disconnect()
    }

    private async eachMsgHandler(handler: Function, topic: Topic, { msgTopic, partition, message }: any) {
        console.log("REC", msgTopic, {
            key: message.key.toString(),
            value: message.value.toString(),
            headers: message.headers,
        })
        if (msgTopic == topic) {
            console.log("Handler Called")
            handler()
        }



    }

}