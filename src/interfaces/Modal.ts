import { Bot } from "../client/Client";
import { ModalSubmitFields, ModalSubmitInteraction } from "discord.js";

export interface execute {
  (client: Bot, interaction: ModalSubmitInteraction, fields: ModalSubmitFields): Promise<void>;
}

export interface Modal {
  name: string;
  cooldown: number;
  permissions: string;
  run: execute;
}
