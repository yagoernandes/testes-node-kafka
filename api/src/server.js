import express from 'express'
import { Kafka } from 'kafkajs'
import routes from './routes'


const kafka = new Kafka({
    clientId: 'api-producer',
    brokers: ['kafka:9092']
})
const producer = kafka.producer()


const app = express()
app.use((req, res, next) => {
    req.producer = producer
    console.log(`[${new Date()}] REQUISIÇÃO PARA: ${req.originalUrl}`)
    return next()
})
app.use(routes)


async function run() {
    // await producer.connect()

    app.listen(3333)
}

run().catch(console.error)
