import env from '@main/config/env'
import app from '@main/config/app'
import { setupMessageProcessing } from '@main/config/message-processor';

import { RabbitMQClient } from '@application/utils/clients/rabbit-mq.client';

const main = async () => {
  try {
    const rabbitMQClient = new RabbitMQClient();
    await rabbitMQClient.connect();

    await setupMessageProcessing(rabbitMQClient);

    app.log.info('RabbitMQ connected')

    await app.listen({ port: env.port, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main()