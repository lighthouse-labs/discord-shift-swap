const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member, reaction){
     reaction.users.remove(member.user);
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
      .setDescription(`Hello there ${member.user}\n Looks like the trade period for **${giveaway.prize} shift has ended and someone has already claimed that shift.`)
      .setImage('https://s3.ca-central-1.amazonaws.com/assets.lighthouselabs.ca/logos/larry.png')
      .setTimestamp()
      .setFooter({
        text: `Lighthouse Labs`, 
        iconURL: (process.env.FOOTERIMG)
       })
    ]
  }).catch(e => {})
  }
}