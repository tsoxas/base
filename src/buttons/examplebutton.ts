import { execute } from "../interfaces/Button";
import { Success } from "../utils/Embeds";

export const name: string = "examplebutton";
export const cooldown: number = 5;

export const run: execute = async (client, interaction, args) => {
    await interaction.reply({ embeds: [Success(null, `You just clicked on ${interaction.customId} with the ${args[0]} argument`)] })
}