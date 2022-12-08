import { Bot } from "../client/Client";
import { ButtonInteraction } from "discord.js";

export interface execute {
  (client: Bot, interaction: ButtonInteraction, args?: string[]): Promise<void>;
}

export interface Button {
  name: string;
  cooldown: number;
  permissions: string;
  run: execute;
}
