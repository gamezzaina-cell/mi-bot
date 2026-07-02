require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

console.log("Arrancando bot...");
console.log("🔥 ESTE ES EL ARCHIVO CORRECTO");

// =====================
// CLIENTE DISCORD
// =====================
const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
],
allowedMentions: {
parse: ['everyone']
}
});

// =====================
// READY
// =====================
client.once('clientReady', async () => {
console.log("🤖 Bot conectado");
console.log("Bot listo");

// =====================
// BIENVENIDA
// =====================
client.on('guildMemberAdd', member => {
const canal = member.guild.channels.cache.get("1467611664148074498");
if (!canal) return;

const embed = {
color: 0x2ecc71,
title: "🎉 New member",
description: `👋 Bienvenido al servidor de argea <@${member.user.id}> 💚`,
image: {
url: "https://media.discordapp.net/attachments/1465118735999434886/1499077960869871767/Bienvenida.jpeg"
}
};

canal.send({ embeds: [embed] });
});

// =====================
// COMANDOS
// =====================
client.on('messageCreate', async message => {
if (message.author.bot) return;

// !post
if (message.content.startsWith('!post')) {
    const args = message.content.split(' ');
    const url = args[1];
    if (!url) return;

    if (message.deletable) await message.delete().catch(() => {});
    return message.channel.send(`# 🚨 NUEVO POST || @everyone ||\n\n🔥 ${url}`);
}

// !twitch
if (message.content.startsWith('!twitch ')) {
    const args = message.content.split(' ');
    const url = args[1];
    if (!url) return;

    if (message.deletable) await message.delete().catch(() => {});
    return message.channel.send(`# 🔴 ¡YA EN DIRECTO! || @everyone ||\n\n🎮 Pásate por el stream:\n👉 ${url}\n\n💜 ¡No te lo pierdas!`);
}

// !twitchsp
if (message.content.startsWith('!twitchsp ')) {
    const args = message.content.split(' ');
    const url = args[1];
    if (!url) return;

    if (message.deletable) await message.delete().catch(() => {});
    return message.channel.send(`# 🔴 ¡Spike Series está en directo! || @everyone ||\n\n🎮 Pásate por el stream:\n👉 ${url}\n\n💜 ¡No te lo pierdas!`);
}

});
// =====================
// LOGIN
// =====================
client.login(process.env.TOKEN);
console.log("TOKEN:", process.env.TOKEN);
