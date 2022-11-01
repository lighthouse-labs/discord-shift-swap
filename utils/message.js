const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@mentors\n\n" : "") +
    "🎉 **A shift has been dropped!** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "@mentors\n\n" : "") +
    "❌❌ **The shift was claimed.** ❌❌",
  drawing:  `Ends: **{timestamp}**`,
  color: "#012D3D",
  inviteToParticipate: `React with 🎉 to participate!`,
  winMessage: "Congratulations, {winners}! You've claimed **{this.prize}**!",  
  embedFooter: `{this.winnerCount} winner`,
  noWinner: "Nobody claimed the shift, to drop the shift again, please start again.",
  hostedBy: "Hosted by: {this.hostedBy}",
  winners: "winner",
  endedAt: "Ended at"
}
