const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const { dashLogger } = require("../logger");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('gets the current rank of a player')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('e.g: myname#1234#eu')
                .setRequired(true)),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            const nameTagLocation = interaction.options.getString('input');
            const splitNameTagLocation = nameTagLocation.split('#');
            const api = await request(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${splitNameTagLocation[2]}/${splitNameTagLocation[0]}/${splitNameTagLocation[1]}`);
            const jsonResult = await api.body.json();

            if (api.statusCode != 200) throw new SyntaxError(jsonResult.errors[0].message);

            const parsedResult = new Map([
                ['Name', jsonResult.name],
                ['Tag', jsonResult.tag],
                ['Current Rank', jsonResult.data[0].currenttierpatched],
                ['RR won/lost', jsonResult.data[0].mmr_change_to_last_game],
                ['RR', jsonResult.data[0].elo],
                ['Date', jsonResult.data[0].date],
            ]);

            await interaction.editReply({
                content:
                    'Name: ' + parsedResult.get('Name') + '\n' +
                    'Tag: ' + parsedResult.get('Tag') + '\n' +
                    'Current Rank: ' + parsedResult.get('Current Rank') + '\n' +
                    'RR won/lost: ' + parsedResult.get('RR won/lost') + '\n' +
                    'Current RR: ' + parsedResult.get('RR') + '\n' +
                    'Date: ' + parsedResult.get('Date') + '\n'
            });
        } catch (e) {
            if (e instanceof SyntaxError) {
                await interaction.editReply({ content: e.message, ephemeral: true });
            }
            else {
                dashLogger.error(`Error : ${e.message}`);
                await interaction.editReply({ content: 'Something went wrong...', ephemeral: true });
            }

        }

    },
};