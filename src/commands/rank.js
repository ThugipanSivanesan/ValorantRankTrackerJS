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
            const [name, tag, region] = nameTagLocation.split('#').map(part => part?.trim());

            if (!name || !tag || !region) {
                throw new SyntaxError('Invalid input. Use the format `name#tag#region`, e.g. `myname#1234#eu`.');
            }

            const api = await request(
                `https://api.henrikdev.xyz/valorant/v1/mmr-history/${encodeURIComponent(region)}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`
            );
            const jsonResult = await api.body.json();

            if (api.statusCode !== 200) throw new SyntaxError(jsonResult.errors?.[0]?.message ?? 'Request failed.');

            const latest = jsonResult.data?.[0];
            if (!latest) throw new SyntaxError('No competitive match history found for this player.');

            await interaction.editReply({
                content:
                    `Name: ${jsonResult.name}\n` +
                    `Tag: ${jsonResult.tag}\n` +
                    `Current Rank: ${latest.currenttierpatched}\n` +
                    `RR won/lost: ${latest.mmr_change_to_last_game}\n` +
                    `Current RR: ${latest.elo}\n` +
                    `Date: ${latest.date}\n`
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