import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';

export class RabbitMQClient {
  private connection?: Connection;
  private channel?: Channel;
  private readonly exchange = 'chat_messages_exchange';

  async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await amqp.connect({
        hostname: 'rabbitmq',
        port: 5672,
        username: 'admin',
        password: 'admin',
      });
      this.channel = await this.connection.createChannel();

      await this.channel.assertExchange(this.exchange, 'direct', { durable: true });
    }
  }

  async publishChatEvent<T extends { action: string }>(event: T): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    const msgBuffer = Buffer.from(JSON.stringify(event));
    this.channel!.publish(this.exchange, event.action, msgBuffer, { persistent: true });
  }

  async consumeChatEvent(queue: string, action: string, callback: (msg: any) => void): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel!.assertQueue(queue, { durable: true });
    await this.channel!.bindQueue(queue, this.exchange, action);

    await this.channel!.consume(
      queue,
      (msg: ConsumeMessage | null) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          callback(content);
          this.channel!.ack(msg);
        }
      },
      { noAck: false }
    );
  }
}
