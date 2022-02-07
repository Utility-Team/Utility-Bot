const Discord = require('discord.js');
module.exports = {
    name:'serverinfo',
    aliases:['serverinfo','sinfo'],
    async execute(message,args){
      var embed = new Discord.MessageEmbed();
      embed.setTitle(`Server Info`);
      const {guild} = message;
      const icon = guild.iconURL();
      var serverIcon = message.guild.iconURL();
      const ownername = message.guild.members.cache.get(message.guild.ownerId);
      console.log(ownername);
      embed.addFields({name:'Server name -',value:`${message.guild.name}`},
      {name:'ID:',value:`${message.guild.id}`},
      {name:'Owner -',value:`<@!${message.guild.ownerId}>`},
      {name:'Region:',value:`${message.guild.preferredLocale}`},
      
      {name:'Total Members:',value: `${message.guild.memberCount}`},
      {name:'Created At:',value:`${message.guild.createdAt}`},
      {name:'Total Roles:',value:`${message.guild.roles.cache.size}`},
      );
      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
      embed.setColor(`#404EED`);
      embed.setTimestamp();
      embed.setThumbnail(icon);
      message.channel.send({embeds:[embed]});
    }
}