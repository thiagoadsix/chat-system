# 💬 Chat System API

This project aims to create an API for a chat system with the following features:

## 📋 Features

- [x] 📨 Send messages
- [x] 🗑️ Delete messages
- [x] 📝 Edit messages
- [x] ↩️ Reply to messages

#### Extra Features
- [x] 💬 Create chat
- [x] 🔑 Sign In
- [x] 🆕 Sign Up

## ⚙️ How It Works
When you create a chat, you can add as many users as you want – no limits here! Behind the scenes, we automatically generate a unique chat for all invited users, ensuring that everyone gets the same reference. This means everyone shares the same conversation thread.

Sending messages is super simple. When you post a message to a specific chat, it's stored right in our database under that chat's unique ID. And if you ever want to delete or update your message, just go ahead – our API makes it a breeze to manage your messages. Want to reply to someone? You got it!

#### Under the Hood
- **Event-Driven Awesomeness:** We use RabbitMQ to handle all chat events (sending, updating, deleting, and replying). This lets us process everything asynchronously, meaning your chats stay lightning-fast even under heavy load. Every time a new message is sent, RabbitMQ helps update the "last message" for all users in that chat in real-time. ⚡️

- **Data Storage with DynamoDB:** We store all our data in DynamoDB – it's simple, fast, and scales like a champ. DynamoDB's managed NoSQL approach ensures that read and write operations are super quick, keeping your chats running smoothly no matter how many messages fly by.

- **Authentication in a Snap:** To simulate a secure environment, we've added a simple in-memory authentication service using the Fastify JWT library. This service validates JWT tokens to mimic real-world authentication, and our temporary file-based database keeps track of user sessions. It's lightweight and perfect for development and testing.

In short, this system is designed to make your chat experience seamless, responsive, and reliable—all while handling the heavy lifting behind the scenes. Enjoy chatting!

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

Give permissions to the scripts:
```bash
chmod +x local/scripts/create-chatmessages-table.sh
```

And then, you need to create the DynamoDB table:
```bash
npm run create-local-dynamodb-table
```

#### Option 1: Running with Docker

To start the API server using Docker, run the following command:
```bash
npm run up
```

This will build the TypeScript code and start the API server in a Docker container.

#### Option 2: Running locally

To start the API server locally without Docker, follow these steps:
```
Remember, you will need to have a DynamoDB and RabbitMQ running, and of course, you will need to create the DynamoDB table, follow these steps:
```

1. Give permissions to the scripts:
```bash
chmod +x local/scripts/create-chatmessages-table.sh
```

2. Create the DynamoDB table:
```bash
npm run create-local-dynamodb-table
```

3. Build the TypeScript code:
```bash
npm run build
```

4. Start the API server:
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
- [Zod](https://zod.dev/) - Schema validation
- [Swagger](https://swagger.io/) - API documentation

## Test Coverage

Our test suite ensures that all functionalities of the Chat System API are thoroughly tested and verified. We have achieved 100% coverage across all files, which means every statement, branch, function, and line of code is tested. This high level of coverage helps us maintain code quality and reliability, ensuring that any changes or new features do not introduce unexpected issues.

### Test Summary
```
Test Files  33 passed (33)  
Tests       74 passed (74)  
Start at    22:18:37  
Duration    1.66s (transform 951ms, setup 421ms, collect 2.71s, tests 135ms, environment 5ms, prepare 2.49s)
```

### Coverage Report

The following table provides a detailed breakdown of our test coverage:

```
% Coverage report from v8
----------------------------------------------------------|---------|----------|---------|---------|-------------------
File                                                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------------------------------------|---------|----------|---------|---------|-------------------
All files                                                 |     100 |      100 |     100 |     100 |                   
```

Achieving full test coverage is a testament to our commitment to delivering a robust and error-free chat system. We continuously run our test suite to catch any regressions early and ensure that our API remains stable and performant.