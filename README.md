# 💬 Chat System API

This project aims to create an API for a chat system with the following features:

## 📋 Features

- [x] 📨 Send messages
- [x] 🗑️ Delete messages
- [x] 📝 Edit messages
- [x] ↩️ Reply to messages
- [x] 💬 Create chat

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22.14.0 or higher
- [Docker](https://www.docker.com/) for containerization (optional)

### 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/thiagoadsix/chat-system.git
   ```

2. Navigate to the project directory:
   ```bash
   cd chat-system
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### 🏃‍♂️ Running the API

#### Prerequisites:

To run with success, you need to run this command:
```bash
npm run init
```

#### Option 1: Running with Docker

To start the API server using Docker, run the following command:
```bash
npm run up
```

This will build the TypeScript code and start the API server in a Docker container.

#### Option 2: Running locally

To start the API server locally without Docker, follow these steps:

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Start the API server:
   ```bash
   npm start
   ```

The API server will be running at `http://localhost:3000`.

### 🧪 Testing

To run the tests, use the following command:
```bash
npm test
```

## 🛠️ Technologies Used

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Fastify](https://www.fastify.io/) - Web framework for Node.js
- [Docker](https://www.docker.com/) - Containerization platform (optional)
- [Vitest](https://vitest.dev/) - Testing framework
- [DynamoDB](https://aws.amazon.com/dynamodb/) - NoSQL database
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker

## ⚙️ How It Works
When you create a chat, you can add as many users as you want – no limits here! Behind the scenes, we automatically generate a unique chat for all invited users, ensuring that everyone gets the same reference. This means everyone shares the same conversation thread effortlessly.

Sending messages is super simple. When you post a message to a specific chat, it's stored right in our database under that chat's unique ID. And if you ever want to delete or update your message, just go ahead – our API makes it a breeze to manage your messages. Want to reply to someone? You got it!

#### Under the Hood
- **Event-Driven Awesomeness:** We use RabbitMQ to handle all chat events (sending, updating, deleting, and replying). This lets us process everything asynchronously, meaning your chats stay lightning-fast even under heavy load. Every time a new message is sent, RabbitMQ helps update the "last message" for all users in that chat in real-time. ⚡️
- **Data Storage with DynamoDB:** We store all our data in DynamoDB – it's simple, fast, and scales like a champ. DynamoDB's managed NoSQL approach ensures that read and write operations are super quick, keeping your chats running smoothly no matter how many messages fly by.
In short, this system is designed to make your chat experience seamless, responsive, and reliable—all while handling the heavy lifting behind the scenes. Enjoy chatting!