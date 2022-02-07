const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'gamble',
    async execute(message,args){
      let userData = await userModel.findOne({userID:message.author.id});
      let serverData = await serverModel.findOne({guildID:message.guild.id});
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
                    async function check_Rewards(achievement,reward1,badge,power,category,prize,type){
                      if(userData.rewards && userData.badges){
                          if(userData.rewards.length>0){
                              let check = 0;
                              for(var x = 0;x<=userData.rewards.length;x++){
                                  if(userData.rewards[x]){
                                      if(userData.rewards[x].name === achievement){
                                          check = 5;
                                          console.log('it already exists');
                                          return;
                                      }
                                      if(x === userData.rewards.length && check <5){
                                          const embed = new Discord.MessageEmbed();
                                          embed.setTitle(`🎉 Unlocked New Achievement!`);
                                          embed.setDescription(`You have unlocked **${achievement} achievement** and your rewards are **${reward1} & ${badge}**`);
                                          embed.setTimestamp();
                                          message.channel.send({embeds:[embed]});
                                          let rewardsbadge = userData.rewards;
                                          let badgeData = userData.badges;
                                          let newrewardsData = {
                                              name:achievement,
                                              reward:reward1,
                                              badge:badge,
                                              category:category
                                          }
                                          let newbadgeData = {
                                              name:achievement,
                                              badge:badge,
                                              power:power,
                                              category:category
                                          }
                                          rewardsbadge.push(newrewardsData);
                                          badgeData.push(newbadgeData);
                                          if(type === 'xp'){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                  xp:prize
                                                },
                                                rewards:rewardsbadge,
                                                badges:badgeData
                                            });
                                          }else{
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                              $inc:{
                                                networth:prize,
                                                wallet:prize
                                              },
                                              rewards:rewardsbadge,
                                              badges:badgeData
                                          });
                                          }
                                      }
                                  }else{
                                      const embed = new Discord.MessageEmbed();
                                      embed.setTitle(`🎉 Unlocked New Achievement!`);
                                      embed.setDescription(`You have unlocked **${achievement} achievement** and your rewards are **${reward1} & ${badge}**`);
                                      embed.setTimestamp();
                                      message.channel.send({embeds:[embed]});
                                      let rewardsbadge = userData.rewards;
                                      let badgeData = userData.badges;
                                      let newrewardsData = {
                                          name:achievement,
                                          reward:reward1,
                                          badge:badge,
                                          category:category
                                      }
                                      let newbadgeData = {
                                          name:achievement,
                                          badge:badge,
                                          power:power,
                                          category:category
                                      }
                                      rewardsbadge.push(newrewardsData);
                                      badgeData.push(newbadgeData);
                                      if(type === 'xp'){
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                              xp:prize
                                            },
                                            rewards:rewardsbadge,
                                            badges:badgeData
                                        });
                                      }else{
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                          $inc:{
                                            networth:prize,
                                            wallet:prize
                                          },
                                          rewards:rewardsbadge,
                                          badges:badgeData
                                        });
                                      }
                                      return;
                                  }
                                  
                              }
                          }else{
                              const embed = new Discord.MessageEmbed();
                                      embed.setTitle(`🎉 Unlocked New Achievement!`);
                                      embed.setDescription(`You have unlocked **${achievement} achievement** and your rewards are **${reward1} & ${badge}**`);
                                      embed.setTimestamp();
                                      message.channel.send({embeds:[embed]});
                                      let rewardsbadge = [];
                                      let badgeData = []
                                      let newrewardsData = {
                                          name:achievement,
                                          reward:reward1,
                                          badge:badge,
                                          category:'Donation'
                                      }
                                      let newbadgeData = {
                                          name:achievement,
                                          badge:badge,
                                          power:power,
                                          category:'Donation'
                                      }
                                      rewardsbadge.push(newrewardsData);
                                      badgeData.push(newbadgeData);
                                      if(type === 'xp'){
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                              xp:prize
                                            },
                                            rewards:rewardsbadge,
                                            badges:badgeData
                                        });
                                      }else{
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                          $inc:{
                                            networth:prize,
                                            wallet:prize
                                          },
                                          rewards:rewardsbadge,
                                          badges:badgeData
                                        });
                                      }
                          }
                      }
                    }
                    let avatar;
                    if(userData.avatar !== '' && userData.premium === 'enable'){
                      avatar = userData.avatar;
                    }else{
                      avatar = message.author.displayAvatarURL();
                    }
                    
                    if(userData.wallet < number){
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Your wallet doesn't have enough money to gamble`);
                        message.channel.send({embeds:[embed]});
                    
                    }else{
                      if(number>=20){              
                        let timeup;
                        let timeup2;
                        if(userData.premium === 'enable'){
                          timeup = 5000;
                          timeup2 = 5;
                        }else{
                          timeup = 3000;
                          timeup2 = 3;
                        }
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
                                if(n - lastgamble >= timeup){
                                  if(userData.wallet < 5000000000 && max_value <= 5000000000){
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
                                     embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                     embed.setTimestamp();
                                     embed.setColor(`#30CC71`);
                                     message.channel.send({embeds:[embed]});
                                     if(userData.totalgamble>=100){
                                        check_Rewards('Successfully playing 100 gambles','500 xp','<:playing100gambles:925732172277620746>',1,'Gamble',500,'xp');
                                     }
                                     if(userData.wongamble>=100){
                                       check_Rewards('Winning 100 gambles','<:uc:922720730272137256> 15k','<:supergamblerbadge:925733231532322837>',2,'Gamble',15000,'money');
                                     }
                                     if(userData.totalgamble>=1000){
                                      check_Rewards('Successfully playing 100 gambles','<:uc:922720730272137256> 50k','<:playing1000gambles:925737559689150475>>',4,'Gamble',50000,'money');
                                     }
                                     if(userData.wongamble>=1000){
                                      check_Rewards('Winning 1000 gambles','<:uc:922720730272137256> 500k','<:winning1000gamblesbadge:938451521241239612>',4,'Gamble',500000,'money');
                                     }
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
                                     embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                     embed.setTimestamp();
                                     embed.setColor('#FF470F');
                                     message.channel.send({embeds:[embed]});
                                     if(userData.totalgamble>100){
                                      check_Rewards('Successfully playing 100 gambles','500 xp','<:supergamblerbadge:925733231532322837>',1,'Gamble',500,'xp');
                                     }
                                     if(userData.totalgamble>1000){
                                      check_Rewards('Successfully playing 1000 gambles','<:uc:922720730272137256> 50k','<:playing1000rpsgamesbadge:925749675020124252>',4,'Gamble',50000,'money');
                                     }
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
                                     embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                     embed.setTimestamp();
                                     message.channel.send({embeds:[embed]});
                                     if(userData.totalgamble>100){
                                      check_Rewards('Successfully playing 100 gambles','500 xp','<:supergamblerbadge:925733231532322837>',1,'Gamble',500,'xp');
                                     }
                                     if(userData.totalgamble>1000){
                                      check_Rewards('Successfully playing 1000 gambles','<:uc:922720730272137256> 50k','<:playing1000rpsgamesbadge:925749675020124252>',4,'Gamble',50000,'money');
                                     }

                                   }
                                  }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`❌ Gamble Failed`);
                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                    message.channel.send({embeds:[embed]});
                                   
                                  }
                                }else{
                                  var msec = n - lastgamble;
                                  console.log(msec);
                                  var ss = Math.floor(msec / 1000);
                                  var second = timeup2 - ss;
                                  if(userData.premium !== 'enable'){
                                    message.channel.send(`${message.author}, You are in a cooldown please try this command after ${ss} seconds `);
                                  }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`Chill bro!`);
                                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use gamble again!.`);
                                    embed.setColor('#025CFF');
                                    message.channel.send({embeds:[embed]});
                                  }
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
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
       
      }
    }
}