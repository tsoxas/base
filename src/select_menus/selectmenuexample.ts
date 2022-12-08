import { execute } from "../interfaces/Select Menu";

export const name: string = "selectmenuexample";

export const run: execute = async (client, interaction, args) => {
    interaction.reply({ content: `You just clicked on the ${args[0]} option` })
}