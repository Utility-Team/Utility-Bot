const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'monthly',
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
          let lastmonthly = userData.monthlytime;
          var d = new Date();
          var n = d.getTime();
          if(n-lastmonthly>= 2592000000){
            if(userData.job !== ''){
                 let totalwork = userData.totalwork;
                  let salary = userData.salary;
                  let daily =  userData.level * 100 + salary;
                  let monthly = 5 * daily;
              if(userData.wallet < 5000000000 && userData.wallet + monthly <= 5000000000){
               
                  let balance = userData.wallet + monthly;
                  let networth = userData.networth + monthly;
                  var d2 = new Date();
                  var n2 = d.getTime();
                  const response = await userModel.findOneAndUpdate({
                      userID:message.author.id,
                    },
                    {
                      wallet:balance,
                      networth:networth,
                      monthlytime:n2


                    }
                    
                    );
                    let next_work = n - n2 ;
                    var msec = 2592000000 - next_work;
                    var hh = Math.floor(msec / 1000 / 60 / 60);
                    msec -= hh * 1000 * 60 * 60;
                    var mm = Math.floor(msec / 1000 / 60);
                    msec -= mm * 1000 * 60;
                    var ss = Math.floor(msec / 1000);
                    msec -= ss * 1000;
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, Here are your monthly coins!`);
                    embed.addFields({name:`<:UC:878195863413981214> ${monthly} were placed in your wallet`,value:`Current Wallet Balance - <:UC:878195863413981214> ${balance}`},{name:'You can get monthly again in ',value:`${hh}hrs`});
                    embed.setFooter( `Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`❌ Monthly Failed`);
                  embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                  message.channel.send({embeds:[embed]});
                }
            }else{
              const embed = new Discord.MessageEmbed();
              embed.setTitle(`${message.author.username}, You don't have a job`);
              embed.setDescription(`${message.author.username}, To use monthly you need to get a job. use ;jobslist to see the available jobs & use ;work job name to join the job.`);
              message.channel.send({embeds:[embed]});
            }
              
          }else{
            let next_work = n - lastmonthly ;
                var msec = 2592000000 - next_work;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                var hrs =  hh;
                var time =  mm
                var days = Math.floor(hrs/24);
              if(days!== 0){
                message.channel.send(`${message.author}, You are in cooldown. please use monthly after ${days}days`);
              }else if( days === 0){
                message.channel.send(`${message.author}, You are in cooldown. please use monthly after ${hrs}hrs`);
              }else if(hrs===0){
                message.channel.send(`${message.author}, You are in cooldown. please use monthly after ${time}mins `);
              }
          }
      }else{
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
       
      }
    }
}