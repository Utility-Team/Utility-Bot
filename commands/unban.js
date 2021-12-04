const Discord = require('discord.js');
module.exports = {
    name:'unban',
    async execute(message,args,client){
      if(args[0]){
        if(message.member.permissions.has('BAN_MEMBERS')){
            let tounBan = await client.users.fetch(args[0]);
            if(tounBan){
                let reason = '';
                message.guild.members.unban(tounBan, reason);
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`✅ ${tounBan} has been unbanned successfully`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
            }else{
                message.channel.send(`${message.author}, Please mention a valid userid!`);
            }
        }else{
            message.channel.send(`${message.author}, You don't have required permissions to unban someone`);
        }
      }else{
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`${message.author.username}, Please also mention the userid`);
          embed.setDescription(`Example - unban userid`);
          message.channel.send({embeds:[embed]});
      }
    }
}