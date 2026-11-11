
require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');

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
});

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
            url: "https://media.discordapp.net/attachments/1551329949531774986/1570093643547811930/Captura_de_pantalla_2026-11-11_160946.png?ex=6af5d727&is=6af485a7&hm=9fa31d653020090c312d340e15f0e105b53342dcec387aae133eb406b66be6b1&=&format=webp&quality=lossless&width=640&height=384"
        }
    };

    canal.send({ embeds: [embed] });
});

// =====================
// COMANDOS
// =====================
client.on('messageCreate', async message => {
    if (message.author.bot) return;

        // !basicinfo
    if (message.content.trim() === '!basicinfo') {
        const path = require('path');

        const pdfEsp = new AttachmentBuilder(
            path.join(__dirname, 'EOS TOURNAMENT.pdf')
        );

        const pdfEng = new AttachmentBuilder(
            path.join(__dirname, 'EOS Tournament in ENGLISH.pdf')
        );

        return message.channel.send({
            content: '🌅 **EOS — BASIC INFORMATION**',
            files: [pdfEsp, pdfEng]
        });
    }

    // !post
    if (message.content.startsWith('!post')) {
        const args = message.content.split(' ');
        const url = args[1];
        if (!url) return;

        if (message.deletable) await message.delete().catch(() => {});
        return message.channel.send(`# 🚨 NUEVO POST || @everyone ||\n\n🔥 ${url}`);
    }

    // !twitchsp
    if (message.content.startsWith('!twitch ')) {
        const args = message.content.split(' ');
        const url = args[1];
        if (!url) return;

        if (message.deletable) await message.delete().catch(() => {});
        return message.channel.send(`# 🔴 ¡Argea está en directo! || @everyone ||\n\n🎮 Pásate por el stream:\n👉 ${url}\n\n💜 ¡No te lo pierdas!`);
    }
});

// =====================
// LOGIN
// =====================
client.login(process.env.TOKEN);
console.log("TOKEN:", process.env.TOKEN);
