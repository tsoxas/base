import { ContextMenuCommandInteraction, ApplicationCommandType } from "discord.js";
import { execute } from "../../interfaces/Command";

export const name: string = "messagecontext";
export const description: string = "Message Context Interaction Example";
export const category: string = "context";
export const cooldown: number = 5;
export const type: ApplicationCommandType = ApplicationCommandType.Message;

export const run: execute = async (client, interaction: ContextMenuCommandInteraction, args) => {
    interaction.reply({ content: `You just clicked on a message with the following id: ${interaction.targetId}` })
}