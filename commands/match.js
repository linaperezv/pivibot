const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  Colors,
  ChannelType,
  PermissionFlagsBits,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
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
    const user = interaction.member;
    const roleName = `${game}-match-${interaction.user.id}-group`;

    const role = await interaction.guild.roles.create({
      name: roleName,
      color: Colors.LuminousVividPink,
      permissions: [],
      reason: "Temporary role for the match creator",
    });

    await user.roles.add(role);

    const channelName = `${game}-match-${interaction.user.id}`;
    const categoryID = "1136316742377947186";

    const channel = await interaction.guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      parent: categoryID,
      permissionOverwrites: [
        {
          id: role.id,
          allow: [PermissionFlagsBits.ViewChannel], // Deny the role from viewing the channel
        },
        {
          id: interaction.guild.roles.everyone,
          deny: [PermissionFlagsBits.ViewChannel], // Deny the @everyone role from viewing the channel
        },
      ],
    });
    const join = new ButtonBuilder()
      .setCustomId(`join-${user.id}-${channel.id}-${bet}`)
      .setLabel("Request to Join")
      .setStyle(ButtonStyle.Primary);

    const offer10less = new ButtonBuilder()
      .setCustomId(`offer10less-${user.id}-${channel.id}-${Math.round(bet * 0.9)}`)
      .setLabel(`offer $${Math.round(bet * 0.9)}`)
      .setStyle(ButtonStyle.Secondary);

    const offer10more = new ButtonBuilder()
      .setCustomId(`offer10more-${user.id}-${channel.id}-${Math.round(bet * 1.1)}`)
      .setLabel(`offer $${Math.round(bet * 1.1)}`)
      .setStyle(ButtonStyle.Secondary);

    const offer20more = new ButtonBuilder()
      .setCustomId(`offer20more-${user.id}-${channel.id}-${Math.round(bet * 1.2)}`)
      .setLabel(`offer $${Math.round(bet * 1.2)}`)
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(
      join,
      offer10less,
      offer10more,
      offer20more
    );

    const embed = new EmbedBuilder()
      .setTitle(`A new match was created by ${interaction.user.tag}!`)
      .setDescription("Are you up for the challenge?")
      .setColor(0x18e1ee)
      .setTimestamp(Date.now())
      .addFields([
        { name: `Game`, value: `${game}`, inline: true },
        { name: `Bet`, value: `$${bet}`, inline: true },
        { name: `PiviCoins`, value: `$${pivicoins}`, inline: true },
        { name: `Rounds`, value: `${rounds}`, inline: true },
        { name: `Platform`, value: `${platform}`, inline: true },
        { name: `CrossPlay`, value: `${crossplay}`, inline: true },
        { name: `Match type`, value: `${matchtype}`, inline: true },
      ]);
    await interaction.reply({ embeds: [embed], components: [row] });
    await interaction.user.send(
      `Your match has been created, we'll let you know when someone wants to join you!`
    );
  } catch (error) {
    console.error(`Error creating match: ${error.message}`);
    await interaction.reply({
      content: "Failed to create match request",
      ephemeral: true,
    });
  }
};

module.exports = { init, options, description };
