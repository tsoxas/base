import { execute } from "../../interfaces/Event";
import { Guild, } from "discord.js";

export const name: string = "guildCreate";

export const run: execute = async (client, guild: Guild) => {
    if (guild.id !== `${process.env.GUILD_ID}` && process.env.GLOBAL == "FALSE") await guild.leave();
};
