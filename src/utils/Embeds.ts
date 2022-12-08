/* eslint-disable valid-jsdoc */
import colors from './colors.json';
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder } from 'discord.js';

/**
 * Return a embed preset for a error message.
 * @param {string} message The message, defaults to "Something went wrong, please try again."
 * @return {{ description: string, color: number }} The preset embed.
 */
function Error(message: string = 'Something went wrong, please try again.', message2: string = 'Error :('): EmbedBuilder {
    return new EmbedBuilder().setDescription(message).setTitle(message2).setColor(colors.error)
}

/**
 * Return a embed preset for a success message.
 * @param {string} message The message, defaults to "Completed action successfully."
 * @return {{ description: string, color: number }} The preset embed.
 */
function Success(message: string = 'Completed action successfully.', message2: string): EmbedBuilder {
    return new EmbedBuilder().setDescription(message).setTitle(message2).setColor(colors.success)
}

function Loading(message: string): EmbedBuilder {
    return new EmbedBuilder().setTitle(`Loading ${message}`)
}

function NoPerms(message: string, message2: string): EmbedBuilder {
    return new EmbedBuilder().setTitle(message).setDescription(`You need ${message2} permissions to use this command`).setColor(colors.noPerms)
}

interface result {
    response: any[]
}

function handlePagination(result: result, amount_per_page: number, selected_amount: number, direction: 'previous' | 'next', command_name: string, embed_string: string, embed_title: string, interaction: ButtonInteraction, extra_args?: string) {
    let listarr = [];
    let embed = new EmbedBuilder()
    if (result.response.length < selected_amount) {
        selected_amount = 0;
    }
    embed.setColor(colors.default)
    switch (direction) {
        case 'next':
            let buttonrow: ActionRowBuilder<any>;
            if (selected_amount + (amount_per_page * 2) >= result.response.length) {
                buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-previous-${selected_amount + amount_per_page}-${extra_args}`)
                            .setLabel(`⬅️`)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-next-${selected_amount + amount_per_page}-${extra_args}`)
                            .setLabel(`➡️`)
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                    );
            } else if (result.response.length <= amount_per_page) {
                buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-previous-${selected_amount + amount_per_page}-${extra_args}`)
                            .setLabel(`⬅️`)
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-next-${selected_amount + amount_per_page}-${extra_args}`)
                            .setLabel(`➡️`)
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                    );
            } else {
                buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-previous-${selected_amount + amount_per_page}-${extra_args}`)
                            .setLabel(`⬅️`)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-next-${selected_amount + amount_per_page}-${extra_args}`)
                            .setLabel(`➡️`)
                            .setStyle(ButtonStyle.Primary),
                    );
            }

            if (selected_amount < result.response.length - amount_per_page) {
                for (let i = selected_amount + amount_per_page; i < selected_amount + (amount_per_page * 2); i++) {
                    if (result.response[i] == undefined) continue;
                    listarr.push(evalCode(embed_string, i))
                }
                embed.addFields([{ name: `Users`, value: listarr.join('\n') }])
                embed.setTitle(`${embed_title} (${((selected_amount + amount_per_page) / amount_per_page) + 1})`)
                interaction.update({ embeds: [embed], components: [buttonrow] })
            } else {
                interaction.reply({ embeds: [Error("Can't go further than that")], ephemeral: true })
            }
            break;
        case 'previous':
            let buttonrow2: ActionRowBuilder<any>;
            if (selected_amount - amount_per_page < amount_per_page) {
                buttonrow2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-previous-${selected_amount - amount_per_page}-${extra_args}`)
                            .setLabel(`⬅️`)
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-next-${selected_amount - amount_per_page}-${extra_args}`)
                            .setLabel(`➡️`)
                            .setStyle(ButtonStyle.Primary),
                    );
            } else if (result.response.length <= amount_per_page) {
                buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-previous-${selected_amount + amount_per_page}-${extra_args}`)
                            .setLabel(`⬅️`)
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-next-${selected_amount + amount_per_page}-${extra_args}`)
                            .setLabel(`➡️`)
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                    );
            } else {
                buttonrow2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-previous-${selected_amount - amount_per_page}-${extra_args}`)
                            .setLabel(`⬅️`)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId(`${command_name}-next-${selected_amount - amount_per_page}-${extra_args}`)
                            .setLabel(`➡️`)
                            .setStyle(ButtonStyle.Primary),
                    );
            }

            if (selected_amount >= amount_per_page) {
                for (let i = selected_amount - amount_per_page; i < selected_amount; i++) {
                    if (result.response[i] == undefined) continue;
                    listarr.push(evalCode(embed_string, i))
                }
                embed.addFields([{ name: `Users`, value: listarr.join('\n') }])
                embed.setTitle(`${embed_title} (${((selected_amount - amount_per_page) / amount_per_page) + 1})`)
                interaction.update({ embeds: [embed], components: [buttonrow2] })
            } else {
                interaction.reply({ embeds: [Error("Can't go further than that")], ephemeral: true })
            }
            break;
    }
    function evalCode(code: string, i: number): string {
        const evaluated = eval(code)
        return evaluated;
    }
}

export {
    Success,
    Error,
    Loading,
    NoPerms,
    handlePagination
};
