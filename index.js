import { config as dotenv } from 'dotenv';
import { Client } from 'tmi.js';

dotenv();

const channelName = process.env.twitch_channel_name;

const client = new Client({
    channels: [channelName],
});

client.connect();

client.on('message', (_, tags, message, __) => {
    // "Alca: Hello, World!"
    console.log(`${tags['display-name']}: ${message}`);
});