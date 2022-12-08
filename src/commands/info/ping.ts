import { EmbedBuilder } from "discord.js";
import { execute } from "../../interfaces/Command";
import colors from '../../utils/colors.json';
import { Loading } from "../../utils/Embeds";

export const name: string = "ping";
export const description: string = "Get the bot\'s ping.";
export const category: string = "info";
export const cooldown: number = 5;

export const run: execute = async (client, interaction, args) => {
    const start = Date.now();

    const msg = await interaction.reply({ embeds: [Loading('bot Information...')] });

    const embed = new EmbedBuilder()
    embed.setColor(colors.default)
    embed.addFields([{ name: 'Bot Ping', value: "```ini\n" + `[Ping]: ${Date.now() - start} ms\n[WebSocket Ping]: ${client.ws.ping}ms` + "```", inline: false }])


    interaction.editReply({ embeds: [embed] });
}