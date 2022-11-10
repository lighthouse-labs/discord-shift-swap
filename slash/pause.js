module.exports = {
    name: "pause",
    description: '⏸ Pause a shift trade',

    options: [
        {
            name: 'shift',
            description: 'The shift trade to pause. (message ID or shift name)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.roles.cache.some((r) => r.name === "admin")) {
            return interaction.reply({
                content: '❌ | You need to be an admin to pause shift trades. Please message an admin if you need help.',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('shift');

        // try to find the shift with prize alternatively with ID
        const shift =
            // Search with shift prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with shift ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no shift was found
        if (!shift) {
            return interaction.reply({
                content: 'Unable to find a shift for `' + query + '`.',
                ephemeral: true
            });
        }

        if (shift.pauseOptions.isPaused) {
            return interaction.reply({
                content: `**[This shift trade](https://discord.com/channels/${shift.guildId}/${shift.channelId}/${shift.messageId})** is already paused.`,
                ephemeral: true
            });
        }

        // Edit the shift
        client.giveawaysManager.pause(shift.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.reply(`**[This shift trade](https://discord.com/channels/${shift.guildId}/${shift.channelId}/${shift.messageId})** has now been paused!`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};