import { execute } from "../interfaces/Select Menu";

export const name: string = "selectmenuexamplerole";

export const run: execute = async (client, interaction, args) => {
    interaction.reply({ content: `You just selected <@&${args[0]}>` })
}