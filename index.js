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
    description: "We hope you enjoy the server 💚"
  };

  canal.send({
content: `👋 Bienvenido al servidor de argea <@${member.user.id}> 💚`,
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
// LOGIN
// =====================
client.login(process.env.TOKEN);
