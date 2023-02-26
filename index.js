import { config as dotenv } from 'dotenv';
import { Client } from 'tmi.js';
import { exec } from 'child_process';

dotenv();

const allowNotifications = process.argv.includes('--allow-notifications');

const channelName = process.env.twitch_channel_name;

const client = new Client({
    channels: [channelName],
});

client.connect();

client.on('message', (_, tags, message, __) => {
    const displayName = tags['display-name'];

    console.info(`${displayName}: ${message}`);

    if (allowNotifications) {
        freeDesktopNotification(sanitize(displayName), sanitize(message));
    }
});

function freeDesktopNotification(displayName, message) {
    exec(
        `gdbus call --session \
        --dest=org.freedesktop.Notifications \
        --object-path=/org/freedesktop/Notifications \
        --method=org.freedesktop.Notifications.Notify \
        "Twitch Chat" "0" "0" "from: ${displayName}" "${message}" \
        [] "{}" 3000
        `
    );

    exec('paplay "/usr/share/sounds/freedesktop/stereo/message-new-instant.oga"');
}

function sanitize(str) {
    return str.replace(/[^A-Za-z0-9\?\!\;\,\-\_\ \:\=]/g, '').substring(0, 70);
}