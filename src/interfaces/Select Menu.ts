import { Bot } from "../client/Client";
import { AnySelectMenuInteraction } from "discord.js";

export interface execute {
  (client: Bot, interaction: AnySelectMenuInteraction, args?: string[]): Promise<void>;
}

export interface Select_Menu {
  name: string;
  permissions: string;
  run: execute;
}
