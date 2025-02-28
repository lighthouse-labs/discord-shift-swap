const config = require("../config.json");
module.exports = (commandType) => {
  const isTI = commandType === "ti";

  return {
    giveaway: isTI ? "🎉 **TI REDO!** 🎉" : "🎉 **SHIFT TRADE!** 🎉",
    giveawayEnded: isTI
      ? "ℹ️ **TI REDO PERIOD ENDED.** ℹ️"
      : "ℹ️ **SHIFT TRADE PERIOD ENDED.** ℹ️",
    drawing: `Ends: **{timestamp}**`,
    color: "#012D3D",
    inviteToParticipate: `React with ✋ to participate!`,
    winMessage: isTI
      ? "Congratulations, {winners}! You won the **{this.prize}** TI! {this.hostedBy} will add the shift in ClockTower or coordinate timing as needed!"
      : "Congratulations, {winners}! You won the **{this.prize}** shift from {this.hostedBy}! Please make sure {this.hostedBy} transfers the shift(s) in ClockTower accordingly.",
    embedFooter: `{this.winnerCount} winner`,
    noWinner: isTI
      ? "Hello {this.hostedBy}. \n This TI redo period has ended and nobody claimed the TI. If you'd like to try again, you can restart the command."
      : "Hello {this.hostedBy}. \n This trade shift period has ended and nobody claimed your shift. If you'd like to try again, you can restart the command.",
    hostedBy: "Hosted by: {this.hostedBy}.",
    winners: "winner",
    endedAt: "Ended at",
  };
};
