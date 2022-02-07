const Discord = require('discord.js');
const userModel  = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'beg',
    async execute(message,args){
      let userData = await userModel.findOne({userID:message.author.id});
      let serverData = await serverModel.findOne({guildID:message.guild.id});
      let date;
      if(userData){
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
        var d = new Date();
        var n = d.getTime();
        let d2;
        let n2
        let lastbeg = userData.lastbeg;
        let timeup;
        let timeup2;
        if(userData.premium === 'enable'){
          timeup = 15000;
          timeup2 = 15;
        }else{
          timeup = 30000;
          timeup2 =30;
        }
        if (n -lastbeg >= timeup){
          const randNumber = Math.floor(Math.random()*50)+1;
          if(userData.wallet < 5000000000 && userData.wallet + randNumber <= 5000000000){
            
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
              
              message.channel.send(`${message.author}, You begged and got <:uc:922720730272137256> ${randNumber}`);
              
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
          var second = timeup2 - ss;
          if(userData.premium !== 'enable'){
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Wait bro!`);
            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to beg again!. The default cooldown is of **30** seconds but for premium users it is of **15** seconds to become a premium user type ;premium.`);
            message.channel.send({embeds:[embed]});
          }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Chill bro!`);
            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use beg again!.`);
            embed.setColor('#025CFF');
            message.channel.send({embeds:[embed]});
          }
        }
      }else{
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
        
      }

        }


}

