const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? `<@&${993594724965421206}>\n\n` : "") +
    "\n🎉 **SHIFT TRADE!** 🎉",
  giveawayEnded:
    (config.everyoneMention ? `<@&${993594724965421206}>\n\n` : "") +
    "ℹ️ **SHIFT TRADE PERIOD ENDED.** ℹ️",
  drawing:  `Ends: **{timestamp}**`,
  color: "#012D3D",
  inviteToParticipate: `React with ✋ to participate!`,
  winMessage: "Congratulations, {winners}! You won the **{this.prize}** shift from {this.hostedBy}! Please make sure {this.hostedBy} updates the initials accordingly in the schedule.",  
  embedFooter: `{this.winnerCount} winner`,
  noWinner: "Hello {this.hostedBy}. \n This trade shift period has ended and nobody claimed your shift. If you'd like to try again, you can restart the command.",
  hostedBy: "Hosted by: {this.hostedBy}.",
  winners: "winner",
  endedAt: "Ended at"
}
