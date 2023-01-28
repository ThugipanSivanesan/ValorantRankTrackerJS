const { SlashCommandBuilder } = require("discord.js");
const { request } = require("undici");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getrank')
        .setDescription('Gets the current rank of a player')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('e.g: myname#1234#eu')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const nameTagLocation = interaction.options.getString('input');
            const splitNameTagLocation = nameTagLocation.split("#");
            const api = await request(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${splitNameTagLocation[2]}/${splitNameTagLocation[0]}/${splitNameTagLocation[1]}`); // https://api.henrikdev.xyz/valorant/v1/mmr-history/eu/eliif/1312
            const jsonResult = await api.body.json();
            const parsedResult = new Map([
                ["Name", jsonResult.name],
                ["Tag", jsonResult.tag],
                ["Current Rank", jsonResult.data[0].currenttierpatched],
                ["RR won/lost", jsonResult.data[0].mmr_change_to_last_game],
                ["RR", jsonResult.data[0].elo],
                ["Date", jsonResult.data[0].date],
            ]);
            await interaction.reply(
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