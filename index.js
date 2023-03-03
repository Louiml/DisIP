const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client();
const token = 'TOKEN';
const prefix = '$';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('IP addresses', { type: 'WATCHING' });
});

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ip') {
    if (args.length === 0) {
      return message.channel.send('Error: please specify IP version (v4 or v6)');
    }

    if (args[0] === 'v4') {
      const url = 'https://api64.ipify.org?format=json';
      const response = await fetch(url);
      const json = await response.json();
      const ipAddress = json.ip;
      message.channel.send(`Your IPv4 address is ${ipAddress}`);
    } else if (args[0] === 'v6') {
      const url = 'https://api64.ipify.org?format=jsonv6';
      const response = await fetch(url);
      const json = await response.json();
      const ipAddress = json.ip;
      message.channel.send(`Your IPv6 address is ${ipAddress}`);
    } else {
      message.channel.send('Error: invalid IP version (must be v4 or v6)');
    }
  }
});

client.login(token);
