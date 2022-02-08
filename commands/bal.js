const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'bal',
    aliases:['bal','balance'],
    async execute(message,args){
      const serverData = await serverModel.findOne({guildID:message.guild.id});
      const authorData = await userModel.findOne({userID:message.author.id});
      const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if(!args[0]){
        try{     
            if(authorData){
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
                let banklimit;
                if(authorData.banklimit){
                  banklimit = authorData.banklimit;
                }else{
                  banklimit = 0;
                }
                let bank_limit = authorData.level * 10000 + banklimit;
                if(authorData.level === 0){
                  bank_limit = 5000 + banklimit;
                }
                let avatar;
                if(authorData.avatar){
                  if(authorData.avatar !== ''){
                    if(authorData.premium === 'enable'){
                      avatar = authorData.avatar;
                    }else{
                      avatar = message.author.displayAvatarURL();
                    }
                  }else{
                      avatar = message.author.displayAvatarURL();
                  }
                }else{
                  avatar = message.author.displayAvatarURL();
                }
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}'s balance`);
                embed.setThumbnail(avatar);
                embed.addFields({name:'Net Worth:',value:`<:uc:922720730272137256> ${authorData.networth}`},
                  {name:`Cryptocoins:`,value:`${authorData.cryptocoin} coin`},
                  {name:'Wallet:',value:`<:uc:922720730272137256> ${authorData.wallet} Utility Coins`},
                  {name:'Bank:',value:`<:uc:922720730272137256> ${authorData.bank}/${bank_limit}`}
                );
                embed.setTimestamp();
                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                console.log(message.author.displayAvatarURL());
                message.channel.send({embeds:[embed]});
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}'s balance`);
                embed.setThumbnail(message.author.displayAvatarURL());
                embed.addFields({name:'Net Worth:',value:`<:uc:922720730272137256> 1000`},
                  {name:`Cryptocoins:`,value:`0 coin`},
                  {name:'Wallet:',value:`<:uc:922720730272137256> 1000 Utility Coins`},
                  {name:'Bank:',value:`<:uc:922720730272137256> 0/5000`}
                );
                embed.setTimestamp();
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                message.channel.send({embeds:[embed]});
                let profile = await userModel.create({
                    //user's id
                  userID:message.author.id,
                    //username
                  username:message.author.username,
                    //money in wallet
                  wallet:1000,
                    //money in bank
                  bank:0,
                  //total money
                  networth:1000,
                  //job name
                  job:'',
                  //total commands runned
                  commands:0,
                  //last daily time
                  dailytime:0,
                  //last monthly time
                  monthlytime:0,
                  //last daily worked
                  dailywork:0,
                  //total gambles played
                  totalgamble:0,
                  //total gambles won
                  wongamble:0,
                  //total gambles lost
                  lostgamble:0,
                  //current salary
                  salary:0,
                  //total hours worked
                  totalwork:0,
                  //Utility CryptoCoins
                  cryptocoin:0,
                  //last gamble played
                  lastgamble:0,
                  //number of gambles tie
                  tiegamble:0,
                  //xp
                  xp:0,
                  //level
                  level:0,
                  //alphabet shares
                  alphabet:0,
                  //Utility shares
                  utility:0,
                  //facebook shares
                  facebook:0,
                  //microsoft shares
                  microsoft:0,
                  //apple shares
                  apple:0,
                  //tesla shares
                  tesla:0,
                  //mode
                  mode:'active',
                  //lock active or not
                  lockactive:'disable',
                  //last raid done by the user
                  lastraid:0,
                  //last resign
                  lastresign:0,
                  //last beg
                  lastbeg:0,
                  //number of locks in use
                  nolock:0,
                  //partner id
                  partner:0,
                  //partner name
                  partnername:'',
                  //last time when got raided
                  gotraided:0,
                  //last profile
                  lastprofile:0,
                  //last inventory
                  lastinv:0,
                  //bio
                  bio:'',
                  //hobby
                  hobby:'',
                  //last family inv
                  lastfamilyinv:0,
                  //last find
                  lastfind:0,
                  //last fish
                  lastfish:0,
                  //last hunt
                  lasthunt:0,
                  //total rps
                  totalrps:0,
                  //won rps
                  wonrps:0,
                  //lost rps
                  lostrps:0,
                  //tie rps
                  tierps:0,
                  //last rps
                  lastrps:0,
                  //premium
                  premium:'disable',
                  //last premium
                  lastpremium:0,
                  //last passive
                  lastpassive:0,
                  //last shop
                  lastshop:0,
                  //last lottery
                  lastlottery:0,
                  //last dig
                  lastdig:0,
                  //last treasure
                  lasttreasure:0,
                  //last buy
                  lastbuy:0,
                  //last sell
                  lastsell:0,
                  //last use
                  lastuse:0,
                  avatar:'',
                  background:'',
                  fishingrod:0,
                  huntingrifle:0,
                  boat:0,
                  lock:0,
                  creditpoints:0,
                  premiumtype:0,
                  totalmoneydonated:0,
                  totalmoneyreceived:0,
                  totalitemsdonated:0,
                  totalitemsreceived:0

                });
                profile.save();
            }
        }catch(err){
            console.log(err);
        }
     }else{
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            try{  
                    let authoravatar;
                    if(authorData){
                      if(authorData.avatar !=='' && authorData.premium === 'enable'){
                        authoravatar = authorData.avatar;
                      }else{
                        authoravatar = target.displayAvatarURL();
                      }
                    }else{
                      authoravatar = target.displayAvatarURL();
                    }
                    let userData = await userModel.findOne({userID:target.id});
                    if(userData){
                          let targetavatar;
                          if(userData.avatar){
                            if(userData.avatar !== ''){
                              if(userData.premium === 'enable'){
                                targetavatar = userData.avatar;
                              }else{
                                targetavatar = memberTarget.user.displayAvatarURL();
                              }
                            }else{
                                targetavatar = memberTarget.user.displayAvatarURL();
                            }
                          }else{
                            targetavatar = memberTarget.user.displayAvatarURL();
                          }
                          let userinfo = await userModel.findOne({userID:target.id});
                          if(userinfo){
                         if(userinfo.xp / 1500 === 0){
                           const response = await userModel.findOneAndUpdate({
                               userID:message.author.id,
                             },
                             {
                               $inc:{
                                 xp:15,
                                 commands:1,
                                 level:1
                               }
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
                          let banklimit;
                          if(userData.banklimit){
                            banklimit = userData.banklimit;
                          }else{
                            banklimit = 0;
                          }
                          let bank_limit = userData.level * 10000 + banklimit;
                          if(userData.level === 0){
                            bank_limit = 5000 + banklimit;
                          }
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${memberTarget.user.username}'s balance`);
                          embed.setThumbnail(targetavatar);
                          embed.addFields({name:'Net Worth:',value:`<:uc:922720730272137256> ${userData.networth}`},
                            {name:`Cryptocoins:`,value:`${userData.cryptocoin} coin`},
                            {name:'Wallet:',value:`<:uc:922720730272137256> ${userData.wallet} Utility Coins`},
                            {name:'Bank:',value:`<:uc:922720730272137256> ${userData.bank}/${bank_limit}`}
                          );
                          embed.setTimestamp();
                          embed.setFooter(`Requested by ${message.author.username}`,authoravatar);
                          message.channel.send({embeds:[embed]});
                        }else{
                          message.channel.send(`${target}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
                        }
            }catch(err){
                console.log(err);
            }
      }else{
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`${message.author.username}, Please mention someone who is in the server!`);
        message.channel.send({embeds:[embed]});
      }
     }
    }
}
