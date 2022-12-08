import { ActionRowBuilder, StringSelectMenuBuilder, RoleSelectMenuBuilder, UserSelectMenuBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, ChannelSelectMenuBuilder } from "discord.js";
import { execute } from "../../interfaces/Command";

export const name: string = "example";
export const description: string = "Showcases different things that the base supports.";
export const category: string = "utility";
export const cooldown: number = 5;

export const run: execute = async (client, interaction, args) => {
    const actionrow = new ActionRowBuilder<any>()
        .addComponents(
            new StringSelectMenuBuilder()
                .addOptions([
                    { label: "Option 1", value: `option1` },
                    { label: "Option 2", value: `option2` },
                    { label: "Option 3", value: `option3` },
                    { label: "Option 4", value: `option4` }
                ])
                .setCustomId('selectmenuexample')
                .setPlaceholder('Select an option')
                .setMinValues(1)
                .setMaxValues(1)
        );
    const actionrow2 = new ActionRowBuilder<any>()
        .addComponents(
            new RoleSelectMenuBuilder()
                .setCustomId('selectmenuexamplerole')
                .setPlaceholder('Select an option')
                .setMinValues(1)
                .setMaxValues(1)
        )
    const actionrow3 = new ActionRowBuilder<any>()
        .addComponents(
            new UserSelectMenuBuilder()
                .setCustomId('selectmenuexampleuser')
                .setPlaceholder('Select an option')
                .setMinValues(1)
                .setMaxValues(1)
        )
    const actionrow4 = new ActionRowBuilder<any>()
        .addComponents(
            new ChannelSelectMenuBuilder()
                .setCustomId('selectmenuexamplechannel')
                .setPlaceholder('Select an option')
                .setMinValues(1)
                .setMaxValues(1)
        )
    const actionrow5 = new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents([
            new ButtonBuilder()
                .setCustomId(`examplebutton-first`)
                .setLabel('Button 1')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`examplebutton-second`)
                .setLabel('Button 2')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId(`examplebutton-third`)
                .setLabel('Button 3')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`examplebutton-fourth`)
                .setLabel('Button 4')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(`modalbutton`)
                .setLabel('Show Modal')
                .setStyle(ButtonStyle.Primary),
        ]);
    interaction.reply({ components: [actionrow, actionrow2, actionrow3, actionrow4, actionrow5] })
}