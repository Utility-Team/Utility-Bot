const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'gamble',
    async execute(message,args){
      let userData = await userModel.findOne({userID:message.author.id});
      if(userData){
        if(args[0]){
          let number = args[0];
          if(!isNaN(number) && Math.sign(number) === 1){
                if(number % 1=== 0){  
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
                    
                    if(userData.wallet < number){
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Your wallet doesn't have enough money to gamble`);
                        message.channel.send({embeds:[embed]});
                    
                    }else{
                      if(number>=20){
                        if(number<=150000){
                        
                                let lastgamble = userData.lastgamble;
                                const embed = new Discord.MessageEmbed();
                                let user_score = Math.floor(Math.random() * 10);
                                let bot_score = Math.floor(Math.random() * 10);
                                let amount_won =  number;
                                let amount_lost = number;
                                var d = new Date();
                                var n = d.getTime();
                                let max_value = userData.wallet + parseInt(number);
                                console.log('max value : ' + max_value);
                                console.log('current balance : ' + userData.wallet);
                                if(n - lastgamble >= 5000){
                                  if(userData.wallet < 1000000000 && max_value <= 1000000000){
                                    if(bot_score < user_score){
                                      var d = new Date();
                                     var n = d.getTime();
                                     let balance = userData.wallet + amount_won;
                                     let networth = userData.networth + amount_won;
                                     let totalgamble = userData.totalgamble + 1;
                                     let wongamble = userData.wongamble + 1;
                                     
                                     const response = await userModel.findOneAndUpdate({
                                         userID:message.author.id,
                                       },
                                       {
                                         $inc:{
                                           wallet:args[0],
                                           networth:args[0],
                                           totalgamble:1,
                                           wongamble:1,
                                         },
                                       
                                         lastgamble:n
                                         
                                         }
                                       
                                       );
                                     embed.setTitle(`${message.author.username} Played and won the gamble!`);
                                     embed.addFields({name:`Amount Won`,value:`<:UC:878195863413981214> ${amount_won}`},{name:`You got`,value:`${user_score} in dice roll 🎲`},{name:`Utility got`,value:`${bot_score} in dice roll 🎲`});
                                     embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                     embed.setTimestamp();
                                     embed.setColor(`#30CC71`);
                                     message.channel.send({embeds:[embed]});
                                   }else if(bot_score > user_score){
                                     var d = new Date();
                                     var n = d.getTime();
                                     let balance = userData.wallet - amount_lost;
                                     let networth = userData.networth - amount_lost;
                                     let totalgamble = userData.totalgamble + 1;
                                     let lostgamble = userData.lostgamble + 1;
                                     
                                     const response = await userModel.findOneAndUpdate({
                                         userID:message.author.id,
                                       },
                                       {
                                         $inc:{
                                           wallet:-args[0],
                                           networth:-args[0],
                                           totalgamble:1,
                                           lostgamble:1,
                                         },
                                         lastgamble:n
                                         
                                         }
                                       
                                       );
                                     embed.setTitle(`${message.author.username} Played and lost the gamble!`);
                                     embed.addFields({name:`Amount lost`,value:`<:UC:878195863413981214> ${amount_lost}`},{name:`You got`,value:`${user_score} in dice roll 🎲`},{name:`Utility got`,value:`${bot_score} in dice roll 🎲`});
                                     embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                     embed.setTimestamp();
                                     embed.setColor('#FF470F');
                                     message.channel.send({embeds:[embed]});
                                   }else{
                                     var d = new Date();
                                     var n = d.getTime();
                                     let totalgamble = userData.totalgamble + 1;
                                     let tiegamble = userData.tiegamble + 1;
                                     
                                     const response = await userModel.findOneAndUpdate({
                                         userID:message.author.id,
                                       },
                                       {
                                         totalgamble:totalgamble,
                                         tiegamble:tiegamble,
                                         lastgamble:n
                                         
                                         }
                                       
                                       );
                                     embed.setTitle(`${message.author.username} Played and tie the gamble!`);
                                     embed.addFields({name:`Amount Won`,value:`0`},{name:`You got`,value:`${user_score} in dice roll 🎲`},{name:`Utility got`,value:`${bot_score} in dice roll 🎲`});
                                     embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                     embed.setTimestamp();
                                     message.channel.send({embeds:[embed]});

                                   }
                                  }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`❌ Gamble Failed`);
                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                    message.channel.send({embeds:[embed]});
                                   
                                  }
                                }else{
                                      let next_work = n - lastgamble ;
                                  var msec = next_work;
                                  var hh = Math.floor(msec / 1000 / 60 / 60);
                                  msec -= hh * 1000 * 60 * 60;
                                  var mm = Math.floor(msec / 1000 / 60);
                                  msec -= mm * 1000 * 60;
                                  var ss = Math.floor(msec / 1000);
                                  msec -= ss * 1000;
                                  var time = 60 - ss;
                                  message.channel.send(`${message.author}, You are in a cooldown please try this command after ${ss} seconds `);
                                }
                        }else{
                          message.channel.send(`${message.author}, You can't play a gamble of more than 150000 coins`);
                        }
                      }else{
                        message.channel.send(`${message.author}, You can't play a gamble for less than 20 coins`);
                      }
                    }
                
              
              }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`${message.author.username}, Please enter a valid number!`);
                  message.channel.send({embeds:[embed]});
              }
          }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}, Please enter a valid number!`);
            message.channel.send({embeds:[embed]});
          }
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}, Please enter a valid number!`);
            message.channel.send({embeds:[embed]});
        }
      }else{
        message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
      }
    }
}