const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    // const noice = new MessageActionRow()
    //   .addComponents(
    //     new MessageButton()
    //       .setLabel("Vote Me")
    //       .setStyle("LINK")
    //       .setURL("https://discordbotlist.com/bots/ivon/upvote")
    //       .setEmoji('974160940197113916'),
    //     new MessageButton()
    //       .setLabel('Patreon')
    //       .setStyle('LINK')
    //       .setEmoji('1001122523175465061')
    //       .setURL("https://www.patreon.com/projectrazer"),
    //     new MessageButton()
    //       .setLabel("Invite Me")
    //       .setStyle("LINK")
    //       .setURL("https://discord.com/api/oauth2/authorize?client_id=973436715819745290&permissions=406881561681&scope=bot%20applications.commands")
    //       .setEmoji('984296691794583582'),
    // );
    
    let approved =  new MessageEmbed()
    // .setTimestamp()
    // .setColor("#012D3D")
    // .setAuthor({name: "Entry Confirmed!", iconURL: "https://i.imgur.com/Lf1IHlA.png"})    
    // .setDescription(
    //   `You have entered for a chance to claim the **${giveaway.prize}** shift! \nFrom: ${giveaway.hostedBy}`
    // )
    // .setFooter({ text: "LHL", iconURL: (process.env.FOOTERIMG) })
    // .setTimestamp()

    // const lol = new MessageActionRow()
    //   .addComponents(
    //     new MessageButton()
    //       .setLabel("Vote Me")
    //       .setStyle("LINK")
    //       .setURL("https://discordbotlist.com/bots/ivon/upvote")
    //       .setEmoji('974160940197113916'),
    //     new MessageButton()
    //       .setLabel('Patreon')
    //       .setStyle('LINK')
    //       .setEmoji('1001122523175465061')
    //       .setURL("https://www.patreon.com/projectrazer"),
    //     new MessageButton()
    //       .setLabel("Invite Me")
    //       .setStyle("LINK")
    //       .setURL("https://discord.com/api/oauth2/authorize?client_id=973436715819745290&permissions=406881561681&scope=bot%20applications.commands")
    //       .setEmoji('984296691794583582'),
    // );
    
   let denied =  new MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setAuthor({name: "Entry Denied!", iconURL: "https://i.imgur.com/Jjo00oT.png"})    
    .setDescription(
      `You could not be entered to claim **${giveaway.prize}**. \nPlease message an admin if you get this message. \n Shift from: ${giveaway.hostedBy}`
    )
    .setFooter({ text: "LHL", iconURL: (process.env.FOOTERIMG) })

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if(giveaway.extraData) {
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied],
          components: [lol]
        }).catch(e => {})
      }

      return reactor.send({
        embeds: [approved],
        components: [noice]
      }).catch(e => {})
    } else {
        return reactor.send({
          embeds: [approved]
        }).catch(e => {})
    }
    }
  }
