const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:`shares`,
    async execute(message,args){
        const userData = await userModel.findOne({userID:message.author.id});
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        let botData = await botModel.findOne({botid:1});
        if(userData){
          let userinfo = await userModel.findOne({userID:message.author.id});
          if(userinfo){
         if(userinfo.xp / 1500 === 0){
           const response = await userModel.findOneAndUpdate({
               userID:message.author.id,
             },
             {
               $inc:{
                 xp:15,
                 commands:1,
                 level:1
               }
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
                const targetData = await userModel.findOne({userID:target.id});
                if(targetData){
                    let lastshares;
                    if(userData.lastshares){
                      lastshares = userData.lastshares;
                    }else{
                      lastshares = 0;
                    }
                    let avatar;
                    if(userData.avatar){
                      if(userData.avatar !== '' && userData.premium === 'enable'){
                        avatar = userData.avatar;
                      }else{
                        avatar = message.author.displayAvatarURL();
                      } 
                    }else{
                      avatar = message.author.displayAvatarURL();
                    }
                    let targetavatar;
                    if(targetData.avatar !== '' && targetData.premium === 'enable'){
                      targetavatar = targetData.avatar;
                    }else{
                      targetavatar = target.displayAvatarURL();
                    }
                    let d = new Date();
                    let n = d.getTime();
                    let timeup;
                    let timeup2;
                    if(userData.premium === 'enable'){
                      timeup = 5000;
                      timeup2 = 5;
                    }else{
                      timeup = 10000;
                      timeup2 = 10;
                    }
                    if(n - lastshares>= timeup){
                        let alphabet = targetData.alphabet;
                        let utility = targetData.utility;
                        let facebook = targetData.facebook;
                        let microsoft = targetData.microsoft;
                        let apple = targetData.apple;
                        let tesla = targetData.tesla;
                        let totalshares = alphabet + utility + facebook + microsoft + apple + tesla;
                        let sharesworth = alphabet *  botData.alphabetvalue + microsoft *  botData.microsoftvalue + facebook *  botData.facebookvalue + utility *  botData.utilityvalue + apple * botData.applevalue + tesla * botData.teslavalue;
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`${memberTarget.user.username}'s shares`,targetavatar);
                        embed.addFields(
                          {name:`Total Shares:`,value:`${totalshares}`},
                          {name:`Shares Worth:`,value:`<:UC:878195863413981214> ${sharesworth}`},
                          {name:`<:alphabet:939925643242659880> Alphabet`,value:`${alphabet}`},
                          {name:`<:utility:875320356527804418> Utility Team`,value:`${targetData.utility}`},
                          {name:`<:fakebook:939924057497952356> Fakebook`,value:`${targetData.facebook}`},
                          {name:`<:hooli:939924424231100486> Hooli`,value:`${targetData.microsoft}`},
                          {name:`<:PiedPiper:939924753915998218> Pied Piper`,value:`${targetData.apple}`},
                          {name:`<:hola:939924607337644052> Hola Electric`,value:`${targetData.tesla}`}
                        );
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastshares:n2
                        });
                    }else{
                        var msec = n - lastshares;
                        console.log(msec);
                        var ss = Math.floor(msec / 1000);
                        var second = timeup2 - ss;
                        if(userData.premium !== 'enable'){
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`Wait bro!`);
                          embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check shares again!. The default cooldown is of **10** seconds but for premium users it is of **5** seconds to become a premium user use premium command.`);
                          message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`Chill bro!`);
                          embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check shares again!.`);
                          embed.setColor('#025CFF');
                          message.channel.send({embeds:[embed]});
                        }
                    }
                }else{
                  message.channel.send(`${target} hasn't joined currency game. Please type ;join to join the game`);
                }
              }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author}, Please mention a valid user!`);
                message.channel.send({embeds:[embed]});
              }
            }else{
              let lastshares;
              if(userData.lastshares){
                lastshares = userData.lastshares;
              }else{
                lastshares = 0;
              }
              let d = new Date();
              let n = d.getTime();
              let timeup;
              let timeup2;
              if(userData.premium === 'enable'){
                timeup = 5000;
                timeup2 = 5;
              }else{
                timeup = 10000;
                timeup2 = 10;
              }
              let avatar;
              if(userData.avatar !== '' && userData.premium === 'enable'){
                avatar = userData.avatar;
              }else{
                avatar = message.author.displayAvatarURL();
              }
              if(n - lastshares>= timeup){
                    let alphabet = userData.alphabet;
                    let utility = userData.utility;
                    let facebook = userData.facebook;
                    let microsoft = userData.microsoft;
                    let apple = userData.apple;
                    let tesla = userData.tesla;
                    let totalshares = alphabet + utility + facebook + microsoft + apple + tesla;
                    let sharesworth = alphabet *  botData.alphabetvalue + microsoft *  botData.microsoftvalue + facebook *  botData.facebookvalue + utility *  botData.utilityvalue + apple * botData.applevalue + tesla * botData.teslavalue;
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`${message.author.username}'s shares`,avatar);
                    embed.addFields(
                      {name:`Total Shares:`,value:`${totalshares}`},
                      {name:`Shares Worth:`,value:`<:UC:878195863413981214> ${sharesworth}`},
                      {name:`<:alphabet:939925643242659880> Alphabet`,value:`${alphabet}`},
                      {name:`<:utility:875320356527804418> Utility Team`,value:`${userData.utility}`},
                      {name:`<:fakebook:939924057497952356> Fakebook`,value:`${userData.facebook}`},
                      {name:`<:hooli:939924424231100486> Hooli`,value:`${userData.microsoft}`},
                      {name:`<:PiedPiper:939924753915998218> Pied Piper`,value:`${userData.apple}`},
                      {name:`<:hola:939924607337644052> Hola Electric`,value:`${userData.tesla}`}
                    );
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    let d2 = new Date();
                    let n2 = d2.getTime();
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      lastshares:n2
                    });
              }else{
                var msec = n - lastshares;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = timeup2 - ss;
                if(userData.premium !== 'enable'){
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Wait bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check shares again!. The default cooldown is of **10** seconds but for premium users it is of **5** seconds to become a premium user use premium command.`);
                  message.channel.send({embeds:[embed]});
                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Chill bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check shares again!.`);
                  embed.setColor('#025CFF');
                  message.channel.send({embeds:[embed]});
                }
              }
            }
        }else{
                      message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

        }

        
    }
}