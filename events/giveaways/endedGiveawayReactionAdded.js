const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  async execute(trade, member, reaction) {
    reaction.users.remove(member.user);
    member
      .send({
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel("See the shift trade message.")
              .setStyle("LINK")
              .setURL(
                `https://discord.com/channels/${trade.guildId}/${trade.channelId}/${trade.messageId}`
              )
              .setEmoji("973495590921043968")
          ),
        ],
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Aw Snap!" })
            .setColor("#012D3D")
            .setDescription(
              `Hello there ${member.user}\n Looks like the trade period for **${trade.prize}** shift has ended and someone has already claimed that shift.`
            )
            .setImage("https://assets.lighthouselabs.ca/logos/larry.png")
            .setTimestamp()
            .setFooter({
              text: `Lighthouse Labs`,
              iconURL: process.env.FOOTERIMG,
            }),
        ],
      })
      .catch((e) => {});
  },
};
