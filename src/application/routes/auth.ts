import { FastifyInstance } from "fastify";

import { adaptRoute } from "@application/adapters/fastify-routes.adapter";
import { signUpControllerFactory } from "@application/factories/controllers/auth/sign-up.controller.factory";
import { signInControllerFactory } from "@application/factories/controllers/auth/sign-in.controller.factory";

import {
  signUpSchemaBody,
  signUpSchemaResponse,
  signInSchemaBody,
  signInSchemaResponse,
} from "@application/routes/validators/auth/index";

export default async function (app: FastifyInstance) {
  app.post(
    "/auth/sign-up",
    {
      schema: {
        body: signUpSchemaBody,
        response: { 204: signUpSchemaResponse },
      },
    },
    adaptRoute(signUpControllerFactory())
  );
  app.post(
    "/auth/sign-in",
    {
      schema: {
        body: signInSchemaBody,
        response: { 200: signInSchemaResponse },
      },
    },
    adaptRoute(signInControllerFactory())
  );
}
