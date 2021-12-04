const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports={
    name:'gay',
    async execute(message,args){
        const target = message.mentions.users.first();
        if(args[0]){
            if(target){
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`<:icons8speedometer50:884347600495591454> Gay meter`);
                const randNumber = Math.floor(Math.random()*100)+1;
                embed.setDescription(`${target.username} is ${randNumber}% gay!`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                message.channel.send({embeds:[embed]});
            }
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`<:icons8speedometer50:884347600495591454> Gay meter`);
            const randNumber = Math.floor(Math.random()*100)+1;
            embed.setDescription(`You are ${randNumber}% gay!`);
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            message.channel.send({embeds:[embed]});
        }
        
    }
}