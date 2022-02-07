const Discord = require('discord.js');
module.exports = {
  name:'donate',
  async execute(message,args){
    const embed = new Discord.MessageEmbed();
    embed.setTitle(`Support us in keep the bot running`);
    embed.setURL('https://www.patreon.com/Utility?fan_landing=true');
    embed.setDescription('Now you can donate us to help us keep the bot running and you will also get special rewards and premium subscription of the bot!');
    message.channel.send({embeds:[embed]});
  }
}