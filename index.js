
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
            content: `🌅 **EOS — BASIC INFORMATION**

𝐎𝐬 𝐬𝐮𝐛𝐨 𝐥𝐚 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐜𝐢ó𝐧 𝐛á𝐬𝐢𝐜𝐚 𝐝𝐞𝐥 𝐭𝐨𝐫𝐧𝐞𝐨 𝐩𝐚𝐫𝐚 𝐬𝐚𝐛𝐞𝐫 𝐝𝐞 𝐪𝐮𝐞 𝐯𝐚 𝐞𝐥 𝐭𝐨𝐫𝐧𝐞𝐨 𝐲 𝐩𝐨𝐝𝐞𝐫 𝐡𝐚𝐜𝐞𝐫 𝐥𝐚 𝐩𝐫𝐞𝐢𝐧𝐬𝐜𝐫𝐢𝐩𝐜𝐢𝐨𝐧.

𝐈'𝐦 𝐮𝐩𝐥𝐨𝐚𝐝𝐢𝐧𝐠 𝐭𝐡𝐞 𝐛𝐚𝐬𝐢𝐜 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐚𝐛𝐨𝐮𝐭 𝐭𝐡𝐞 𝐭𝐨𝐮𝐫𝐧𝐚𝐦𝐞𝐧𝐭 𝐬𝐨 𝐲𝐨𝐮 𝐤𝐧𝐨𝐰 𝐰𝐡𝐚𝐭 𝐢𝐭'𝐬 𝐚𝐛𝐨𝐮𝐭 𝐚𝐧𝐝 𝐜𝐚𝐧 𝐩𝐫𝐞-𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫.`,
            files: [pdfEsp, pdfEng]
        });
    }
    
    // !preins
    if (message.content.trim() === '!preins') {
        return message.channel.send({
            content: `***Aqui tenes el link para la nueva preisncripción a EOS TOURNAMENT!!***

***Here's the link for the new EOS TOURNAMENT pre-registration!!***

https://docs.google.com/forms/d/e/1FAIpQLSc4DaPpuv5qn_jgeL2n13QcoFo_JEGE4gPBbeV7iq136sdhxw/viewform?usp=header`
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

// ================================
// SISTEMA DE TICKETS EOS
// ================================

const TICKET_CATEGORY_ID = "1496205350951715018";
const TICKET_EMOJI = "🎫";

// Comando !ticket
client.on("messageCreate", async (message) => {
    console.log("REACCIÓN DETECTADA:", reaction.emoji.name, user.username);
    
    if (message.author.bot) return;

    if (message.content.trim().toLowerCase() === "!ticket") {
        const ticketEmbed = {
            color: 0xF1C40F,
            title: "🎫 SOPORTE EOS",
            description:
                "¿Necesitas ayuda del equipo de EOS?\n\n" +
                "Reacciona con 🎫 para abrir un ticket privado.\n\n" +
                "Un miembro del equipo te atenderá lo antes posible.",
            footer: {
                text: "EOS ESPORTS • SUPPORT SYSTEM"
            }
        };

        const sentMessage = await message.channel.send({
            embeds: [ticketEmbed]
        });

        await sentMessage.react(TICKET_EMOJI);
    }
});

// Crear ticket al reaccionar
client.on("messageReactionAdd", async (reaction, user) => {
    if (user.bot) return;

    try {
        if (reaction.partial) await reaction.fetch();
        if (reaction.message.partial) await reaction.message.fetch();

        if (reaction.emoji.name !== TICKET_EMOJI) return;

        const guild = reaction.message.guild;
        if (!guild) return;

        const category = guild.channels.cache.get(TICKET_CATEGORY_ID);
        if (!category) {
            console.log("No se encuentra la categoría de tickets.");
            return;
        }

        // Evitar tickets duplicados
        const existingTicket = guild.channels.cache.find(channel =>
            channel.parentId === TICKET_CATEGORY_ID &&
            channel.name === `ticket-${user.id}`
        );

        if (existingTicket) {
            await user.send(`Ya tienes un ticket abierto: ${existingTicket}`);
            return;
        }

        const member = await guild.members.fetch(user.id);

        const ticketChannel = await guild.channels.create({
            name: `ticket-${user.id}`,
            type: 0,
            parent: TICKET_CATEGORY_ID,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: ["ViewChannel"]
                },
                {
                    id: user.id,
                    allow: [
                        "ViewChannel",
                        "SendMessages",
                        "ReadMessageHistory",
                        "AttachFiles"
                    ]
                },
                {
                    id: client.user.id,
                    allow: [
                        "ViewChannel",
                        "SendMessages",
                        "ReadMessageHistory",
                        "ManageChannels"
                    ]
                }
            ]
        });

        await ticketChannel.send({
            content:
                `👋 ¡Hola ${member}!\n\n` +
                `Tu ticket de soporte de **EOS** ha sido creado.\n` +
                `Explica tu problema y el equipo te atenderá lo antes posible.\n\n` +
                `🔒 Para cerrar el ticket, utiliza el comando \`!cerrar\`.`
        });

        await user.send(`Tu ticket de EOS ha sido creado: ${ticketChannel}`);

    } catch (error) {
        console.error("Error creando ticket:", error);
    }
});

// Comando !cerrar
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.trim().toLowerCase() === "!cerrar") {
        if (
            message.channel.parentId !== TICKET_CATEGORY_ID ||
            !message.channel.name.startsWith("ticket-")
        ) {
            return;
        }

        await message.channel.send("🔒 Ticket cerrado. El canal se eliminará en 5 segundos.");

        setTimeout(async () => {
            await message.channel.delete().catch(console.error);
        }, 5000);
    }
});

// =====================
// LOGIN
// =====================
client.login(process.env.TOKEN);
console.log("TOKEN:", process.env.TOKEN);
