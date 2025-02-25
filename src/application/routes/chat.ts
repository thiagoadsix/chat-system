import { FastifyInstance } from "fastify";

import { authMiddleware } from "@application/middleware";
import { adaptRoute } from "@application/adapters/fastify-routes.adapter";

import { sendMessageControllerFactory } from "@application/factories/controllers/message/send-message/send-message.controller.factory";
import { deleteMessageControllerFactory } from "@application/factories/controllers/message/delete-message/delete-message.controller.factory";
import { updateMessageControllerFactory } from "@application/factories/controllers/message/update-message/update-message.controller.factory";
import { replyMessageControllerFactory } from "@application/factories/controllers/message/reply-message/reply-message.controller.factory";
import { createChatControllerFactory } from "@application/factories/controllers/chat/create-chat/create-chat.controller";

import {
  createChatSchemaBody,
  createChatSchemaResponse,
} from "./validators/chat";
import {
  sendMessageSchemaBody,
  sendMessageSchemaParams,
  sendMessageSchemaResponse,
  deleteMessageSchemaParams,
  deleteMessageSchemaResponse,
  updateMessageSchemaParams,
  updateMessageSchemaResponse,
  updateMessageSchemaBody,
  replyMessageSchemaParams,
  replyMessageSchemaResponse,
  replyMessageSchemaBody,
} from "./validators/message";

export default async function (app: FastifyInstance) {
  app.post(
    "/chats",
    {
      preHandler: [authMiddleware],
      schema: {
        body: createChatSchemaBody,
        response: { 200: createChatSchemaResponse },
      },
    },
    adaptRoute(createChatControllerFactory())
  );

  app.post(
    "/chats/:chatId/messages",
    {
      preHandler: [authMiddleware],
      schema: {
        params: sendMessageSchemaParams,
        body: sendMessageSchemaBody,
        response: { 200: sendMessageSchemaResponse },
      },
    },
    adaptRoute(sendMessageControllerFactory())
  );
  app.delete(
    "/chats/:chatId/messages/:messageId",
    {
      preHandler: [authMiddleware],
      schema: {
        params: deleteMessageSchemaParams,
        response: { 200: deleteMessageSchemaResponse },
      },
    },
    adaptRoute(deleteMessageControllerFactory())
  );
  app.patch(
    "/chats/:chatId/messages/:messageId",
    {
      preHandler: [authMiddleware],
      schema: {
        params: updateMessageSchemaParams,
        body: updateMessageSchemaBody,
        response: { 200: updateMessageSchemaResponse },
      },
    },
    adaptRoute(updateMessageControllerFactory())
  );
  app.post(
    "/chats/:chatId/messages/:messageId/replies",
    {
      preHandler: [authMiddleware],
      schema: {
        params: replyMessageSchemaParams,
        body: replyMessageSchemaBody,
        response: { 200: replyMessageSchemaResponse },
      },
    },
    adaptRoute(replyMessageControllerFactory())
  );
}
