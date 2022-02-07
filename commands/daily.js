const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'daily',
    async execute(message,args){
     let userData = await userModel.findOne({userID:message.author.id});
     let serverData = await serverModel.findOne({guildID:message.guild.id});
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
      let lastdaily = userData.dailytime;
      var d = new Date();
      var n = d.getTime();
      if(userData.job !== ''){
      if(n-lastdaily>= 86400000){
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
        let totalwork = userData.totalwork;
        let salary = userData.salary;
        let daily = userData.level * 100 + salary;
        let balance = userData.wallet + daily;
        let networth = userData.networth + daily;
        if(userData.wallet < 5000000000 && userData.wallet + daily <= 5000000000){
           
            var d2 = new Date();
            var n2 = d.getTime();
            const response = await userModel.findOneAndUpdate({
                userID:message.author.id,
              },
              {
                wallet:balance,
                networth:networth,
                dailytime:n2


              }
              
              );
              let next_work = n - n2 ;
                var msec = next_work;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                var hrs = 24 - hh;
                var time = 60 - mm
              const embed = new Discord.MessageEmbed();
              embed.setTitle(`${message.author.username}, Here are your daily coins!`);
              embed.addFields({name:`<:UC:878195863413981214> ${daily} were placed in your wallet`,value:`Current Wallet Balance - <:UC:878195863413981214> ${balance}`},{name:'You can get daily again in ',value:`${hrs}hrs`});
              embed.setFooter( `Requested by ${message.author.username}`,avatar);
              embed.setTimestamp();
              message.channel.send({embeds:[embed]});
          }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`❌ Daily Failed`);
            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
            message.channel.send({embeds:[embed]});
          }

          
      }else{
        let next_work = n - lastdaily ;
            var msec = next_work;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
            var hrs = 24 - hh;
            var time = 60 - mm
          if(hrs!== 0 && hrs === 24){
            message.channel.send(`${message.author}, You are in cooldown. please use daily after ${hrs}hrs`);
          }else if(hrs!==0 && hrs !== 24){
            message.channel.send(`${message.author}, You are in cooldown. please use daily after ${hrs}hrs, ${time}mins`);
          }else{
            message.channel.send(`${message.author}, You are in cooldown. please use daily after ${time}mins `);
          }
       
      }
     }else{
      const embed = new Discord.MessageEmbed();
      embed.setTitle(`${message.author.username}, You don't have a job`);
      embed.setDescription(`${message.author.username}, To use daily you need to get a job. use ;jobslist to see the available jobs & use ;work job name to join the job.`);
      message.channel.send({embeds:[embed]});
     }
     }else{
      message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
     }
    }
}