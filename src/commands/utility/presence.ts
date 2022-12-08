import { ApplicationCommandOptionData, ApplicationCommandOptionType, PresenceData, PresenceStatusData } from "discord.js";
import fs from "fs";
import { execute } from "../../interfaces/Command";

export const name: string = "presence";
export const description: string = "Change the bot's rich presence";
export const category: string = "utility";
export const permissions: string = "Owner";
export const slashoptions: ApplicationCommandOptionData[] = [
    {
        name: 'status',
        type: ApplicationCommandOptionType.String,
        description: 'Change the state of the bot',
        required: true,
        choices: [
            {
                name: 'Online',
                value: 'online'
            },
            {
                name: 'Idle',
                value: 'idle'
            },
            {
                name: 'DND',
                value: 'dnd'
            },
            {
                name: 'Invisible',
                value: 'invisible'
            },
        ]
    },
    {
        name: 'type',
        type: ApplicationCommandOptionType.String,
        description: 'Type of the presence',
        required: true,
        choices: [
            {
                name: 'Playing',
                value: '0'
            },
            {
                name: 'Listening to',
                value: '2'
            },
            {
                name: 'Watching',
                value: '3'
            },
            {
                name: 'Streaming',
                value: '1'
            },
            {
                name: 'Competing in',
                value: '5'
            },
        ]
    },
    {
        name: 'name',
        type: ApplicationCommandOptionType.String,
        description: 'The text that will be displayed',
        required: true,
    },
    {
        name: 'url',
        type: ApplicationCommandOptionType.String,
        description: 'If you selected watching as the type, then add a link here',
        required: false,
    }
]

export const run: execute = async (client, interaction, args) => {
    let datatosave: PresenceData;
    if (args.get('type').value.toString() == '1') {
        if (!args.get('url')) {
            interaction.reply('Since you selected streaming as the presence type, please enter a url')
        } else if (args.get('url')) {
            let name: string = args.get('name').value.toString()
            client.user.setPresence({
                status: args.get('status').value as PresenceStatusData,
                activities: [{ name: name, type: parseInt(args.get('type').value.toString()), url: args.get('url').value.toString() }]
            })
            datatosave = {
                status: args.get('status').value as PresenceStatusData,
                activities: [{ name: args.get('name').value.toString(), type: parseInt(args.get('type').value.toString()), url: args.get('url').value.toString() }]
            }
        }
    } else {
        let name: string = args.get('name').value.toString()
        client.user.setPresence({
            status: args.get('status').value as PresenceStatusData,
            activities: [{ name: name, type: parseInt(args.get('type').value.toString()) }]
        })
        datatosave = {
            status: args.get('status').value as PresenceStatusData,
            activities: [{ name: args.get('name').value.toString(), type: parseInt(args.get('type').value.toString()) }]
        }
    }
    interaction.reply("Successfully changed the bot's presence")

    var json = JSON.stringify(datatosave)
    fs.writeFileSync('presencedata.json', json, { encoding: 'utf8' })
};
