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
                      //     new MessageButton()
                      // .setLabel("Vote Me")
                      // .setStyle("LINK")
                      // .setURL("https://discordbotlist.com/bots/ivon/upvote")
                      // .setEmoji('974160940197113916'),
                      //     new MessageButton()
                      // .setLabel("Invite Me")
                      // .setStyle("LINK")
                      // .setURL("https://discord.com/api/oauth2/authorize?client_id=973436715819745290&permissions=406881561681&scope=bot%20applications.commands")
                      // .setEmoji('984296691794583582'))],
        embeds: [new MessageEmbed()
          .setAuthor({name: "Congratulations!"})
          .setColor("#012D3D")
          .setDescription(`Hello there ${member.user}\n Congrats, you have won the **${giveaway.prize} shift!**\n Make sure ${giveaway.hostedBy} updates the initials in the schedule accordingly.`)
          .setImage('https://s3.ca-central-1.amazonaws.com/assets.lighthouselabs.ca/logos/larry.png')
          .setTimestamp()
          .setFooter({
            text: `LHL`, 
            iconURL: (process.env.FOOTERIMG)
           })
        ]
      }).catch(e => {})
    });
  }
}

// module.exports = {
//   async execute(giveaway, hostedBy, noWinner) {
//     hostedBy.forEach((noWinner) => {
//       noWinner.send({  
//         components: [new MessageActionRow()
//                     .addComponents(
//                           new MessageButton()
//                       .setLabel("See the shift trade message.")
//                       .setStyle("LINK")
//                       .setURL(`https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}`)
//                       .setEmoji('973495590921043968'))],
//                       //     new MessageButton()
//                       // .setLabel("Vote Me")
//                       // .setStyle("LINK")
//                       // .setURL("https://discordbotlist.com/bots/ivon/upvote")
//                       // .setEmoji('974160940197113916'),
//                       //     new MessageButton()
//                       // .setLabel("Invite Me")
//                       // .setStyle("LINK")
//                       // .setURL("https://discord.com/api/oauth2/authorize?client_id=973436715819745290&permissions=406881561681&scope=bot%20applications.commands")
//                       // .setEmoji('984296691794583582'))],
//         embeds: [new MessageEmbed()
//           .setAuthor({name: "Aw Snap!"})
//           .setColor("#012D3D")
//           .setDescription(`Hello there ${giveaway.hostedBy}\nNobody claimed your **${giveaway.prize} shift.**\n Please try again.`)
//           .setImage('https://s3.ca-central-1.amazonaws.com/assets.lighthouselabs.ca/logos/larry.png')
//           .setTimestamp()
//           .setFooter({
//             text: `LHL`, 
//             iconURL: (process.env.FOOTERIMG)
//            })
//         ]
//       }).catch(e => {})
//     });
//   }
// }
