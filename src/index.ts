import { Bot } from "./client/Client";
import 'dotenv/config';
import { GatewayIntentBits, Partials } from "discord.js";

try {
    const errors = [];
    const requiredEnvs = [
        'BOT_TOKEN',
        'GUILD_ID',
        'OWNER_ID',
        'GLOBAL'
    ];

    for (const env of requiredEnvs) {
        if (!process.env.hasOwnProperty(env)) {
            errors.push(env);
        }
    }

    if (errors.length > 0) throw new Error(
        `${errors.join(', ')} ${errors.length > 1 ? 'are' : 'is'} required`
    );

    new Bot({ intents: [GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds], partials: [Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Reaction, Partials.ThreadMember, Partials.User] }).start();
} catch (err) {
    throw new Error(err);
}