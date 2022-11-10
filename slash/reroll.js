module.exports = {
    name: "reroll",
    description: '🎉 Reroll a shift trade',

    options: [
        {
            name: 'shift',
            description: 'The shift trade to reroll. (message ID or shift name)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.roles.cache.some((r) => r.name === "admin")) {
            return interaction.reply({
                content: '❌ | You need to be an admin to reroll shift trades. Please message an admin if you need help.',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('shift');

        // try to find the shift with the provided prize OR with the ID
        const shift =
            // Search with shift prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with shift ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no shift was found
        if (!shift) {
            return interaction.reply({
                content: 'Unable to find a shift trade for `' + query + '`.',
                ephemeral: true
            });
        }

        if (!shift.ended) {
            return interaction.reply({
                content: `[This shift trade](https://discord.com/channels/${shift.guildId}/${shift.channelId}/${shift.messageId}) has not been ended yet`,
                ephemeral: true
            });
        }

        // Reroll the shift
        client.giveawaysManager.reroll(shift.messageId)
            .then(() => {
                // Success message
                interaction.reply(`Rerolled **[this shift trade](https://discord.com/channels/${shift.guildId}/${shift.channelId}/${shift.messageId})!**`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};