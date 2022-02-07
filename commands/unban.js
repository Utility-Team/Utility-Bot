const Discord = require('discord.js');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'unban',
    async execute(message,args,client){
      let serverData = await serverModel.findOne({guildID:message.guild.id});
      if(args[0]){
        if(!isNaN(args[0])){
            if(message.member.permissions.has('BAN_MEMBERS')){
                let tounBan = await client.users.fetch(args[0]);
                let serverCheck = message.guild.members.cache.get(args[0]);
                if(!serverCheck){
                    console.log(tounBan);
                    if(tounBan){
                        let reason = '';
                        message.guild.members.unban(tounBan, reason).then(()=>{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`✅ ${tounBan.username} has been unbanned successfully`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setColor(`#30CC71`);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }).catch((err)=>{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a user id that is banned!`);
                            message.channel.send({embeds:[embed]});
                        })
                       
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid user id!`);
                        message.channel.send({embeds:[embed]});
                    }
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, Please mention a user id that is banned!`);
                    message.channel.send({embeds:[embed]});
                }
            }else{
                message.channel.send(`${message.author}, You don't have required permissions to unban someone`);
            }
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}, Please mention a valid user id`);
            embed.setDescription(`Example - ${serverData.prefix}unban 762682627500408852`);
            message.channel.send({embeds:[embed]});
        }
      }else{
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`${message.author.username}, Please also mention the userid`);
          embed.setDescription(`Example - ${serverData.prefix}unban 762682627500408852`);
          message.channel.send({embeds:[embed]});
      }
    }
}