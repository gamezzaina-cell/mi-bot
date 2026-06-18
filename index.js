require('dotenv').config();
const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

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

    const canalAnuncio = client.channels.cache.get('1503052099179647086');

    const anuncio = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('📢 NUEVA FECHA PARA LAS 10MANS 📢')
        .setDescription(
            `Debido a los cambios, ahora habrá **más tiempo para apuntarse** a las 10mans.\n\n` +
            `📅 **Fecha:** Viernes 15\n` +
            `🕔 **Horario:** Entre las 17:00 y las 21:00\n\n` +
            `🔥 ¡No os olvidéis de apuntaros!`
        )
        .setFooter({ text: '10Mans Community' })
        .setTimestamp();

    await canalAnuncio.send({ embeds: [anuncio] });
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

    // =====================
    // !dm
    // =====================
    if (message.content.startsWith('!dm')) {

        const user = message.mentions.users.first();

        if (!user) {
            return message.channel.send("❌ Usa: !dm @usuario");
        }

        try {

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('si_10m')
                    .setLabel('SI')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('no_10m')
                    .setLabel('NO')
                    .setStyle(ButtonStyle.Danger)
            );

            await user.send({
                content: `👋 Hola!

Soy Arrgi, bot oficial de ARGEA.

¿Quieres recibir info de las 10Mans?`,
                components: [row]
            });

            return message.channel.send(`✅ DM enviado a ${user.tag}`);

        } catch (err) {
            console.error(err);
            return message.channel.send(`❌ No he podido enviar DM a ${user.tag}`);
        }
    }

    // =====================
    // resto de comandos
    // =====================
});

// =====================
// BOTONES (SI / NO)
// =====================
client.on('interactionCreate', async interaction => {

    if (!interaction.isButton()) return;

    const canalComandos = await client.channels.fetch('1517172757362642964');

    if (interaction.customId === 'si_10m') {

        await canalComandos.send(
            `✅ **${interaction.user.tag}** ha ACEPTADO las 10Mans.\n👤 ID: ${interaction.user.id}`
        );

        await interaction.reply({
            content: "✅ Perfecto, te contactaremos pronto.",
            ephemeral: true
        });
    }

    if (interaction.customId === 'no_10m') {

        await canalComandos.send(
            `❌ **${interaction.user.tag}** ha RECHAZADO las 10Mans.`
        );

        await interaction.reply({
            content: "👍 Entendido, gracias.",
            ephemeral: true
        });
    }
});

// =====================
// LOGIN
// =====================
client.login(process.env.TOKEN);
