const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  async execute(trade, winners) {
    winners.forEach((member) => {
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
              .setAuthor({ name: "Congratulations!" })
              .setColor("#012D3D")
              .setDescription(
                `Hello there ${member.user}!\n Congrats! you have won the **${trade.prize} shift!**\n Make sure ${trade.hostedBy} transfers the shift(s) in ClockTower accordingly.`
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
    });
  },
};
