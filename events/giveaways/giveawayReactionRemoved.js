const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      // components: [new MessageActionRow()
      //               .addComponents(
      //                     new MessageButton()
      //                 .setLabel("Jump to the Giveaway")
      //                 .setStyle("LINK")
      //                 .setURL(`https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}`)
      //                 .setEmoji('973495590921043968'))],
      embeds: [new MessageEmbed()
        .setTimestamp()
        .setAuthor({name: "Reaction Removed!", iconURL: "https://s3.ca-central-1.amazonaws.com/assets.lighthouselabs.ca/logos/Lighthouse.png"})
        .setTitle(`You removed your reaction from **${giveaway.prize}**!`)
        .setColor("#2F3136")
        .setDescription(
          `Your reaction to **${giveaway.prize}** on has been removed!\n This means you're removed as a valid mentor to claim the shift.\n Think It was a mistake? **Go react again!**`
        )
        .setFooter({ text: "LHL", iconURL: (process.env.FOOTERIMG) })
      ]
    }).catch(e => {})

  }
}
