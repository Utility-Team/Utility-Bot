const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
module.exports = {
    name:'bal',
    async execute(message,args){
        const target = message.mentions.users.first();
      if(!args[0]){
        try{
             let userData = await userModel.findOne({userID: message.author.id});
         if(userData){
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
            const response = await userModel.findOneAndUpdate({
                userID:message.author.id,
              },
              {
                xp:userinfo.xp + 15,
                commands:userinfo.commands + 1
    
               }
              
              );
           }
         }
            let bank_limit = userData.level * 10000;
            if(userData.level === 0){
              bank_limit = 5000;
            }
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}'s balance`);
            embed.setThumbnail(message.author.displayAvatarURL())
            embed.addFields({name:'Net Worth',value:`<:UC:878195863413981214> ${userData.networth}`},
            {name:`Cryptocoins`,value:`${userData.cryptocoin} coin`},
            {name:'Wallet',value:`<:UC:878195863413981214> ${userData.wallet} Utility Coins`},
             {name:'Bank',value:`<:UC:878195863413981214> ${userData.bank}/${bank_limit}`}
            );
            embed.setTimestamp();
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
            message.channel.send({embeds:[embed]});
         }else{
          message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
         }
        }catch(err){
            console.log(err);
        }
     }else{
        if(target){
        try{
            let userData = await userModel.findOne({userID: target.id});
         if(userData){
            if(userData.xp / 1500 === 0){
                const response = await userModel.findOneAndUpdate({
                    userID:message.author.id,
                  },
                  {
                    xp:userData.xp + 15,
                    level:userData.level + 1,
                    commands:userData.commands + 1
    
                   }
                  
                  );
              }
              let bank_limit = userData.level * 10000;
              if(userData.level === 0){
                bank_limit = 5000;
              }
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${target.username}'s balance`);
            embed.setThumbnail(target.displayAvatarURL());
            embed.addFields({name:'Net Worth',value:`<:UC:878195863413981214> ${userData.networth}`},
            {name:`Cryptocoins`,value:`${userData.cryptocoin} coin`},
            {name:'Wallet',value:`<:UC:878195863413981214> ${userData.wallet} Utility Coins`},
            {name:'Bank',value:`<:UC:878195863413981214> ${userData.bank}/${bank_limit}`}
           );
           embed.setTimestamp();
           embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
           message.channel.send({embeds:[embed]});
         }else{
             message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
         }
        }catch(err){
            console.log(err)
        }
      }else{
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`${message.author.username}, Please mention someone who is in the server!`);
        message.channel.send({embds:[embed]});
      }
     }
    }
}
