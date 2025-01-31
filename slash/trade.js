const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const messages = require("../utils/message")("trade");
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
    // List of roles that are allowed to perform the action, using role ID as key
    const allowedRoles = {
      "1266460843525148774": "1266459443852345475", // web role ID -> channel ID
      "1266460754639327263": "1266459414878228598", // data role ID -> channel ID
      "1266460877108936875": "1266459384779640893", // cyber role ID -> channel ID
    };

    // Find the role the user has and match it to the allowedRoles object by ID
    const userRole = interaction.member.roles.cache.find(
      (r) => Object.keys(allowedRoles).includes(r.id) // Check if the user's role ID matches the allowed role IDs
    );

    if (!userRole) {
      return interaction.reply({
        content:
          "❌ | You need to have the appropriate web, data or cyber role to start a shift swap.",
        ephemeral: true,
      });
    }

    // Get the corresponding channel ID based on the user's role ID
    const channelId = allowedRoles[userRole.id];

    if (!channelId) {
      return interaction.reply({
        content:
          "❌ | Could not determine the correct trade channel. Please contact an admin.",
        ephemeral: true,
      });
    }

    // Fetch the trade channel based on the mapped channel ID
    let tradeChannel = await client.channels.fetch(channelId).catch((err) => {
      console.log(`❌ Could not fetch channel ${channelId}:`, err);
    });

    if (!tradeChannel) {
      return interaction.reply({
        content:
          "❌ | Could not find a valid text channel. Please contact an admin.",
        ephemeral: true,
      });
    }

    const tradeDuration = ms("45m");
    const tradeWinnerCount = 1;
    const tradePrize = interaction.options.getString("shift");

    await interaction.deferReply({ ephemeral: true });

    // Start giveaway
    client.giveawaysManager.start(tradeChannel, {
      duration: tradeDuration,
      prize: tradePrize,
      hostedBy: `<@${interaction.user.id}>`,
      winnerCount: parseInt(tradeWinnerCount),
      messages,
    });

    interaction.editReply({
      content: `You dropped your shift in ${tradeChannel}!`,
      ephemeral: true,
    });
  },
};
