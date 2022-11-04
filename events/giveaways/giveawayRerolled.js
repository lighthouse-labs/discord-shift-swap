const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        // components: [new MessageActionRow()
        //             .addComponents(
        //                   new MessageButton()
        //               .setLabel("Jump to the Giveaway")
        //               .setStyle("LINK")
        //               .setURL(`https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}`)
        //               .setEmoji('973495590921043968'),
        //             new MessageButton()
        //               .setLabel("Vote Me")
        //               .setStyle("LINK")
        //               .setURL("https://discordbotlist.com/bots/ivon/upvote")
        //               .setEmoji('974160940197113916'),
        //                   new MessageButton()
        //               .setLabel("Invite Me")
        //               .setStyle("LINK")
        //               .setURL("https://discord.com/api/oauth2/authorize?client_id=973436715819745290&permissions=406881561681&scope=bot%20applications.commands")
        //               .setEmoji('984296691794583582'))],
        embeds: [new MessageEmbed()
          .setAuthor({name: "Congratulations!", iconURL: (process.env.THUMBNAIL)})
          .setThumbnail(process.env.THUMBNAIL)
          .setColor("#2F3136")
          .setDescription(`Hello there ${member.user}\n ${giveaway.hostedBy} rerolled ${giveaway.prize} and you have won it! \nPlease make sure they change the initials accordingly in the schedule.`)
          .setTimestamp()
          .setFooter({
            text: "LHL", 
            iconURL: (process.env.FOOTERIMG)
          })
        ]
      }).catch(e => {})
    });
  }
}
