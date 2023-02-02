const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const wait = require('node:timers/promises').setTimeout;

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
            const nameTagLocation = interaction.options.getString('input');
            const splitNameTagLocation = nameTagLocation.split('#');
            const api = await request(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${splitNameTagLocation[2]}/${splitNameTagLocation[0]}/${splitNameTagLocation[1]}`);

            if (api.statusCode == 404) throw new SyntaxError('Player not found: Check if you spelled everything correctly!');

            const jsonResult = await api.body.json();
            const parsedResult = new Map([
                ['Name', jsonResult.name],
                ['Tag', jsonResult.tag],
                ['Current Rank', jsonResult.data[0].currenttierpatched],
                ['RR won/lost', jsonResult.data[0].mmr_change_to_last_game],
                ['RR', jsonResult.data[0].elo],
                ['Date', jsonResult.data[0].date],
            ]);

            await interaction.deferReply({ ephemeral: true });
            await wait(2500);
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
                await interaction.reply({ content: e.message, ephemeral: true });
            }
            else {
                await interaction.reply({ content: 'Something went wrong...', ephemeral: true });
            }

        }

    },
};