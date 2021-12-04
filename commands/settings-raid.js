const Discord = require('discord.js');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'settings-raid',
    async execute(message,args){
        let argsone_name; 
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(args[0]){
            argsone = args[0];
            argsone_name = argsone.toLowerCase();
        }
        if(argsone_name === 'disable'){
            if(message.member.permissions.has('ADMINISTRATOR')){
                if(serverData.raid !== 'disable'){
                    if(serverData){
                        const response = await serverModel.findOneAndUpdate({guildID:message.guild.id},{
                            raid:'disable'
                        });
                        
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`✅ Raid has been disabled successfully`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        embed.setColor(`#30CC71`);
                        message.channel.send({embeds:[embed]});
                    }
                }else{
                    message.channel.send(`${message.author}, raid is already disabled`);
                }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, You don't have perms to disable raid`);
                message.channel.send({embeds:[embed]});
            }
        }else if(argsone_name === 'enable'){
            if(message.member.permissions.has('ADMINISTRATOR')){
                if(serverData.raid !== 'enable'){
                    if(serverData){
                        const response = await serverModel.findOneAndUpdate({guildID:message.guild.id},{
                            raid:'enable'
                        });
                        
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`✅ Raid has been enabled successfully`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        embed.setColor(`#30CC71`);
                        message.channel.send({embeds:[embed]});
                    }
               }else{
                   message.channel.send(`${message.author}, raid is already enabled`);
               }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, You don't have perms to enable raid`);
                message.channel.send({embeds:[embed]});
            }
         
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}, please mention either disable or enable`);
            embed.addFields({name:`settings-raid disable`,value:`this will disable raid for your server`},
            {name:`settigns-raid enable`,value:`this will enable raid for your server`});
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
        }
    }
}