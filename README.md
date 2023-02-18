# ValorantRankTrackerJS

A Discord Bot using the unofficial VALORANT API to get a players last competetive match result and his current rank.
<br></br>

# Table of content

- [Before using this bot](#before-using-this-bot)
- [Preparations](#preparations)
- [Installation](#installation)
  - [Node](#node)
  - [Docker](#docker)
- [Known issues](#known-issues)
  - [DiscordAPIError[5001]: Missing Access](#discordapierror-5001-missing-access)
- [Support](#support)

# <a name="before-using-this-bot"></a> Before using this bot

Please make sure to check out the [repository](https://github.com/Henrik-3/unofficial-valorant-api) for the API written by [Henrik-3](https://github.com/Henrik-3). Everything about the API, used by this bot, can be found there.
**Also fork the repository!**
<br></br>

# <a name="preparations"></a> Preparations

The bot needs a `config.json` file. Create one in the root folder in this format:

```json
{
  "token": "Your-Token",
  "clientId": "Your-Client-ID",
  "guildId": "Your-Server-ID"
}
```

`token` and `clientId` can be found in Discord Developer Portal in your [Applications](https://discord.com/developers/applications). For your `guildId` you can find it by right-clicking on your server name.

**IMPORTANT: Enable Developer Mode in your Discord settings.**
<br></br>

# <a name="installation"></a> Installation

# <a name="node"></a> Node

**Make sure you have Node installed!**

Install packages

```bash
npm install
```

Go into the `src`-folder

```bash
cd src
```

Deploy commands to your Discord server

```bash
node deploy-commands.js
```

**Keep in mind that every new command you add, must be deployed to your server!**

Run the bot

```bash
node index.js
```

<br></br>

# <a name="docker"></a> Docker

**Make sure you have Docker installed!**

Build the Docker-file inside the root folder

```bash
docker build -t valorantranktrackerjs .
```

Run the Docker-file

```bash
docker run -d -t --name valorantranktracker valorantranktrackerjs
```

If Docker gives you a permission error, then run the instructions above with the `sudo` keyword.

After that everything should be working and the bot will be online.
<br></br>

# <a name="known-issues"></a> Known issues

# <a name="discordapierror-5001-missing-access"></a> DiscordAPIError[5001]: Missing Access

Problem: your Discord bot needs scopes and permissions

Solution: Go to [Developer Applications](https://discord.com/developers/applications) and check the scopes and permissions your bot needs

<img src="https://discord-py-slash-command.readthedocs.io/en/legacy/_images/scope.jpg">

<br></br>

Also check if your bot needs "Privileged Gateway Intents"

<img src="https://discordpy.readthedocs.io/en/stable/_images/discord_privileged_intents.png">
<br></br>

# <a name="support"></a> Support

Feel free to contact me if you need any help.

Discord: CriesInPoor#3281
