import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const GALLERY_CHANNEL_ID = '1350100930733019167';

client.on('messageCreate', async (message) => {
  if (
    message.channel.id === GALLERY_CHANNEL_ID &&
    !message.author.bot &&
    !message.attachments.size // Only delete if there's no media
  ) {
    await message.delete().catch(console.error);
  }
});

client.once('ready', () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
