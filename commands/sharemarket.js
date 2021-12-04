const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
module.exports = {
    name:'sharemarket',
    async execute(message,args){
     
      let botdata = await botModel.findOne({botid:1})
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
        embed.setAuthor(`${message.author.username}, Here are the shares available!`,message.author.displayAvatarURL());
        embed.addFields({name:`<:GoogleGLogo:878192149210992660> Alphabet`,value:`1 Share = ${newbotdata.alphabetvalue} Utility Coins`},
        {name:`<:utility:875320356527804418> Utility Team`,value:`1 Share = ${newbotdata.utilityvalue} Utility Coins `},
        {name:'<:facebookemoji:878190000485834802> Facebook',value:`1 Share = ${newbotdata.facebookvalue} Utility Coins`},
        {name:`<:microsoftlogo:878189981129134090> Microsoft`,value:`1 Share = ${newbotdata.microsoftvalue} Utility Coins`},
        {name:`<:applelogo:878189961151664138> Apple`,value:`1 Share = ${newbotdata.applevalue} Coins`},
        {name:`<:TESLALOGO:878190186788425758> Tesla`,value:`1 Share = ${newbotdata.teslavalue} Utility Coins`}
        );
        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
        embed.setTimestamp();
        message.channel.send({embeds:[embed]});
      }
    }
}