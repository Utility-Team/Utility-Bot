const Discord = require('discord.js');
const profileModel = require('../models/profileSchema');
module.exports = {
    name: 'nuke',
    aliases:['nuke','channel-clear','cc','channelclear'],
   async execute(message,args) {
     if(!args[0]){
       if(message.member.permissions.has('ADMINISTRATOR')){
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`✅  Channel Cleared`);
        embed.setColor(`#30CC71`);
        message.channel.clone().then(async channel => {
            console.log("channel = "+ channel.id)
            let channel_id = channel.id;
            message.channel.delete();
            channel.setPosition(message.channel.position);
            channel.send({embeds:[embed]});
            var profileData = await profileModel.findOne({guildID:channel_id})
            if(profileData){
                const cwelcome = await profileModel.findOne({cwelcome:channel_id});
                const cleave = await profileModel.findOne({cleave:channel_id});
                const clogs = await profileModel.findOne({logschannel:channel_id});
                console.log(cwelcome);
                console.log(cleave);
                console.log(clogs);
                if(cwelcome){
                    const response = await profileModel.findOneAndUpdate({
                        guildID:message.guild.id,
                      },
                      {  
                        cwelcome:channel.id
                      }
                      );
                }
                if(cleave){
                    const response = await profileModel.findOneAndUpdate({
                        guildID:message.guild.id,
                      },
                      {  
                        cleave:channel.id
                      }
                      )
                }
                if(clogs){
                    const response = await profileModel.findOneAndUpdate({
                        guildID:message.guild.id,
                      },
                      {  
                        logschannel:channel.id
                      }
                      )
                }
    
            }
        });

       
       }else{
           message.channel.send(`Sorry You don't have the permission to use this command`)
       } 
    }else{
        if(message.mentions.channels.first()){
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`✅  Channel Cleared`);
            embed.setColor(`#30CC71`);
            const mentionchannel = message.mentions.channels.first();
            const mentionchannel_id = mentionchannel.id;
            var profileData = await profileModel.findOne({guildID:message.guild.id});
            let logschannel = profileData.logschannel;
            const logs_channel = message.guild.channels.cache.find(i=>i.id ===logschannel);
         
            mentionchannel.clone().then(async channel => {
                mentionchannel.delete();
                channel.setPosition(mentionchannel.position);
                channel.send({embeds:[embed]});
               // if(logs_channel){
                  const embed1 = new Discord.MessageEmbed();
                  var serverIcon = message.guild.iconURL();
                  embed1.setAuthor(`Channel Nuked`,serverIcon);
                  embed1.addFields({name:`Nuked by ${message.author.username}`,value:`Channel name - **${mentionchannel.name}**`});
                  embed1.setColor(`#30CC71`)
                  embed1.setTimestamp();
                  await logs_channel.send({embeds:[embed1]});
                //}
                if(profileData){
                    const cwelcome = await profileModel.findOne({cwelcome:mentionchannel.id});
                    const cleave = await profileModel.findOne({cleave:mentionchannel.id});
                    const clogs = await profileModel.findOne({logschannel:mentionchannel.id});
                    if(cwelcome){
                        const response = await profileModel.findOneAndUpdate({
                            guildID:message.guild.id,
                          },
                          {  
                            cwelcome:channel.id
                          }
                          );
                    }
                    if(cleave){
                        const response = await profileModel.findOneAndUpdate({
                            guildID:message.guild.id,
                          },
                          {  
                            cleave:channel.id
                          }
                          )
                    }
                    if(clogs){
                        const response = await profileModel.findOneAndUpdate({
                            guildID:message.guild.id,
                          },
                          {  
                            logschannel:channel.id
                          }
                          )
                    }
        
                }
            })
            
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username} Please mention a channel`);
            message.channel.send({embeds:[embed]});
        }
   }
        
    }
}