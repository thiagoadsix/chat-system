import env from '@application/config/env'
import app from '@application/config/app'
import { setupMessageProcessing } from '@application/config/message-processor';

import { RabbitMQClient } from '@application/utils/clients/rabbit-mq.client';

const main = async () => {
  try {
    const rabbitMQClient = new RabbitMQClient();
    await rabbitMQClient.connect();

    await setupMessageProcessing(rabbitMQClient);

    app.log.info('RabbitMQ connected and message processing set up');

    await app.listen({ port: env.port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main();
