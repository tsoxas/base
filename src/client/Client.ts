import {
  ApplicationCommandData, Client, Collection
} from "discord.js";
import fg from 'fast-glob';
import { Command } from "../interfaces/Command";
import { Button } from "../interfaces/Button";
import { Event } from "../interfaces/Event";
import { handleCommandFile, handleButtons, handleSelectMenus, handleModals } from "../utils/InteractionsHandler";
import { Select_Menu } from "../interfaces/Select Menu";
import { Modal } from "../interfaces/Modal";

/**
* Codebase made by {@link https://tsoxas.tk tsoxas}
* A simple to use discord.js v14 codebase with complete support for slash commands
*/
class Bot extends Client {
  public commands: Collection<string, Command> = new Collection();
  public buttons: Collection<string, Button> = new Collection();
  public select_menus: Collection<string, Select_Menu> = new Collection();
  public modals: Collection<string, Modal> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public commandCategories: string[];
  public validPermissions: string[];
  public slashdata: ApplicationCommandData[];
  public owner: string;
  public getCommandsbyCategory: (category: string) => Promise<string>;
  public async start(): Promise<void> {
    this.login(process.env.BOT_TOKEN);
    this.setMaxListeners(0)
    this.owner = process.env.OWNER_ID
    this.commandCategories = ["info", "utility"];
    this.validPermissions = ["Owner", "AddReactions", "Administrator", "AttachFiles", "BanMembers", "ChangeNickname", "Connect", "CreateInstantInvite", "CreatePrivateThreads", "CreatePublicThreads", "DeafenMembers", "EmbedLinks", "KickMembers", "ManageChannels", "ManageEmojisAndStickers", "ManageEvents", "ManageGuild", "ManageMessages", "ManageNicknames", "ManageRoles", "ManageThreads", "ManageWebhooks", "MentionEveryone", "ModerateMembers", "MoveMembers", "MuteMembers", "PrioritySpeaker", "ReadMessageHistory", "RequestToSpeak", "SendMessages", "SendMessagesInThreads", "SendTTSMessages", "Speak", "Stream", "UseApplicationCommands", "UseEmbeddedActivities", "UseExternalEmojis", "UseExternalStickers", "UseVAD", "ViewAuditLog", "ViewChannel", "ViewGuildInsights"]
    this.slashdata = [];
    const command_files: string[] = await fg(
      `${__dirname.replace(/\\/g, '/')}/../commands/**/*{.ts,.js}`
    );
    command_files.map(async (value: string) => {
      const file: Command = await import(value);
      this.commands.set(file.name, file);
      handleCommandFile(this, file);
      console.log(`${file.name} command was loaded`)
    });
    const button_files: string[] = await fg(
      `${__dirname.replace(/\\/g, '/')}/../buttons/**/*{.ts,.js}`
    );
    button_files.map(async (value: string) => {
      const file: Button = await import(value);
      handleButtons(this, file)
      console.log(`${file.name} button was loaded`)
    });
    const select_menu_files: string[] = await fg(
      `${__dirname.replace(/\\/g, '/')}/../select_menus/**/*{.ts,.js}`
    );
    select_menu_files.map(async (value: string) => {
      const file: Select_Menu = await import(value);
      handleSelectMenus(this, file)
      console.log(`${file.name} button was loaded`)
    });
    const modal_files: string[] = await fg(
      `${__dirname.replace(/\\/g, '/')}/../modals/**/*{.ts,.js}`
    );
    modal_files.map(async (value: string) => {
      const file: Modal = await import(value);
      handleModals(this, file)
      console.log(`${file.name} modal was loaded`)
    });
    const event_files: string[] = await fg(
      `${__dirname.replace(/\\/g, '/')}/../events/**/*{.ts,.js}`
    );
    event_files.map(async (value: string) => {
      const file: Event = await import(value);
      this.events.set(file.name, file);
      this.on(file.name, file.run.bind(null, this));
      console.log(`${file.name} event was hooked`)
    });
    this.getCommandsbyCategory = async function getCommandsbyCategory(category: string): Promise<string> {
      var comcat: string[] = new Array();
      const command_files: string[] = await fg(
        `${__dirname.replace(/\\/g, '/')}/../commands/**/*{.ts,.js}`
      );
      for (const file of command_files) {
        const commands: Command = await import(file)
        if (commands.category == category) {
          comcat.push(commands.name + ': ' + commands.description);
        }
      }
      return comcat.join('\n')
    }
  }
}

export { Bot };