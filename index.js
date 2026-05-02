require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

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
client.once('ready', () => {
  console.log("🤖 Bot conectado");
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

  canal.send({
    embeds: [embed]
  });
});

// =====================
// COMANDOS
// =====================
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // ---------------------
  // !post
  // ---------------------
  if (message.content.startsWith('!post')) {
    const args = message.content.split(' ');
    const url = args[1];
    if (!url) return;

    if (message.deletable) await message.delete().catch(() => {});
    return message.channel.send(`# 🚨 NUEVO POST || @everyone ||\n\n🔥 ${url}`);
  }
   // ---------------------
  // !twitch
  // ---------------------
  if (message.content.startsWith('!twitch ')) {
    const args = message.content.split(' ');
    const url = args[1];
    if (!url) return;

    if (message.deletable) await message.delete().catch(() => {});
    return message.channel.send(`# 🔴 ¡YA EN DIRECTO! || @everyone ||\n\n🎮 Pásate por el stream:\n👉 ${url}\n\n💜 ¡No te lo pierdas!`);
  }

  // ---------------------
  // !twitchsp
  // ---------------------
  if (message.content.startsWith('!twitchsp ')) {
    const args = message.content.split(' ');
    const url = args[1];
    if (!url) return;

    if (message.deletable) await message.delete().catch(() => {});
    return message.channel.send(`# 🔴 ¡Spike Series está en directo! || @everyone ||\n\n🎮 Pásate por el stream:\n👉 ${url}\n\n💜 ¡No te lo pierdas!`);
  }

  // ---------------------
  // !info10m
  // ---------------------
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

  // ---------------------
  // !player
  // ---------------------
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
      return message.channel.send("❌ Uso: !player @usuario <rango> <rol>");
    }

    return message.channel.send(`# 🎮 NUEVO PLAYER CONFIRMADO PARA LAS 1OMANS

👤 ${user}
🏆 Rango: ${rango}
🎯 Rol: ${rol}

||@here||`);
  }

});
// =====================
// Equipo 1 A
// =====================
const { EmbedBuilder } = require("discord.js");

const jugadores = [
  { id: "1189508170448650261", rol: "Dualista" },
  { id: "578651526072107019", rol: "Iniciador" },
  { id: "556805672361132042", rol: "Smoker" },
  { id: "700743394007187496", rol: "Centinela" },
  { id: "998634496150749225", rol: "Flex" },
];

const lista = jugadores
  .map(j => `<@${j.id}>        ${j.rol}`)
  .join("\n");

const embed = new EmbedBuilder()
  .setTitle("🔵 EQUIPO 1 A")
  .setDescription(`
${lista}

👑 **IGL del equipo:** <@998634496150749225>  
🗺️ **Mapa a jugar:** Por selecionar
`);

channel.send({ embeds: [embed] });
// =====================
// Equipo 1 B
// =====================
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const canal1 = await client.channels.fetch("ID_CANAL_1");

const jugadores = [
  { id: "713536606757191761", rol: "Dualista" },
  { id: "382631918098710539", rol: "Iniciador" },
  { id: "1168645060418605120", rol: "Smoker" },
  { id: "1124143141067431985", rol: "Centinela" },
  { id: "por confirmar", rol: "Flex" },
];

const lista = jugadores
  .map(j => `<@${j.id}>        ${j.rol}`)
  .join("\n");

const embed = new EmbedBuilder()
  .setTitle("🔵 EQUIPO 1 B")
  .setDescription(`
${lista}

👑 **IGL del equipo:** <@382631918098710539>  
🗺️ **Mapa a jugar:** Por selecionar
`);

channel.send({ embeds: [embed] });
// =====================
// Equipo 2 A
// =====================
const canal1 = await client.channels.fetch("ID_CANAL_1");

const jugadores = [
  { id: "614834472000552989", rol: "Dualista" },
  { id: "967085306207670304", rol: "Iniciador" },
  { id: "1068593618660622498", rol: "Smoker" },
  { id: "648151230169743384", rol: "Centinela" },
  { id: "688703812856184897", rol: "Flex" },
];

const lista = jugadores
  .map(j => `<@${j.id}>        ${j.rol}`)
  .join("\n");

const embed = new EmbedBuilder()
  .setTitle("🔵 EQUIPO 2 A")
  .setDescription(`
${lista}

👑 **IGL del equipo:** Por confirmar  
🗺️ **Mapa a jugar:** Por selecionar
`);

channel.send({ embeds: [embed] });
// =====================
// Equipo 2 B
// =====================
const canal1 = await client.channels.fetch("ID_CANAL_1");

const jugadores = [
  { id: "1235271564639997956", rol: "Dualista" },
  { id: "880432639188803644", rol: "Iniciador" },
  { id: "969903596097376256", rol: "Smoker" },
  { id: "897210517494566942", rol: "Centinela" },
  { id: "430131902238818304", rol: "Flex" },
];

const lista = jugadores
  .map(j => `<@${j.id}>        ${j.rol}`)
  .join("\n");

const embed = new EmbedBuilder()
  .setTitle("🔵 EQUIPO 2 B")
  .setDescription(`
${lista}

👑 **IGL del equipo:** <@430131902238818304>  
🗺️ **Mapa a jugar:** Por selecionar
`);

channel.send({ embeds: [embed] });
// =====================
// Equipo 3 A
// =====================
const canal1 = await client.channels.fetch("ID_CANAL_1");

const jugadores = [
  { id: "668504038538739722", rol: "Dualista" },
  { id: "1158332802392137728", rol: "Iniciador" },
  { id: "495914152968060938", rol: "Smoker" },
  { id: "836629418838589520", rol: "Centinela" },
  { id: "444239353045057536", rol: "Flex" },
];

const lista = jugadores
  .map(j => `<@${j.id}>        ${j.rol}`)
  .join("\n");

const embed = new EmbedBuilder()
  .setTitle("🔵 EQUIPO 3 A")
  .setDescription(`
${lista}

👑 **IGL del equipo:** <@444239353045057536>  
🗺️ **Mapa a jugar:** Por selecionar
`);

channel.send({ embeds: [embed] });
// =====================
// Equipo 3 B
// =====================
const canal1 = await client.channels.fetch("ID_CANAL_1");

const jugadores = [
  { id: "1054461661945274398", rol: "Dualista" },
  { id: "1380971709716369441", rol: "Iniciador" },
  { id: "1427739343254192272", rol: "Smoker" },
  { id: "828314118381502494", rol: "Centinela" },
  { id: "810516417111261185", rol: "Flex" },
];

const lista = jugadores
  .map(j => `<@${j.id}>        ${j.rol}`)
  .join("\n");

const embed = new EmbedBuilder()
  .setTitle("🔵 EQUIPO 3 B")
  .setDescription(`
${lista}

👑 **IGL del equipo:** Por confirmar 
🗺️ **Mapa a jugar:** Por selecionar
`);

channel.send({ embeds: [embed] });
// =====================
// LOGIN
// =====================
console.log("TOKEN:", process.env.TOKEN);
client.login(process.env.TOKEN);
