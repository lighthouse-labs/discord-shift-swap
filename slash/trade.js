const Discord = require("discord.js")
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'trade',
  description: '🎉 Drop a shift!',

  options: [
    {
      name: 'shift',
      description: 'What shift do you need to give away? Please put it in a format like this: **Nov 1, 5-8pm EST**',
      type: 'STRING',
      required: true
    },
  ],

  run: async (client, interaction) => {

    // If the member doesn't have enough permissions
    if (!interaction.member.roles.cache.some((r) => r.name === "mentors")) {
      return interaction.reply({
        content: '❌ | You need to be a mentor to start a shift swap.',
        ephemeral: true
      });
    }
  
    const tradeDuration = (ms(60000));
    const tradeChannel = (client.channels.cache.get(`993594725422596129`));
    const tradeWinnerCount = (1);
    const tradePrize = interaction.options.getString('shift');

  await interaction.deferReply({ ephemeral: true })

    // start giveaway
    client.giveawaysManager.start(tradeChannel, {
      // The giveaway duration
      duration: ms(tradeDuration),
      // The giveaway prize
      prize: tradePrize,
      // The giveaway Host
      hostedBy: `<@${interaction.user.id}>`,
      // The giveaway winner count
      winnerCount: parseInt(tradeWinnerCount),
      messages,
    });
    interaction.editReply({
      content:
        `You dropped your shift in ${tradeChannel}!`,
      ephemeral: true
    })
  }

};
