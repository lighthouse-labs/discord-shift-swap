const Discord = require("discord.js");
const messages = require("../utils/message")("ti");
const ms = require("ms");
module.exports = {
  name: "ti",
  description: "Post a TI redo",
  options: [
    {
      name: "ti",
      description: "What TI do you need to post?",
      type: "STRING",
      required: true,
    },
    {
      name: "duration",
      description: "How long should the TI trade last? (e.g., 15m, 1h, 30s)",
      type: "STRING",
      required: false,
    },
  ],
  run: async (client, interaction) => {
    // List of roles that are allowed to perform the action
    const allowedRoles = {
      edops: "1267542964188479560",
      admin: "1266465782863368265",
    };
    // Check if the member has one of the allowed roles
    const userRole = interaction.member.roles.cache.find((r) =>
      Object.keys(allowedRoles).includes(r.name)
    );
    // If the member doesn't have any of the allowed roles
    if (!userRole) {
      return interaction.reply({
        content:
          "❌ | You need to have the appropriate ed-ops or Admin role to start a TI trade.",
        ephemeral: true,
      });
    }
    const tradeChannel = interaction.channel;
    const tradePrize = interaction.options.getString("ti");
    const userDurationInput = interaction.options.getString("duration");
    function getDuration(input) {
      const defaultDuration = ms("20m");
      if (input) {
        const parsedDuration = ms(input);
        if (parsedDuration) {
          return parsedDuration;
        } else {
          console.error("Invalid duration format. Defaulting to 20 minutes.");
        }
      }
      return defaultDuration;
    }
    const tradeDuration = getDuration(userDurationInput);
    const tradeWinnerCount = 1;
    await interaction.deferReply({ ephemeral: true });
    // start giveaway
    client.giveawaysManager.start(tradeChannel, {
      // The giveaway duration
      duration: tradeDuration,
      // The giveaway prize
      prize: tradePrize,
      // The giveaway Host
      hostedBy: `<@${interaction.user.id}>`,
      // The giveaway winner count
      winnerCount: parseInt(tradeWinnerCount),
      messages,
    });
    interaction.editReply({
      content: `You dropped a ti in ${tradeChannel}!`,
      ephemeral: true,
    });
  },
};
