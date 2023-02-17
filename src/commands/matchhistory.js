const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('matchhistory')
        .setDescription('gets the last rank match of a player')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('e.g: myname#1234#eu')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const nameTagLocation = interaction.options.getString('input');
            const splitNameTagLocation = nameTagLocation.split('#');
            const api = await request(`https://api.henrikdev.xyz/valorant/v3/matches/${splitNameTagLocation[2]}/${splitNameTagLocation[0]}/${splitNameTagLocation[1]}`);
            const jsonResult = await api.body.json();

            if (api.statusCode != 200) throw new SyntaxError(jsonResult.errors[0].message);
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                await interaction.reply({ content: e.message, ephemeral: true });
            }
            else {
                await interaction.reply({ content: 'Something went wrong...', ephemeral: true });
            }
        }
    }
}