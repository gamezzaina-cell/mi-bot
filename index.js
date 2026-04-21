console.log("Arrancando bot...");

require('dotenv').config();
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 🟢 BOT LISTO
client.once('ready', () => {
  console.log("🤖 Bot conectado");
});


// 👋 BIENVENIDA
client.on('guildMemberAdd', member => {
  const canal = member.guild.channels.cache.get("1467611664148074498");
  if (!canal) return;

  canal.send({
    content: `👋 Bienvenid@ al servidor de Argea <@${member.user.id}> 💚`,
    embeds: [
      {
        title: "🎉 Nuevo miembro",
        description: `Esperamos que disfrutes del servidor 💚`,
        color: 0x00ff00
      }
    ]
  });
});


// 🚀 COMANDO !post (ESTO ES LO QUE QUERÍAS)
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (!message.content.startsWith('!post')) return;

  const args = message.content.split(' ');
  const url = args[1];

  if (!url) return;

  const canal = message.channel;

  // 🧠 intentamos borrar, pero sin romper nada
  if (message.deletable) {
    try {
      await message.delete();
    } catch (err) {
      console.log("No se pudo borrar:", err.message);
    }
  }

  // 📢 mensaje final
  await canal.send({
    content: `# 🚨 **NUEVO POST**            || @everyone || \n\n # 🔥 No te lo pierdas:\n${url}`
  });
});

client.on('messageCreate', async message => {
  if (message.content === '!info10m') {

    message.channel.send(`# **¿Quieres darte a conocer en Valorant? :dart:**

***Únete a nuestras 10mans y demuestra de lo que eres capaz.

¿Eres un equipo en busca de jugadores? Observa talento en acción y encuentra a tu próximo fichaje.
¿Eres jugador y buscas equipo? Este es tu momento para brillar y mostrar tu nivel.

Compite, destaca y haz que te vean.

:point_right: Entra ahora y empieza a jugar con los mejores.
:point_right: https://forms.gle/RDXhhJQXN2CR4S9K6 ***



# **Do you want to make a name for yourself in Valorant? :dart:**
***
Join our 10mans and prove what you're capable of.

Are you a team looking for players? Watch talent in action and find your next recruit.
Are you a player looking for a team? This is your moment to shine and showcase your level.

Compete, stand out, and get noticed.

:point_right: Join now and start playing with the best.

:point_right: https://forms.gle/RDXhhJQXN2CR4S9K6
***

||@everyone ||`);
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (!message.content.startsWith('!player')) return;

  const user = message.mentions.users.first();
  if (!user) {
    return message.channel.send("❌ Debes mencionar un usuario: !player @usuario rango rol");
  }

  // quitar el comando y la mención
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

  message.channel.send(`# 🎮 Nuevo jugador en las 10mans

👤 **Jugador:** ${user}
🏆 **Rango:** ${rango}
🎯 **Rol:** ${rol}

🔥 Participando en nuestras 10mans para demostrar su nivel.

||@everyone||`);
});

const fs = require('fs');

const DATA_FILE = './aimdata.json';

function loadData() {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function today() {
  return new Date().toISOString().split('T')[0];
}
client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!aimdone') {

    const data = loadData();
    const day = today();

    if (!data[day]) data[day] = [];

    if (!data[day].includes(message.author.id)) {
      data[day].push(message.author.id);
      saveData(data);
    }

    message.channel.send("🎯 Aim registrado para hoy. Buen trabajo!");
  }

  if (message.content === '!aimcheck') {

    const data = loadData();
    const day = today();

    const done = data[day] || [];

    const missing = message.guild.members.cache.filter(m =>
      !m.user.bot && !done.includes(m.id)
    );

    const list = missing.map(m => `❌ ${m.user.tag}`).join('\n');

    message.channel.send(`# 📊 Aim diario

✔ Hecho: ${done.length}
❌ Faltan:

${list || "Todos han cumplido 🎉"}`);
  }
});
const cron = require('node-cron');
cron.schedule('59 23 * * 1-5', () => {
  const data = loadData();
  const day = today();

  const done = data[day] || [];

  const guild = client.guilds.cache.first();

  if (!guild) return;

  const missing = guild.members.cache.filter(m =>
    !m.user.bot && !done.includes(m.id)
  );

  if (missing.size === 0) {
    return guild.channels.cache
      .find(c => c.name.includes('general'))
      ?.send("🎯 Todos han completado la rutina de aim hoy. GG!");
  }

  const mentions = missing.map(m => `<@${m.id}>`).join(' ');

  const channel = guild.channels.cache.find(c =>
    c.name.includes('general')
  );

  if (channel) {
    channel.send(
      `❌ **Faltas de aim hoy:**\n\n${mentions}\n\n⚠️ No completaron la rutina de hoy.`
    );
  }

});

// 🔐 LOGIN
client.login(process.env.TOKEN);
