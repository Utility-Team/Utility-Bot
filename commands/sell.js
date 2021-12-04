const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
module.exports = {
  name:`sell`,
  async execute(message,args){
      let userData = await userModel.findOne({userID:message.author.id});
      let botData = await botModel.findOne({botid:1});
      let argsone;
      let argsone_name;
      let argstwo;
      let argstwo_name;
      let argsthree;
      let argsthree_name;
      let lastsell;
      if(userData.lastsell){
        lastsell = userData.lastsell;
      }else{
        lastsell = 0;
      }
      if(args[0]){
        argsone = args[0];
        argsone_name = argsone.toLowerCase();
      }
      if(args[1]){
        argstwo = args[1];
        argstwo_name = argstwo.toLowerCase();
      }
      if(args[2]){
      argsthree = args[2];
      argsthree_name = argsthree.toLowerCase();
      }
     let d = new Date();
     let n = d.getTime();
    
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
       //if args 0 exists
       if(args[0]){
        if(n - lastsell >= 5000){
              let itemname = args.join(' ');
              console.log(itemname)
              let item_name = itemname.toLowerCase();
              let userbal = userData.wallet;
              let networth = userData.networth;
              if(argsone_name === 'diamond' && argstwo_name === 'ring'){
                var diamond = botData.diamondvalue;
                let number = args[2];
                var totalcost = diamond * number;
                if(number){
                if(!isNaN(number) && Math.sign(number) === 1){
                  if(number % 1=== 0){
                    if(userData.diamondring >= number){
                     if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({
                              userID:message.author.id,
                            },
                            {
                              $inc:{
                                wallet:totalcost,
                                networth:totalcost,
                                diamondring:-number
                              }
                              
                
                
                              }
                            
                            );
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully sold **${number}** 💍 diamond ring for ${totalcost}`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                       }else{
                         const embed = new Discord.MessageEmbed();
                         embed.setTitle(`❌ Transaction Failed`);
                         embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                         message.channel.send({embeds:[embed]});
                       }
                    }else{
                        message.channel.send(`${message.author} You don't have that item to sell!`);

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
                if(userData.diamondring >= 1 ){
                  if(userData.wallet < 1000000000 && userData.wallet + diamond <= 1000000000){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastsell:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:diamond,
                          networth:diamond,
                          diamondring:-1
                        }
                      
          
          
                      }
                      
                      );
                      const embed = new Discord.MessageEmbed();
                      embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                      embed.setColor(`#30CC71`);
                      embed.setDescription(`You have successfully sold a 💍 diamond ring for ${diamond}`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                  }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`❌ Transaction Failed`);
                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                    message.channel.send({embeds:[embed]});
                  }
                }else{
                  message.channel.send(`${message.author} You don't have that item to sell!`);
                }
              }
                
                
              }else if(argsone_name === 'gold' && argstwo_name === 'trophy'){
                var trophy = botData.trophyvalue;
                let number = args[2];
                var totalcost = trophy * number;
                if(number){
                if(!isNaN(number) && Math.sign(number) === 1){
                  if(number % 1=== 0){
                    if(userData.goldtrophy >= number){
                     if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastsell:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:totalcost,
                              networth:totalcost,
                              goldtrophy:-number
                            }
                            
              
              
                            }
                          
                          );
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully sold **${number}** 🏆 Gold Trophy for ${totalcost}`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                        message.channel.send(`${message.author} You don't have that item to sell!`);

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
                if(userData.goldtrophy >= 1 ){
                  if(userData.wallet < 1000000000 && userData.wallet + trophy <= 1000000000){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastsell:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:trophy,
                          networth:trophy,
                          goldtrophy:-1
                        }
                      }
                      
                      );
                      const embed = new Discord.MessageEmbed();
                      embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                      embed.setColor(`#30CC71`);
                      embed.setDescription(`You have successfully sold a 🏆 Gold Trophy for ${trophy}`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                  }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`❌ Transaction Failed`);
                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                    message.channel.send({embeds:[embed]});
                  }
                }else{
                  message.channel.send(`${message.author} You don't have that item to sell!`);
                }
              }
              }else if(argsone_name === 'gold' && argstwo_name ==='medal' ){
                var goldmedal = botData.goldvalue;
                let number = args[2];
                var totalcost = goldmedal * number;
                if(number){
                if(!isNaN(number) && Math.sign(number) === 1){
                  if(number % 1=== 0){
                    if(userData.goldmedal >= number){
                     if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastsell:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:totalcost,
                              networth:totalcost,
                              goldmedal:-number
                            }
                            
              
              
                            }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold **${number}** :first_place: gold medal for ${totalcost}`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                        message.channel.send(`${message.author} You don't have that item to sell!`);

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
                if(userData.goldmedal >= 1 ){
                  if(userData.wallet < 1000000000 && userData.wallet + goldmedal <= 1000000000){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastsell:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:goldmedal,
                          networth:goldmedal,
                          goldmedal:-1
                        }
                      
          
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully sold a :first_place: gold medal for ${goldmedal}`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`❌ Transaction Failed`);
                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                    message.channel.send({embeds:[embed]});
                  }
                }else{
                  message.channel.send(`${message.author} You don't have that item to sell!`);
                }
              }
              }else if(argsone_name === 'silver' && argstwo_name === 'medal'){
                var silvermedal = botData.silvervalue;
                let number = args[2];
                var totalcost = silvermedal * number;
                if(number){
                if(!isNaN(number) && Math.sign(number) === 1){
                  if(number % 1=== 0){
                    if(userData.silvermedal >= number){
                     if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastsell:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:totalcost,
                              networth:totalcost,
                              silvermedal:-number
                            }
                            
              
              
                            }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold **${number}** :second_place: silver medal for ${totalcost}`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                        message.channel.send(`${message.author} You don't have that item to sell!`);

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
                if(userData.silvermedal >= 1 ){
                  if(userData.wallet < 1000000000 && userData.wallet + silvermedal <= 1000000000){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastsell:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:silvermedal,
                          networth:silvermedal,
                          silvermedal:-1
            
                        }
                      
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully sold a :second_place: silver medal for ${silvermedal}`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`❌ Transaction Failed`);
                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                    message.channel.send({embeds:[embed]});
                  }
                }else{
                  message.channel.send(`${message.author} You don't have that item to sell!`);
                }
              }
              }else if (argsone_name === 'key'){
                var key = botData.keyvalue;
                let number = args[1];
                var totalcost = key * number;
                if(number){
                if(!isNaN(number) && Math.sign(number) === 1){
                  if(number % 1=== 0){
                    if(userData.key >= number){
                     if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastsell:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:totalcost,
                              networth:totalcost,
                              key:-number
                            }
                            
              
              
                            }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold **${number}** :key: key for ${totalcost}`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                        message.channel.send(`${message.author} You don't have that item to sell!`);

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
                    if(userData.key >= 1 ){
                      if(userData.wallet < 1000000000 && userData.wallet + key <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:key,
                              networth:key,
                              key:-1
                
                            }
                        
              
                          }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold a :key: key for ${key}`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      message.channel.send(`${message.author} You don't have that item to sell!`);
                    }
                  }
                  }else if(argsone_name === 'hunting' && argstwo_name === 'rifle'){
                    var huntingrifle = botData.huntgun;
                    let number = args[2];
                    var totalcost = huntingrifle * number;
                    if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                      if(number % 1=== 0){
                        if(userData.huntingrifle >= number){
                         if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                              },
                              {
                                $inc:{
                                  wallet:totalcost,
                                  networth:totalcost,
                                  huntingrifle:-number
                                }
                              
                  
                  
                              }
                              
                              );
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold **${number}** <:rifle:883578413888184350> hunting rifle
                            for ${totalcost}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                            message.channel.send(`${message.author} You don't have that item to sell!`);
      
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
                    if(userData.huntingrifle >= 1 ){
                      if(userData.wallet < 1000000000 && userData.wallet + huntingrifle <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:huntingrifle,
                              networth:huntingrifle,
                              huntingrifle:-1
                
                            }
                        
              
                          }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold a <:rifle:883578413888184350> hunting rifle for ${huntingrifle}`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      message.channel.send(`${message.author} You don't have that item to sell!`);
                    }
                  }
                  }else if(argsone_name ==='fishing' && argstwo_name === 'rod'){
                    var fishingrod = botData.fishingpole;
                    let number = args[2];
                    var totalcost = fishingrod * number;
                    if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                      if(number % 1=== 0){
                        if(userData.fishingrod >= number){
                         if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                              },
                              {
                                $inc:{
                                  wallet:totalcost,
                                  networth:totalcost,
                                  fishingrod:-number
                                }
                              
                  
                  
                              }
                              
                              );
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold **${number}** :fishing_pole_and_fish: fishing rod for ${totalcost}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          
                          }
                        }else{
                            message.channel.send(`${message.author} You don't have that item to sell!`);
      
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
                    if(userData.fishingpole >= 1 ){
                      if(userData.wallet < 1000000000 && userData.wallet + fishingrod <= 1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({
                                  userID:message.author.id,
                                },
                                {
                                  $inc:{
                                    wallet:fishingrod,
                                    networth:fishingrod,
                                    fishingrod:-1
                      
                                  }
                              
                    
                                }
                                
                                );
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold a :fishing_pole_and_fish: fishing rod for ${fishingrod}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      message.channel.send(`${message.author} You don't have that item to sell!`);
                    }
                  }
                  }else if(argsone_name === 'lock'){
                    var lock = botData.lockvalue;
                    let number = args[1];
                    var totalcost = lock * number;
                    if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                      if(number % 1=== 0){
                        if(userData.lock >= number){
                         if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({
                                  userID:message.author.id,
                                },
                                {
                                  $inc:{
                                    wallet:totalcost,
                                    networth:totalcost,
                                    lock:-number
                                  }
                                
                    
                    
                                }
                                
                                );
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold **${number}** :lock: lock  for ${totalcost}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                            message.channel.send(`${message.author} You don't have that item to sell!`);
      
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
                    if(userData.lock >= 1 ){
                      if(userData.wallet < 1000000000 && userData.wallet + lock <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({
                              userID:message.author.id,
                            },
                            {
                              $inc:{
                                wallet:lock,
                                networth:lock,
                                lock:-1
                  
                              }
                          
                
                            }
                            
                            );
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully sold a :lock: lock for ${lock}`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                    }else{
                      message.channel.send(`${message.author} You don't have that item to sell!`);
                    }
                  }
                  }else if(argsone_name === 'beer'){
                    var beer = botData.beervalue;
                    let number = args[1];
                    var totalcost = beer * number;
                    if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                      if(number % 1=== 0){
                        if(userData.beer >= number){
                         if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                              },
                              {
                                $inc:{
                                  wallet:totalcost,
                                  networth:totalcost,
                                  beer:-number
                                }
                              
                  
                  
                              }
                              
                              );
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold **${number}** :beer: beer for ${totalcost}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                            message.channel.send(`${message.author} You don't have that item to sell!`);
      
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

                    if(userData.beer >= 1 ){
                      if(userData.wallet < 1000000000 && userData.wallet + beer <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:beer,
                              networth:beer,
                              beer:-1
                
                            }
                        
              
                          }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold a :beer: beer for ${beer}`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});s
                      }
                    }else{
                      message.channel.send(`${message.author} You don't have that item to sell!`);
                    }
                  }
                  }else if(argsone_name === 'coffee'){
                    var coffee = botData.coffeevalue;
                    let number = args[1];
                    var totalcost = coffee * number;
                    if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                      if(number % 1=== 0){
                        if(userData.coffee  >= number){
                         if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                              },
                              {
                                $inc:{
                                  wallet:totalcost,
                                  networth:totalcost,
                                  coffee:-number
                                }
                              
                  
                  
                              }
                              
                              );
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold **${number}** :coffee: coffee for ${totalcost}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                            message.channel.send(`${message.author} You don't have that item to sell!`);
      
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
                    if(userData.coffee>= 1 ){
                      if(userData.wallet < 1000000000 && userData.wallet + coffee <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:coffee,
                              networth:coffee,
                              coffee:-1
                
                            }
                        
              
                          }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold a :coffee: coffee for ${coffee}`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      message.channel.send(`${message.author} You don't have that item to sell!`);
                    }
                  }
                  }else if(argsone_name === 'pizza' && argstwo_name === 'slice'){
                    var pizza = botData.pizzavalue;
                    let number = args[2];
                    var totalcost = pizza * number;
                    if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                      if(number % 1=== 0){
                        if(userData.pizzaslice >= number){
                         if(userData.wallet < 1000000000 && userData.wallet + totalcost <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                              },
                              {
                                $inc:{
                                  wallet:totalcost,
                                  networth:totalcost,
                                  pizzaslice:-number
                                }
                              
                  
                  
                              }
                              
                              );
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold **${number}** :pizza: pizza slice for ${totalcost}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                            message.channel.send(`${message.author} You don't own that item to sell!`);
      
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
                    if(userData.pizzaslice >= 1 ){
                      if(userData.wallet < 1000000000 && userData.wallet + pizza <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:pizza,
                              networth:pizza,
                              pizzaslice:-1
                
                            }
                        
              
                          }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold a :pizza: pizza slice for ${pizza}`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Transaction Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      message.channel.send(`${message.author} You don't have that item to sell!`);
                    }
                  }
                  }else if(argsone_name === 'share'){
                    if(argstwo_name === 'alphabet'){
                      var alphabetshare = botData.alphabetvalue;
                      var totalshare = args[2];
                      var cost = alphabetshare * totalshare;
                      var alphabet = userData.alphabet;
                      console.log(totalshare)
                      if(totalshare){
                        if(!isNaN(totalshare) && Math.sign(totalshare) === 1){
                          if(totalshare % 1=== 0){
                            if(userData.alphabet >= totalshare){
                            if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                  let d2 = new Date();
                                  let n2 = d2.getTime();
                                  const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastsell:n2
                                  });
                                  const response = await userModel.findOneAndUpdate({
                                      userID:message.author.id,
                                    },
                                    {
                                    $inc:{
                                      alphabet: -totalshare,
                                      wallet:cost,
                                      networth:cost
                        
                        
                                    }
                                    }
                                    
                                    );
                                    let findshare = await botModel.findOneAndUpdate({botid:1});
                                    if(findshare.alphabetsellid !== userData.userID){
                                      const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                        {
                                          $inc:{
                                            totalalphabet:-1
                                          },
                                          alphabetsellid:userData.userID
                                        });
                                    }

                                  if(totalshare <= 1){
                                    const embed = new Discord.MessageEmbed();
                                    embed.setAuthor(`✅ Successfully Sold`);
                                    embed.setColor(`#30CC71`);
                                    embed.setDescription(`You have successfully sold ${args[2]} share of <:GoogleGLogo:878192149210992660> Alphabet for ${cost}`);
                                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                    embed.setTimestamp();
                                    message.channel.send({embeds:[embed]});
                                  }else if(totalshare>1){
                                    const embed = new Discord.MessageEmbed();
                                    embed.setAuthor(`✅ Successfully Sold`);
                                    embed.setColor(`#30CC71`);
                                    embed.setDescription(`You have successfully sold ${args[2]} shares of <:GoogleGLogo:878192149210992660> Alphabet for ${cost}`);
                                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                    embed.setTimestamp();
                                    message.channel.send({embeds:[embed]});
                                  }
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                              message.channel.send(`${message.author} You don't own the share to sell!`);
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
                      if(userData.alphabet >= 1){
                        if(userData.wallet < 1000000000 && userData.wallet + alphabetshare <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({
                              userID:message.author.id,
                            },
                            {
                            $inc:{
                              alphabet: -1,
                              wallet:alphabetshare,
                              networth:alphabetshare
                
                
                            }
                            }
                            
                            );

                            let findshare = await botModel.findOneAndUpdate({botid:1});
                            if(findshare.alphabetsellid !== userData.userID){
                              const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                {
                                  $inc:{
                                    totalalphabet:-1
                                  },
                                  alphabetsellid:userData.userID
                                });
                            }

                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 share of <:GoogleGLogo:878192149210992660> Alphabet for ${alphabetshare}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author} You don't have that item to sell!`);
                      }
                    }
    
                    }else if(argstwo_name === 'utility' && argsthree_name === 'team'){
                      var utilityshare = botData.utilityvalue;
                      var totalshare = args[3];
                      var cost = utilityshare * totalshare;
                      var totalcost = userbal - cost;
                      var totalcost2 = networth - cost;
                      var alphabet = userData.utility;
                      console.log(totalshare)
                      if(totalshare){
                        if(!isNaN(totalshare) && Math.sign(totalshare) === 1){
                          if(totalshare % 1=== 0){
                            if(userData.utility >= totalshare){
                            if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                  let d2 = new Date();
                                  let n2 = d2.getTime();
                                  const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastsell:n2
                                  });
                                  const response = await userModel.findOneAndUpdate({
                                      userID:message.author.id,
                                    },
                                    {
                                    $inc:{
                                      utility:-totalshare,
                                      wallet:cost,
                                      networth:cost
                        
                        
                                    }
                                    }
                                    
                                    );
                                    let findshare = await botModel.findOneAndUpdate({botid:1});
                                    if(findshare.utilitysellid !== userData.userID){
                                      const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                        {
                                          $inc:{
                                            totalutilityteam:-1
                                          },
                                          utilitysellid:userData.userID
                                        });
                                    }
                                  if(totalshare <= 1){
                                    const embed = new Discord.MessageEmbed();
                                    embed.setAuthor(`✅ Successfully Sold`);
                                    embed.setColor(`#30CC71`);
                                    embed.setDescription(`You have successfully sold ${args[3]} share of <:utility:875320356527804418> Utility Team for ${cost}`);
                                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                    embed.setTimestamp();
                                    message.channel.send({embeds:[embed]});
                                  }else if(totalshare>1){
                                    const embed = new Discord.MessageEmbed();
                                    embed.setAuthor(`✅ Successfully Sold`);
                                    embed.setColor(`#30CC71`);
                                    embed.setDescription(`You have successfully sold ${args[3]} shares of <:utility:875320356527804418> Utility Team for ${cost}`);
                                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                    embed.setTimestamp();
                                    message.channel.send({embeds:[embed]});
                                  }
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                              message.channel.send(`${message.author} You don't own the share to sell!`);
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
                        if(userData.utility >= 1){
                          if(userData.wallet < 1000000000 && userData.wallet + utilityshare <= 1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                              },
                              {
                              $inc:{
                                utility:-1,
                                wallet:utilityshare,
                                networth:utilityshare
                  
                  
                              }
                              }
                              
                              );
                              let findshare = await botModel.findOneAndUpdate({botid:1});
                              if(findshare.utilitysellid !== userData.userID){
                                const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                  {
                                    $inc:{
                                      totalutilityteam:-1
                                    },
                                    utilitysellid:userData.userID
                                  });
                              }
                          
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold 1 share of <:utility:875320356527804418> Utility Team for ${utilityshare}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            }else{
                              message.channel.send(`${message.author} You don't own the share to sell!`);
                            }
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                      }
    
                    }else if(argstwo_name === 'facebook'){
                          var facebookshare = botData.facebookvalue;
                          var totalshare = args[2];
                          var cost = facebookshare * totalshare;
                          var totalcost = userbal - cost;
                          var totalcost2 = networth - cost;
                          var facebook = userData.facebook;
                          console.log(totalshare)
                          if(totalshare){
                            if(!isNaN(totalshare) && Math.sign(totalshare) === 1){
                              if(totalshare % 1=== 0){
                                if(userData.facebook >= totalshare){
                                if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                      let d2 = new Date();
                                      let n2 = d2.getTime();
                                      const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        lastsell:n2
                                      });
                                      const response = await userModel.findOneAndUpdate({
                                          userID:message.author.id,
                                        },
                                        {
                                        $inc:{
                                          facebook: -totalshare,
                                          wallet:cost,
                                          networth:cost
                                        }
                                        }
                                        
                                        );
                                        let findshare = await botModel.findOneAndUpdate({botid:1});
                                        if(findshare.facebooksellid !== userData.userID){
                                          const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                            {
                                              $inc:{
                                                totalfacebook:-1
                                              },
                                              facebooksellid:userData.userID
                                            });
                                        }
                                      if(totalshare <= 1){
                                        const embed = new Discord.MessageEmbed();
                                        embed.setAuthor(`✅ Successfully Sold`);
                                        embed.setColor(`#30CC71`);
                                        embed.setDescription(`You have successfully sold ${args[2]} share of <:facebookemoji:878190000485834802> Facebook for ${cost}`);
                                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                        embed.setTimestamp();
                                        message.channel.send({embeds:[embed]});
                                      }else if(totalshare>1){
                                        const embed = new Discord.MessageEmbed();
                                        embed.setAuthor(`✅ Successfully Sold`);
                                        embed.setColor(`#30CC71`);
                                        embed.setDescription(`You have successfully sold ${args[2]} shares of <:facebookemoji:878190000485834802> Facebook for ${cost}`);
                                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                        embed.setTimestamp();
                                        message.channel.send({embeds:[embed]});
                                      }
                                  }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`❌ Transaction Failed`);
                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                    message.channel.send({embeds:[embed]});
                                  }
                                }else{
                                  message.channel.send(`${message.author} You don't own the share to sell!`);
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
                          if(userData.facebook >= 1){
                            if(userData.wallet < 1000000000 && userData.wallet + facebookshare <= 1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({
                                  userID:message.author.id,
                                },
                                {
                                $inc:{
                                  facebook: -1,
                                  wallet:facebookshare,
                                  networth:facebookshare
                                }
                                }
                                
                                );
                                let findshare = await botModel.findOneAndUpdate({botid:1});
                                if(findshare.facebooksellid !== userData.userID){
                                  const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                    {
                                      $inc:{
                                        totalfacebook:-1
                                      },
                                      facebooksellid:userData.userID
                                    });
                                }
                          
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold 1 share of <:facebookemoji:878190000485834802> Facebook for ${facebookshare}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author} You don't own the share to sell!`);
                          }
                        }
    
                    }else if(argstwo_name === 'microsoft'){
                          var microsoftshare = botData.microsoftvalue;
                          var totalshare = args[2];
                          var cost = microsoftshare * totalshare;
                          var totalcost = userbal - cost;
                          var totalcost2 = networth - cost;
                          var facebook = userData.facebook;
                          console.log(totalshare)
                          if(totalshare){
                            if(!isNaN(totalshare) && Math.sign(totalshare) === 1){
                              if(totalshare % 1=== 0){
                                  if(userData.microsoft>=totalshare){
                                    if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                          let d2 = new Date();
                                          let n2 = d2.getTime();
                                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            lastsell:n2
                                          });
                                          const response = await userModel.findOneAndUpdate({
                                              userID:message.author.id,
                                            },
                                            {
                                            $inc:{
                                              microsoft:-totalshare,
                                              wallet:cost,
                                              networth:cost
                                            }
                                            }
                                            
                                            );
                                            let findshare = await botModel.findOneAndUpdate({botid:1});
                                            if(findshare.microsoftsellid !== userData.userID){
                                              const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                                {
                                                  $inc:{
                                                    totalmicrosoft:-1
                                                  },
                                                  microsoftsellid:userData.userID
                                                });
                                            }
                                          if(totalshare <= 1){
                                            const embed = new Discord.MessageEmbed();
                                            embed.setAuthor(`✅ Successfully Sold`);
                                            embed.setColor(`#30CC71`);
                                            embed.setDescription(`You have successfully sold ${args[2]} share of <:microsoftlogo:878189981129134090> Microsoft for ${cost}`);
                                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                            embed.setTimestamp();
                                            message.channel.send({embeds:[embed]});
                                          }else if(totalshare>1){
                                            const embed = new Discord.MessageEmbed();
                                            embed.setAuthor(`✅ Successfully Sold`);
                                            embed.setColor(`#30CC71`);
                                            embed.setDescription(`You have successfully sold ${args[2]} shares of <:microsoftlogo:878189981129134090> Microsoft for ${cost}`);
                                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                            embed.setTimestamp();
                                            message.channel.send({embeds:[embed]});
                                          }
                                      }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`❌ Transaction Failed`);
                                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                        message.channel.send({embeds:[embed]});
                                      }
                                    }else{
                                       message.channel.send(`${message.author} You don't own the share to sell!`);
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
                            if(userData.microsoft>=1){
                                if(userData.wallet < 1000000000 && userData.wallet + microsoftshare <= 1000000000){
                                  let d2 = new Date();
                                  let n2 = d2.getTime();
                                  const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastsell:n2
                                  });
                                  const response = await userModel.findOneAndUpdate({
                                    userID:message.author.id,
                                  },
                                  {
                                  $inc:{
                                    microsoft:-1,
                                    wallet:microsoftshare,
                                    networth:microsoftshare
                                  }
                                  }
                                  
                                  );
                                  let findshare = await botModel.findOneAndUpdate({botid:1});
                                  if(findshare.microsoftsellid !== userData.userID){
                                    const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                      {
                                        $inc:{
                                          totalmicrosoft:-1
                                        },
                                        microsoftsellid:userData.userID
                                      });
                                  }
            
                                  const embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`✅ Successfully Sold`);
                                  embed.setColor(`#30CC71`);
                                  embed.setDescription(`You have successfully sold 1 share of <:microsoftlogo:878189981129134090> Microsoft for ${microsoftshare}`);
                                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed.setTimestamp();
                                  message.channel.send({embeds:[embed]});
                                }else{
                                  const embed = new Discord.MessageEmbed();
                                  embed.setTitle(`❌ Transaction Failed`);
                                  embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                  message.channel.send({embeds:[embed]});
                                }
                            }else{
                              message.channel.send(`${message.author} You don't own the share to sell!`);
                            }
                          }
        
                    }else if(argstwo_name === 'apple'){
                        var applevalue = botData.applevalue;
                        var totalshare = args[2];
                        var cost = applevalue * totalshare;
                        var totalcost = userbal - cost;
                        var totalcost2 = networth - cost;
                        var facebook = userData.facebook;
                        console.log(totalshare)
                        if(totalshare){
                          if(!isNaN(totalshare) && Math.sign(totalshare) === 1){
                            if(totalshare % 1=== 0){
                              if(userData.apple >= totalshare){  
                              if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){

                                    let d2 = new Date();
                                    let n2 = d2.getTime();
                                    const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                      lastsell:n2
                                    });
                                    const response = await userModel.findOneAndUpdate({
                                        userID:message.author.id,
                                      },
                                      {
                                      $inc:{
                                        apple:-totalshare,
                                        wallet:cost,
                                        networth:cost
                          
                          
                                      }
                                      }
                                      
                                      );
                                      let findshare = await botModel.findOneAndUpdate({botid:1});
                                      if(findshare.applesellid !== userData.userID){
                                        const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                          {
                                            $inc:{
                                              totalapple:-1
                                            },
                                            applesellid:userData.userID
                                          });
                                      }
                                  
                                    if(totalshare <= 1){
                                      const embed = new Discord.MessageEmbed();
                                      embed.setAuthor(`✅ Successfully Sold`);
                                      embed.setColor(`#30CC71`);
                                      embed.setDescription(`You have successfully sold ${args[2]} share of <:applelogo:878189961151664138> Apple for ${cost}`);
                                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                      embed.setTimestamp();
                                      message.channel.send({embeds:[embed]});
                                    }else if(totalshare>1){
                                      const embed = new Discord.MessageEmbed();
                                      embed.setAuthor(`✅ Successfully Sold`);
                                      embed.setColor(`#30CC71`);
                                      embed.setDescription(`You have successfully sold ${args[2]} shares of <:applelogo:878189961151664138> Apple for ${cost}`);
                                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                      embed.setTimestamp();
                                      message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                  const embed = new Discord.MessageEmbed();
                                  embed.setTitle(`❌ Transaction Failed`);
                                  embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                  message.channel.send({embeds:[embed]});
                                }
                              }else{
                                message.channel.send(`${message.author} You don't own the share to sell!`);
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
                        if(userData.apple >= 1){
                          if(userData.wallet < 1000000000 && userData.wallet + applevalue <= 1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                              },
                              {
                              $inc:{
                                apple:-1,
                                wallet:applevalue,
                                networth:applevalue
                  
                  
                              }
                              }
                              
                              );
                              let findshare = await botModel.findOneAndUpdate({botid:1});
                              if(findshare.applesellid !== userData.userID){
                                const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                  {
                                    $inc:{
                                      totalapple:-1
                                    },
                                    applesellid:userData.userID
                                  });
                              }
                            
                          
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold 1 share of <:applelogo:878189961151664138> Apple for ${applevalue}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            }else{
                              message.channel.send(`${message.author} You don't own the share to sell!`);
                            }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }

                      }
      
                    }else if(argstwo_name === 'tesla'){
                      var teslashare = botData.teslavalue;
                      var totalshare = args[2];
                      var cost = teslashare * totalshare;
                      var totalcost = userbal - cost;
                      var totalcost2 = networth - cost;
                      var tesla = userData.tesla;
                      console.log(totalshare)
                      if(totalshare){
                        if(!isNaN(totalshare) && Math.sign(totalshare) === 1){
                          if(totalshare % 1=== 0){
                            if(userData.tesla>=totalshare){
                            if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({
                                    userID:message.author.id,
                                  },
                                  {
                                  $inc:{
                                    tesla:-totalshare,
                                    wallet:cost,
                                    networth:cost
                      
                      
                                  }
                                  }
                                  
                                  );
                                  let findshare = await botModel.findOneAndUpdate({botid:1});
                                  if(findshare.teslasellid !== userData.userID){
                                    const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                      {
                                        $inc:{
                                          totaltesla:-1
                                        },
                                        teslasellid:userData.userID
                                      });
                                  }
                              
                                if(totalshare <= 1){
                                  const embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`✅ Successfully Sold`);
                                  embed.setColor(`#30CC71`);
                                  embed.setDescription(`You have successfully sold ${args[2]} share of <:TESLALOGO:878190186788425758> Tesla for ${cost}`);
                                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed.setTimestamp();
                                  message.channel.send({embeds:[embed]});
                                }else if(totalshare>1){
                                  const embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`✅ Successfully Sold`);
                                  embed.setColor(`#30CC71`);
                                  embed.setDescription(`You have successfully sold ${args[2]} shares of <:TESLALOGO:878190186788425758> Tesla for ${cost}`);
                                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed.setTimestamp();
                                  message.channel.send({embeds:[embed]});
                                }
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                              message.channel.send(`${message.author} You don't the share to sell!`);
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
                      if(userData.tesla>=1){
                        if(userData.wallet < 1000000000 && userData.wallet + teslashare <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                          $inc:{
                            tesla:-1,
                            wallet:teslashare,
                            networth:teslashare
              
              
                          }
                          }
                          
                          );
                          let findshare = await botModel.findOneAndUpdate({botid:1});
                          if(findshare.teslasellid !== userData.userID){
                            const shareupdate = await botModel.findOneAndUpdate({botid:1},
                              {
                                $inc:{
                                  totaltesla:-1
                                },
                                teslasellid:userData.userID
                              });
                          }
                      
                  
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Sold`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully sold 1 share of <:TESLALOGO:878190186788425758> Tesla for ${teslashare}`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});s
                        }
                      }else{
                         message.channel.send(`${message.author} You don't own the share to sell!`);
                      }

                    }
                  }
    
                }else if(argsone_name === 'cryptocoin'){
                    var totalcoin = args[1];
                    var coinvalue = botData.cryptovalue;
                    var cost = coinvalue * totalcoin;
                    if(totalcoin){
                      if(!isNaN(totalshare) && Math.sign(totalshare) === 1){    
                        if(totalshare % 1=== 0){
                          if(userData.cryptocoin >= totalcoin){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  cryptocoin:-totalcoin,
                                  wallet:cost,
                                  networth:cost
                                }
                              });
                              const cryptoupdate = await botModel.findOneAndUpdate({botid:1},
                                {
                                  $inc:{
                                    totalcryptocoin:-1
                                  }
                                });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold ${totalcoin} cryptocoin for ${cost}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that many cryptocoins to sell!`);
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
                     if(userData.cryptocoin >= 1){
                          if(userData.wallet < 1000000000 && userData.wallet + coinvalue <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                cryptocoin:-1,
                                wallet:coinvalue,
                                networth:coinvalue
                              }
                            });
                            const cryptoupdate = await botModel.findOneAndUpdate({botid:1},
                              {
                                $inc:{
                                  totalcryptocoin:-1
                                }
                              });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 cryptocoin for ${coinvalue}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many cryptocoins to sell!`);
                      }
                        
                    }
                    

                  }else if(argsone_name === 'lightsaber'){
                    var totallightsaber = args[1];
                    var sabervalue = botData.lightsabervalue;
                    var cost = sabervalue * totallightsaber;
                    if(totallightsaber){
                      if(userData.lightsaber >= totallightsaber){
                      if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                lightsaber:-totallightsaber,
                                wallet:cost,
                                networth:cost
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold ${totallightsaber} <:limitededitionlightsaber:889749246994169866> lightsaber for ${cost}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }
                    }else{
                      if(userData.lightsaber >= 1){
                        if(userData.wallet < 1000000000 && userData.wallet + sabervalue <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                              lightsaber:-1,
                              wallet:sabervalue,
                              networth:sabervalue
                            }
                          });
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Sold`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully sold 1 <:limitededitionlightsaber:889749246994169866> lightsaber for ${sabervalue}`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many lightsabers to sell!`);
                      }
                    }
                  }else if(argsone_name === 'the' && argstwo_name === 'mandalorian' && argsthree_name === 'helmet'){
                    console.log('mando game');
                    var totalmandohelmet = args[3];
                    var mandovalue = botData.mandohelmet;
                    var cost = mandovalue * totalmandohelmet;
                    if(totalmandohelmet){
                      if(!isNaN(totalmandohelmet) && Math.sign(totalmandohelmet) === 1){
                        if(totalmandohelmet % 1=== 0){
                          if(userData.mandohelmet  >= totalmandohelmet){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  mandohelmet:-totalmandohelmet,
                                  wallet:cost,
                                  networth:cost
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold ${totalmandohelmet} <:newbountyhunter:889745554387648573> Mandalorian Helmet for ${cost}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});

                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.author.send(`${message.author}, You don't have that item to sell!`);
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
                      if(userData.mandohelmet  >= 1){
                        if(userData.wallet <= 1000000000 && userData.wallet + mandovalue <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                              mandohelmet:-1,
                              wallet:mandovalue,
                              networth:mandovalue
                            }
                          });
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Sold`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully sold 1 <:newbountyhunter:889745554387648573> Mandalorian Helmet for ${mandovalue}`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.author.send(`${message.author}, You don't have that item to sell!`);
                      }
                    }
                  }else if(argsone_name === 'boba' && argstwo_name === 'fett' && argsthree_name === 'helmet'){ 
                    var totalbobahelmet = args[3];
                    var bobavalue = botData.bobahelmet;
                    var cost = bobavalue * totalbobahelmet;
                    if(totalbobahelmet){   
                      if(!isNaN(totalbobahelmet) && Math.sign(totalbobahelmet) === 1){
                        if(totalbobahelmet % 1=== 0){
                          if(userData.bobahelmet  >= totalbobahelmet){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  bobahelmet:-totalbobahelmet,
                                  wallet:cost,
                                  networth:cost
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold ${totalbobahelmet} <:bobafettedition:889747878870917170> Boba Fett Helmet for ${cost}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, you don't have that item to sell!`);
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
                      if(userData.bobahelmet >= 1){
                        if(userData.wallet < 1000000000 && userData.wallet + bobavalue <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                bobahelmet:-1,
                                wallet:bobavalue,
                                networth:bobavalue
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 <:bobafettedition:889747878870917170> Boba Fett Helmet for ${bobavalue}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that item to sell!`);
                      }
                    }
                  }else if(argsone_name === 'kylo' && argstwo_name === 'ren' && argsthree_name === 'helmet'){
                    var totalkylohelmet = args[3];
                    var kylovalue = botData.kylohelmet;
                    var cost = kylovalue * totalkylohelmet;
                    if(totalkylohelmet){
                      if(!isNaN(totalkylohelmet) && Math.sign(totalkylohelmet) === 1){
                        if(totalkylohelmet % 1=== 0){
                          if(userData.kylohelmet  >= totalkylohelmet){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    kylohelmet:-totalkylohelmet,
                                    wallet:cost, 
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalkylohelmet} <:KylorenHelmet:889750172115017738> Kylo Ren Helmet for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that item to sell!`);
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
                      if(userData.kylohelmet  >= 1){
                        if(userData.wallet < 1000000000 && userData.wallet + kylovalue <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                kylohelmet:-1,
                                wallet:kylovalue,
                                networth:kylovalue
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 <:KylorenHelmet:889750172115017738> Kylo Ren Helmet for ${kylovalue}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that item to sell!`);
                      }
                    }
                  }else if(argsone_name === 'squid' && argstwo_name === 'game' && argsthree_name === 'doll'){
                    var totalsquiddoll = args[3];
                    var squidvalue = botData.squidgamedoll;
                    var cost = squidvalue * totalsquiddoll;
                    if(totalsquiddoll){
                      if(!isNaN(totalsquiddoll) && Math.sign(totalsquiddoll) === 1){
                        if(totalsquiddoll % 1=== 0){
                          if(userData.squiddoll  >= totalsquiddoll){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    squiddoll:-totalsquiddoll,
                                    wallet:cost,
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalsquiddoll} <:squidgamedoll2:898879068030787614> Squid Game Doll for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that item to sell!`);
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
                      if(userData.squiddoll  >= 1){
                        if(userData.wallet < 1000000000 && userData.wallet + squidvalue <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                squiddoll:-1,
                                wallet:squidvalue,
                                networth:squidvalue
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 <:squidgamedoll2:898879068030787614> Squid Game Doll for ${squidvalue}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that item to sell!`);
                      }
                    }
                  }else if(argsone_name === 'common' && argstwo_name === 'fish'){
                    let totalfish = args[2];
                    let commonfish_value = botData.commonfishvalue;
                    let cost  = commonfish_value * totalfish;
                    if(totalfish){
                      if(!isNaN(totalfish) && Math.sign(totalfish) === 1){
                        if(totalfish % 1=== 0){
                          if(userData.commonfish>=totalfish){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    commonfish:-totalfish,
                                    wallet:cost,
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalfish} 🐟 Common Fish for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that many common fish to sell.`);
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      if(userData.commonfish>=1){
                        if(userData.wallet < 1000000000 && userData.wallet + commonfish_value <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                commonfish:-1,
                                wallet:commonfish_value,
                                networth:commonfish_value
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 🐟 Common Fish for ${commonfish_value}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many common fish to sell.`);
                      }
                      
                    }
                  }else if(argsone_name === 'gold' && argstwo_name === 'fish'){
                    let totalfish = args[2];
                    let goldfish_value = botData.goldfishvalue;
                    let cost  = goldfish_value * totalfish;
                    if(totalfish){
                      if(!isNaN(totalfish) && Math.sign(totalfish) === 1){
                        if(totalfish % 1=== 0){
                          if(userData.goldfish >=totalfish){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  goldfish:-totalfish,
                                  wallet:cost,
                                  networth:cost
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold 1 🐠 Gold Fish for ${cost}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that many gold fish to sell.`);
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      if(userData.goldfish >=1){
                        if(userData.wallet < 1000000000 && userData.wallet + goldfish_value <= 1000000000){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastsell:n2
                          });
                          const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                              goldfish:-1,
                              wallet:goldfish_value,
                              networth:goldfish_value
                            }
                          });
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Sold`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully sold 1 🐠 Gold Fish for ${goldfish_value}`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many gold fish to sell.`);
                      }
              
                    }
                  }else if(argsone_name === 'octopus'){
                    let totalfish = args[1];
                    let octopus_value = botData.octopusvalue;
                    let cost  = octopus_value * totalfish;
                    if(totalfish){
                      if(!isNaN(totalfish) && Math.sign(totalfish) === 1){
                        if(totalfish % 1=== 0){
                          if(userData.octopus >=totalfish){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  octopus:-totalfish,
                                  wallet:cost,
                                  networth:cost
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold ${totalfish} 🐙 Octopus for ${cost}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that many octopus to sell.`);
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      if(userData.octopus >=1){
                        if(userData.wallet < 1000000000 && userData.wallet + octopus_value <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                octopus:-1,
                                wallet:octopus_value,
                                networth:octopus_value
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 🐙 Octopus for ${octopus_value}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many octopus to sell.`);
                      }
              
                    }
                  }else if(argsone_name === 'shark'){
                    let totalfish = args[1];
                    let shark_value = botData.sharkvalue;
                    console.log(shark_value);
                    let cost  = shark_value * totalfish;
                    if(totalfish){
                      if(!isNaN(totalfish) && Math.sign(totalfish) === 1){
                        if(totalfish % 1=== 0){
                          if(userData.shark >=totalfish){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    shark:-totalfish,
                                    wallet:cost,
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalfish} 🦈 Shark for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that many shark to sell.`);
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      if(userData.shark >=1){
                        if(userData.wallet < 1000000000 && userData.wallet + shark_value <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                shark:-1,
                                wallet:shark_value,
                                networth:shark_value
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 🦈 Shark for ${shark_value}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many shark to sell.`);
                      }
              
                    }
                  }else if(argsone_name === 'squirrel'){
                    let totalanimal = args[1];
                    let squirrel_value = botData.squirrelvalue;
                    console.log(squirrel_value);
                    let cost  = squirrel_value * totalanimal;
                    if(totalanimal){
                      if(!isNaN(totalanimal) && Math.sign(totalanimal) === 1){
                        if(totalanimal % 1=== 0){
                          if(userData.squirrel >=totalanimal){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    squirrel:-totalanimal,
                                    wallet:cost,
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalanimal} squirrel for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that many squirrel to sell.`);
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      if(userData.squirrel >=1){
                        if(userData.wallet < 1000000000 && userData.wallet + squirrel_value <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                squirrel:-1,
                                wallet:squirrel_value,
                                networth:squirrel_value
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 squirrel for ${squirrel_value}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many squirrel to sell.`);
                      }
              
                    }
                  }else if(argsone_name === 'fox'){
                    let totalanimal = args[1];
                    let fox_value = botData.foxvalue;
                    console.log(fox_value);
                    let cost  = fox_value * totalanimal;
                    if(totalanimal){
                      if(!isNaN(totalanimal) && Math.sign(totalanimal) === 1){
                        if(totalanimal % 1=== 0){
                          if(userData.fox >=totalanimal){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                fox:-totalanimal,
                                wallet:cost,
                                networth:cost
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold ${totalanimal} Fox for ${cost}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else{
                            message.channel.send(`${message.author}, You don't have that many fox to sell.`);
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      if(userData.fox >=1){
                        if(userData.wallet < 1000000000 && userData.wallet + fox_value <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                fox:-1,
                                wallet:fox_value,
                                networth:fox_value
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 Fox for ${fox_value}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many fox to sell.`);
                      }

              
                    }
                  }else if(argsone_name === 'woodpecker'){
                    let totalanimal = args[1];
                    let woodpecker_value = botData.woodpeckervalue;
                    console.log(woodpecker_value);
                    let cost  = woodpecker_value * totalanimal;
                    if(totalanimal){
                      if(!isNaN(totalanimal) && Math.sign(totalanimal) === 1){
                        if(totalanimal % 1=== 0){
                          if(userData.woodpecker >=totalanimal){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    woodpecker:-totalanimal,
                                    wallet:cost,
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalanimal} woodpecker for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that many woodpecker to sell.`);
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      if(userData.woodpecker >=1){
                        if(userData.wallet < 1000000000 && userData.wallet + woodpecker_value <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                woodpecker:-1,
                                wallet:woodpecker_value,
                                networth:woodpecker_value
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 woodpecker for ${woodpecker_value}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many woodpecker to sell.`);
                      }
              
                    }
                  }else if(argsone_name === 'wolf'){
                    let totalanimal = args[1];
                    let wolf_value = botData.wolfvalue;
                    console.log(wolf_value);
                    let cost  = wolf_value * totalanimal;
                    if(totalanimal){
                      if(!isNaN(totalanimal) && Math.sign(totalanimal) === 1){
                        if(totalanimal % 1=== 0){
                          if(userData.wolf >=totalanimal){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    wolf:-totalanimal,
                                    wallet:cost,
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalanimal} wolf for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }else{

                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that many wolf to sell.`);
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      if(userData.wolf >=1){
                        if(userData.wallet < 1000000000 && userData.wallet + wolf_value <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                wolf:-1,
                                wallet:wolf_value,
                                networth:wolf_value
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 wolf for ${wolf_value}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many wolf to sell.`);
                      }
                
                    }

                  }else if(argsone_name === 'humming' && argstwo_name === 'bird'){
                    let totalanimal = args[2];
                    let hummingbird_value = botData.hummingbirdvalue;
                    console.log(hummingbird_value);
                    let cost  = hummingbird_value * totalanimal;
                    if(totalanimal){
                      if(!isNaN(totalanimal) && Math.sign(totalanimal) === 1){
                        if(totalanimal % 1=== 0){
                          if(userData.hummingbird >=totalanimal){
                          if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    hummingbird:-totalanimal,
                                    wallet:cost,
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalanimal} humming bird for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`❌ Transaction Failed`);
                              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author}, You don't have that many humming bird to sell.`);
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      if(userData.hummingbird >= 1){
                        if(userData.wallet < 1000000000 && userData.wallet + hummingbird_value <= 1000000000){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastsell:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                hummingbird:-1,
                                wallet:hummingbird_value,
                                networth:hummingbird_value
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Sold`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully sold 1 humming bird for ${hummingbird_value}`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`❌ Transaction Failed`);
                          embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't have that many humming bird to sell.`);
                      }
              
                    }
                  }else if(argsone_name === 'boat'){
                      let totalboat = args[1];
                      let boat_value = botData.boatvalue;
                      console.log(boat_value);
                      let cost  = boat_value * totalboat;
                      if(totalboat){
                        if(!isNaN(totalboat) && Math.sign(totalboat) === 1){
                          if(totalboat % 1=== 0){
                            if(userData.boat >=totalboat){
                            if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                  let d2 = new Date();
                                  let n2 = d2.getTime();
                                  const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastsell:n2
                                  });
                                  const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                      boat:-totalboat,
                                      wallet:cost,
                                      networth:cost
                                    }
                                  });
                                  const embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`✅ Successfully Sold`);
                                  embed.setColor(`#30CC71`);
                                  embed.setDescription(`You have successfully sold ${totalboat} <:boat:904243050279235675> boat for ${cost}`);
                                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed.setTimestamp();
                                  message.channel.send({embeds:[embed]});
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                              message.channel.send(`${message.author}, You don't have that many boat to sell.`);
                            }
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        if(userData.boat >=1){
                          if(userData.wallet < 1000000000 && userData.wallet + boat_value <= 1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  boat:-1,
                                  wallet:boat_value,
                                  networth:boat_value
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold 1 <:boat:904243050279235675> boat for ${boat_value}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          message.channel.send(`${message.author}, You don't have that many boat to sell.`);
                        }
                      }
    
                    }else if(argsone_name === 'bubble' && argstwo_name === 'tea'){
                      let totalbubble = args[2];
                      let bubble_value = botData.bubblevalue;
                      console.log(bubble_value);
                      let cost  = bubble_value * totalbubble;
                      if(totalbubble){
                        if(!isNaN(totalbubble) && Math.sign(totalbubble) === 1){
                          if(totalbubble % 1=== 0){
                            if(userData.bubbletea >=totalbubble){
                            if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                  let d2 = new Date();
                                  let n2 = d2.getTime();
                                  const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastsell:n2
                                  });
                                  const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                      bubbletea:-totalbubble,
                                      wallet:cost,
                                      networth:cost
                                    }
                                  });
                                  const embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`✅ Successfully Sold`);
                                  embed.setColor(`#30CC71`);
                                  embed.setDescription(`You have successfully sold ${totalbubble} 🧋 bubble tea for ${cost}`);
                                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed.setTimestamp();
                                  message.channel.send({embeds:[embed]});
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                              message.channel.send(`${message.author}, You don't have that many bubble tea to sell.`);
                            }
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        if(userData.bubbletea >=1){
                          if(userData.wallet < 1000000000 && userData.wallet + bubble_value <= 1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  bubbletea:-1,
                                  wallet:bubble_value,
                                  networth:bubble_value
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold 1 🧋 bubble tea for ${bubble_value}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          message.channel.send(`${message.author}, You don't have that many bubble tea to sell.`);
                        }
                  
                      }
                    }else if(argsone_name === 'dirt'){
                      let totaldirt = args[1];
                      let dirt_value = botData.dirtvalue;
                      console.log(dirt_value);
                      let cost  = dirt_value * totaldirt;
                      if(totaldirt){
                        if(!isNaN(totaldirt) && Math.sign(totaldirt) === 1){
                          if(totaldirt % 1=== 0){
                            if(userData.dirt >=totaldirt){
                            if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                  let d2 = new Date();
                                  let n2 = d2.getTime();
                                  const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastsell:n2
                                  });
                                  const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                      dirt:-totaldirt,
                                      wallet:cost,
                                      networth:cost
                                    }
                                  });
                                  const embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`✅ Successfully Sold`);
                                  embed.setColor(`#30CC71`);
                                  embed.setDescription(`You have successfully sold ${totaldirt} <:dirt:904039581224153098> dirt for ${cost}.`);
                                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed.setTimestamp();
                                  message.channel.send({embeds:[embed]});
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                              message.channel.send(`${message.author}, You don't have that many dirt to sell.`);
                            }
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        if(userData.dirt >=1){
                          if(userData.wallet < 1000000000 && userData.wallet + dirt_value <= 1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  dirt:-1,
                                  wallet:dirt_value,
                                  networth:dirt_value
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold 1 <:dirt:904039581224153098> dirt for ${dirt_value}.`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          message.channel.send(`${message.author}, You don't have that many dirt to sell.`);
                        }
                
                      }
                    }else if(argsone_name === 'grass'){
                      let totalgrass = args[1];
                      let grass_value = botData.grassvalue;
                      console.log(grass_value);
                      let cost  = grass_value * totalgrass;
                      if(totalgrass){
                        if(!isNaN(totalgrass) && Math.sign(totalgrass) === 1){
                          if(totalgrass % 1=== 0){
                            if(userData.grass >=totalgrass){
                            if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                  let d2 = new Date();
                                  let n2 = d2.getTime();
                                  const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastsell:n2
                                  });
                                  const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                      grass:-totalgrass,
                                      wallet:cost,
                                      networth:cost
                                    }
                                  });
                                  const embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`✅ Successfully Sold`);
                                  embed.setColor(`#30CC71`);
                                  embed.setDescription(`You have successfully sold ${totalgrass} <:grass:904040046049505381> grass for ${cost}`);
                                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed.setTimestamp();
                                  message.channel.send({embeds:[embed]});
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                              message.channel.send(`${message.author}, You don't have that many grass to sell.`);
                            }
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        if(userData.grass >=1){
                          if(userData.wallet < 1000000000 && userData.wallet + grass_value <= 1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  grass:-1,
                                  wallet:grass_value,
                                  networth:grass_value
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold 1 <:grass:904040046049505381> grass for ${grass_value}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          message.channel.send(`${message.author}, You don't have that many grass to sell.`);
                        }
                
                      }
                    }else if(argsone_name === 'ancient' && argstwo_name === 'coin'){
                      let totalancient = args[2];
                      let ancient_value = botData.ancientcoin;
                      console.log(ancient_value);
                      let cost  = ancient_value * totalancient;
                      if(totalancient){
                        if(!isNaN(totalancient) && Math.sign(totalancient) === 1){
                          if(totalancient % 1=== 0){
                            if(userData.ancientcoin >=totalancient){
                            if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    ancientcoin:-totalancient,
                                    wallet:cost,
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalancient} <:ancientcoin:903586746640519178> ancient coin for ${cost}.`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                              message.channel.send(`${message.author}, You don't have that many ancient coin to sell.`);
                            }
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        if(userData.ancientcoin >=1){
                          if(userData.wallet < 1000000000 && userData.wallet + ancient_value <= 1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  ancientcoin:-1,
                                  wallet:ancient_value,
                                  networth:ancient_value
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold 1 <:ancientcoin:903586746640519178> ancient coin for ${ancient_value}.`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          message.channel.send(`${message.author}, You don't have that many ancient coin to sell.`);
                        }
                  
                      }
                    }else if(argsone_name === 'boots' || argsone_name === 'boot'){
                      let totalboots = args[1];
                      let boots_value = botData.bootsvalue;
                      console.log(boots_value);
                      let cost  = boots_value * totalboots;
                      if(totalboots){
                        if(!isNaN(totalboots) && Math.sign(totalboots) === 1){
                          if(totalboots % 1=== 0){
                            if(userData.boots >=totalboots){
                            if(userData.wallet < 1000000000 && userData.wallet + cost <=1000000000){
                                  let d2 = new Date();
                                  let n2 = d2.getTime();
                                  const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastsell:n2
                                  });
                                  const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                      boots:-totalboots,
                                      wallet:cost,
                                      networth:cost
                                    }
                                  });
                                  const embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`✅ Successfully Sold`);
                                  embed.setColor(`#30CC71`);
                                  embed.setDescription(`You have successfully sold ${totalboots} pair of 👢 boots for ${cost}`);
                                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed.setTimestamp();
                                  message.channel.send({embeds:[embed]});
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                              message.channel.send(`${message.author}, You don't have that many boots to sell`);
                            }
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        if(userData.boots >=1){
                          if(userData.wallet < 1000000000 && userData.wallet + boots_value <=  1000000000){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newsell = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastsell:n2
                              });
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  boots:-1,
                                  wallet:boots_value,
                                  networth:boots_value
                                }
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Sold`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully sold 1 pair of 👢 boots for ${boots_value}`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Transaction Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          message.channel.send(`${message.author}, You don't have that many boots to sell.`);
                        }
                
                      }
                    }else{
                      message.channel.send(`${message.author} that item is not available to sell`);
                    }
                  }else{
                    var msec = n - lastsell;
                    console.log(msec);
                    var ss = Math.floor(msec / 1000);
                    var second = 5 - ss;
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`Wait bro!`);
                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to sell again!. The default cooldown is of **5** seconds but for premium users it is of **3** seconds to become a premium user use premium command.`);
                    message.channel.send({embeds:[embed]});
                  }
              }else{
                  message.channel.send(`${message.author} Please mention what you want to sell!`);
              }
        
        }else{
          message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
        }
    }
}