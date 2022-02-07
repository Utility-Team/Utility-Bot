const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'partner',
    async execute(message,args){
        const target = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        let userinfo = await userModel.findOne({userID:message.author.id});
            if(userinfo){
              if(userinfo.xp / 1500 === 0){
                const response = await userModel.findOneAndUpdate({
                    userID:message.author.id,
                  },
                  {
                    $inc:{
                      xp:1,
                      level:1,
                      commands:1
                    },
                  }
                );
              }else{
                const response = await userModel.findOneAndUpdate({
                    userID:message.author.id,
                  },
                  {
                    $inc:{
                      xp:15,
                      commands:1
                    }
                  }
                );
              }
          }
        if(args[0]){
            if(target){
               const memberTarget = message.guild.members.cache.get(target.id);
               let targetData = await userModel.findOne({userID:target.id});
               if(targetData){
                if(targetData.partner !== 0){
                 const embed = new Discord.MessageEmbed();
                 embed.setDescription(`${memberTarget.user.username} is married to **${targetData.partnername}**`);
                 embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
                 message.channel.send({embeds:[embed]});
                }else{
                 const embed = new Discord.MessageEmbed();
                 embed.setDescription(`${target} is not married!`);
                 embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
                 message.channel.send({embeds:[embed]});
                }
              }else{
               message.channel.send(`${target}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
               
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
             embed.setDescription(`You are married to **${userData.partnername}**`);
             embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
             message.channel.send({embeds:[embed]});
            }else{
             const embed = new Discord.MessageEmbed();
             embed.setDescription(`You are not married!`);
             embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
             message.channel.send({embeds:[embed]});
            }
          }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

          }
        }
    }
}