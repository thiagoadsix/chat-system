import { vi, type Mock } from "vitest";

import { MessageBroker } from "@domain/gateways/brokers";

type MessageBrokerMock = {
  [K in keyof MessageBroker]: Mock;
}

export const messageMockBroker: MessageBrokerMock = {
  publish: vi.fn(),
}
