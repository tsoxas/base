# Tsoxas Bot Base

This is a base that I made for discord bots using typescript and discord.js

## How to use

### **Fill out the .env file with the required settings before using the bot**

I provide an example of all the features the bot supports. You can view them by executing the **/example** command.

## Available Settings

- **BOT_TOKEN**: The token of the bot
- **OWNER_ID**: The discord id of the bot owner
- **GUILD_ID**: The id of the bot's main discord server (_Not required if **GLOBAL** is set to FALSE_)
- **GLOBAL**: Whether the slash commands are registered as global commands or guild commands (_If set to FALSE the commands will be registered to the guild that is set in the **GUILD_ID** setting_)

## Features

- Permission System based on role permissions (_eg. Manage Messages, Administrator etc._)
- Cooldown System
- Modals, Select Menus, Buttons and Slash Commands
