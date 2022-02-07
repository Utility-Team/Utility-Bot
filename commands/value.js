const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'value',
    async execute(message,args){
      let userData = await userModel.findOne({userID: message.author.id});
      let botdata = await botModel.findOne({botid:1});
      let serverData = await serverModel.findOne({guildID:message.guild.id});
      let cryptovalue = botdata.cryptovalue;
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
        const embed = new Discord.MessageEmbed();
        var price =   userData.cryptocoin * cryptovalue;
        embed.setTitle(`:chart_with_upwards_trend: CryptoCoin Value ⬆️`);
        embed.setDescription(`1 Utility CryptoCoin = <:uc:922720730272137256> ${cryptovalue} Utility Coins
        ${userData.cryptocoin} Utility CryptoCoin = <:uc:922720730272137256> ${price} Utility Coins`);
        embed.setFooter(`To convert cryptocoin into money try ${serverData.prefix}convert`);
        message.channel.send({embeds:[embed]});
      }
    }
}