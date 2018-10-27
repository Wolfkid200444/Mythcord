const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config-bot.json');
const library = require('./library.js');

var string = require('string');
const removeMd = require('remove-markdown');
var parseXml = require('xml2js') .parseString;

var request = require('request');

var apiai = require('apiai');
var ai = apiai(config.apiai_token);

const util = require('util');
const crypto = require('crypto');

client.on('ready', () => {
    client.user.setStatus('dnd');
    client.user.setActivity('I know about "Chunibyo"!', {type: 'PLAYING'});
    console.log("I am bot, is finally alive after processed!");
});

client.on('message', message => {
    if (message.author.bot) return;
    if (string(message.content).startsWith(config.prefix)) {

        var command = message.content.split(" ")[0];
        command = string(command).chompLeft(config.prefix).s.toLowerCase();
        console.log('An command ' + command + ' has been received from ' + message.author.username + ' in Discord app.');
        if (string(message.content).startsWith(config.prefix)) {
          if (message.guild.id == config.mainGuild) return;
      
          var arguments = message.content.split(" ").slice(1);
          var commandComplete = true;
          switch (command) {
            case 'status':
            var seconds = process.uptime();
              
            days = Math.floor(seconds / 86400);
            seconds %= 86400;
              
            hours = Math.floor(seconds / 3600);
            seconds %= 3600;
              
            minutes = Math.floor(seconds / 60);
            isSeconds = seconds % 60;
              
            var uptime = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + Math.round(isSeconds) + ' seconds';
            var stats = new library.SubFields()
              .addField('Total Servers', client.guilds.size)
              .addField('Total Channels', client.channels.size)
              .addField('Cached Users', client.users.size)
              .addField('')
              .addField('Uptime', uptime)
              .addField('Memory RAM Usage', Math.round(process.memoryUsage().rss / 10485.76) / 100 + ' MB')
              .toString();
            var status = new Discord.RichEmbed()
              .addField('Stats:', stats);
            sendEmbed(message.channel, status);
            break;
        
            case '8ball':
            var random = Math.floor(Math.random() * config.eightBall.length);
            message.reply(config.eightBall[random]);
            break;
                
            case 'help':
            message.reply('Sent you a DM!');
            var help = new Discord.RichEmbed()
              .addField('/help', 'Generate some available commands in DM user.')
              .addField('/8ball', 'Ask the magic 8Ball for a questions/answers.')
              .addField('/status', 'Display the statstics about this bot.')
            message.author.send("", {embed: help});
           break;
         default:
          if (message.guild.id == config.mainGuild) {
            commandComplete = false;
          }
          break;
        }
      }
   }
});
client.login(process.env.BOT_TOKEN);

function sendEmbed(channel, embed) {
  channel.send ({
    embed: embed
  });
}
