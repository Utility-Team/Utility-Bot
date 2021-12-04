const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'hunt',
    async execute(message,args,client){
      const userData = await userModel.findOne({userID:message.author.id});
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
        if(userData.huntingrifle >= 1){
            var d = new Date();
            var n = d.getTime();
            let lasthunt = userData.lasthunt;
            if(n-lasthunt>= 30000){
                    var d2 = new Date();
                    var n2 = d2.getTime();  
                    const response  = await userModel.findOneAndUpdate({userID:message.author.id},
                    {
                    lasthunt:n2
                    });
                    let hunt_chance = Math.floor(Math.random() * 3);
                    console.log(hunt_chance);
                    if(hunt_chance === 0){
                        message.reply(`You found nothing. Nice Try!`);
                    }
                    if(hunt_chance === 1){
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`${message.author.username}, You went to woods just to find garbage!`,message.author.displayAvatarURL());
                        embed.setFooter(`I know it sucks!`);
                        embed.setTimestamp();
                        embed.setColor('#ED4245');
                        message.reply({embeds:[embed]});
                    

                    }

                    if(hunt_chance === 2){
                        const animals = ['squirrel','fox','woodpecker','wolf','humming bird'];
                        let animalgot = animals[Math.floor(Math.random() * animals.length)];
                        if(animalgot === 'squirrel'){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username}, You went to the woods and found ${animalgot}!`,message.author.displayAvatarURL());
                            embed.setDescription('You can keep or sell it using sell command');
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#30CC71`);
                            message.channel.send({embeds:[embed]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    squirrel:1
                                }
                            });
                        }
                        if(animalgot === 'fox'){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username}, You went to the woods and found ${animalgot}!`,message.author.displayAvatarURL());
                            embed.setDescription('You can keep or sell it using sell command');
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#30CC71`);
                            message.channel.send({embeds:[embed]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    fox:1
                                }
                            });

                        }
                        if(animalgot === 'woodpecker'){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username}, You went to the woods and found ${animalgot}!`,message.author.displayAvatarURL());
                            embed.setDescription('You can keep or sell it using sell command');
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#30CC71`);
                            message.channel.send({embeds:[embed]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    woodpecker:1
                                }
                            });
                        }
                        if(animalgot === 'wolf'){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username}, You went to the woods and found ${animalgot}!`,message.author.displayAvatarURL());
                            embed.setDescription('You can keep or sell it using sell command');
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#30CC71`);
                            message.channel.send({embeds:[embed]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    wolf:1
                                }
                            });
                        }
                        if(animalgot === 'humming bird'){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username}, You went to the woods and found ${animalgot}!`,message.author.displayAvatarURL());
                            embed.setDescription('You can keep or sell it using sell command');
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#30CC71`);
                            message.channel.send({embeds:[embed]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    hummingbird:1
                                }
                            });
                        }
                    }
            }else{
                var msec = n - lasthunt;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = 30 - ss;
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Wait bro!`);
                embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use hunt again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                message.channel.send({embeds:[embed]});
            }  
        }else{
            message.channel.send(`${message.author} You don't have hunting rifle for hunting. You can buy it using buy command`);
        }
      }else{
          message.channel.send(`${message.author} You haven't joined the currency game. Please type ;join to join the game`);
      }
    }
}