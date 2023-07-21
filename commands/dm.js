const description = "make the bot dm you";

const init = async (interaction, client) => {
  await interaction.user.send(`hi cachon`);
  await interaction.reply(`PiviBot has sent you a message`);
};

module.exports = { init, description };
