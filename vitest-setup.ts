import { expect } from "vitest";
import {
  toHaveReceivedCommandTimes,
  toHaveReceivedCommandWith
} from "aws-sdk-client-mock-vitest";

expect.extend({
  toHaveReceivedCommandTimes,
  toHaveReceivedCommandWith
});
