const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'mode',
    async execute(message,args){
        let argsone;
        let argsone_name;
        if(args[0]){
         argsone = args[0];
         argsone_name = argsone.toLowerCase();
        }
        let userData =  await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
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
            if(args[0]){
                if(argsone_name === 'active'){
                  if(userData.mode !== 'active'){
                    const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                     },{
                         mode:'active'
                     })
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, Your gameplay mode has been set to **active**`);
                    embed.setColor(`#30CC71`);
                    message.channel.send({embeds:[embed]});
                  }else{
                      message.channel.send(`${message.author}, your gameplay mode is already **active** `);
                  }
                }else if(argsone_name === 'unactive' || argsone_name === 'passive'){
                    var d = new Date();
                    var n = d.getTime();
                    var lastpassive = userData.lastpassive;
                
                
                    if(userData.mode !== 'unactive'){
                        if(n - lastpassive >= 86400000){
                            var d2 = new Date();
                            var n2 = d2.getTime();
                            const response = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                            },{
                                mode:'unactive',
                                lastpassive:n2
                            });
                        
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Your gameplay mode has been set to **unactive**`);
                            embed.setColor(`#30CC71`);
                            message.channel.send({embeds:[embed]});
                        }else{
                            let next_work = n - lastpassive ;
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
                            message.channel.send(`${message.author}, You are in cooldown. You can change mode again after ${hrs}hrs`);
                          }else if(hrs!==0 && hrs !== 24){
                            message.channel.send(`${message.author}, You are in cooldown. You can change mode again ${hrs}hrs, ${time}mins`);
                          }else{
                            message.channel.send(`${message.author}, You are in cooldown. You can change mode again ${time}mins `);
                          }
                        }
                     }else{
                        message.channel.send(`${message.author}, your gameplay mode is already **unactive** `);
                     }
               

                }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setAuthor(`${message.author.username}, Please mention the mode you want to set!`,message.author.displayAvatarURL());
                embed.addFields({name:`Your current mode -`,value:`${userData.mode}`},{name:`;mode active`,value:`to set active mode`},{name:`;mode unactive`,value:'to set passive mode'});
                message.channel.send({embeds:[embed]});
            }
        }else{
          message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
           
        }
    }
}