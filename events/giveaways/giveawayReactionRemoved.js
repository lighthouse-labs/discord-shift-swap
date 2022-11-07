const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new MessageEmbed()
        .setTimestamp()
        .setAuthor({name: "Reaction Removed!", iconURL: "https://s3.ca-central-1.amazonaws.com/assets.lighthouselabs.ca/logos/Lighthouse.png"})
        .setTitle(`You removed your reaction from **${giveaway.prize}**!`)
        .setColor("#2F3136")
        .setDescription(
          `Your reaction to **${giveaway.prize}** on has been removed!\n This means you're removed as a valid mentor to claim the shift.\n If you didn't mean to do this, go react again!`
        )
        .setFooter({ text: "Lighthouse Labs", iconURL: (process.env.FOOTERIMG) })
      ]
    }).catch(e => {})

  }
}
