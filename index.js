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
if (message.content === '!rutina') {

  return message.channel.send(`# ⸻ Rutinas ⸻

➤ Todas las rutinas de AimLab se hacen y se envían al canal de check una captura del último ejercicio que habéis hecho (Deathmatchs). También podéis anotar avances.
➤ Los Deathmatchs son 5 como mínimo cada día antes del entreno. Y se sube captura.

⸺
R1: https://go.aimlab.gg/v1/redirects?link=aimlab%3A%2F%2Fworkshop%3Fid%3D2850133972%26source%3D95BD504C2B51B9F4&link=steam%3A%2F%2Frungameid%2F714010

R2: https://go.aimlab.gg/v1/redirects?link=aimlab%3A%2F%2Fworkshop%3Fid%3D0%26source%3D115F17D04FF8CEF3&link=steam%3A%2F%2Frungameid%2F714010

V2:
☆ https://go.aimlab.gg/v1/redirects?link=aimlab%3A%2F%2Fworkshop%3Fid%3D3113771495%26source%3D115F17D04FF8CEF3&link=steam%3A%2F%2Frungameid%2F714010
☆ https://go.aimlab.gg/v1/redirects?link=aimlab%3A%2F%2Fworkshop%3Fid%3D3113771285%26source%3D115F17D04FF8CEF3&link=steam%3A%2F%2Frungameid%2F714010

||@everyone||`);
}
  

// =====================
// LOGIN
// =====================
client.login(process.env.TOKEN);
