import { Router } from 'express'

const routes = Router()

routes.get('/', async (req, res) => {
    await req.producer.send({
        topic: 'test-topic',
        messages: [
            {
                key: 'Teste',
                value: 'Hello world from Kafka!'
            },
        ],
    })
    return res.json({ ok: true })
})

export default routes