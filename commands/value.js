const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
module.exports={
    name:'value',
   async execute(message,args){
    let userData = await userModel.findOne({userID: message.author.id});
    let botdata = await botModel.findOne({botid:1});
    let cryptovalue = botdata.cryptovalue;
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
      const embed = new Discord.MessageEmbed();
      var price =   userData.cryptocoin * cryptovalue;
      embed.setTitle(`:chart_with_upwards_trend: Utility CryptoCoin  ⬆️`);
      embed.setDescription(`1 Utility CryptoCoin = ${cryptovalue} Utility Coins.
       ${userData.cryptocoin} Utility CryptoCoin = ${price} Utility Coins
       To convert coin into money use ;convert
      `);
      message.channel.send({embeds:[embed]});
    }
    }
}