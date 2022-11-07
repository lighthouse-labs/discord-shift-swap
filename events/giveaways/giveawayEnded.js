const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const Discord = require('discord.js');

module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({  
        components: [new MessageActionRow()
                    .addComponents(
                          new MessageButton()
                      .setLabel("See the shift trade message.")
                      .setStyle("LINK")
                      .setURL(`https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}`)
                      .setEmoji('973495590921043968'))],
        embeds: [new MessageEmbed()
          .setAuthor({name: "Congratulations!"})
          .setColor("#012D3D")
          .setDescription(`Hello there ${member.user}\n Congrats, you have won the **${giveaway.prize} shift!**\n Make sure ${giveaway.hostedBy} updates the initials in the schedule accordingly.`)
          .setImage('https://s3.ca-central-1.amazonaws.com/assets.lighthouselabs.ca/logos/larry.png')
          .setTimestamp()
          .setFooter({
            text: `Lighthouse Labs`, 
            iconURL: (process.env.FOOTERIMG)
           })
        ]
      }).catch(e => {})
    });
  }
}
