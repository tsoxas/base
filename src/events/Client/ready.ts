import { PresenceData, PresenceStatusData } from "discord.js";
import { execute } from "../../interfaces/Event";
import fs from "fs";

export const name: string = "ready";

export const run: execute = async (client) => {
  //Rich Presence
  let datafromfile = fs.readFileSync('presencedata.json', { encoding: 'utf8' })
  let dataforpresence: PresenceData = JSON.parse(datafromfile)
  let nameforactivity: string = dataforpresence.activities[0].name
  if (!dataforpresence.activities[0].url) {
    client.user.setPresence({
      status: dataforpresence.status as PresenceStatusData,
      activities: [{ name: nameforactivity, type: dataforpresence.activities[0].type }]
    });
  } else if (dataforpresence.activities[0].url) {
    client.user.setPresence({
      status: dataforpresence.status as PresenceStatusData,
      activities: [{ name: nameforactivity, type: dataforpresence.activities[0].type, url: dataforpresence.activities[0].url }]
    });
  }

  //Registering slash commands
  if (process.env.GLOBAL == "FALSE") {
    client.guilds.cache.get(`${process.env.GUILD_ID}`)?.commands.set(client.slashdata)
  } else {
    client.application.commands.set(client.slashdata)
  }
};