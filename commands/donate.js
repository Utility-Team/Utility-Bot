const Discord = require('discord.js')
module.exports = {
  name:'donate',
  async execute(message,args){
    const embed = new Discord.MessageEmbed();
    embed.setTitle(`Support us in keep the bot running`);
    embed.setURL('https://www.patreon.com/Utility?fan_landing=true');
    embed.setDescription('Now you can donte us. Every donation counts you will get special rewards by supporting us!.Check it out Now!');
    message.channel.send({embeds:[embed]});
  }
}