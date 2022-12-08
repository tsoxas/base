import { execute } from "../../interfaces/Event";
import { Command } from "../../interfaces/Command";
import { Error } from '../../utils/Embeds';
import { Collection, Interaction, GuildMember, Snowflake, CommandInteractionOptionResolver, InteractionType } from "discord.js";
import { Button } from "../../interfaces/Button";
import { Select_Menu } from "../../interfaces/Select Menu";
import { canUserExecuteCommand } from "../../utils/InteractionsHandler";
import { Modal } from "../../interfaces/Modal";

export const name: string = "interactionCreate";

export const cooldowns = new Map<string, Collection<Snowflake, number>>();

export const run: execute = async (client, interaction: Interaction) => {
    switch (interaction.type) {
        case InteractionType.ApplicationCommand:
            if (interaction.isContextMenuCommand()) {
                console.log(interaction.user.tag + " used the: " + interaction.commandName + " command |in the guild: " + interaction.guild.name + "|")
                const command: Command = client.commands.get(interaction.commandName) || client.commands.find(a => a.aliases && a.aliases.includes(interaction.commandName));

                let result = await canUserExecuteCommand(command, client, interaction.member as GuildMember)
                if (!result.allowed) {
                    interaction.reply({ embeds: [result.embed], ephemeral: true })
                    return;
                }

                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Collection());
                }

                const current_time = Date.now();
                const time_stamps = cooldowns.get(command.name);
                const cooldown_amount = (command.cooldown) * 1000;

                if (time_stamps.has(interaction.user.id)) {
                    const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amount;

                    if (current_time < expiration_time) {
                        const time_left = (expiration_time - current_time) / 1000;

                        interaction.reply({ embeds: [Error(`Please wait ${time_left.toFixed(1)} more seconds to use ${command.name} again`)], ephemeral: true });
                        return;
                    }
                }

                time_stamps.set(interaction.user.id, current_time);
                setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);

                try {
                    await command.run(client, interaction, interaction.options as CommandInteractionOptionResolver<any>)
                } catch (reason) {
                    console.error(reason)
                    if (!interaction.replied) {
                        if (interaction.deferred) {
                            interaction.editReply(
                                `Execution of command: ${interaction.commandName} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                            );
                        } else if (!interaction.deferred) {
                            interaction.reply(
                                `Execution of command: ${interaction.commandName} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                            );
                        }
                    } else if (interaction.replied) {
                        interaction.editReply(
                            `Execution of command: ${interaction.commandName} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                        );
                    }
                }
            } else {
                console.log(interaction.user.tag + " used the: " + interaction.commandName + " command |in the guild: " + interaction.guild.name + "|")
                const command: Command = client.commands.get(interaction.commandName) || client.commands.find(a => a.aliases && a.aliases.includes(interaction.commandName));

                let result = await canUserExecuteCommand(command, client, interaction.member as GuildMember)
                if (!result.allowed) {
                    interaction.reply({ embeds: [result.embed], ephemeral: true })
                    return;
                }

                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Collection());
                }

                const current_time = Date.now();
                const time_stamps = cooldowns.get(command.name);
                const cooldown_amount = (command.cooldown) * 1000;

                if (time_stamps.has(interaction.user.id)) {
                    const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amount;

                    if (current_time < expiration_time) {
                        const time_left = (expiration_time - current_time) / 1000;

                        interaction.reply({ embeds: [Error(`Please wait ${time_left.toFixed(1)} more seconds to use ${command.name} again`)], ephemeral: true });
                        return;
                    }
                }

                time_stamps.set(interaction.user.id, current_time);
                setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);

                try {
                    await command.run(client, interaction, interaction.options as CommandInteractionOptionResolver<any>)
                } catch (reason) {
                    console.error(reason)
                    if (!interaction.replied) {
                        if (interaction.deferred) {
                            interaction.editReply(
                                `Execution of command: ${interaction.commandName} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                            );
                        } else if (!interaction.deferred) {
                            interaction.reply(
                                `Execution of command: ${interaction.commandName} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                            );
                        }
                    } else if (interaction.replied) {
                        interaction.editReply(
                            `Execution of command: ${interaction.commandName} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                        );
                    }
                }
            }
            break;

        case InteractionType.MessageComponent:
            if (interaction.isButton()) {
                console.log(interaction.user.tag + " pressed the: " + interaction.customId + " button |in the guild: " + interaction.guild.name + "|")

                let buttonwithargs: boolean;
                if (interaction.customId.includes('-')) {
                    buttonwithargs = true
                } else {
                    buttonwithargs = false
                }
                const button: Button = buttonwithargs ? client.buttons.get(interaction.customId.split('-')[0]) : client.buttons.get(interaction.customId)

                let result = await canUserExecuteCommand(button, client, interaction.member as GuildMember)
                if (!result.allowed) {
                    interaction.reply({ embeds: [result.embed], ephemeral: true })
                    return;
                }

                if (!cooldowns.has(button.name)) {
                    cooldowns.set(button.name, new Collection());
                }

                const current_time = Date.now();
                const time_stamps = cooldowns.get(button.name);
                const cooldown_amount = (button.cooldown) * 1000;

                if (time_stamps.has(interaction.user.id)) {
                    const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amount;

                    if (current_time < expiration_time) {
                        const time_left = (expiration_time - current_time) / 1000;

                        interaction.reply({ embeds: [Error(`Please wait ${time_left.toFixed(1)} more seconds to use ${button.name} again`)], ephemeral: true });
                        return;
                    }
                }

                time_stamps.set(interaction.user.id, current_time);
                setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);

                try {
                    buttonwithargs ? await button.run(client, interaction, interaction.customId.replace(interaction.customId.split('-')[0] + "-", "").split('-')) : await button.run(client, interaction)
                } catch (reason) {
                    console.error(reason)
                    if (!interaction.replied) {
                        if (interaction.deferred) {
                            interaction.editReply(
                                `Execution of button: ${interaction.customId} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                            );
                        } else if (!interaction.deferred) {
                            interaction.reply(
                                `Execution of button: ${interaction.customId} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                            );
                        }
                    } else if (interaction.replied) {
                        interaction.editReply(
                            `Execution of button: ${interaction.customId} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                        );
                    }
                }
            }
            else if (interaction.isAnySelectMenu()) {
                console.log(interaction.user.tag + " pressed the: " + interaction.customId + " select menu |in the guild: " + interaction.guild.name + "|")

                let select_menuwithargs: boolean;
                if (interaction.customId.includes('-')) {
                    select_menuwithargs = true
                } else {
                    select_menuwithargs = false
                }
                const select_menu: Select_Menu = select_menuwithargs ? client.select_menus.get(interaction.customId.split('-')[0]) : client.select_menus.get(interaction.customId)

                let result = await canUserExecuteCommand(select_menu, client, interaction.member as GuildMember)
                if (!result.allowed) {
                    interaction.reply({ embeds: [result.embed], ephemeral: true })
                    return;
                }

                try {
                    await select_menu.run(client, interaction, interaction.values.toString().split("-"))
                } catch (reason) {
                    console.error(reason)
                    if (!interaction.replied) {
                        if (interaction.deferred) {
                            interaction.editReply(
                                `Execution of select_menu: ${interaction.customId} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                            );
                        } else if (!interaction.deferred) {
                            interaction.reply(
                                `Execution of select_menu: ${interaction.customId} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                            );
                        }
                    } else if (interaction.replied) {
                        interaction.editReply(
                            `Execution of select_menu: ${interaction.customId} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                        );
                    }
                }
            }
            break;

        case InteractionType.ModalSubmit:
            console.log(interaction.user.tag + " submitted the: " + interaction.customId + " modal |in the guild: " + interaction.guild.name + "|")

            let modalwithargs: boolean;
            if (interaction.customId.includes('-')) {
                modalwithargs = true
            } else {
                modalwithargs = false
            }
            const modal: Modal = modalwithargs ? client.modals.get(interaction.customId.split('-')[0]) : client.modals.get(interaction.customId)

            let result = await canUserExecuteCommand(modal, client, interaction.member as GuildMember)
            if (!result.allowed) {
                interaction.reply({ embeds: [result.embed], ephemeral: true })
                return;
            }

            try {
                await modal.run(client, interaction, interaction.fields)
            } catch (reason) {
                console.error(reason)
                if (!interaction.replied) {
                    if (interaction.deferred) {
                        interaction.editReply(
                            `Execution of select_menu: ${interaction.customId} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                        );
                    } else if (!interaction.deferred) {
                        interaction.reply(
                            `Execution of select_menu: ${interaction.customId} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                        );
                    }
                } else if (interaction.replied) {
                    interaction.editReply(
                        `Execution of select_menu: ${interaction.customId} failed because of the following reason:\n${reason}.\nPlease report it to my developers`
                    );
                }
            }
            break;
    }
};
