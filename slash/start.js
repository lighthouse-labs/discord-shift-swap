const Discord = require("discord.js")
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'start',
  description: '🎉 Start a giveaway',

  options: [
    // {
      // name: 'duration',
      // description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
      // type: 'STRING',
      // required: true
    // },
    // {
    //   name: 'winners',
    //   description: 'How many winners the giveaway should have',
    //   type: 'INTEGER',
    //   required: true
    // },
    {
      name: 'prize',
      description: 'What shift do you need to give away?',
      type: 'STRING',
      required: true
    },
    {
      name: 'channel',
      description: 'The channel to start the giveaway in',
      type: 'CHANNEL',
      required: true
    },
  ],

  run: async (client, interaction) => {

    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: '❌ | You need to have the manage messages permissions to start giveaways.',
        ephemeral: true
      });
    }
  
    const giveawayDuration = (ms(60000));
    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayWinnerCount = (1);
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: '❌ | Please select a text channel!',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: '❌ | Please select a valid duration!',
      ephemeral: true
    });
  }


  await interaction.deferReply({ ephemeral: true })

    // if (giveawayWinnerCount < 1) {
    //   return interaction.reply({
    //     content: '❌ | Please select a valid winner count! greater or equal to one.',
    //   })
    // }

    // start giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway Host
      hostedBy: `<@${interaction.user.id}>`,
      // The giveaway winner count
      winnerCount: parseInt(giveawayWinnerCount),
      // BonusEntries If Provided
      // bonusEntries: [
      //   {
      //     // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
      //     bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
      //     cumulative: false
      //   }
      // ],
      // Messages
      // messages,
      // extraData: {
      //   role: rolereq == null ? "null" : rolereq.id,
      // }
    });
    interaction.editReply({
      content:
        `You dropped your shift in ${giveawayChannel}!`,
      ephemeral: true
    })

    // if (bonusRole) {
    //   let giveaway = new Discord.MessageEmbed()
    //     .setAuthor({ name: `Bonus Entries Alert!` })
    //     .setDescription(
    //       `**${bonusRole}** Has **${bonusEntries}** Extra Entries in this giveaway!`
    //     )
    //     .setColor("#2F3136")
    //     .setTimestamp();
    //   giveawayChannel.send({ embeds: [giveaway] });
    // }

    // if (invite) {
    //   let giveaway = new Discord.MessageEmbed()
    //     .setAuthor({ name: `Server Joining Required!` })
    //     .setDescription(`**You need to join this server to enter the giveaway!**\n Join the server by clicking the button \n Join the server first and react 🎉 to participate \n Afraid of buttons? Here is the [link](${invite})`)
    //     .setImage('https://i.imgur.com/JXQeKyr.png')
    //     .setColor("#2F3136")
    //     .setFooter({ text: '©️ IVON', iconURL: (process.env.FOOTERIMG) })
    //     .setTimestamp();

    //   const row = new MessageActionRow()
    // .addComponents(
    //     new MessageButton()
    //     .setLabel('Join the Server')
    //     .setStyle('LINK')
    //     .setEmoji('903201241184751618')
    //     .setURL(`${invite}`))
      
    // giveawayChannel.send({ embeds: [giveaway], components: [row] });
    // }

  }

};
