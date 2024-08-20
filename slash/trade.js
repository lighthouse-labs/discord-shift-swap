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
      web: "1266459443852345475",
      data: "1266459414878228598",
      cyber: "1266459384779640893",
    };

    // Check if the member has one of the allowed roles
    const userRoles = interaction.member.roles.cache.filter((r) =>
      Object.keys(allowedRoles).includes(r.name)
    );

    if (userRoles.size === 0) {
      return interaction.reply({
        content:
          "❌ | You need to have the appropriate web, data or cyber role to start a shift swap.",
        ephemeral: true,
      });
    }

    const tradeDurationStr = "15m"; // This is the duration string
    const tradeDuration = ms(tradeDurationStr); // Convert to milliseconds

    if (!tradeDuration || tradeDuration <= 0) {
      return interaction.reply({
        content: `❌ | Invalid trade duration: "${tradeDurationStr}".`,
        ephemeral: true,
      });
    }

    const tradeWinnerCount = 1;
    const tradePrize = interaction.options.getString("shift");

    if (userRoles.size === 1) {
      const userRoleName = userRoles.first().name;
      const channelId = allowedRoles[userRoleName];
      const tradeChannel = client.channels.cache.get(channelId);

      if (!tradeChannel) {
        return interaction.reply({
          content: "❌ | The corresponding channel could not be found.",
          ephemeral: true,
        });
      }

      await interaction.deferReply({ ephemeral: true });

      // Start giveaway in the channel
      client.giveawaysManager
        .start(tradeChannel, {
          duration: tradeDuration,
          prize: tradePrize,
          hostedBy: `<@${interaction.user.id}>`,
          winnerCount: tradeWinnerCount,
          messages,
        })
        .catch((error) => {
          console.error("Error starting giveaway:", error);
          interaction.editReply({
            content:
              "❌ | Failed to start the giveaway. Please try again later.",
            ephemeral: true,
          });
        });

      return interaction.editReply({
        content: `You dropped your shift in ${tradeChannel}!`,
        ephemeral: true,
      });
    } else {
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

        client.giveawaysManager
          .start(tradeChannel, {
            duration: tradeDuration,
            prize: tradePrize,
            hostedBy: `<@${interaction.user.id}>`,
            winnerCount: tradeWinnerCount,
            messages,
          })
          .catch((error) => {
            console.error("Error starting giveaway:", error);
            interaction.editReply({
              content:
                "❌ | Failed to start the giveaway. Please try again later.",
              ephemeral: true,
            });
          });

        interaction.editReply({
          content: `You dropped your shift in ${tradeChannel}!`,
          ephemeral: true,
        });
      });
    }
  },
};
