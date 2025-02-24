import { vi, type Mock } from "vitest"

import { FindByIdMessage } from "@domain/gateways/repositories/message";

type MessageMockRepository = {
  [K in keyof FindByIdMessage]: Mock
}

export const messageMockRepository: MessageMockRepository = {
  findById: vi.fn(),
}