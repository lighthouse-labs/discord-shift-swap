const { MessageActionRow, MessageSelectMenu } = require("discord.js");
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
      web: "1271462921683337319",
      data: "1271462935574609960",
      cyber: "1271462947478044793",
    };

    // Check if the member has one of the allowed roles
    const userRoles = interaction.member.roles.cache.filter((r) =>
      Object.keys(allowedRoles).includes(r.name)
    );

    // If the member doesn't have any of the allowed roles
    if (userRoles.size === 0) {
      return interaction.reply({
        content:
          "❌ | You need to have the appropriate web, data or cyber role to start a shift swap.",
        ephemeral: true,
      });
    }

    if (userRoles.size === 1) {
      // If the user has only one relevant role, use the corresponding channel
      const userRoleName = userRoles.first().name;
      const channelId = allowedRoles[userRoleName];
      const tradeChannel = client.channels.cache.get(channelId);

      // Use tradeChannel to start the giveaway
      const tradeDuration = ms(1000 * 60 * 15);
      const tradeWinnerCount = 1;
      const tradePrize = interaction.options.getString("shift");

      await interaction.deferReply({ ephemeral: true });

      client.giveawaysManager.start(tradeChannel, {
        duration: tradeDuration,
        prize: tradePrize,
        hostedBy: `<@${interaction.user.id}>`,
        winnerCount: tradeWinnerCount,
        messages,
      });

      interaction.editReply({
        content: `You dropped your shift in ${tradeChannel}!`,
        ephemeral: true,
      });
    } else {
      // If the user has more than one relevant role, present a choice
      const options = userRoles.map((role) => ({
        label: role.name,
        value: allowedRoles[role.name],
      }));

      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("select-channel")
          .setPlaceholder("Select a channel")
          .addOptions(options)
      );

      await interaction.reply({
        content: "Please select the channel where you want to post:",
        components: [row],
        ephemeral: true,
      });

      // Await the user's choice
      const filter = (i) =>
        i.customId === "select-channel" && i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      collector.on("collect", async (i) => {
        const channelId = i.values[0];
        const tradeChannel = client.channels.cache.get(channelId);

        if (!tradeChannel) {
          return i.reply({
            content: "❌ | The selected channel could not be found.",
            ephemeral: true,
          });
        }

        await i.update({
          content: `You selected: ${tradeChannel.name}`,
          components: [],
          ephemeral: true,
        });

        const tradeDuration = ms(1000 * 60 * 15);
        const tradeWinnerCount = 1;
        const tradePrize = interaction.options.getString("shift");

        await interaction.deferReply({ ephemeral: true });

        // Start giveaway
        client.giveawaysManager.start(tradeChannel, {
          duration: tradeDuration,
          prize: tradePrize,
          hostedBy: `<@${interaction.user.id}>`,
          winnerCount: tradeWinnerCount,
          messages,
        });

        interaction.editReply({
          content: `You dropped your shift in ${tradeChannel}!`,
          ephemeral: true,
        });
      });
    }
  },
};
