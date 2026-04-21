require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const cron = require('node-cron');

console.log("Arrancando bot...");

// =====================
// CLIENTE DISCORD
// =====================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
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

  canal.send({
    content: `👋 Bienvenid@ al servidor de Argea <@${member.user.id}> 💚`,
  });
});

// =====================
// ARCHIVO AIM
// =====================
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

// =====================
// COMANDOS
// =====================
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // =====================
  // !post
  // =====================
  if (message.content.startsWith('!post')) {
    const args = message.content.split(' ');
    const url = args[1];

    if (!url) return;

    if (message.deletable) {
      try {
        await message.delete();
      } catch {}
    }

    return message.channel.send(`# 🚨 NUEVO POST || @everyone ||\n\n🔥 ${url}`);
  }

  // =====================
  // !info10m
  // =====================
  if (message.content === '!info10m') {
    return message.channel.send(`# 🎯 10MANS VALORANT

Únete y demuestra tu nivel.

https://forms.gle/RDXhhJQXN2CR4S9K6

||@everyone||`);
  }

  // =====================
  // !player
  // =====================
  if (message.content.startsWith('!player')) {

    const user = message.mentions.users.first();
    if (!user) {
      return message.channel.send("❌ Usa: !player @usuario rango rol");
    }

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

    return message.channel.send(`# 🎮 NUEVO PLAYER

👤 ${user}
🏆 Rango: ${rango}
🎯 Rol: ${rol}

||@everyone||`);
  }
  // =====================
  // !rutina
  // =====================
 const cron = require('node-cron');

let lastMessageId = null;

// ⏰ 16:30 hora de Madrid (CET/CEST)
cron.schedule('30 16 * * *', async () => {

  const guild = client.guilds.cache.first();
  if (!guild) return;

  const channel = guild.channels.cache.find(c =>
    c.name.includes('check') || c.name.includes('general')
  );

  if (!channel) return;

  const msg = await channel.send(`⸻ 🧠 RECORDATORIO RUTINAS ⸻

➤ Recuerda hacer tus 5 Deathmatchs mínimos hoy.
➤ Sube captura en el canal de check.
➤ Si haces AimLab, también puedes reportarlo.

🔥 No olvides mantener tu constancia.`);

  lastMessageId = msg.id;
});


// 🗑️ BORRAR 1 HORA DESPUÉS
cron.schedule('30 17 * * *', async () => {

  const guild = client.guilds.cache.first();
  if (!guild) return;

  const channel = guild.channels.cache.find(c =>
    c.name.includes('check') || c.name.includes('general')
  );

  if (!channel || !lastMessageId) return;

  try {
    const msg = await channel.messages.fetch(lastMessageId);
    await msg.delete();
  } catch (err) {
    console.log("No se pudo borrar el mensaje:", err.message);
  }

  lastMessageId = null;
});
// =====================
// LOGIN
// =====================
client.login(process.env.TOKEN);
