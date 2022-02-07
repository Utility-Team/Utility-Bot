const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:`buy`,
    aliases:['buy'],
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let botData = await botModel.findOne({botid:1});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
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
          let avatar;
          if(userData.avatar){
            if(userData.avatar !== '' && userData.premium === 'enable'){
              avatar = userData.avatar;
            }else{
              avatar = message.author.displayAvatarURL();
            }
          }else{
            avatar = message.author.displayAvatarURL();
          }
          async function buy(item,emoji,quantity,price,category){
              let check = 0;
            if(userData.inventory){
                console.log('work 1');
                for(var x = 0;x<=userData.inventory.length;x++){
                    console.log('value x:' + x);
                    console.log('userData.inventory.length' + userData.inventory.length)
;                console.log('work 2');

                    if(userData.inventory[x]){
                console.log('work 3');

                      //  if(x <= userData.inventory.length ){
                            console.log('value of x' + x);
                            console.log('value of userData' + userData.inventory.length);
                            if(item === userData.inventory[x].name && check < 5){
                              let d2 = new Date();
                              let n2 = d2.getTime();
                              const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                                lastbuy:n2
                              });
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`✅ Successfully Purchased`);
                              embed.setColor(`#30CC71`);
                              embed.setDescription(`You have successfully purchased **${quantity}** ${emoji} ${item}
                              `);
                              embed.setFooter(`Requested by ${message.author.username}`,avatar);
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                              console.log('work 4');

                                check = 5;
                                console.log(
                                    'its present'
                                )
                                let inventoryData = userData.inventory;
                                inventoryData[x].quantity = parseInt(inventoryData[x].quantity) + parseInt(quantity);
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                {
                                    $inc:{
                                        wallet:-price,
                                        networth:-price
                                    },
                                    inventory:inventoryData
                                }    
                                );
                            
                                return;
                            }
                      
                       // }
                    }else if(x === userData.inventory.length & check < 5){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastbuy:n2
                      });
                      const embed = new Discord.MessageEmbed();
                      embed.setAuthor(`✅ Successfully Purchased`);
                      embed.setColor(`#30CC71`);
                      embed.setDescription(`You have successfully purchased **${quantity}** ${emoji} ${item}
                      `);
                      embed.setFooter(`Requested by ${message.author.username}`,avatar);
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                      let inventoryData = await userData.inventory;
                      let newData = {
                         name:item,
                         emoji:emoji,
                         quantity:quantity,
                         category:category
                       }
                      inventoryData.push(newData);
                      const response = await userModel.findOneAndUpdate({userID:message.author.id},
                        {
                          $inc:{
                            networth: - price,
                            wallet: - price
                          },
                          inventory:inventoryData
                        }
                        );

                        return;

                    }
                }
            }else{
              let d2 = new Date();
              let n2 = d2.getTime();
              const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                lastbuy:n2
              });
              const embed = new Discord.MessageEmbed();
              embed.setAuthor(`✅ Successfully Purchased`);
              embed.setColor(`#30CC71`);
              embed.setDescription(`You have successfully purchased **${quantity}** ${emoji} ${item}
              `);
              embed.setFooter(`Requested by ${message.author.username}`,avatar);
              embed.setTimestamp();
              message.channel.send({embeds:[embed]});
                    let newData = [{
                        name:item,
                        emoji:emoji,
                        quantity:quantity,
                        category:category
                    }]
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                        $inc:{
                            wallet:-price,
                            networth:-price,
                        },
                        inventory:newData
                    });
              return;
                   
            }
          }
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
            if(args[0]){
              let d = new Date();
              let n = d.getTime();
              let lastbuy;
              if(userData.lastbuy){
                lastbuy = userData.lastbuy;
              }else{
                lastbuy = 0;
              }
              let timeup;
              let timeup2;
              if(userData.premium === 'enable'){
                timeup = 3000;
                timeup2 = 3;
              }else{
                timeup = 5000;
                timeup2 =5;
              }
              if(n - lastbuy >= timeup){
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
                        buy('Diamond Ring','💍',number,totalcost,'jewellery');
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
                    buy('Diamond Ring','💍',1,diamond,'jewellery');
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
                         buy('Gold Trophy','🏆',number,totalcost,'jewellery');
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
                     buy('Gold Trophy','🏆',1,trophy,'jewellery');
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
                        buy('Gold Medal','🥇',number,totalcost,'jewellery');
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
                    buy('Gold Medal','🥇',1,goldmedal,'jewellery');
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
                        buy('Silver Medal','🥈',number,totalcost,'jewellery');
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
                     buy('Silver Medal','🥈',1,silvermedal,'jewellery');
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
                         buy('Key','🔑',number,totalcost,'jewellery');
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
                    buy('Key','🔑',1,key,'jewellery');
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
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** <:rifle:883578413888184350> Hunting Rifle
                        `);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            networth:-totalcost,
                            wallet:-totalcost,
                            huntingrifle:number
                          }
                        });
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
                  if(userbal >= huntingrifle){
                    const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **1** <:rifle:883578413888184350> Hunting Rifle
                        `);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            networth:-huntingrifle,
                            wallet:-huntingrifle,
                            huntingrifle:1
                          }
                        });
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
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** 🎣 Fishing Rod
                        `);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            networth:-totalcost,
                            wallet:-totalcost,
                            fishingrod:number
                          }
                        });
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
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased **1** 🎣 Fishing Rod
                    `);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        networth:-fishingrod,
                        wallet:-fishingrod,
                        fishingrod:1
                      }
                    });
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
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **${number}** 🔒 Lock
                        `);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            networth:-totalcost,
                            wallet:-totalcost,
                            lock:number
                          }
                        });
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
                    const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased **1** 🔒 Lock
                        `);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            networth:-lock,
                            wallet:-lock,
                            lock:1
                          }
                        });
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
                        buy('Beer','🍺',number,totalcost,'food');
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
                    buy('Beer','🍺',1,beer,'food');
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
                        buy('Coffee','☕',number,totalcost,'food');
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
                    buy('Coffee','☕',1,coffee,'food');
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
                        buy('Pizza Slice','🍕',number,totalcost,'food');
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
                    buy('Pizza Slice','🍕',1,pizza,'food');
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
                        buy('Green Apple','🍏',number,totalcost,'food');
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
                    buy('Green Apple','🍏',1,apple,'food');
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
                        embed.setDescription(`You have successfully purchased ${args[2]} share of <:alphabet:939925643242659880> Alphabet`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else if(totalshare>1){
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased ${args[2]} shares of <:alphabet:939925643242659880> Alphabet`);
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
                      embed.setDescription(`You have successfully purchased 1 share of <:alphabet:939925643242659880> Alphabet`);
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

                }else if(argstwo_name === 'fakebook'){
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
                            embed.setDescription(`You have successfully purchased ${args[2]} share of <:fakebook:939924057497952356> Fakebook`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                          }else if(totalshare>1){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased ${args[2]} shares of <:fakebook:939924057497952356> Fakebook`);
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
                          embed.setDescription(`You have successfully purchased 1 share of <:fakebook:939924057497952356> Fakebook`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else{
                          message.channel.send(`${message.author} You don't have enough money in your wallet`);
                        }
                      }

                }else if(argstwo_name === 'hooli'){
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
                        embed.setDescription(`You have successfully purchased ${args[2]} share of <:hooli:939924424231100486> Hooli`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else if(totalshare>1){
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased ${args[2]} shares of <:hooli:939924424231100486> Hooli`);
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
                      embed.setDescription(`You have successfully purchased 1 share of <:hooli:939924424231100486> Hooli`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                    }else{
                      message.channel.send(`${message.author} You don't have enough money in your wallet`);
                    }

                  }

                }else if(argstwo_name === 'pied' && argsthree_name === 'piper'){
                  var applevalue = botData.applevalue;
                  var totalshare = args[3];
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
                          embed.setDescription(`You have successfully purchased ${args[2]} share of <:PiedPiper:939924753915998218> Pied Piper`);
                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                        }else if(totalshare>1){
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Purchased`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully purchased ${args[2]} shares of <:PiedPiper:939924753915998218> Pied Piper`);
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
                      embed.setDescription(`You have successfully purchased 1 share of <:PiedPiper:939924753915998218> Pied Piper`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                    }else{
                      message.channel.send(`${message.author} You don't have enough money in your wallet`);
                    }

                  
                  }
       

                }else if(argstwo_name === 'hola' && argsthree_name === 'electric'){
                  var teslashare = botData.teslavalue;
                  var totalshare = args[3];
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
                        embed.setDescription(`You have successfully purchased ${args[2]} share of <:hola:939924607337644052> Hola Electric`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else if(totalshare>1){
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Purchased`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully purchased ${args[2]} shares of <:hola:939924607337644052> Hola Electric`);
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
                      embed.setDescription(`You have successfully purchased 1 share of <:hola:939924607337644052> Hola Electric`);
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
                             if(userData2.cryptocoin + parseInt(number) <= 10000 ){
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
                                embed.setDescription(`You have successfully purchased ${totalcoins} cryptocoin`);
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
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
                      if(userData2.cryptocoin < 10000){
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
                        embed.setDescription(`You have successfully purchased 1 cryptocoin`);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                      }else{
                        message.channel.send(`${message.author}, You can't have more than 10000 cryptocoins!`);
                      }
                    }else{
                      message.channel.send(`${message.author}, You don't have enough money to buy!`);
                    }
                  }
                }else if(argsone_name === 'boat'){
                  let totalboat = args[1];
                  let number = args[1];
                  let boatvalue = botData.boatvalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = boatvalue * totalboat;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased **${number}** <:boat:904243050279235675> boat`);
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                networth:-cost,
                                wallet:-cost,
                                boat:number
                              }
                            });
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
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased **1** <:boat:904243050279235675> boat`);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        networth:-cost2,
                        wallet:-cost2,
                        boat:1
                      }
                    });  
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
                            buy('Bubble Tea','🧋',number,cost,'food');   
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
                    buy('Bubble Tea','🧋',1,bubblevalue,'food');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
 
                }else if(argsone_name === 'beast' && argstwo_name === 'pc' || argsone_name === 'gaming' && argstwo_name === 'pc' || argsone_name === 'pc' || argsone_name === 'computer' || argsone_name === 'gaming' && argstwo_name === 'computer' || argsone_name === 'beast' && argstwo_name === 'computer'){
                  let totalpc = args[2];
                  let number = args[2];
                  let pcvalue = botData.pcvalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = pcvalue * totalpc;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Beast Pc','<:gamingpc:918053046498512906>',number,cost,'gadgets');   
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
                  let cost2= pcvalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Beast Pc','<:gamingpc:918053046498512906>',1,cost2,'gadgets');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'monitor'){
                  let totalmonitor = args[2];
                  let number = args[2];
                  let monitorvalue = botData.monitorvalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = monitorvalue * totalmonitor;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Monitor','<:monitor:918053577266708500>',number,cost,'gadgets');   
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
                  let cost2= monitorvalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Monitor','<:monitor:918053577266708500>',1,cost2,'gadgets');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'black' && argstwo_name === 'mouse'){
                  let totalblackmouse = args[2];
                  let number = args[2];
                  let blackmousevalue = botData.blackmousevalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = blackmousevalue * totalblackmouse;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Black Color Mouse','<:blackmouse:918054201765027850>',number,cost,'gadgets');   
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
                  let cost2= blackmousevalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Black Color Mouse','<:blackmouse:918054201765027850>',1,cost2,'gadgets');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'white' && argstwo_name === 'mouse'){
                  let totalwhitemouse = args[2];
                  let number = args[2];
                  let whitemousevalue = botData.whitemousevalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = whitemousevalue * totalwhitemouse;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('White Color Mouse','<:whitemouse:918061503029055488>',number,cost,'gadgets');   
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
                  let cost2= whitemousevalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('White Color Mouse','<:whitemouse:918061503029055488>',1,cost2,'gadgets');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'black' && argstwo_name === 'keyboard'){
                  let totalwhitekeyboard = args[2];
                  let number = args[2];
                  let blackkeyboardvalue = botData.blackkeyboardvalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = blackkeyboardvalue * totalwhitekeyboard;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Black Gaming Keyboard','<:gamingkeyboard:918055261854392330>',number,cost,'gadgets');   
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
                  let cost2= blackkeyboardvalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Black Gaming Keyboard','<:gamingkeyboard:918055261854392330>',1,cost2,'gadgets');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'white' && argstwo_name === 'keyboard'){
                  let totalwhitekeyboard = args[2];
                  let number = args[2];
                  let whitekeyboardvalue = botData.whitekeyboardvalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = whitekeyboardvalue * totalwhitekeyboard;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('White Gaming Keyboard','<:whitegamingkeyboard:918055512132698133>',number,cost,'gadgets');   
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
                  let cost2= whitekeyboardvalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('White Gaming Keyboard','<:whitegamingkeyboard:918055512132698133>',1,cost2,'gadgets');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'laptop'){
                  let totallaptop = args[1];
                  let number = args[1];
                  let laptopvalue = botData.laptopvalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = laptopvalue * totallaptop;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Laptop','<:laptop:918059938612404255>',number,cost,'gadgets');   
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
                  let cost2= laptopvalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Laptop','<:laptop:918059938612404255>',1,cost2,'gadgets'); 
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argstwo_name === 'phone' || argsone_name === 'mobile' || argsone_name === 'smartphone'){
                  let totalmobile = args[1];
                  let number = args[1];
                  let mobilevalue = botData.mobilevalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = mobilevalue * totalmobile;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Smartphone','<:smartphone:918057432264101978>',number,cost,'gadgets');   
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
                  let cost2= mobilevalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Smartphone','<:smartphone:918057432264101978>',1,cost2,'gadgets');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'spidey' && argstwo_name==='badge'){
                  let totalspidey = args[2];
                  let number = args[2];
                  let spideyvalue = botData.spideyvalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = spideyvalue * totalspidey;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Spidey Badge','<:spideybadge:918017281106255922>',number,cost,'collectables');   
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
                  let cost2= spideyvalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Spidey Badge','<:spideybadge:918017281106255922>',1,cost2,'collectables');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'santa' && argstwo_name === 'cap'){
                  let totalcap = args[2];
                  let number = args[2];
                  let santacapvalue = botData.capvalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = santacapvalue * totalcap;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Santa Cap','<:santacap:925292343291170826>',number,cost,'collectables');   
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
                  let cost2= santacapvalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Santa Cap','<:santacap:925292343291170826>',1,cost2,'collectables');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'jedi' && argstwo_name === 'lightsaber'){
                  let totalsaber = args[2];
                  let number = args[2];
                  let jedilightsabervalue = botData.jedilightsabervalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = jedilightsabervalue * totalsaber;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Jedi Lightsaber','<:jedilightsaber:918028605945167902>',number,cost,'collectables');   
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
                  let cost2= jedilightsabervalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Jedi Lightsaber','<:jedilightsaber:918028605945167902>',1,cost2,'collectables');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'sith' && argstwo_name === 'lightsaber'){
                  let totalsaber = args[2];
                  let number = args[2];
                  let sithlightsabervalue = botData.sithlightsabervalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = sithlightsabervalue * totalsaber;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= cost){
                            buy('Sith Lightsaber','<:sithlightsaber:918027995539705917>',number,cost,'collectables');   
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
                  let cost2= sithlightsabervalue;
                  console.log(cost2);
                  if(userbal2>= cost2){
                    buy('Sith Lightsaber','<:sithlightsaber:918027995539705917>',1,cost2,'collectables');   
                  }else{
                    message.channel.send(`${message.author}, You don't have enough money to buy!`);
                  }
                 }
                }else if(argsone_name === 'credit' && argstwo_name === 'points'){
                  let number = args[2];
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = 25 * number;
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                          if(userbal2>= number){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`✅ Successfully Purchased`);
                            embed.setColor(`#30CC71`);
                            embed.setDescription(`You have successfully purchased **${number}** <:creditpoint:925956240209772564> Credit Points
                            `);
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                networth:-cost,
                                wallet:-cost,
                                creditpoints:number
                              }
                            });  
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
                  if(userbal2>= 1){
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Purchased`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully purchased **1** <:creditpoint:925956240209772564> Credit Points
                    `);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        networth:-1,
                        wallet:-1,
                        creditpoints:20
                      }
                    });    
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
                var second = timeup2 - ss;
                if(userData.premium !== 'enable'){
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Wait bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to buy again!. The default cooldown is of **5** seconds but for premium users it is of **3** seconds to become a premium user use premium command.`);
                  message.channel.send({embeds:[embed]});
                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Chill bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use buy again!.`);
                  embed.setColor('#025CFF');
                  message.channel.send({embeds:[embed]});
                }
              }
            }else{
                message.channel.send(`${message.author} Please mention what you want to buy!`);
            }
         
        }else{
          message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
        }
    }
}