const Discord = require('discord.js');
const userModel  = require('../models/userSchema');
const talkedRecently = new Set();
module.exports={
    name:'beg',
    async execute(message,args){
      let userData = await userModel.findOne({userID:message.author.id});
      let date;
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
        var d = new Date();
        var n = d.getTime();
        let d2;
        let n2
        let lastbeg = userData.lastbeg
        if (n -lastbeg >= 30000){
          const randNumber = Math.floor(Math.random()*50)+1;
          if(userData.wallet < 1000000000 && userData.wallet + randNumber <= 1000000000){
            
              d2 = new Date();
              n2 = d2.getTime();
              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                  $inc:{
                      wallet:randNumber,
                      networth:randNumber,
                      
                  }
              });
              const response2 = await userModel.findOneAndUpdate({userID:message.author.id},{
                lastbeg:n2
              })
              if(randNumber !== 0){
              
              message.channel.send(`${message.author}, You begged and got <:UC:878195863413981214> ${randNumber}`);
              
              }else{
                  message.channel.send(`${message.author}, You got nothing!`)
              }

          }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`❌ Beg Failed`);
            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
            message.channel.send({embeds:[embed]});
          }
        }else{
          var msec = n - lastbeg;

          console.log(msec);
          var ss = Math.floor(msec / 1000);
          var second = 30 - ss;
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`Wait bro!`);
          embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to beg again!. The default cooldown is of **30** seconds but for premium users it is of **15** seconds to become a premium user type ;premium.`);
          message.channel.send({embeds:[embed]});
        }
      }else{
          message.channel.send(`${message.author}, You haven't joined the currency game. Please type ;join to join the game.`)
      }

        }


}

