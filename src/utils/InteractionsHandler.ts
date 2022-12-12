import { ApplicationCommandType, EmbedBuilder, GuildMember, PermissionResolvable } from "discord.js"
import { Bot } from "../client/Client"
import { Button } from "../interfaces/Button"
import { Command } from "../interfaces/Command"
import { Modal } from "../interfaces/Modal"
import { Select_Menu } from "../interfaces/Select Menu"
import { NoPerms } from "./Embeds"

function handleCommandFile(client: Bot, file: Command) {
    if (file.slashoptions) {
        if (!file.type) {
            client.slashdata.push({ name: file.name, description: file.description, options: file.slashoptions, dmPermission: false })
            if (file.aliases) {
                for (let i = 0; i < file.aliases.length; i++) {
                    client.slashdata.push({ name: file.aliases[i], description: `This is an alias for the ${file.name} command`, options: file.slashoptions, dmPermission: false })
                }
            }
        }
    } else if (!file.slashoptions) {
        if (!file.type) {
            client.slashdata.push({ name: file.name, description: file.description, dmPermission: false })
            if (file.aliases) {
                for (let i = 0; i < file.aliases.length; i++) {
                    client.slashdata.push({ name: file.aliases[i], description: `This is an alias for the ${file.name} command`, dmPermission: false })
                }
            }
        } else if (file.type == ApplicationCommandType.User) {
            client.slashdata.push({ name: file.name, dmPermission: false, type: ApplicationCommandType.User })
            if (file.aliases) {
                for (let i = 0; i < file.aliases.length; i++) {
                    client.slashdata.push({ name: file.aliases[i], dmPermission: false, type: ApplicationCommandType.User })
                }
            }
        } else if (file.type == ApplicationCommandType.Message) {
            client.slashdata.push({ name: file.name, dmPermission: false, type: ApplicationCommandType.Message })
            if (file.aliases) {
                for (let i = 0; i < file.aliases.length; i++) {
                    client.slashdata.push({ name: file.aliases[i], dmPermission: false, type: ApplicationCommandType.Message })
                }
            }
        }
    }
}

export async function canUserExecuteCommand(command: Command | Button | Select_Menu | Modal, client: Bot, member: GuildMember): Promise<{ allowed: boolean; embed: EmbedBuilder; }> {
    if (!command) throw new Error(`Unknown command`);
    if (command.permissions) {
        if (command.permissions == "Owner") {
            if (member.id == client.owner) {
                return { allowed: true, embed: null }
            } else {
                return { allowed: false, embed: NoPerms('Insufficient perms', "Only the owner of the bot can run this command") };
            }
        } else {
            let invalidPerms = []
                if (!client.validPermissions.includes(command.permissions)) {
                    throw new Error(`Invalid Permissions ${command.permissions}`);
                }
                if (!member.permissions.has(command.permissions as PermissionResolvable)) {
                    invalidPerms.push(command.permissions);
                }
            if (invalidPerms.length > 0) {
                return { allowed: false, embed: NoPerms('Insufficient perms', `${invalidPerms.join(", ")}`) };
            } else {
                return { allowed: true, embed: null }
            }
        }
    } else {
        return { allowed: true, embed: null }
    }
}

export function handleButtons(client: Bot, button: Button) {
    if (button.name.includes('-')) {
        client.buttons.set(button.name.split('-')[0], button);
    } else {
        client.buttons.set(button.name, button);
    }
}

export function handleSelectMenus(client: Bot, button: Select_Menu) {
    if (button.name.includes('-')) {
        client.select_menus.set(button.name.split('-')[0], button);
    } else {
        client.select_menus.set(button.name, button);
    }
}

export function handleModals(client: Bot, modal: Modal) {
    if (modal.name.includes('-')) {
        client.modals.set(modal.name.split('-')[0], modal);
    } else {
        client.modals.set(modal.name, modal);
    }
}

/**
 * @deprecated The method should not be used
 */
/*function handleCommandPermissions(client: Bot, command: Command) {
    let perm = command.permissions
    switch (perm) {
        case 'Owner':
            client.slashpermdata.push({ id: `${command.slashCommandID}` as Snowflake, permissions: [{ id: process.env.OWNER_ROLE as Snowflake, type: 'ROLE', permission: true }] })
            break;
        case 'Developer':
            client.slashpermdata.push({ id: `${command.slashCommandID}` as Snowflake, permissions: [{ id: process.env.DEVELOPER_ROLE as Snowflake, type: 'ROLE', permission: true }] })
            break;
        case 'Staff':
            client.slashpermdata.push({ id: `${command.slashCommandID}` as Snowflake, permissions: [{ id: process.env.STAFF_ROLE as Snowflake, type: 'ROLE', permission: true }] })
            break;
        case 'Admin':
            client.slashpermdata.push({ id: `${command.slashCommandID}` as Snowflake, permissions: [{ id: process.env.ADMIN_ROLE as Snowflake, type: 'ROLE', permission: true }] })
            break;
        case 'User':
            client.slashpermdata.push({ id: `${command.slashCommandID}` as Snowflake, permissions: [{ id: process.env.USER_ROLE as Snowflake, type: 'ROLE', permission: true }] })
            break;
    }
}*/

export { handleCommandFile }
