const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
module.exports={
    name:`shares`,
    async execute(message,args){
        const target = message.mentions.users.first();
        let botData = await botModel.findOne({botid:1});
        if(target && args[0]){
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
    
         let userData = await userModel.findOne({userID:target.id});
        
         if(userData){
         let alphabet = userData.alphabet;
         let utility = userData.utility;
         let facebook = userData.facebook;
         let microsoft = userData.microsoft;
         let apple = userData.apple;
         let tesla = userData.tesla;
         let totalshares = alphabet + utility + facebook + microsoft + apple + tesla;
         let sharesworth = alphabet *  botData.alphabetvalue + utility *  botData.microsoftvalue + facebook *  botData.facebookvalue + utility *  botData.utilityvalue + apple * botData.applevalue + tesla * botData.teslavalue;
         const embed = new Discord.MessageEmbed();
         embed.setAuthor(`${target.username}'s shares`,target.displayAvatarURL());
         embed.addFields(
          {name:`Total Shares:`,value:`${totalshares}`},
          {name:`Shares Worth:`,value:`<:UC:878195863413981214> ${sharesworth}`},
          {name:`<:GoogleGLogo:878192149210992660> Alphabet`,value:`${alphabet}`},
          {name:`<:utility:875320356527804418> Utility Team`,value:`${userData.utility}`},
          {name:`<:facebookemoji:878190000485834802> Facebook`,value:`${userData.facebook}`},
          {name:`<:microsoftlogo:878189981129134090> Microsoft`,value:`${userData.microsoft}`},
          {name:`<:applelogo:878189961151664138> Apple`,value:`${userData.apple}`},
          {name:`<:TESLALOGO:878190186788425758> Tesla`,value:`${userData.tesla}`}
         );
         embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
         embed.setTimestamp();
         message.channel.send({embeds:[embed]});
         }else{
          message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
         }
        }else{
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


            let userData = await userModel.findOne({userID:message.author.id});
            if(userData){
            let alphabet = userData.alphabet;
            let utility = userData.utility;
            let facebook = userData.facebook;
            let microsoft = userData.microsoft;
            let apple = userData.apple;
            let tesla = userData.tesla;
            let totalshares = alphabet + utility + facebook + microsoft + apple + tesla;
            let sharesworth = alphabet *  botData.alphabetvalue + utility *  botData.microsoftvalue + facebook *  botData.facebookvalue + utility *  botData.utilityvalue + apple * botData.applevalue + tesla * botData.teslavalue;
            const embed = new Discord.MessageEmbed();
            embed.setAuthor(`${message.author.username}'s shares`,message.author.displayAvatarURL());
            embed.addFields( {name:`Total Shares:`,value:`${totalshares}`},
             {name:`Shares Worth:`,value:`<:UC:878195863413981214> ${sharesworth}`},
             {name:`<:GoogleGLogo:878192149210992660> Alphabet`,value:`${alphabet}`},
             {name:`<:utility:875320356527804418> Utility Team`,value:`${userData.utility}`},
             {name:`<:facebookemoji:878190000485834802> Facebook`,value:`${userData.facebook}`},
             {name:`<:microsoftlogo:878189981129134090> Microsoft`,value:`${userData.microsoft}`},
             {name:`<:applelogo:878189961151664138> Apple`,value:`${userData.apple}`},
             {name:`<:TESLALOGO:878190186788425758> Tesla`,value:`${userData.tesla}`}
            );
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
            }else{
              message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
            }
        }
    }
}