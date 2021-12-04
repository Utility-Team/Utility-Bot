const Discord = require('discord.js');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'settings-welcome',
    async execute(message,args){
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        let argsone_name;
        if(args[0]){
            argsone = args[0];
            argsone_name = argsone.toLowerCase();
        }
        if(argsone_name === 'disable'){
            if(serverData){
                if(message.member.permissions.has('ADMINISTRATOR')){
                    const response = await serverModel.findOneAndUpdate({guildID:message.guild.id},{
                        cwelcome:''
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`✅ Welcome embed has been disabled successfully`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setColor(`#30CC71`);
                    message.channel.send({embeds:[embed]});
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, You don't have perms to disable welcome embed`);
                    message.channel.send({embeds:[embed]});
                }
             


            }
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}, please mention disable.`);
            embed.addFields({name:`example - settings-welcome disable`,value:`this will disable welcome embed for your server`});
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
        }
    }
}