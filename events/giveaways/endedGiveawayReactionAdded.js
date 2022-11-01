const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member, reaction){
     reaction.users.remove(member.user);
  member.send(`**Aw snap! Looks like someone already claimed that shift!**`).catch(e => {})
  }
}