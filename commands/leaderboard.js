const Discord = require('discord.js');
const userModel  = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'leaderboard',
    aliases:['leaderboard'],
    async execute(message,args){
        const userData = await userModel.findOne({userID:message.author.id});
        const serverData = await serverModel.findOne({guildID:message.guild.id});
        let user  = [];
        let rankusers = [];
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
            let avatar;
            if(userData.avatar !== '' && userData.premium === 'enable'){
              avatar = userData.avatar;
            }else{
              avatar = message.author.displayAvatarURL();
            }
          let d = new Date();
          let n = d.getTime();
          let lastleaderboard;
          if(userData.lastleaderboard){
            lastleaderboard = userData.lastleaderboard;
          }else{
            lastleaderboard = 0;
          }
          let timeup;
          let timeup2;
          if(userData.premium === 'enable'){
            timeup = 10000;
            timeup2 = 10;
          }else{
            timeup = 20000;
            timeup2 = 20;
          }
          if(n - lastleaderboard >= timeup){
            console.log('here 1');
            let d2 = new Date();
            let n2 = d2.getTime();
            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
              lastleaderboard:n2
            });
            let embed = new Discord.MessageEmbed();
            embed.setTitle(`Utility Leaderboard`);
            let value = 0;
            message.guild.members.cache.forEach(async (member)=>{ 
              let userData = await userModel.findOne({userID:member.id});
              value = value + 1;
              if(userData){
                    let userobject = {
                        username:`${userData.username}`,
                        networth:userData.networth,
                        wallet:`${userData.wallet}`,
                        userID:userData.userID
                    }
                    user.push(userobject);
                    rankusers.push(userData.networth);
                }
                if(value === message.guild.memberCount){
                    let value2 = 0;
                    console.log('yes till here it is working');
                    const {guild} = message;
                    const icon = guild.iconURL();
                    let embed = new Discord.MessageEmbed();
                    embed.setAuthor(`${member.guild.name}'s leaderboard`,icon);
                    user.sort((a,b)=>b.networth - a.networth);
                    user.forEach(async (e)=>{
                        value2 = value2 + 1;
                        if(value2 <= 10){
                            embed.addFields({name:`${value2}> ${e.username}`,value:`<:uc:922720730272137256> ${e.networth}`});
                        }
                      
                        if(value2 === user.length){
                            embed.setDescription(`(Based on networth)`)
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }
                    });

                }
                
            });
          }else{
            var msec = n - lastleaderboard;
            console.log(msec);
            var ss = Math.floor(msec / 1000);
            var second = timeup2 - ss;
            if(userData.premium !== 'enable'){
              const embed = new Discord.MessageEmbed();
              embed.setTitle(`Wait bro!`);
              embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check leaderboard again!. The default cooldown is of **20** seconds but for premium users it is of **10** seconds to become a premium user use premium command.`);
              message.channel.send({embeds:[embed]});
            }else{
              const embed = new Discord.MessageEmbed();
              embed.setTitle(`Chill bro!`);
              embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check leaderboard again!.`);
              embed.setColor('#025CFF');
              message.channel.send({embeds:[embed]});
            }
          }
        }else{
          message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

        }
    }
}