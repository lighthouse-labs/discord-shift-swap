const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'about',
    description: '📑 About Shift Swap!',
    run: async (client, interaction) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`Website`)
        .setStyle('LINK')
        .setEmoji('984296691794583582')
        .setURL(`https://ivon.netlify.app`),
      new MessageButton()
        .setLabel('Patreon')
        .setStyle('LINK')
        .setEmoji('981525828196257813')
        .setURL(`https://www.patreon.com/projectrazer`),
      new MessageButton()
        .setLabel('Invite')
        .setStyle('LINK')
        .setEmoji('966345633411768381')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=973436715819745290&permissions=406881561681&scope=bot%20applications.commands`),
    )
    let about = new MessageEmbed()
    .setAuthor({ 
          name: `About Shift Swap`, 
          iconURL: client.user.displayAvatarURL() 
     })    
    .addField("Property of", "[Project Razer](https://github.com/razerinc)", true)
    .addField(
        "Partnered With",
        "[Astra Service](https://www.astra-services.xyz/)",
        true)
    .addField(
        "Hosted On",
        "[Digital Ocean](https://www.digitalocean.com/)",
        true)
    .setDescription(`Shift Swap is a Discord bot that allows you to give shifts away to other mentors, or take shifts from mentors when needed!`)
    .setColor('#2F3136')
    .setTimestamp()
    .setThumbnail(process.env.THUMBNAIL)
    .setImage('https://i.imgur.com/1TLIl08.png')    
    .setFooter({
        text: `©️ IVON`, 
        iconURL: (process.env.FOOTERIMG)
    })
    
    interaction.reply({ embeds: [about], components: [row]});
}
}