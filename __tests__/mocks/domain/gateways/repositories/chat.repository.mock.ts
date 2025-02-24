import { vi, type Mock } from "vitest"

import { SaveChat } from "@domain/gateways/repositories/chat";

type chatMockRepository = {
  [K in keyof SaveChat]: Mock
}

export const chatMockRepository: chatMockRepository = {
  save: vi.fn(),
}