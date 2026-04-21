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


// 🔐 LOGIN
client.login(process.env.TOKEN);