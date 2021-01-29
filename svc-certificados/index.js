const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:9092']
})

const run = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                offset: message.offset,
                key: message.key && message.key.toString(),
                size: message.size,
                timestamp: message.timestamp,
                value: message.value.toString(),
            })
        }
    })
}

run().catch(console.error)