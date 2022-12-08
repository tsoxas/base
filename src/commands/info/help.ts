import { ApplicationCommandOptionData, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { execute } from "../../interfaces/Command";
import { capitalizeFirstLetterfromMultipleWords } from "../../utils/GeneralUtils";

export const name: string = "help";
export const description: string = "Show the bot\'s commands.";
export const category: string = "info";
export const cooldown: number = 5;
export const slashoptions: ApplicationCommandOptionData[] = [
    {
        name: 'category',
        type: ApplicationCommandOptionType.String,
        description: 'Command Category to search for',
        required: true,
        choices: [
            {
                name: 'Info',
                value: 'info'
            },
            {
                name: 'Utility',
                value: 'utility'
            },
        ]
    }
]

export const run: execute = async (client, interaction, args) => {
    let category = args.getString("category")
    const embed = new EmbedBuilder()
    embed.setTitle(`${capitalizeFirstLetterfromMultipleWords(category.toLowerCase())} Commands`)
    embed.setColor("#491559")
    embed.setTimestamp(new Date())
    embed.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ forceStatic: true }) })
    embed.addFields([{ name: client.commandCategories[client.commandCategories.indexOf(category.toLowerCase())], value: await client.getCommandsbyCategory(client.commandCategories[client.commandCategories.indexOf(category.toLowerCase())]) }])
    interaction.reply({ embeds: [embed] })
}