import { vi, type Mock } from "vitest"

import { SaveChat } from "@domain/gateways/repositories/chat";

type ShaveChatMockRepository = {
  [K in keyof SaveChat]: Mock
}

export const saveChatMockRepository: ShaveChatMockRepository = {
  save: vi.fn(),
}