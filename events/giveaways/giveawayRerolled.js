const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new MessageEmbed()
          .setAuthor({name: "Congratulations!", iconURL: (process.env.THUMBNAIL)})
          .setThumbnail(process.env.THUMBNAIL)
          .setColor("#2F3136")
          .setDescription(`Hello there ${member.user}\n ${giveaway.hostedBy} rerolled ${giveaway.prize} and you have won it! \nPlease make sure they change the initials accordingly in the schedule.`)
          .setTimestamp()
          .setFooter({
            text: "Lighthouse Labs", 
            iconURL: (process.env.FOOTERIMG)
          })
        ]
      }).catch(e => {})
    });
  }
}
