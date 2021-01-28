import { Router } from 'express'

const routes = Router()

routes.get('/certifications', async (req, res) => {
    await req.producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })
    return res.json({ ok: true })
})

export default routes