const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
module.exports = {
    name:`buy`,
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let botData = await botModel.findOne({botid:1});
        let argsone;
        let argsone_name;
        let argstwo;
        let argstwo_name;
        let argsthree;
        let argsthree_name;
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
              let d = new Date();
              let n = d.getTime();
              let lastbuy;
              if(userData.lastbuy){
                lastbuy = userData.lastbuy;
              }else{
                lastbuy = 0;
              }
              if(n - lastbuy >= 5000){
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
                      if(userbal >= diamond * args[2]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              diamondring:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** 💍 diamond ring`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= diamond ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- diamond,
                          networth:- diamond,
                          diamondring:1
                        }
                      
          
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a 💍 diamond ring`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                 
                 
                }else if(argsone_name === 'gold' && argstwo_name === 'trophy'){
                  var trophy = botData.trophyvalue;
                  let number = args[2];
                  var totalcost = trophy * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= trophy * args[2]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              goldtrophy:number
                            }
                           
              
              
                           }
                          
                          );
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully purchased **${number}** 🏆 Gold Trophy`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= trophy ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- trophy,
                          networth:- trophy,
                          goldtrophy:1
                        }
                      }
                      
                      );
                      const embed = new Discord.MessageEmbed();
                      embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                      embed.setColor(`#30CC71`);
                      embed.setDescription(`You have successfully purchased a 🏆 Gold Trophy`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name === 'gold' && argstwo_name ==='medal' ){
                  var goldmedal = botData.goldvalue;
                  let number = args[2];
                  var totalcost = goldmedal * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= goldmedal * args[2]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              goldmedal:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased  **${number}** :first_place: gold medal`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= goldmedal ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- goldmedal,
                          networth:- goldmedal,
                          goldmedal:1
                        }
                     
          
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a :first_place: gold medal`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name === 'silver' && argstwo_name === 'medal'){
                  var silvermedal = botData.silvervalue;
                  let number = args[2];
                  var totalcost = silvermedal * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= silvermedal * args[2]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              silvermedal:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** :second_place: silver medal`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= silvermedal ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- silvermedal,
                          networth:- silvermedal,
                          silvermedal:1
            
                        }
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a :second_place: silver medal`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if (argsone_name === 'key'){
                  var key = botData.keyvalue;
                  let number = args[1];
                  var totalcost = key * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= key * args[1]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              key:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** :key: key`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= key ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- key,
                          networth:- key,
                          key:1
            
                        }
                     
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a :key: key`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name === 'hunting' && argstwo_name === 'rifle'){
                  var huntingrifle = botData.huntgun;
                  let number = args[2];
                  var totalcost = huntingrifle * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= huntingrifle * args[2]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              huntingrifle:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** <:rifle:883578413888184350> hunting rifle
                        `);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= huntingrifle ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- huntingrifle,
                          networth:- huntingrifle,
                          huntingrifle:1
            
                        }
                     
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a <:rifle:883578413888184350> hunting rifle`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name ==='fishing' && argstwo_name === 'rod'){
                  var fishingrod = botData.fishingpole;
                  let number = args[2];
                  var totalcost = fishingrod * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= fishingrod * args[2]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              fishingrod:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** :fishing_pole_and_fish: fishing rod`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= fishingrod ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- fishingrod,
                          networth:- fishingrod,
                          fishingrod:1
            
                        }
                     
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a :fishing_pole_and_fish: fishing rod`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name === 'lock'){
                  var lock = botData.lockvalue;
                  let number = args[1];
                  var totalcost = lock * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= lock * args[1]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              lock:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** :lock: lock`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= lock ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:-lock,
                          networth:- lock,
                          lock:1
            
                        }
                     
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a :lock: lock`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name === 'beer'){
                  var beer = botData.beervalue;
                  let number = args[1];
                  var totalcost = beer * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= beer * args[1]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              beer:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** :beer: beer`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= beer ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- beer,
                          networth:- beer,
                          beer:1
            
                        }
                     
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a :beer: beer`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name === 'coffee'){
                  var coffee = botData.coffeevalue;
                  let number = args[1];
                  var totalcost = coffee * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= coffee * args[1]){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              coffee:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** :coffee: coffee`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= coffee ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- coffee,
                          networth:- coffee,
                          coffee:1
            
                        }
                     
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a :coffee: coffee`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name === 'pizza' && argstwo_name === 'slice'){
                  var pizza = botData.pizzavalue;
                  let number = args[2];
                  var totalcost = pizza * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= pizza * number){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              pizzaslice:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** :pizza: pizza slice`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= pizza ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- pizza,
                          networth:- pizza,
                          pizzaslice:1
            
                        }
                     
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a :pizza: pizza slice`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name === 'green' && argstwo_name === 'apple'){
                  var apple = botData.greenvalue;
                  let number = args[2];
                  var totalcost = apple * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userbal >= apple * number){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            $inc:{
                              wallet:-totalcost,
                              networth:-totalcost,
                              greenapple:number
                            }
                           
              
              
                           }
                          
                          );
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** :green_apple: green apples`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                          message.channel.send(`${message.author} You don't have enough coins in your wallet`);
    
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
                  if(userbal >= apple ){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                          wallet:- apple,
                          networth:- apple,
                          greenapple:1
            
                        }
                     
          
                      }
                      
                      );
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`Successfully Purchased`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a :green_apple: green apple`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  }else{
                    message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                  }
                }
                }else if(argsone_name === 'share'){
                    if(argstwo_name === 'alphabet'){
                      var alphabetshare = botData.alphabetvalue;
                      var totalshare = args[2];
                      var cost = alphabetshare * totalshare;
                      var totalcost = userbal - cost;
                      var totalcost2 = networth - cost;
                      var alphabet = userData.alphabet;
                      console.log(totalshare)
                      if(totalshare){
                      
                      if(userbal>= alphabetshare * totalshare){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                          $inc:{
                            alphabet: totalshare
              
              
                          }
                          }
                          
                          );
                          const response2 = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            wallet:totalcost,
                            networth:totalcost2
                          }
                          
                          );
                          let findshare = await botModel.findOneAndUpdate({botid:1});
                          if(findshare.alphabetpurchaseid !== userData.userID){
                            const shareupdate = await botModel.findOneAndUpdate({botid:1},
                              {
                                $inc:{
                                  totalalphabet:1,
                                },
                                alphabetpurchaseid:userData.userID
                              });
                          }
                    
                        if(totalshare <= 1){
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Purchased`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully purchased ${args[2]} share of <:GoogleGLogo:878192149210992660> Alphabet Inc `);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else if(totalshare>1){
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Purchased`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully purchased ${args[2]} shares of <:GoogleGLogo:878192149210992660> Alphabet Inc `);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                      }
                    
                    }else{
                      if(userbal>= alphabetshare){  
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response2 = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          $inc:{
                            alphabet:1,
                            wallet:-alphabetshare,
                            networth:-alphabetshare
                          }   
                        }
                            
                        );
                        let findshare = await botModel.findOneAndUpdate({botid:1});
                        if(findshare.alphabetpurchaseid !== userData.userID){
                          const shareupdate = await botModel.findOneAndUpdate({botid:1},
                            {
                              $inc:{
                                totalalphabet:1,
                              },
                              alphabetpurchaseid:userData.userID
                            });
                        }

                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased 1 share of <:GoogleGLogo:878192149210992660> Alphabet Inc `);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        message.channel.send(`${message.author} You don't have enough money in your wallet`);
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
                     
                    if(userbal>= utilityshare * totalshare){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                        $inc:{
                          utility: totalshare
            
            
                         }
                        }
                        
                        );
                        const response2 = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          wallet:totalcost,
                          networth:totalcost2
                        }
                        
                        );
                        let findshare = await botModel.findOneAndUpdate({botid:1});
                        if(findshare.utilitypurchaseid !== userData.userID){
                          const shareupdate = await botModel.findOneAndUpdate({botid:1},
                            {
                              $inc:{
                                totalutilityteam:1
                              },
                              utilitypurchaseid:userData.userID
                            });
                        }
                      if(totalshare <= 1){
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased ${args[3]} share of <:utility:875320356527804418> Utility Team `);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else if(totalshare>1){
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased ${args[3]} shares of <:utility:875320356527804418> Utility Team `);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                    }
                  
                  }else{
                    if(userbal>= utilityshare){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const response2 = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },
                      {
                        $inc:{
                        utility:1,
                        wallet:-utilityshare,
                        networth:-utilityshare
                        }
                      }
                      
                      );
                      let findshare = await botModel.findOneAndUpdate({botid:1});
                      if(findshare.utilitypurchaseid !== userData.userID){
                          const shareupdate = await botModel.findOneAndUpdate({botid:1},
                            {
                              $inc:{
                                totalutilityteam:1
                              },
                              utilitypurchaseid:userData.userID
                            });
                      }
                  
                      const embed = new Discord.MessageEmbed();
                      embed.setAuthor(`✅ Successfully Purchased`);
                      embed.setColor(`#30CC71`);
                      embed.setDescription(`You have successfully purchased 1 share of <:utility:875320356527804418> Utility Team `);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                    }else{
                      message.channel.send(`${message.author} You don't have enough money in your wallet`);
                    }
                  }
                 // }
              //  }else{
              //    message.channel.send(`${message.author}, Please mention the number of shares you want to buy`)
             //   }
  
                  }else if(argstwo_name === 'facebook'){
                        var facebookshare = botData.facebookvalue;
                        var totalshare = args[2];
                        var cost = facebookshare * totalshare;
                        var totalcost = userbal - cost;
                        var totalcost2 = networth - cost;
                        var facebook = userData.facebook;
                        console.log(totalshare)
                        if(totalshare){
                        
                          if(userbal>= facebookshare * totalshare){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastbuy:n2
                            });
                            const response = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                              },
                              {
                              $inc:{
                                facebook: totalshare
                  
                  
                              }
                              }
                              
                              );
                              const response2 = await userModel.findOneAndUpdate({
                                userID:message.author.id,
                              },
                              {
                                wallet:totalcost,
                                networth:totalcost2
                              }
                              
                              );
                              let findshare = await botModel.findOneAndUpdate({botid:1});
                              if(findshare.facebookpurchaseid !== userData.userID){
                                const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                  {
                                    $inc:{
                                      totalfacebook:1
                                    },
                                    facebookpurchaseid:userData.userID
                                  });
                                }
                            if(totalshare <= 1){
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Purchased`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully purchased ${args[2]} share of <:facebookemoji:878190000485834802> Facebook`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            }else if(totalshare>1){
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Purchased`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully purchased ${args[2]} shares of <:facebookemoji:878190000485834802> Facebook`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            }
                          }else{
                            message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                          }
                        }else{
                          if(userbal>= facebookshare){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastbuy:n2
                            });
                            const response2 = await userModel.findOneAndUpdate({
                              userID:message.author.id,
                            },
                            {
                              $inc:{
                                facebook:1,
                                wallet:-facebookshare,
                                networth:-facebookshare
                              }
                            
                            }
                            
                            );
                            let findshare = await botModel.findOneAndUpdate({botid:1});
                            if(findshare.facebookpurchaseid !== userData.userID){
                              const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                {
                                  $inc:{
                                    totalfacebook:1
                                  },
                                  facebookpurchaseid:userData.userID
                                });
                            }
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased 1 share of <:facebookemoji:878190000485834802> Facebook`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else{
                            message.channel.send(`${message.author} You don't have enough money in your wallet`);
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
                     
                      if(userbal>= microsoftshare * totalshare){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                          $inc:{
                            microsoft: totalshare
              
              
                          }
                          }
                          
                          );
                          const response2 = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            wallet:totalcost,
                            networth:totalcost2
                          }
                          
                          );
                          let findshare = await botModel.findOneAndUpdate({botid:1});
                          if(findshare.microsoftpurchaseid !== userData.userID){
                            const shareupdate = await botModel.findOneAndUpdate({botid:1},
                              {
                                $inc:{
                                  totalmicrosoft:1
                                },
                                microsoftpurchaseid:userData.userID
                              });
                          }
                        if(totalshare <= 1){
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Purchased`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully purchased ${args[2]} share of <:microsoftlogo:878189981129134090> Microsoft`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else if(totalshare>1){
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Purchased`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully purchased ${args[2]} shares of <:microsoftlogo:878189981129134090> Microsoft`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author} You don't have enough coins in your wallet`);
                      }
                    }else{
                      if(userbal>= microsoftshare){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response2 = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {


                          $inc:{
                          microsoft:1,
                          wallet:-microsoftshare,
                          networth:-microsoftshare
                          }
                        }
                        
                        );
                        let findshare = await botModel.findOneAndUpdate({botid:1});
                        if(findshare.microsoftpurchaseid !== userData.userID){
                          const shareupdate = await botModel.findOneAndUpdate({botid:1},
                            {
                              $inc:{
                                totalmicrosoft:1
                              },
                              microsoftpurchaseid:userData.userID
                            });
                        }
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased 1 share of <:microsoftlogo:878189981129134090> Microsoft`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        message.channel.send(`${message.author} You don't have enough money in your wallet`);
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
                     
                        if(userbal>= applevalue * totalshare){
                          let d2 = new Date();
                          let n2 = d2.getTime();
                          const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                            lastbuy:n2
                          });
                          const response = await userModel.findOneAndUpdate({
                              userID:message.author.id,
                            },
                            {
                            $inc:{
                              apple: totalshare
                
                
                            }
                            }
                            
                            );
                            const response2 = await userModel.findOneAndUpdate({
                              userID:message.author.id,
                            },
                            {
                              wallet:totalcost,
                              networth:totalcost2
                            }
                            
                            );
                            let findshare = await botModel.findOneAndUpdate({botid:1});
                            if(findshare.applepurchaseid !== userData.userID){
                              const shareupdate = await botModel.findOneAndUpdate({botid:1},
                                {
                                  $inc:{
                                    totalapple:1
                                  },
                                  applepurchaseid:userData.userID
                                });
                            }
                          if(totalshare <= 1){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${args[2]} share of <:applelogo:878189961151664138> Apple`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else if(totalshare>1){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${args[2]} shares of <:applelogo:878189961151664138> Apple`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }
                        }else{
                          message.channel.send(`${message.author} You don't have enough money in your wallet`);
                        }   
                    }else{
                      if(userbal>= applevalue){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response2 = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          $inc:{
                            apple:1,
                            wallet:-applevalue,
                            networth:-applevalue
                          }
                          
                        }
                        
                        );
                        let findshare = await botModel.findOneAndUpdate({botid:1});
                        if(findshare.applepurchaseid !== userData.userID){
                          const shareupdate = await botModel.findOneAndUpdate({botid:1},
                            {
                              $inc:{
                                totalapple:1
                              },
                              applepurchaseid:userData.userID
                            });
                        }
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased 1 share of <:applelogo:878189961151664138> Apple`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        message.channel.send(`${message.author} You don't have enough money in your wallet`);
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
                     
                      if(userbal>= teslashare * totalshare){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                          $inc:{
                            tesla: totalshare
              
              
                          }
                          }
                          
                          );
                          const response2 = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            wallet:totalcost,
                            networth:totalcost2
                          }
                          
                          );
                          let findshare = await botModel.findOneAndUpdate({botid:1});
                          if(findshare.teslapurchaseid !== userData.userID){
                            const shareupdate = await botModel.findOneAndUpdate({botid:1},
                              {
                                $inc:{
                                  totaltesla:1
                                },
                                teslapurchaseid:userData.userID
                              });
                          }
                        if(totalshare <= 1){
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Purchased`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully purchased ${args[2]} share of <:TESLALOGO:878190186788425758> Tesla`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else if(totalshare>1){
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Purchased`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully purchased ${args[2]} shares of <:TESLALOGO:878190186788425758> Tesla`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        message.channel.send(`${message.author} You don't have enough money in your wallet`);
                      }
                    
                    }else{
                      if(userbal>= teslashare){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response2 = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          $inc:{
                          tesla:1,
                          wallet:-teslashare,
                          networth:-teslashare
                          }
                        }
                        
                        );
                        let findshare = await botModel.findOneAndUpdate({botid:1});
                        if(findshare.teslapurchaseid !== userData.userID){
                          const shareupdate = await botModel.findOneAndUpdate({botid:1},
                            {
                              $inc:{
                                totaltesla:1
                              },
                              teslapurchaseid:userData.userID
                            });
                        }
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased 1 share of <:TESLALOGO:878190186788425758> Tesla`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        message.channel.send(`${message.author} You don't have enough money in your wallet`);
                      }
                    }
        
    
                  }
 
 
 
                  
                 }else if(argsone_name === 'cryptocoin'){
                   let totalcoins = args[1];
                   let number = args[1];
                   let cryptovalue = botData.cryptovalue;
                   let userData2 = await userModel.findOne({userID:message.author.id});
                   let userbal2 = userData2.wallet;
                   let cost = cryptovalue * totalcoins;
                   if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                      if(number % 1=== 0){
                           if(userbal2>= cost){
                             if(userData2.cryptocoin + number <= 10000 ){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastbuy:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    cryptocoin:number,
                                    wallet:-cost,
                                    networth:-cost
                                  }
                                });
                                let findshare = await botModel.findOneAndUpdate({botid:1});
                                if(findshare.lastcryptopurchaseid !== userData.userID){
                                  const cryptoupdate = await botModel.findOneAndUpdate({botid:1},
                                    {
                                      $inc:{
                                        totalcryptocoin:1
                                      },
                                      lastcryptopurchaseid:userData.userID
                                    });
                                }
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Purchased`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully purchased ${totalcoins} cryptocoin.`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                              }else{
                                message.channel.send(`${message.author}, You can't have more than 10000 cryptocoins!`);
                            }
                             
                           }else{
                             message.channel.send(`${message.author}, You don't have enough money to buy!`);
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
                      console.log(userData2.cryptocoin);
                    if(userbal2>= cryptovalue){
                      if(userData2.cryptocoin !== 5000){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastbuy:n2
                        });
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            cryptocoin:1,
                            wallet:-cryptovalue,
                            networth:-cryptovalue
                          }
                        });
                        let findshare = await botModel.findOneAndUpdate({botid:1});
                        if(findshare.lastcryptopurchaseid !== userData.userID){
                          const cryptoupdate = await botModel.findOneAndUpdate({botid:1},
                            {
                              $inc:{
                                totalcryptocoin:1
                              },
                              lastcryptopurchaseid:userData.userID
                            });
                        }
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased 1 cryptocoin.`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        message.channel.send(`${message.author}, You can't have more than 5000 cryptocoins!`);
                      }
                    }else{
                      message.channel.send(`${message.author}, You don't have enough money to buy!`);
                    }
                  }
                }else if(argsone_name === 'lightsaber'){
                  let totalsabers = args[1];
                  let number = args[1];
                  let sabervalue = botData.lightsabervalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = sabervalue * totalsabers;
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastbuy:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                lightsaber:number,
                                wallet:-cost,
                                networth:-cost
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${totalsabers} <:limitededitionlightsaber:889749246994169866> lightsabers.`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp(); 
                            message.channel.send({embeds:[embed]});
                           
                            
                          }else{
                            message.channel.send(`${message.author}, You don't have enough money to buy!`);
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
                  let cost2= sabervalue;
                  if(userbal2>= cost2){
                    let d2 = new Date();
                    let n2 = d2.getTime();
                    const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                      lastbuy:n2
                    });
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        lightsaber:1,
                        wallet:-cost2,
                        networth:-cost2
                      }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a <:limitededitionlightsaber:889749246994169866> lightsaber.`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                   
                    
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'the' && argstwo_name === 'mandalorian' && argsthree_name === 'helmet'){
                  let totalmando = args[3];
                  let number = args[3];
                  let mandovalue = botData.mandohelmet;
                  console.log('mando value:' + mandovalue);
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = mandovalue * totalmando;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastbuy:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                mandohelmet:number,
                                wallet:-cost,
                                networth:-cost
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${totalmando} <:newbountyhunter:889745554387648573> mandalorian helmets.`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                           
                            
                          }else{
                            message.channel.send(`${message.author}, You don't have enough money to buy!`);
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
                  let cost2= mandovalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    let d2 = new Date();
                    let n2 = d2.getTime();
                    const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                      lastbuy:n2
                    });
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                       mandohelmet:1,
                        wallet:-cost2,
                        networth:-cost2
                      }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a <:newbountyhunter:889745554387648573> mandalorian helmet.`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                   
                    
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'boba' && argstwo_name === 'fett' && argsthree_name === 'helmet'){
                  let totalboba = args[3];
                  let number = args[3];
                  let bobavalue = botData.bobahelmet;
                  console.log('baba value:' + bobavalue);
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = bobavalue * totalboba;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastbuy:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                bobahelmet:number,
                                wallet:-cost,
                                networth:-cost
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${totalboba} <:bobafettedition:889747878870917170> Boba Fett Helmet.`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                           
                            
                          }else{
                            message.channel.send(`${message.author}, You don't have enough money to buy!`);
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
                  let cost2= bobavalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    let d2 = new Date();
                    let n2 = d2.getTime();
                    const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                      lastbuy:n2
                    });
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                       bobahelmet:1,
                        wallet:-cost2,
                        networth:-cost2
                      }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a <:bobafettedition:889747878870917170> Bob Fett Helmet`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                   
                    
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }

                }else if(argsone_name === 'kylo' && argstwo_name === 'ren' && argsthree_name === 'helmet'){
                  let totalkylo = args[3];
                  let number = args[3];
                  let kylovalue = botData.kylohelmet;
                  console.log('kylo value:' + kylovalue);
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = kylovalue * totalkylo;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastbuy:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                kylohelmet:number,
                                wallet:-cost,
                                networth:-cost
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${totalkylo} <:KylorenHelmet:889750172115017738> Kylo Ren Helmet.`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                           
                            
                          }else{
                            message.channel.send(`${message.author}, You don't have enough money to buy!`);
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
                  let cost2= kylovalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    let d2 = new Date();
                    let n2 = d2.getTime();
                    const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                      lastbuy:n2
                    });
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                       kylohelmet:1,
                        wallet:-cost2,
                        networth:-cost2
                      }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a <:KylorenHelmet:889750172115017738> Kylo Ren Helmet`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                   
                    
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }


                }else if(argsone_name === 'squid' && argstwo_name === 'game' && argsthree_name === 'doll'){
                  let totalsquid = args[3];
                  let number = args[3];
                  let squidvalue = botData.squidgamedoll;
                  console.log('squid game doll:' + squidvalue);
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = squidvalue * totalsquid;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastbuy:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                squiddoll:number,
                                wallet:-cost,
                                networth:-cost
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${totalsquid} <:squidgamedoll2:898879068030787614> Squid Game Doll.`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                           
                            
                          }else{
                            message.channel.send(`${message.author}, You don't have enough money to buy!`);
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
                  let cost2= squidvalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    let d2 = new Date();
                    let n2 = d2.getTime();
                    const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                      lastbuy:n2
                    });
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                       squiddoll:1,
                        wallet:-cost2,
                        networth:-cost2
                      }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a <:squidgamedoll2:898879068030787614> Squid Game Doll.`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                   
                    
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }

                }else if(argsone_name === 'boat'){
                  let totalboat = args[1];
                  let number = args[1];
                  let boatvalue = botData.boatvalue;
                  console.log('boat value:' + boatvalue);
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = boatvalue * totalboat;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastbuy:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                boat:number,
                                wallet:-cost,
                                networth:-cost
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${totalboat} <:boat:904243050279235675> Boat.`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                           
                            
                          }else{
                            message.channel.send(`${message.author}, You don't have enough money to buy!`);
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
                  let cost2= boatvalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    let d2 = new Date();
                    let n2 = d2.getTime();
                    const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                      lastbuy:n2
                    });
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                       boat:1,
                        wallet:-cost2,
                        networth:-cost2
                      }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a <:boat:904243050279235675> Boat.`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                   
                    
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'bubble' && argstwo_name === 'tea'){
                  let totalbubble = args[2];
                  let number = args[2];
                  let bubblevalue = botData.bubblevalue;
                  console.log('bubble value:' + bubblevalue);
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = bubblevalue * totalbubble;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                              lastbuy:n2
                            });
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                bubbletea:number,
                                wallet:-cost,
                                networth:-cost
                              }
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${totalbubble} 🧋 Bubble Tea.`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                           
                            
                          }else{
                            message.channel.send(`${message.author}, You don't have enough money to buy!`);
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
                  let cost2= bubblevalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    let d2 = new Date();
                    let n2 = d2.getTime();
                    const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                      lastbuy:n2
                    });
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                       bubbletea:1,
                        wallet:-cost2,
                        networth:-cost2
                      }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased a 🧋 Bubble Tea.`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                   
                    
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
 
                }else{
                  message.channel.send(`${message.author} that item is not available to purchase`);
                }
              }else{
                var msec = n - lastbuy;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = 5 - ss;
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Wait bro!`);
                embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to buy again!. The default cooldown is of **5** seconds but for premium users it is of **3** seconds to become a premium user use premium command.`);
                message.channel.send({embeds:[embed]});
              }
            }else{
                message.channel.send(`${message.author} Please mention what you want to buy!`);
            }
         
        }else{
          message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
        }
    }
}