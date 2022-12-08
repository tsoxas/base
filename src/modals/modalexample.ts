import { execute } from "../interfaces/Modal";

export const name: string = "modalexample";

export const run: execute = async (client, interaction, fields) => {
    await interaction.reply({ content: `Answer One: ${fields.getTextInputValue("questionOne")}\nAnswer Two: ${fields.getTextInputValue("questionTwo")}` })
}