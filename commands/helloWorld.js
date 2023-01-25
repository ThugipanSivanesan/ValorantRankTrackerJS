const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helloworld')
        .setDescription('Prints hello world'),
    async execute(interaction) {
        await interaction.reply('Hello World');
    },
};

