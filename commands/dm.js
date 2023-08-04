const description = "make the bot dm you";

const init = async (interaction, client) => {
  await interaction.user.send(`hi`);
  await interaction.reply({ content: "PiviBot has sent you a message", ephemeral: true });
}

module.exports = { init, description };
