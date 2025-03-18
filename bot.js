import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

const GALLERY_CHANNEL_ID = "1350100930733019167";
const DELETES_CHANNEL_ID = "1350537275896758353";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (
    message.channel.id === GALLERY_CHANNEL_ID &&
    !message.author.bot &&
    !message.attachments.size
  ) {
    try {
      const deleteChannel = await client.channels.fetch(DELETES_CHANNEL_ID);
      await deleteChannel.send(
        `🗑 Deleted Message from ${message.author.displayName}: \`${message.content}\``,
      );

      await message.delete();
      console.log(`Deleted message from ${message.author.tag}`);
    } catch (error) {
      console.error(`Failed to delete/log message: ${error.message}`);
    }
  }
});

client.on("messageDelete", async (message) => {
  try {
    if (!message.partial) {
      const deleteChannel = await client.channels.fetch(DELETES_CHANNEL_ID);
      await deleteChannel.send(
        `🗑 Deleted By Gallary Bot from ${message.author.tag}: \`${message.content || "[No Content]"}\``,
      );
    }
  } catch (error) {
    console.error(`Failed to log deleted message: ${error.message}`);
  }
});

client.once("ready", () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
