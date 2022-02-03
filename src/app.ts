import rabbitMq from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()

rabbitMq.connect({
    protocol: process.env.RABBITMQ_PROTOCOL,
    hostname: process.env.RABBITMQ_HOST,
    port: Number(process.env.RABBITMQ_PORT),
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    vhost: process.env.RABBITMQ_VHOST
}).then((connection)=> {
    connection.createChannel().then((channel) => {
        const queue = 'AUTH-CHANNEL'
        const credential = 'yellow'
        channel.assertQueue(queue)
        channel.sendToQueue(queue, Buffer.from(credential))
        console.log('>>>>> sent ')
    }).catch((err) => {
        console.log(err)
    })
})
