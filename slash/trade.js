const Discord = require("discord.js");
const messages = require("../utils/message");
const ms = require("ms");
module.exports = {
  name: "trade",
  description: "🎉 Drop a shift!",

  options: [
    {
      name: "shift",
      description:
        "What shift do you need to give away? Please put it in a format like this: **Nov 1st, 5-8pm EST**.",
      type: "STRING",
      required: true,
    },
  ],

  run: async (client, interaction) => {
    // List of roles that are allowed to perform the action
    const allowedRoles = {
      web: "1266459443852345475",
      data: "1266459414878228598",
      cyber: "1266459384779640893",
    };

    // Check if the member has one of the allowed roles
    const userRole = interaction.member.roles.cache.find((r) =>
      Object.keys(allowedRoles).includes(r.name)
    );

    // If the member doesn't have any of the allowed roles
    if (!userRole) {
      return interaction.reply({
        content:
          "❌ | You need to have the appropriate web, data or cyber role to start a shift swap.",
        ephemeral: true,
      });
    }

    const channelId = allowedRoles[userRole.name];
    const tradeChannel = client.channels.cache.get(channelId);

    const tradeDuration = ms(1000 * 60 * 15);
    const tradeWinnerCount = 1;
    const tradePrize = interaction.options.getString("shift");

    await interaction.deferReply({ ephemeral: true });

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
      content: `You dropped your shift in ${tradeChannel}!`,
      ephemeral: true,
    });
  },
};
