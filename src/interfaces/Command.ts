import { Bot } from "../client/Client";
import { CommandInteractionOptionResolver, ApplicationCommandOptionData, CommandInteraction, ApplicationCommandType, ContextMenuCommandInteraction } from "discord.js";

export interface execute {
  (client: Bot, interaction: CommandInteraction | ContextMenuCommandInteraction, args: CommandInteractionOptionResolver): Promise<void>;
}

export interface Command {
  name: string;
  description: string;
  category: string;
  aliases: string[];
  type?: ApplicationCommandType;
  cooldown: number;
  permissions: string;
  slashoptions?: ApplicationCommandOptionData[];
  run: execute;
  slashCommandID: string;
}
