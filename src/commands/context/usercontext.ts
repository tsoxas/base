import { ContextMenuCommandInteraction, ApplicationCommandType } from "discord.js";
import { execute } from "../../interfaces/Command";

export const name: string = "usercontext";
export const description: string = "User Context Interaction Example";
export const category: string = "context";
export const cooldown: number = 5;
export const type: ApplicationCommandType = ApplicationCommandType.User;

export const run: execute = async (client, interaction: ContextMenuCommandInteraction, args) => {
    interaction.reply({ content: `You just clicked on <@${interaction.targetId}>` })
}