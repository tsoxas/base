import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalActionRowComponentBuilder } from "discord.js";
import { execute } from "../interfaces/Button";

export const name: string = "modalbutton";
export const cooldown: number = 5;

export const run: execute = async (client, interaction, args) => {
    let modal = new ModalBuilder()
        .setCustomId(`modalexample-${interaction.user.id}`)
        .setTitle("Example Modal")

    const questionOneInput = new TextInputBuilder()
        .setCustomId('questionOne')
        .setMaxLength(400)
        .setLabel("This is a short question")
        .setStyle(TextInputStyle.Short);

    const questionTwoInput = new TextInputBuilder()
        .setCustomId('questionTwo')
        .setMaxLength(400)
        .setLabel("This is a long question")
        .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents([questionOneInput]);
    const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents([questionTwoInput]);

    modal.addComponents([firstActionRow, secondActionRow]);

    await interaction.showModal(modal)
}