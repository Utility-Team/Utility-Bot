const Discord = require('discord.js');
const userModel  = require('../models/userSchema');
module.exports = {
    name:'race-rank',
    aliases:['race-rank','racegloballeaderboard','raceglobalrank','rglobal','race-global'],
    async execute(message,args){
     let userData = await userModel.findOne({userID:message.author.id});
     const embed = new Discord.MessageEmbed();
     embed.setAuthor(`Utility typing race leaderboard`,'https://i.ibb.co/tYb8d0f/w-Gs-Oh-JDa6a57w-AAAABJRU5-Erk-Jggg.png');
     
        if(userData){
            let lastrank;
            if(userData.lastrank){
                lastrank = userData.lastrank;
            }else{
                lastrank = 0;
            }
            let avatar;
            if(userData.avatar !== '' && userData.premium === 'enable'){
              avatar = userData.avatar;
            }else{
              avatar = message.author.displayAvatarURL();
            }
            let d = new Date();
            let n = d.getTime();
            let timeup;
            let timeup2;
            if(userData.premium === 'enable'){
              timeup = 10000;
              timeup2 = 10;
            }else{
              timeup = 20000;
              timeup2 = 20;
            }
            if(n - lastrank >= timeup){   
                let d2 = new Date();
                let n2 = d2.getTime();
                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                    lastrank:n2
                });
                let users  = await userModel.find().sort({raceswon:-1}).then(data=>{
                    console.log(data);
                        
                       
                            let arr = data;
                            
                        
                        let value=0;
                        data.sort((a,b)=>b.raceswon - a.raceswon);
                        data.forEach((e)=>{
                            value = value + 1;
                            if(value <= 10){
                                embed.addFields({name:`${value}> ${e.username}`,value:`${e.raceswon}`});
                            }
                            
                            if(value === data.length){
                                embed.setDescription(`(Based on raceswon)`)
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }
                        });
                       
                    }); 
            }else{
                var msec = n - lastrank;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = timeup2 - ss;
                if(userData.premium !== 'enable'){
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Wait bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check rank again!. The default cooldown is of **20** seconds but for premium users it is of **10** seconds to become a premium user use premium command.`);
                  message.channel.send({embeds:[embed]});
                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Chill bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check rank again!.`);
                  embed.setColor('#025CFF');
                  message.channel.send({embeds:[embed]});
                }
            }
                    
        }else{
            message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
        }
    }
}