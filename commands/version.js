const Discord = require('discord.js')
module.exports = {
  name:'version',
  async execute(message,args){
    const embed = new Discord.MessageEmbed();
    embed.setTitle('Current Version - 4.1 [BETA]');
    embed.setThumbnail('https://i.ibb.co/vQGYkQN/Discord-Server-Icon-Maker-32.jpg');
    embed.setDescription("What's new?");
    embed.addFields({name:'bugs fixed',value:'new dig , lottery and treasure command'}
    ,{name:'new currency system',value:'new settings commands'},
    {name:'43 new commands',value:'new help and much more.'});
    message.channel.send({embeds:[embed]});
  }
}
