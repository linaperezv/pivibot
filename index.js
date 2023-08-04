const { REST } = require("@discordjs/rest");
const {
  Client,
  GatewayIntentBits,
  Partials,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");
const { Routes, ButtonStyle } = require("discord-api-types/v10");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.GuildMember],
});

const fs = require("fs");
const path = require("path");

let commandTmp = [];
let commands = [];

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const token =
  process.env.NODE_ENV === "development"
    ? process.env.TOKEN_DEV
    : process.env.TOKEN_PROD;

client.once("ready", () => {
  console.log("Bot Ready!");

  let commandsFiles = fs.readdirSync(path.join(__dirname, "./commands"));

  commandsFiles.forEach((file, i) => {
    commandTmp[i] = require("./commands/" + file);
    commands = [
      ...commands,
      {
        name: file.split(".")[0],
        description: commandTmp[i].description,
        init: commandTmp[i].init,
        options: commandTmp[i].options,
      },
    ];
  });

  const rest = new REST({ version: "9" }).setToken(token);
  rest
    .put(Routes.applicationCommands(client.application.id), {
      body: commands,
    })
    .then(() => {
      console.log("Commands registered!");
    })
    .catch(console.error);
});

client.on("GuildMemberAdd", async (member) => {
  console.log(member);
  try {
    const init = async (member) => {
      await member.send(`hi, welcome to Pivi`);
    };
    init(member);
  } catch (error) {
    console.error(`Error sending DM to ${member.user.tag}: ${error.message}`);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    const selectedCommand = commands.find((c) => commandName === c.name);
    if (selectedCommand) {
      selectedCommand.init(interaction, client);
    }
  } else if (interaction.isButton()) {
    const accept = new ButtonBuilder()
      .setCustomId("accept")
      .setLabel("accept")
      .setStyle(ButtonStyle.Success);

    const reject = new ButtonBuilder()
      .setCustomId("reject")
      .setLabel("reject")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(accept, reject);
    if (interaction.customId.match(/join\-/)) {
      const [command, userId, channelId] = interaction.customId.split("-");
      const channel = await client.channels.fetch(`${channelId}`);
      await interaction.reply({
        content: `Your request was sent!`,
        ephemeral: true,
      });
      channel.send({
        content: `${interaction.user} wants to join your match`,
        components: [row],
      });
    } else if (interaction.customId.match(/offer10less\-/)) {
      const [command, userId, channelId, bet] = interaction.customId.split("-");
      const channel = await client.channels.fetch(`${channelId}`);
      await interaction.reply({
        content: `Your request was sent!`,
        ephemeral: true,
      });
      channel.send({
        content: `${interaction.user} is offering $${bet} to join your match`,
        components: [row],
      });
    } else if (interaction.customId.match(/offer10more\-/)) {
      const [command, userId, channelId, bet] = interaction.customId.split("-");
      const channel = await client.channels.fetch(`${channelId}`);
      await interaction.reply({
        content: `Your request was sent!`,
        ephemeral: true,
      });
      channel.send({
        content: `${interaction.user} is offering $${bet} to join your match`,
        components: [row],
      });
    } else if (interaction.customId.match(/offer20more\-/)) {
      const [command, userId, channelId, bet] = interaction.customId.split("-");
      const channel = await client.channels.fetch(`${channelId}`);
      await interaction.reply({
        content: `Your request was sent!`,
        ephemeral: true,
      });
      channel.send({
        content: `${interaction.user} is offering $${bet} to join your match`,
        components: [row],
      });
    }else if (interaction.customId.match(/reject/)) {

     await interaction.message.delete()
    
    }
  }
});

client.login(token);
