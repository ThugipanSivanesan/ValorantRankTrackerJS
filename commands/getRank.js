const { SlashCommandBuilder } = require("discord.js");
const { request } = require("undici");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getrank')
        .setDescription('gets elifs rank'),
    async execute(interaction) {
        try {
            const api = await request('https://api.henrikdev.xyz/valorant/v1/mmr-history/eu/eliif/1312');
            const jsonResult = await api.body.json();
            const parsedResult = new Map([
                ["Name", jsonResult.name],
                ["Tag", jsonResult.tag],
                ["Current Rank", jsonResult.data[0].currenttierpatched],
                ["RR won/lost", jsonResult.data[0].mmr_change_to_last_game],
                ["RR", jsonResult.data[0].elo],
                ["Date", jsonResult.data[0].date],
            ]);
            interaction.reply(
                'Name: ' + parsedResult.get("Name") + '\n' +
                'Tag: ' + parsedResult.get("Tag") + '\n' +
                'Current Rank: ' + parsedResult.get("Current Rank") + '\n' +
                'RR won/lost: ' + parsedResult.get("RR won/lost") + '\n' +
                'Current RR: ' + parsedResult.get("RR") + '\n' +
                'Date: ' + parsedResult.get("Date") + '\n'
            );
        } catch (error) {
            console.error(error);
            interaction.reply('There was an error. Try again.');
        }

    },
};