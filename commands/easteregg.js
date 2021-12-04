const Discord = require('discord.js');
module.exports={
  name:'easteregg',
  async execute(message,args){
    message.channel.send('https://www.tomorrowtides.com/the-3rd-version-easter-egg.html');
  }
}