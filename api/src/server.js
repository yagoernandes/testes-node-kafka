import express from 'express'
import { Kafka, logLevel } from 'kafkajs'
import routes from './routes'

/**
 * Definição de constantes
 */
const {
    KAFKA_IP = 'localhost',
    KAFKA_PORT = '9092',
} = process.env

/**
 * Inicialização do kafka
 */
const kafka = new Kafka({
    clientId: 'api',
    logLevel: logLevel.DEBUG,
    brokers: [`${KAFKA_IP}:${KAFKA_PORT}`],
    retry:{
        initialRetryTime: 300,
        retries:10,
    },
})
const producer = kafka.producer()


const app = express()
/**
 * Middleware
 */
app.use((req, res, next) => {
    req.producer = producer
    console.log(`[${new Date().toLocaleString('pt-BR')}] REQUISIÇÃO PARA: ${req.originalUrl}`)
    return next()
})
app.use(routes)


/**
 * Execução do servidor
 */
async function run() {
    await producer.connect()
    app.listen(3333)
}

run().catch(console.error)
