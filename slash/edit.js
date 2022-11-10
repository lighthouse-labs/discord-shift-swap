module.exports = {
    name: 'edit',
    description: '🎉 Edit a shift trade',

    options: [
        {
            name: 'shift',
            description: 'The shift trade period to end (message ID)',
            type: 'STRING',
            required: true
        },
        {
            name: 'duration',
            description: 'Setting time of mentioned shift trade period. Eg. 1h',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'How many winners the shift should have',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'What the prize of the shift should be',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.roles.cache.some((r) => r.name === "admin")) {
            return interaction.reply({
                content: '❌ | You need to be an admin to edit shift trades. Please message an admin if you need help.',
                ephemeral: true
            });
        }
        const gid = interaction.options.getString('shift');
        const time = interaction.options.getString('duration');
        const winnersCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        
        await interaction.deferReply({
         ephemeral: true
        })
        // Edit the shift
        try {
        await client.shiftsManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
        })
        } catch(e) {
return interaction.editReply({
            content:
                `No shift trade found with the given message ID: \`${gid}\``,
            ephemeral: true
        });
        }
        interaction.editReply({
            content:
                `This shift trade has now been edited!`,
            ephemeral: true
        });
    }

};
