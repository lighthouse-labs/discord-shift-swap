const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "about",
  description: "📑 About Shift Swap!",
  run: async (client, interaction) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel(`Website`)
        .setStyle("LINK")
        .setEmoji("980836897595211826")
        .setURL(`https://www.lighthouselabs.ca/`)
    );
    let about = new MessageEmbed()
      .setAuthor({
        name: `About Shift Swap`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(
        `Shift Swap is a Discord bot that allows you to give shifts away to other mentors, or take shifts from mentors when needed!`
      )
      .setColor("#2F3136")
      .setTimestamp()
      .setThumbnail(process.env.THUMBNAIL)
      .setImage("https://assets.lighthouselabs.ca/logos/lhl-logo.png")
      .setFooter({
        text: `Lighthouse Labs`,
        iconURL: process.env.FOOTERIMG,
      });

    interaction.reply({ embeds: [about], components: [row] });
  },
};
