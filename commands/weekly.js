const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'weekly',
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
        if(userData.premium !== 'enable'){
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`Premium required`);
          embed.setDescription(`Dear ${message.author}, the premium subscription of the bot is out! which will give you premium experience and you will get exclusive commands and less cool down time and more.`);
          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
          embed.setColor(`#404EED`);
          embed.setTimestamp();
          const row = new Discord.MessageActionRow()
          .addComponents(
              new Discord.MessageButton()
                  .setLabel('Utility Premium')
                  .setStyle('LINK')
                  .setEmoji('<:patreonpremium:934410962990141440>')
                  .setURL('https://www.patreon.com/Utility?fan_landing=true')
          );
          message.channel.send({embeds:[embed],components:[row]});
        }else{
          let lastweekly;
          if(userData.lastweekly){
            lastweekly = userData.lastweekly;
          }else{
            lastweekly = 0;
          }
          var d = new Date();
          var n = d.getTime();
          if(userData.job !== ''){
          if(n-lastweekly>= 604800000){
    
            let totalwork = userData.totalwork;
            let salary = userData.salary;
            let daily =  userData.level * 100 + salary;
            let weekly = 3 * daily;
            let balance = userData.wallet + weekly;
            if(userData.wallet < 5000000000 && userData.wallet + weekly <= 5000000000){  
                var d2 = new Date();
                var n2 = d.getTime();
                const response = await userModel.findOneAndUpdate({
                    userID:message.author.id,
                  },
                    {
                      $inc:{
                        wallet:weekly,
                        networth:weekly
                      },
                      lastweekly:n2
                    }
                  );
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`${message.author.username}, Here are your weekly coins!`);
                  embed.addFields({name:`<:UC:878195863413981214> ${weekly} were placed in your wallet`,value:`Current Wallet Balance - <:UC:878195863413981214> ${balance}`},{name:'You can get weekly again in ',value:`7 days`});
                  embed.setFooter( `Requested by ${message.author.username}`,message.author.displayAvatarURL());
                  embed.setTimestamp();
                  message.channel.send({embeds:[embed]});
              }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`❌ Weekly Failed`);
                embed.setDescription(`${message.author}, You can't have more than 5 billion coins in your wallet`);
                message.channel.send({embeds:[embed]});
              }
    
              
          }else{
            let next_work = n - lastweekly ;
            var msec = 604800000 - next_work;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
            var hrs =  hh;
            var time =  mm
            var days = Math.floor(hrs/24);
              if(hrs!== 0 && hrs === 24){
                message.channel.send(`${message.author}, You are in cooldown. please use weekly after ${hrs}hrs`);
              }else if(hrs!==0 && hrs !== 24){
                message.channel.send(`${message.author}, You are in cooldown. please use weekly after ${hrs}hrs, ${time}mins`);
              }else{
                message.channel.send(`${message.author}, You are in cooldown. please use weekly after ${time}mins `);
              }
           
          }
         }else{
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`${message.author.username}, You don't have a job`);
          embed.setDescription(`${message.author.username}, To use weekly you need to get a job. use ;jobslist to see the available jobs & use ;work job name to join the job.`);
          message.channel.send({embeds:[embed]});
         }
        }
      }else{
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

      }
    }
}