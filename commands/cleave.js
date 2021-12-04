const Discord = require('discord.js');
const profileModel = require('../models/profileSchema');
module.exports={
    name:'cleave',
    async execute(message,args){
        if(args[0]){
          if(message.member.permissions.has('ADMINISTRATOR')){
            if(message.mentions.channels.first()){
                const mentionchannel = message.mentions.channels.first();
                const mentionchannel_id = mentionchannel.id
                var profileData = await profileModel.findOne({guildID:message.guild.id});
                if(profileData){
                  const response = await profileModel.findOneAndUpdate({
                      guildID:message.guild.id,
                    },
                    {  
                      cleave:mentionchannel_id
                    }
                    )
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`${message.author.username} leave embed channel has been configured successfully`);
                  message.channel.send({embeds:[embed]});
                  
                }
                const logsID = profileData.logschannel
                if(logsID){
                  const logs_channel = message.guild.channels.cache.find(i=>i.id ===logsID);
                  if(logs_channel){
                  const embed = new Discord.MessageEmbed();
                //  const new_member = member.guild.members.cache.find(i=>i.id === );
                  embed.setTitle(`✅ Leave Embed Channel Configured`);
                  embed.setColor(`#30CC71`)
              
                  embed.addFields({name:` Configured by - ${message.author.username}#${message.author.discriminator}`,value:`To - ${mentionchannel.name}`});
                  embed.setTimestamp();
                  logs_channel.send({embeds:[embed]});
                  }
                }
            }else{
                var embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username} mention a valid channel!`);
                message.channel.send({embeds:[embed]});
            }
          }else{
            var embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username} Please mention a channel to configure`);
            message.channel.send({embeds:[embed]});
          }
      }else{
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`${message.author.username}, You don't have the perms to configure leave embed`);
        message.channel.send({embeds:[embed]});
      }
    }
}