import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';

const QUEUE = 'chat_messages';

export class RabbitMQClient {
  private connection?: Connection;
  private channel?: Channel;

  async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await amqp.connect({
        hostname: 'rabbitmq',
        port: 5672,
        username: 'admin',
        password: 'admin',
      });
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(QUEUE, { durable: true });
    }
  }

  async publishChatEvent<T>(event: T): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    const msgBuffer = Buffer.from(JSON.stringify(event));
    this.channel!.sendToQueue(QUEUE, msgBuffer, { persistent: true });
  }

  async consumeChatEvent(action: string, callback: (msg: any) => void): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    await this.channel?.consume(
      QUEUE,
      (msg: ConsumeMessage | null) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());

          if (content.action === action) {
            callback(content.message);
          }

          this.channel!.ack(msg);
        }
      },
      { noAck: false }
    );
  }
}
