import { Client } from 'tmi.js';

const client = new Client({
    options: { debug: true },
    identity: {
        username: 'bot_name',
        password: 'oauth:my_bot_token'
    },
    channels: ['my_channel']
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
    if (self) return;
    if (message.toLowerCase() === '!hello') {
        client.say(channel, `@${tags.username}, heya!`);
    }
});