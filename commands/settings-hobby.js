const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports={
    name:'settings-hobby',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let argsone_name;
        if(args[0]){
            argsone = args[0];
            argsone_name = argsone.toLowerCase();
        }
        if(argsone_name === 'disable'){
            if(userData){
                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                   hobby :''
                });
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`✅ Your hobby has been disabled successfully`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                embed.setColor(`#30CC71`);
                message.channel.send({embeds:[embed]});


            }
        }else{
            const embed = new Discord.MessageEmbed(); 
            embed.setTitle(`${message.author.username}, please mention disable.`);
            embed.addFields({name:`example - settings-hobby disable`,value:`this will disable your hobby from your userinfo`});
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
        }
    }
}