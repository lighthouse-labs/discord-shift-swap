const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
  async execute(trade, reactor, messageReaction) {

  let approved =  new MessageEmbed()

  let denied =  new MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setAuthor({name: "Entry Denied!", iconURL: "https://i.imgur.com/Jjo00oT.png"})    
    .setDescription(
      `You could not be entered to claim **${trade.prize}**. \nPlease message an admin if you get this message. \n Shift from: ${trade.hostedBy}`
    )
    .setFooter({ text: "Lighthouse Labs", iconURL: (process.env.FOOTERIMG) })

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if (trade.extraData) {
      if (trade.extraData.role !== "null" && !reactor.roles.cache.get(trade.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied],
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
