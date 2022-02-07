const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'sharemarket',
    async execute(message,args){
      let botdata = await botModel.findOne({botid:1});
      let serverData = await serverModel.findOne({guildID:message.guild.id});
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
             const userData = await userModel.findOne({userID:message.author.id});
             let avatar;
             if(userData){
             if(userData.avatar){
                if(userData.avatar !== '' && userData.premium === 'enable'){
                  avatar = userData.avatar;
                }else{
                  avatar = message.author.displayAvatarURL();
                }
              }else{
                avatar = message.author.displayAvatarURL();
              }
             }
             const shareUpdate =  async ()=>{
              let botdata = await botModel.findOne({botid:1});
              let alphabet2 = Math.round(10 * botdata.alphabetvalue/100);
              let alphabet = Math.round(alphabet2);
              let utility2 = Math.round( 10 * botdata.utilityvalue/100);
              let utility = Math.round(utility2);
              let facebook2 = Math.round(10 * botdata.facebookvalue/100);
              let facebook = Math.round(facebook2);
              let microsoft2 = Math.round(10 * botdata.microsoftvalue/100);
              let microsoft = Math.round(microsoft2);
              let apple2 = Math.round(10 * botdata.applevalue/100);
              let apple = Math.round(apple2);
              let tesla2 = Math.round(10 * botdata.teslavalue/100);
              let tesla = Math.round(tesla2);
              let totalalphabet = botdata.totalalphabet % 20;
              let totalutility = botdata.totalutilityteam  % 20;
              let totalfacebook = botdata.totalfacebook % 20;
              let totalmicrosoft = botdata.totalmicrosoft % 20;
              let totalapple = botdata.totalapple % 20;
              let totaltesla = botdata.totaltesla % 20;
              if(totalalphabet === 0 && botdata.totalalphabet !== 0 && Math.sign(botdata.totalalphabet) === 1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalalphabet:0,
                  $inc:{
                    alphabetvalue:alphabet
                  }
                });
              }
              if(totalutility === 0 && botdata.totalutilityteam !== 0 && Math.sign(botdata.totalutilityteam) === 1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalutilityteam:0,
                  $inc:{
                    utilityvalue:utility
                  }
                });
              }
              if(totalfacebook === 0 && botdata.totalfacebook !== 0 && Math.sign(botdata.totalfacebook) === 1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalfacebook:0,
                  $inc:{
                    facebookvalue:facebook
                  }
                });
              }
          
              if(totalmicrosoft === 0 && botdata.totalmicrosoft !== 0 && Math.sign(botdata.totalmicrosoft) === 1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalmicrosoft:0,
                  $inc:{
                    microsoftvalue:microsoft
                  }
                });
              }
          
              if(totalapple === 0 && botdata.totalapple !== 0 && Math.sign(botdata.totalapple) === 1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalapple:0,
                  $inc:{
                    applevalue:apple
                  }
                });
              }
          
              if(totaltesla === 0 && botdata.totaltesla !== 0 && Math.sign(botdata.totaltesla) === 1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totaltesla:0,
                  $inc:{
                    teslavalue:tesla
                  }
                });
              }
          //for loss making shares
              if(totalalphabet === 0 && botdata.totalalphabet !== 0 && Math.sign(botdata.totalalphabet) === -1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalalphabet:0,
                  $inc:{
                    alphabetvalue:-alphabet
                  }
                });
              }
              if(totalutility === 0 && botdata.totalutilityteam !== 0 && Math.sign(botdata.totalutilityteam) === -1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalutilityteam:0,
                  $inc:{
                    utilityvalue:-utility
                  }
                });
              }
              if(totalfacebook === 0 && botdata.totalfacebook !== 0 && Math.sign(botdata.totalfacebook) === -1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalfacebook:0,
                  $inc:{
                    facebookvalue:-facebook
                  }
                });
              }
          
              if(totalmicrosoft === 0 && botdata.totalmicrosoft !== 0 && Math.sign(botdata.totalmicrosoft) === -1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalmicrosoft:0,
                  $inc:{
                    microsoftvalue:-microsoft
                  }
                });
              }
          
              if(totalapple === 0 && botdata.totalapple !== 0 && Math.sign(botdata.totalapple) === -1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totalapple:0,
                  $inc:{
                    applevalue:-apple
                  }
                });
              }
          
              if(totaltesla === 0 && botdata.totaltesla !== 0 && Math.sign(botdata.totaltesla) === -1){
                const response = await botModel.findOneAndUpdate({botid:1},{
                  totaltesla:0,
                  $inc:{
                    teslavalue:-tesla
                  }
                });
              }
          
          
          
            }
            shareUpdate();
      let newbotdata = await botModel.findOne({botid:1});
      if(newbotdata){
        const embed = new Discord.MessageEmbed();
        embed.setAuthor(`${message.author.username}, Here are the shares available!`,avatar);
        embed.addFields({name:`<:alphabet:939925643242659880> Alphabet`,value:`1 Share = <:uc:922720730272137256> ${newbotdata.alphabetvalue} Utility Coins`},
        {name:`<:utility:875320356527804418> Utility Team`,value:`1 Share = <:uc:922720730272137256> ${newbotdata.utilityvalue} Utility Coins `},
        {name:'<:fakebook:939924057497952356> Fakebook',value:`1 Share = <:uc:922720730272137256> ${newbotdata.facebookvalue} Utility Coins`},
        {name:`<:hooli:939924424231100486> Hooli`,value:`1 Share = <:uc:922720730272137256> ${newbotdata.microsoftvalue} Utility Coins`},
        {name:`<:PiedPiper:939924753915998218> Pied Piper`,value:`1 Share = <:uc:922720730272137256> ${newbotdata.applevalue} Coins`},
        {name:`<:hola:939924607337644052> Hola Electric`,value:`1 Share = <:uc:922720730272137256> ${newbotdata.teslavalue} Utility Coins`}
        );
        embed.setFooter(`use ${serverData.prefix}buy share name quantity (to buy share)`);
        embed.setTimestamp();
        message.channel.send({embeds:[embed]});
      }
    }
}