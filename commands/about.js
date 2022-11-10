const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel(`Website`)
        .setStyle('LINK')
        .setEmoji('984296691794583582')
        .setURL(`https://www.lighthouselabs.ca`),
    )
    let about = new MessageEmbed()
     .setAuthor({ 
          name: `About Shift Swap`, 
          iconURL: client.user.displayAvatarURL() 
     })    
    .setDescription('Shift Swap is a Discord bot that allows you to give shifts away to other mentors, or take shifts from mentors when needed!')
    .setColor('#2F3136')
    .setTimestamp()
    .setThumbnail(process.env.THUMBNAIL)
    .setImage('https://s3.ca-central-1.amazonaws.com/assets.lighthouselabs.ca/logos/lhl-logo.png')    
    .setFooter({
        text: `Lighthouse Labs`, 
        iconURL: (process.env.FOOTERIMG)
    })
    message.reply({ embeds: [about], components: [row]});
}