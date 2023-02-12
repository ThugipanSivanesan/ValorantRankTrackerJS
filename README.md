# ValorantRankTrackerJS

A Discord Bot using the unofficial VALORANT API to get a players last competetive match result and his current rank.

# Before using this bot

Please make sure to check out the [repository](https://github.com/Henrik-3/unofficial-valorant-api) for the API written by [Henrik-3](https://github.com/Henrik-3). Everything about the API, used by this bot, can be found there.

# Preparations

The bot needs a `config.json` file. Create one in the root folder with this format:

```json
{
  "token": "Your-Token",
  "clientId": "Your-Client-ID",
  "guildId": "Your-Server-ID"
}
```

**IMPORTANT: Enable Developer Mode in your Discord settings.**

`token` and `clientId` can be found in Discord Developer Portal in your [Applications](https://discord.com/developers/applications). For your `guildId` you can find it by right-clicking on your server name.

# Installation

**Make sure you have Docker installed.**

Build the Docker-file

```bash
docker build -t valorantranktrackerjs .
```

Run the Docker-file

```bash
docker run -d -t --name valorantranktracker valorantranktrackerjs
```

If Docker gives you a permission error, then run all commands with the `sudo` keyword.

After that everything should be working and the bot will be online.

# Support

Feel free to contact me if you need any help.

Discord: CriesInPoor#3281
