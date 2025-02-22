# 💬 Chat System API

This project aims to create an API for a chat system with the following features:

## 📋 Features

- [ ] 📨 Send messages
- [ ] 🗑️ Delete messages
- [ ] 📝 Edit messages
- [ ] ↩️ Reply to messages

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
