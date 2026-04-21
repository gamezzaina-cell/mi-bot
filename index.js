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
  // !aimdone
  // =====================
  if (message.content === '!aimdone') {

    const roleName = "𝐀𝐫𝐠𝐞𝐚 𝐍𝐢𝐫𝐚";
    const member = message.member;

    if (!member) return;

    const hasRole = member.roles.cache.some(r => r.name === roleName);

    if (!hasRole) {
      return message.channel.send("❌ Solo Argea Nira puede hacer la rutina.");
    }

    const data = loadData();
    const day = today();

    if (!data[day]) data[day] = [];

    if (!data[day].includes(message.author.id)) {
      data[day].push(message.author.id);
      saveData(data);
    }

    return message.channel.send("🎯 Good boy.");
  }

  // =====================
  // !aimcheck
  // =====================
if (message.content === '!aimcheck') {

  const ARGEA_NIRA = [
    "915959374076338256",
    "591699665657921556",
    "792964396291719189",
    "527556698307821595",
    "695732938033201232",
    "1187412116454518784"
  ];

  const data = loadData();
  const day = today();

  const done = data[day] || [];

  const guild = message.guild;

  // 🔥 SOLO USAMOS IDS REALES DEL SERVER
  const members = await guild.members.fetch();

  const filtered = ARGEA_NIRA
    .map(id => members.get(id))
    .filter(m => m && !m.user.bot);

  const doneMembers = filtered.filter(m => done.includes(m.id));
  const missing = filtered.filter(m => !done.includes(m.id));

  const listDone = doneMembers.map(m => `✅ ${m.user.tag}`).join('\n');
  const listMissing = missing.map(m => `❌ ${m.user.tag}`).join('\n');

  console.log("ARGEA LIST:", ARGEA_NIRA);

  return message.channel.send(`# 📊 AIM PANEL (ARGEA NIRA)

## ✅ Hecho:
${listDone || "Nadie"}

## ❌ Faltan:
${listMissing || "Todos han cumplido 🎉"}`);
}
// =====================
// LOGIN
// =====================
client.login(process.env.TOKEN);
