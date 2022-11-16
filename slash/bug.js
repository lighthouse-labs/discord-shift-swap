const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: "bug",
  description: "Report a bug",
  options: [
    {
      name: 'describe',
      description: 'Describe the bug as much details as possible',
      type: 'STRING',
      required: true
    },
  ],

  run: async (client, interaction) => {

    const channel = client.channels.cache.find(client.channels.cache.find(channel => channel.name === "moderation"));
    const bugs = interaction.options.getString('describe');
    const embed = new MessageEmbed()
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setTitle(`New Bug Report`)
      .setFields(
        {name: 'Reporter', value: `\`${interaction.user.username}\``, inline: true},
        {name: 'Reporter ID', value: `\`${interaction.user.id}\``, inline: true},
        {name: 'Reporter BD', value: `<t:${parseInt(interaction.user.createdTimestamp / 1000)}:R>`, inline: true},
        {name: 'Server', value: `\`${interaction.guild.name}\``, inline: true},
        {name: 'Server ID', value: `\`${interaction.guild.id}\``, inline: true},
        {name: 'Creation Date', value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>`, inline: true},
      )
      .setDescription(`${bugs}`)
      .setColor('#2F3136')
      .setFooter({ text: `Reported by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
      .setTimestamp()

    const userr = new MessageEmbed()
     .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
     .setThumbnail('https://s3.ca-central-1.amazonaws.com/assets.lighthouselabs.ca/logos/Lighthouse.png') 
     .setDescription("**Your Report Has Been Submitted!**")
     .setColor('#2F3136')

    const dm = new MessageEmbed()
     .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
     .setTitle('Thank you!') 
     .setDescription("Thank you for posting this report. This helps us monitor and keep our bot clean and working! Have a good day!")
     .setColor('#2F3136')
    .setFooter({ text: 'Lighthouse Labs', iconURL: 'https://s3.ca-central-1.amazonaws.com/assets.lighthouselabs.ca/logos/Lighthouse.png' })

    const row = new MessageActionRow()
       .addComponents(
    	new MessageButton()
    .setLabel("Website")
    .setStyle("LINK")
    .setURL("https://www.lighthouselabs.ca")
    .setEmoji('1010217251384868944'),
    );

    channel.send({ embeds: [embed] });
    interaction.member.send({ embeds: [dm], components: [row] });
    interaction.reply({embeds: [userr], components: [row] });
  }
};
