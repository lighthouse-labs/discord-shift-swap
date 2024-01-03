const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "📜 View all the commands available to the bot!",
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setTitle(`Commands of ${client.user.username}`)
      .setColor("#2F3136")
      .setDescription("**Please Select a category to view all its commands**")
      .setImage("https://assets.lighthouselabs.ca/logos/lhl-logo.png")
      .setThumbnail(process.env.THUMBNAIL)
      .setTimestamp()
      .setFooter({
        text: `Lighthouse Labs`,
        iconURL: process.env.FOOTERIMG,
      });

    const giveaway = new MessageEmbed()
      .setTitle("Categories » Giveaway")
      .setColor("#2F3136")
      .setDescription("```yaml\nHere are the giveaway commands:```")
      .addFields(
        {
          name: "Trade",
          value: `Trade a shift to another mentor!\n > **Types: \`/trade\`**`,
          inline: true,
        },
        {
          name: "Edit",
          value: `Edit an existing shift trade period!\n > **Types: \`/edit\`**`,
          inline: true,
        },
        {
          name: "End",
          value: `End an existing shift trade period!\n > **Types: \`/end\`**`,
          inline: true,
        },
        {
          name: "Pause",
          value: `Pause an existing shift trade period!\n > **Type: \`/pause\`**`,
          inline: true,
        },
        {
          name: "Reroll",
          value: `Reroll an existing shift trade period!\n > **Types: \`/reroll\`**`,
          inline: true,
        },
        {
          name: "Resume",
          value: `Resume an existing shift trade period!\n > **Type: \`/resume\`**`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: `Lighthouse Labs`,
        iconURL: process.env.FOOTERIMG,
      });

    const general = new MessageEmbed()
      .setTitle("Categories » General")
      .setColor("#2F3136")
      .setDescription("```yaml\nHere are the general bot commands in Slash:```")
      .addFields(
        {
          name: "Help",
          value: `Show the help menu.\n > **Types: \`/help\`**`,
          inline: true,
        },
        {
          name: "About",
          value: `Show About Shift Swap.\n > **Types: \`/about\`**`,
          inline: true,
        },
        {
          name: "Ping",
          value: `Check the bot's ping!\n > **Types: \`/ping\`**`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: `Lighthouse Labs`,
        iconURL: process.env.FOOTERIMG,
      });

    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder("Please Select a Category")
          .setDisabled(state)
          .addOptions([
            {
              label: `Shift Trades`,
              value: `trades`,
              description: `View all the shift trade based commands!`,
              emoji: `🎉`,
            },
            {
              label: `General`,
              value: `general`,
              description: `View all the general bot commands!`,
              emoji: `🎉`,
            },
          ])
      ),
    ];

    const initialMessage = await interaction.reply({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      idle: 300000,
      dispose: true,
    });

    collector.on("collect", (interaction) => {
      if (interaction.values[0] === "giveaway") {
        interaction
          .update({ embeds: [giveaway], components: components(false) })
          .catch((e) => {});
      } else if (interaction.values[0] === "general") {
        interaction
          .update({ embeds: [general], components: components(false) })
          .catch((e) => {});
      }
    });
    collector.on("end", (collected, reason) => {
      if (reason == "time") {
        initialMessage.edit({
          content: "Collector Destroyed, Try Again!",
          components: [],
        });
      }
    });
  },
};
