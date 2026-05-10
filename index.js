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
  // ANUNCIO 10MANS
  // =====================
  const canalAnuncio = client.channels.cache.get('1503052099179647086');

  const anuncio = new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle('📢 NUEVA FECHA PARA LAS 10MANS 📢')
    .setDescription(
      `Debido a los cambios, ahora habrá **más tiempo para apuntarse** a las 10mans.\n\n` +
      `📅 **Fecha:** Viernes 15\n` +
      `🕔 **Horario:** Entre las 17:00 y las 21:00\n\n` +
      `⚠️ La hora exacta dependerá del rango de cada jugador, por lo que se os asignará equipo y horario correspondiente.\n` +
      `Si tenéis dudas sobre qué equipo u horario os tocaría al apuntaros, se habilitarán **tickets en el servidor** para resolverlas.\n\n` +
      `🎮 Se jugarán únicamente **2 partidas**:\n` +
      `• 1 partida sin retransmisión para prepararos.\n` +
      `• 1 partida retransmitida en nuestro canal de Twitch.\n\n` +
      `🔥 ¡No os olvidéis de apuntaros!`
    )
    .setFooter({ text: '10Mans Community' })
    .setTimestamp();

  await canalAnuncio.send({ embeds: [anuncio] });

// =====================
// Equipo 1 A
// =====================
await enviarEmbed(
  "1500182678828355817",
  "EQUIPO 1 A",
  [
    { id: "Por confirmar", rol: "Dualista" },
    { id: "Por confirmar", rol: "Iniciador" },
    { id: "Por confirmar", rol: "Smoker" },
    { id: "700743394007187496", rol: "Centinela" },
    { id: "Por confirmar", rol: "Flex" },
  ],
  "<Por confirmar>",
  "Viernes 15 de mayo",
  "17:00 Primera partida 18:00 Segunda partida",
  "https://www.twitch.tv/4rgea",
  "🗺️ Mapa a jugar: Por confirmar",
  "<@1191588735104593980>"
);

// =====================
// Equipo 1 B
// =====================
await enviarEmbed(
  "1500231869663547513",
  "EQUIPO 1 B",
  [
    { id: "Por confirmar", rol: "Dualista" },
    { id: "382631918098710539", rol: "Iniciador" },
    { id: "Por confirmar", rol: "Smoker" },
    { id: "Por confirmar", rol: "Centinela" },
    { id: "Por confirmar", rol: "Flex" },
  ],
  "<Por confirmar>",
  "Viernes 15 de mayo ",
  "17:00 Primera partida 18:00 Segunda partida",
  "https://www.twitch.tv/4rgea",
  "🗺️ Mapa a jugar: Por confirmar",
  "<@1191588735104593980>"
);

// =====================
// Equipo 2 A
// =====================
await enviarEmbed(
  "1500182692749115392",
  "EQUIPO 2 A",
  [
    { id: "Por confirmar", rol: "Dualista" },
    { id: "Por confirmar", rol: "Iniciador" },
    { id: "1427739343254192272", rol: "Smoker" },
    { id: "891389365811572776", rol: "Centinela" },
    { id: "Por confirmar", rol: "Flex" },
  ],
  "Por confirmar",
  "Viernes 15 de mayo ",
  "18:00 Primera partida 19:00 Segunda partida",
  "https://www.twitch.tv/4rgea",
  "🗺️ Mapa a jugar: Ascent",
  "<@1304902589347004446>"
);

// =====================
// Equipo 2 B
// =====================
await enviarEmbed(
  "1500182706858754148",
  "EQUIPO 2 B",
  [
    { id: "1235271564639997956", rol: "Dualista" },
    { id: "Por confirmar", rol: "Iniciador" },
    { id: "969903596097376256", rol: "Smoker" },
    { id: "Por confirmar", rol: "Centinela" },
    { id: "Por confirmar", rol: "Flex" },
  ],
  "<@Por confirmar>",
  "Viernes 15 de mayo",
  "18:00 Primera partida 19:00 Segunda partida",
  "https://www.twitch.tv/4rgea",
  "🗺️ Mapa a jugar: Por confirmar",
  "<@1304902589347004446>"
);

// =====================
// Equipo 3 A
// =====================
await enviarEmbed(
  "1500231605019480116",
  "EQUIPO 3 A",
  [
    { id: "Por confirmar", rol: "Dualista" },
    { id: "Por confirmar", rol: "Iniciador" },
    { id: "Por confirmar", rol: "Smoker" },
    { id: "Por confirmar", rol: "Centinela" },
    { id: "495914152968060938", rol: "Flex" },
  ],
  "Por confirmar",
  "Viernes 15 de mayo",
  "19:00 Primera partida 20:00 Segunda partida",
  "https://www.twitch.tv/4rgea",
  "🗺️ Mapa a jugar: Por confirmar",
  "<Por confirmar>"
);

// =====================
// Equipo 3 B
// =====================
await enviarEmbed(
  "1500231656232063006",
  "EQUIPO 3 B",
  [
    { id: "810516417111261185", rol: "Dualista" },
    { id: "Por confirmar", rol: "Iniciador" },
    { id: "Por confirmar", rol: "Smoker" },
    { id: "Por confirmar", rol: "Centinela" },
    { id: "444239353045057536", rol: "Flex" },
  ],
  "<@444239353045057536>",
  "Viernes 15 de mayo",
  "19:00 Primera partida 20:00 Segunda partida",
  "https://www.twitch.tv/4rgea",
  "🗺️ Mapa a jugar: Por confirmar",
  "<Por confirmar>"
);

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

  // !info10m
  if (message.content === '!info10m') {
    return message.channel.send(`# **¿Quieres darte a conocer en Valorant? :dart: **

** Únete a nuestras 10mans y demuestra de lo que eres capaz.

¿Eres un equipo en busca de jugadores? Observa talento en acción y encuentra a tu próximo fichaje.
¿Eres jugador y buscas equipo? Este es tu momento para brillar y mostrar tu nivel.

Compite, destaca y haz que te vean.

:point_right: Entra ahora y empieza a jugar con los mejores.
:point_right: https://forms.gle/RDXhhJQXN2CR4S9K6 **


# **Do you want to make a name for yourself in Valorant? :dart: **

** Join our 10mans and prove what you're capable of.

Are you a team looking for players? Watch talent in action and find your next recruit.
Are you a player looking for a team? This is your moment to shine and showcase your level.

Compete, stand out, and get noticed.

:point_right: Join now and start playing with the best.

:point_right: https://forms.gle/RDXhhJQXN2CR4S9K6 **

||@everyone||`);
  }

  // !player
  if (message.content.startsWith('!player')) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("❌ Usa: !player @usuario rango rol");

    const args = message.content
      .replace('!player', '')
      .replace(`<@${user.id}>`, '')
      .replace(`<@!${user.id}>`, '')
      .trim()
      .split(' ');

    const rango = args[0];
    const rol = args.slice(1).join(' ');

    if (!rango || !rol) {
      return message.channel.send("❌ Uso: !player @usuario <emoji_rango> <rol>");
    }

    return message.channel.send(`# 🎮 Nuevo participante confirmado para las 10mans de argea

👤 ${user}
🏆 Rango: ${rango}
🎯 Rol: ${rol}

||@everyone||`);
  }
});
// =====================
// FUNCION PARA ENVIAR EMBED
// =====================
async function enviarEmbed(canalId, nombreEquipo, jugadores, igl, dia, hora, url, mapa, arbitro) {
  const canal = await client.channels.fetch(canalId);

  const lista = jugadores
    .map(j => {
      if (j.id === "Por confirmar" || j.id === "por confirmar") {
        return `❓        ${j.rol}`;
      }
      return `<@${j.id}>        ${j.rol}`;
    })
    .join("\n");

  const embed = new EmbedBuilder()
    .setTitle(`🔵 ${nombreEquipo}`)
    .setDescription(`
${lista}

👑 **IGL del equipo:** ${igl}  
📅 **Día:** ${dia}
⏰ **Hora:** ${hora}
📺 **Streaming:** ${url}
⚖️ **Árbitro de la partida:** ${arbitro}
${mapa}
`);

  await canal.send({
    embeds: [embed]
  });
}

// =====================
// LOGIN
// =====================
client.login(process.env.TOKEN);
console.log("TOKEN:", process.env.TOKEN);
