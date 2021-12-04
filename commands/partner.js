const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports={
    name:'partner',
    async execute(message,args){
        const target = message.mentions.users.first();
        let userinfo = await userModel.findOne({userID:message.author.id});
        if(userinfo){
             if(userinfo.xp / 1500 === 0){
               const response = await userModel.findOneAndUpdate({
                   userID:message.author.id,
                 },
                 {
                   xp:userinfo.xp + 15,
                   level:userinfo.level + 1,
                   commands:userinfo.commands + 1
     
                   }
                 
                 );
             }else{
               let level = Math.round(userinfo.xp/1500);
               const response = await userModel.findOneAndUpdate({
                   userID:message.author.id,
                 },
                 {
                   xp:userinfo.xp + 15,
                   commands:userinfo.commands + 1,
                   level:level
     
                 }
                 
                 );
              }
            }
        if(args[0]){
            if(target){
               let targetData = await userModel.findOne({userID:target.id});
               if(targetData){
                if(targetData.partner !== 0){
                 const embed = new Discord.MessageEmbed();
                 embed.setDescription(`${target.username} is married to ${targetData.partnername}`);
                 embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
                 message.channel.send({embeds:[embed]});
                }else{
                 const embed = new Discord.MessageEmbed();
                 embed.setDescription(`${target} is not married!`);
                 embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
                 message.channel.send({embeds:[embed]});
                }
              }else{
                message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
              }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, Please mention someone who is in the server!`);
                message.channel.send({embeds:[embed]});
            }

        }else{
          let userData = await userModel.findOne({userID:message.author.id});
          if(userData){
            if(userData.partner !== 0){
             const embed = new Discord.MessageEmbed();
             embed.setDescription(`You are married to ${userData.partnername}`);
             embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
             message.channel.send({embeds:[embed]});
            }else{
             const embed = new Discord.MessageEmbed();
             embed.setDescription(`You are not married!`);
             embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
             message.channel.send({embeds:[embed]});
            }
          }else{
            message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
          }
        }
    }
}