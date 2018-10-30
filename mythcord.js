const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config-bot.json');
const library = require('./library.js');

var string = require('string');
const removeMd = require('remove-markdown');
var parseXml = require('xml2js') .parseString;

var request = require('request');

const util = require('util');
const crypto = require('crypto');

client.on('ready', () => {
    client.user.setStatus('dnd');
    client.user.setActivity('I know about "Chunibyo" powers!', {type: 'PLAYING'});
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
            var statstics = new library.SubFields()
              .addField('Total Servers', client.guilds.size)
              .addField('Total Channels', client.channels.size)
              .addField('Cached Users', client.users.size)
              .addField('Uptime', uptime)
              .addField('Memory RAM Usage', Math.round(process.memoryUsage().rss / 10485.76) / 100 + ' MB')
              .toString();
            var status = new Discord.RichEmbed()
              .setTitle('Status')
              .setDescription('Shows a status and uptime of this bot.')
              .setColor('#15f153')
              .addField('^ ^ ^', statstics)
              .setFooter('Host: Heroku Services | Location: Malaysia')
            sendEmbed(message.channel, status);
            break;
        
            case '8ball':
            if (!arguments[0]) {
              message.reply('Sorry but I cannot answer with your blank only. :/')
              return;
            }
            var random = Math.floor(Math.random() * config.eightBall.length);
            message.reply(config.eightBall[random]);
            break;
                  
            case 'gayrate':
            if (!arguments[0]) {
              message.reply('Hey, you have no mention user and this cannot work.')
              return;
            }
            let user = message.mentions.members.first();
            var percentage = Math.floor(Math.random() * 100)
            .setAuthor('${user.username}')
            .addField('^ ^ ^', '__${percentage}__/**100** Gay! :gay_pride_flag:')
            .setFooter('${message.author.tag} has requested this.')
            break;
                  
            case 'ping':
            if (!arguments[0] && message.mentions.members.size == 0) {
              message.reply('You cannot mention user or text for check ping. Oh wait, you made the user gets triggered or angry. Also, text is no needed.')
              return;
            }
            let user = message.mentions.members.first();
            var pings = Math.round(message.author.ping)
            .setTitle('${user.username} - Ping')
            .addField('Connection Status', '📡 **${pings}**__ms__')
            break;
                
            case 'help':
            message.reply('The command was sent to your Direct Message!');
            var random = Math.floor(Math.random() * config.helpFooter.length);
            var help = new Discord.RichEmbed()
              .setTitle('Commands')
              .setDescription('Come to see some available commands here.')
              .setColor('RANDOM')
              .addField('/help', 'Generate some available commands in DM user.')
              .addField('/8ball', 'Ask the magic 8Ball with your questions/answers!')
              .addField('/status', 'Display the statstics about this bot.')
              .addField('/gayrate <@user>', 'Mention user to show the gay percentage rate!')
              .addField('/ping', 'Check your connection status with the command')
              .setFooter(config.helpFooter[random]);
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
