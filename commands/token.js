const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setColor('#2F3136')
    .setDescription("**no**")
    ;
  message.reply({ content: " ", embeds: [embed] })
}