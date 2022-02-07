const Discord = require('discord.js')
module.exports = {
  name:'version',
  async execute(message,args){
    const embed = new Discord.MessageEmbed();
    embed.setTitle('Current Version - 4.1.5 [BETA]');
    embed.setThumbnail('https://i.ibb.co/M1LZkqY/version-4-1-5.jpg');
    embed.setDescription("**Code Name: ``The hills``**");
    embed.addFields({name:"What's new?",value:'new warning system!'}
    ,{name:'New Commands:',value:'like - race, scramble'});
    embed.setFooter(`run updates command for more details!`);
    embed.setColor('#EE7600');
    embed.setTimestamp();
    message.channel.send({embeds:[embed]});
  }
}
 