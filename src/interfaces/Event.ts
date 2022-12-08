import { Bot } from "../client/Client";

export interface execute {
  (client: Bot, ...args: any[]): Promise<void>;
}

export interface Event {
  name: string;
  run: execute;
}
