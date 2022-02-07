const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'settings-bio',
    aliases:['settings-bio','settingsbio'],
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        let argsone_name;
        if(args[0]){
            argsone = args[0];
            argsone_name = argsone.toLowerCase();
        }
        if(argsone_name === 'disable'){
            if(userData){
                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                   bio :''
                });
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`✅ Your bio has been disabled successfully`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                embed.setColor(`#30CC71`);
                message.channel.send({embeds:[embed]});


            }else{
                message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
            }
        }else{
            const embed = new Discord.MessageEmbed(); 
            embed.setTitle(`${message.author.username}, please mention disable.`);
            embed.addFields({name:`example - settings-bio disable`,value:`this will disable your bio from your userinfo`});
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
        }
    }
}