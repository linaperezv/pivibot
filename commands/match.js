const {
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");

const description = "Create a new match!";

const options = [
  {
    name: "game",
    description: "What do you want to play?",
    required: true,
    type: ApplicationCommandOptionType.String,
    choices: [
      {
        name: "Fifa",
        value: "fifa",
      },
      {
        name: "LOL",
        value: "lol",
      },
      {
        name: "PetSociety",
        value: "petsociety",
      },
    ],
  },
  {
    name: "bet",
    description: "How much money do you want to put into the bet?",
    required: true,
    type: ApplicationCommandOptionType.Number,
  },
  {
    name: "pivicoins",
    description: "How many PiviCoins do you want to put into the bet?",
    required: true,
    type: ApplicationCommandOptionType.Number,
  },
  {
    name: "rounds",
    description: "How many rounds do you want to play?",
    required: true,
    type: ApplicationCommandOptionType.Number,
  },
  {
    name: "gamemode",
    description: "What game mode do you want to use?",
    required: true,
    type: ApplicationCommandOptionType.String,
    choices: [
      {
        name: "n/a",
        value: "n/a",
      },
      {
        name: "idk",
        value: "idk",
      },
      {
        name: "idk",
        value: "idk",
      },
    ],
  },
  {
    name: "platform",
    description: "What platform are you using to play?",
    required: true,
    type: ApplicationCommandOptionType.String,
    choices: [
      {
        name: "Xbox",
        value: "xbox",
      },
      {
        name: "PlayStation",
        value: "PlayStation",
      },
      {
        name: "Switch",
        value: "switch",
      },
    ],
  },
  {
    name: "crossplay",
    description: "Do you want to allow crossplay?",
    required: true,
    type: ApplicationCommandOptionType.Boolean,
  },
  {
    name: "type-of-match",
    description: "What type of match do you want to play?",
    required: true,
    type: ApplicationCommandOptionType.String,
    choices: [
      {
        name: "Casual",
        value: "casual",
      },
      {
        name: "Challenge",
        value: "challenge",
      },
    ],
  },
];

const init = async (interaction, client) => {
  const game = interaction.options.getString("game");
  const bet = interaction.options.getNumber("bet");
  const pivicoins = interaction.options.getNumber("pivicoins");
  const rounds = interaction.options.getNumber("rounds");
  const platform = interaction.options.getString("platform");
  const crossplay = interaction.options.getBoolean("crossplay");
  const matchtype = interaction.options.getString("type-of-match");

  try {

    const embed = new EmbedBuilder()
      .setTitle(`A new match was created by ${interaction.user.tag}!`)
      .setDescription("are you up for the challenge?")
      .setColor(0x18e1ee)
      .setTimestamp(Date.now())
      .addFields([
        { name: `Game`, value: `${game}`, inline: true },
        { name: `Bet`, value: `${bet}`, inline: true },
        { name: `PiviCoins`, value: `${pivicoins}`, inline: true },
        { name: `Rounds`, value: `${rounds}`, inline: true },
        { name: `Platform`, value: `${platform}`, inline: true },
        { name: `CrossPlay`, value: `${crossplay}`, inline: true },
        { name: `Match type`, value: `${matchtype}`, inline: true },
      ]);
    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error(`Error creating match: ${error.message}`);
    await interaction.reply("Failed to create match request");
  }
};

module.exports = { init, options, description };
