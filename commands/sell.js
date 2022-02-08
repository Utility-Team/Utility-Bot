const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:`sell`,
    aliases:['sell'],
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
          async function sell(item,emoji,quantity,price,category){
              let check = 0;
              if(userData.inventory){
                  for(var x = 0;x<=userData.inventory.length;x++){
                      if(userData.inventory[x]){
                        if(userData.inventory[x].name === item){
                          if(userData.inventory[x].quantity >= parseInt(quantity)){
                            if(parseInt(userData.wallet) + parseInt(price) <= 5000000000){
                                      if(item === userData.inventory[x].name && check < 5){
                                        let d2 = new Date();
                                        let n2 = d2.getTime();
                                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                                          lastsell:n2
                                        });
                                        const embed = new Discord.MessageEmbed();
                                        embed.setAuthor(`✅ Successfully Sold`);
                                        embed.setColor(`#30CC71`);
                                        embed.setDescription(`You have successfully sold **${quantity}** ${emoji} ${item} for ${price}
                                        `);
                                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                        embed.setTimestamp();
                                        message.channel.send({embeds:[embed]});
                      

                                          check = 5;
                                          let inventoryData = userData.inventory;
                                          if(inventoryData[x].quantity>quantity){
                                              inventoryData[x].quantity = parseInt(inventoryData[x].quantity) - parseInt(quantity);
                                          }else{
                                              inventoryData.splice(x,1);
                                          }
                                          const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                          {
                                              $inc:{
                                                  wallet:price,
                                                  networth:price
                                              },
                                              inventory:inventoryData
                                          }    
                                          );
                                      
                                          return;
                                      }
                                }else{
                                  const embed = new Discord.MessageEmbed();
                                  embed.setTitle(`❌ Transaction Failed`);
                                  embed.setDescription(`${message.author}, You can't have more than 5 billion coins in your wallet`);
                                  message.channel.send({embeds:[embed]});
                                  return;
                                }
                              }else{
                                message.channel.send(`${message.author}, You don't have that many ${userData.inventory[x].name} to sell`);
                                return
                              }
                        }
                      }else if(x === userData.inventory.length & check < 5){
                        message.channel.send(`${message.author}, You don't own that item to sell`);
                      }
                  }
              }else{
                  message.channel.send(`${message.author}, You don't own that item to sell`);
              }
          }
          async function sellShare(name,emoji,quantity,price){
            const response = await userModel.findOneAndUpdate({
              userID:message.author.id,
            },
            {
              $inc:{
               name:-quantity,
               wallet:price,
               networth:price
              },
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
            embed.setAuthor(`✅ Successfully Sold`);
            embed.setColor(`#30CC71`);
            embed.setDescription(`You have successfully sold ${quantity} share of ${emoji} ${name}`);
            embed.setFooter(`Requested by ${message.author.username}`,avatar);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
          }
          if(args[0]){
              let d = new Date();
              let n = d.getTime();
              let lastsell;
              if(userData.lastsell){
                lastsell = userData.lastsell;
              }else{
                lastsell = 0;
              }
              let timeup;
              let timeup2;
              if(userData.premium === 'enable'){
                timeup = 3000;
                timeup2 = 3;
              }else{
                timeup = 5000;
                timeup2 = 5;
              }
              if(n - lastsell >= timeup){
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
                      sell('Diamond Ring','💍',number,totalcost,'jewellery');
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
                    sell('Diamond Ring','💍',1,diamond,'jewellery');
                }
                 
                 
                }else if(argsone_name === 'gold' && argstwo_name === 'trophy'){
                  var trophy = botData.trophyvalue;
                  let number = args[2];
                  var totalcost = trophy * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        sell('Gold Trophy','🏆',number,totalcost,'jewellery');
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
                    sell('Gold Trophy','🏆',1,trophy,'jewellery');
                
                }
                }else if(argsone_name === 'gold' && argstwo_name ==='medal' ){
                  var goldmedal = botData.goldvalue;
                  let number = args[2];
                  var totalcost = goldmedal * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        sell('Gold Medal','🥇',number,totalcost,'jewellery');
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
                    sell('Gold Medal','🥇',1,totalcost,'jewellery');
                  
                }
                }else if(argsone_name === 'silver' && argstwo_name === 'medal'){
                  var silvermedal = botData.silvervalue;
                  let number = args[2];
                  var totalcost = silvermedal * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        sell('Silver Medal','🥈',number,totalcost,'jewellery');
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
                    sell('Silver Medal','🥈',1,silvermedal,'jewellery');
                  
                }
                }else if (argsone_name === 'key'){
                  var key = botData.keyvalue;
                  let number = args[1];
                  var totalcost = key * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        sell('Key','🔑',number,totalcost,'jewellery');
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
                    sell('Key','🔑',1,key,'jewellery');
                  
                }
                }else if(argsone_name === 'hunting' && argstwo_name === 'rifle'){
                  var huntingrifle = botData.huntgun;
                  let number = args[2];
                  var totalcost = huntingrifle * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userData.huntingrifle>= number){
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold **${number}** <:rifle:883578413888184350> Hunting Rifle for ${totalcost}
                        `);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            networth:huntingrifle,
                            wallet:huntingrifle,
                            huntingrifle:-number
                          }
                        });  
                      }else{
                        message.channel.send(`${message.author}, you don't have that many hunting rifle to sell`);
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
                  if(userData.huntingrifle >= 1){
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Sold`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully sold **${number}** <:rifle:883578413888184350> Hunting Rifle for ${huntingrifle}
                    `);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        networth:huntingrifle,
                        wallet:huntingrifle,
                        huntingrifle:-1
                      }
                    }); 
                  }else{
                    message.channel.send(`${message.author}, you don't have that many hunting rifle to sell`);
                    
                  } 
                  
                }
                }else if(argsone_name ==='fishing' && argstwo_name === 'rod'){
                  var fishingrod = botData.fishingpole;
                  let number = args[2];
                  var totalcost = fishingrod * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      if(userData.fishingrod>= 1){
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold **${number}** 🎣 Fishing Rod for ${totalcost}
                        `);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            networth:totalcost,
                            wallet:totalcost,
                            fishingrod:-number
                          }
                        });  
                      }else{
                        message.channel.send(`${message.author}, You don't have that many fishing rod to sell`);
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
                  if(userData.fishingrod>=1){
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Sold`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully sold **1** 🎣 Fishing Rod for ${fishingrod}
                    `);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        networth:fishingrod,
                        wallet:fishingrod,
                        fishingrod:-1
                      }
                    });  
                  }else{
                        message.channel.send(`${message.author}, you don't have that many fishing rod to sell`);
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
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold **${number}** 🔒 Lock for ${totalcost}
                        `);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            networth:totalcost,
                            wallet:totalcost,
                            lock:-number
                          }
                        });  
                       }else{
                        message.channel.send(`${message.author}, you don't have that many lock to sell`);
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
                  if(userData.lock>=1){
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Sold`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully sold **1** 🔒 Lock for ${lock}
                    `);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        networth:lock,
                        wallet:lock,
                        lock:-1
                      }
                    });
                  }else{
                    message.channel.send(`${message.author}, you don't have that many lock to sell`);
                  }
                    
                }
                }else if(argsone_name === 'beer'){
                  var beer = botData.beervalue;
                  let number = args[1];
                  var totalcost = beer * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        sell('Beer','🍺',number,totalcost,'food');
                    
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
                    sell('Beer','🍺',1,beer,'food');
                 
                }
                }else if(argsone_name === 'coffee'){
                  var coffee = botData.coffeevalue;
                  let number = args[1];
                  var totalcost = coffee * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        sell('Coffee','☕',number,totalcost,'food');
                     
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
                    sell('Coffee','☕',1,coffee,'food');

                }
                }else if(argsone_name === 'pizza' && argstwo_name === 'slice'){
                  var pizza = botData.pizzavalue;
                  let number = args[2];
                  var totalcost = pizza * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        sell('Pizza Slice','🍕',number,totalcost,'food');
                     
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
                    sell('Pizza Slice','🍕',1,pizza,'food');
                 
                }
                }else if(argsone_name === 'green' && argstwo_name === 'apple'){
                  var apple = botData.greenvalue;
                  let number = args[2];
                  var totalcost = apple * number;
                  if(number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        sell('Green Apple','🍏',number,totalcost,'food');
                     
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
                    sell('Green Apple','🍏',1,apple,'food');
                  
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
                          if(userData.wallet < 5000000000 && userData.wallet + parseInt(cost) <=5000000000){
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
                                  embed.setDescription(`You have successfully sold ${args[2]} share of <:alphabet:939925643242659880> Alphabet for ${cost}`);
                                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed.setTimestamp();
                                  message.channel.send({embeds:[embed]});
                                }else if(totalshare>1){
                                  const embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`✅ Successfully Sold`);
                                  embed.setColor(`#30CC71`);
                                  embed.setDescription(`You have successfully sold ${args[2]} shares of <:alphabet:939925643242659880> Alphabet for ${cost}`);
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
                      if(userData.wallet < 5000000000 && userData.wallet + alphabetshare <= 5000000000){
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
                          embed.setDescription(`You have successfully sold 1 share of <:alphabet:939925643242659880> Alphabet for ${alphabetshare}`);
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
                          if(userData.wallet < 5000000000 && userData.wallet + cost <=5000000000){
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
                        if(userData.wallet < 5000000000 && userData.wallet + utilityshare <= 5000000000){
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
  
                  }else if(argstwo_name === 'fakebook'){
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
                              if(userData.wallet < 5000000000 && userData.wallet + cost <=5000000000){
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
                                      embed.setDescription(`You have successfully sold ${args[2]} share of <:fakebook:939924057497952356> Fakebook for ${cost}`);
                                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                      embed.setTimestamp();
                                      message.channel.send({embeds:[embed]});
                                    }else if(totalshare>1){
                                      const embed = new Discord.MessageEmbed();
                                      embed.setAuthor(`✅ Successfully Sold`);
                                      embed.setColor(`#30CC71`);
                                      embed.setDescription(`You have successfully sold ${args[2]} shares of <:fakebook:939924057497952356> Fakebook for ${cost}`);
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
                          if(userData.wallet < 5000000000 && userData.wallet + facebookshare <= 5000000000){
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
                              embed.setDescription(`You have successfully sold 1 share of <:fakebook:939924057497952356> Fakebook for ${facebookshare}`);
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
  
                  }else if(argstwo_name === 'hooli'){
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
                                  if(userData.wallet < 5000000000 && userData.wallet + cost <=5000000000){
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
                                          embed.setDescription(`You have successfully sold ${args[2]} share of <:hooli:939924424231100486> Hooli for ${cost}`);
                                          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                          embed.setTimestamp();
                                          message.channel.send({embeds:[embed]});
                                        }else if(totalshare>1){
                                          const embed = new Discord.MessageEmbed();
                                          embed.setAuthor(`✅ Successfully Sold`);
                                          embed.setColor(`#30CC71`);
                                          embed.setDescription(`You have successfully sold ${args[2]} shares of <:hooli:939924424231100486> Hooli for ${cost}`);
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
                              if(userData.wallet < 5000000000 && userData.wallet + microsoftshare <= 5000000000){
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
                                embed.setDescription(`You have successfully sold 1 share of <:hooli:939924424231100486> Hooli for ${microsoftshare}`);
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
      
                  }else if(argstwo_name === 'pied' && argsthree_name === 'piper'){
                      var applevalue = botData.applevalue;
                      var totalshare = args[3];
                      var cost = applevalue * totalshare;
                      var totalcost = userbal - cost;
                      var totalcost2 = networth - cost;
                      var facebook = userData.facebook;
                      console.log(totalshare)
                      if(totalshare){
                        if(!isNaN(totalshare) && Math.sign(totalshare) === 1){
                          if(totalshare % 1=== 0){
                            if(userData.apple >= totalshare){  
                            if(userData.wallet < 5000000000 && userData.wallet + cost <=5000000000){

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
                                    embed.setDescription(`You have successfully sold ${args[2]} share of <:PiedPiper:939924753915998218> Pied Piper for ${cost}`);
                                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                    embed.setTimestamp();
                                    message.channel.send({embeds:[embed]});
                                  }else if(totalshare>1){
                                    const embed = new Discord.MessageEmbed();
                                    embed.setAuthor(`✅ Successfully Sold`);
                                    embed.setColor(`#30CC71`);
                                    embed.setDescription(`You have successfully sold ${args[2]} shares of <:PiedPiper:939924753915998218> Pied Piper for ${cost}`);
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
                        if(userData.wallet < 5000000000 && userData.wallet + applevalue <= 5000000000){
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
                            embed.setDescription(`You have successfully sold 1 share of <:PiedPiper:939924753915998218> Pied Piper for ${applevalue}`);
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
    
                  }else if(argstwo_name === 'hola' && argsthree_name === 'electric'){
                    var teslashare = botData.teslavalue;
                    var totalshare = args[3];
                    var cost = teslashare * totalshare;
                    var totalcost = userbal - cost;
                    var totalcost2 = networth - cost;
                    var tesla = userData.tesla;
                    console.log(totalshare)
                    if(totalshare){
                      if(!isNaN(totalshare) && Math.sign(totalshare) === 1){
                        if(totalshare % 1=== 0){
                          if(userData.tesla>=totalshare){
                          if(userData.wallet < 5000000000 && userData.wallet + cost <=5000000000){
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
                                embed.setDescription(`You have successfully sold ${args[2]} share of <:hola:939924607337644052> Hola Electric for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                              }else if(totalshare>1){
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${args[2]} shares of <:hola:939924607337644052> Hola Electric for ${cost}`);
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
                      if(userData.wallet < 5000000000 && userData.wallet + teslashare <= 5000000000){
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
                        embed.setDescription(`You have successfully sold 1 share of <:hola:939924607337644052> Hola Electric for ${teslashare}`);
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
                   let totalcoins = args[1];
                   let number = args[1];
                   let cryptovalue = botData.cryptovalue;
                   let userData2 = await userModel.findOne({userID:message.author.id});
                   let userbal2 = userData2.wallet;
                   let cost = cryptovalue * totalcoins;
                   if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                      if(number % 1=== 0){
                           if(userData2.cryptocoin>= totalcoins){      
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastsell:n2
                                });
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    cryptocoin:-number,
                                    wallet:cost,
                                    networth:cost
                                  }
                                });
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Sold`);
                                embed.setColor(`#30CC71`);
                                embed.setDescription(`You have successfully sold ${totalcoins} cryptocoin for ${cost}`);
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});           
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
                    if(userData2.cryptocoin>= 1){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newbuy = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastsell:n2
                        });
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            cryptocoin:-1,
                            wallet:cryptovalue,
                            networth:cryptovalue
                          }
                        });
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Sold`);
                        embed.setColor(`#30CC71`);
                        embed.setDescription(`You have successfully sold 1 cryptocoin for ${cryptovalue}`);
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
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
                        if(userData.boat >= number){
                          const embed = new Discord.MessageEmbed();
                          embed.setAuthor(`✅ Successfully Sold`);
                          embed.setColor(`#30CC71`);
                          embed.setDescription(`You have successfully sold **${number}** <:boat:904243050279235675> boat for ${cost}
                          `);
                          embed.setFooter(`Requested by ${message.author.username}`,avatar);
                          embed.setTimestamp();
                          message.channel.send({embeds:[embed]});
                          const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                              networth:totalcost,
                              wallet:totalcost,
                              boat:-number
                            }
                          });   
                        }else{
                          message.channel.send(`${message.author}, you don't have that many boat to sell`);
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
                  if(userData.boat>=1){
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Sold`);
                    embed.setColor(`#30CC71`);
                    embed.setDescription(`You have successfully sold **1** <:boat:904243050279235675> boat for ${boatvalue}
                    `);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        networth:boatvalue,
                        wallet:boatvalue,
                        boat:-1
                      }
                    });  
                  }else{
                    message.channel.send(`${message.author}, you don't have that many boat to sell`);
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
                        sell('Bubble Tea','🧋',number,cost,'food');   
                        
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
                  sell('Bubble Tea','🧋',1,bubblevalue,'food');   
                 
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
                        sell('Beast Pc','<:gamingpc:918053046498512906>',number,cost,'gadgets');   
                       
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
                  sell('Beast Pc','<:gamingpc:918053046498512906>',1,cost2,'gadgets');   
                  
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
                        sell('Monitor','<:monitor:918053577266708500>',number,cost,'gadgets');   
                         
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
                  sell('Monitor','<:monitor:918053577266708500>',1,cost2,'gadgets');   
                  
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
                        sell('Black Color Mouse','<:blackmouse:918054201765027850>',number,cost,'gadgets');   
                         
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
                  sell('Black Color Mouse','<:blackmouse:918054201765027850>',1,cost2,'gadgets');   
                 
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
                        sell('White Color Mouse','<:whitemouse:918061503029055488>',number,cost,'gadgets');   
                       
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
                  sell('White Color Mouse','<:whitemouse:918061503029055488>',1,cost2,'gadgets');   
               
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
                        sell('Black Gaming Keyboard','<:gamingkeyboard:918055261854392330>',number,cost,'gadgets');   
                         
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
                  sell('Black Gaming Keyboard','<:gamingkeyboard:918055261854392330>',1,cost2,'gadgets');   
                
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
                        sell('White Gaming Keyboard','<:whitegamingkeyboard:918055512132698133>',number,cost,'gadgets');   
                         
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
                  sell('White Gaming Keyboard','<:whitegamingkeyboard:918055512132698133>',1,cost2,'gadgets');   
                
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
                        sell('Laptop','<:laptop:918059938612404255>',number,cost,'gadgets');   
                         
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
                  sell('Laptop','<:laptop:918059938612404255>',1,cost2,'gadgets'); 
                  
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
                        sell('Smartphone','<:smartphone:918057432264101978>',number,cost,'gadgets');   
                        
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
                  sell('Smartphone','<:smartphone:918057432264101978>',1,cost2,'gadgets');   
                  
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
                        sell('Spidey Badge','<:spideybadge:918017281106255922>',number,cost,'collectables');   
                        
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
                  sell('Spidey Badge','<:spideybadge:918017281106255922>',1,cost2,'collectables');   
                  
                 }
                }else if(argsone_name === 'santa' && argstwo_name === 'cap'){
                  let totalcap = args[2];
                  let number = args[2];
                  let santacapvalue = botData.santavalue;
                  let userData2 = await userModel.findOne({userID:message.author.id});
                  let userbal2 = userData2.wallet;
                  let cost = santacapvalue * totalcap;
                  console.log(cost);
                  if(number){
                   if(!isNaN(number) && Math.sign(number) === 1){
                     if(number % 1=== 0){
                        sell('Santa Cap','<:santacap:925292343291170826>',number,cost,'collectables');   
                      
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
                  sell('Santa Cap','<:santacap:925292343291170826>',1,cost2,'collectables');   
                 
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
                        sell('Jedi Lightsaber','<:jedilightsaber:918028605945167902>',number,cost,'collectables');   
                          
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
                  sell('Jedi Lightsaber','<:jedilightsaber:918028605945167902>',1,cost2,'collectables');   
                 
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
                        sell('Sith Lightsaber','<:sithlightsaber:918027995539705917>',number,cost,'collectables');   
                          
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
                  sell('Sith Lightsaber','<:sithlightsaber:918027995539705917>',1,cost2,'collectables');   
                
                 }
                }else if(argsone_name === 'common' && argstwo_name === 'fish'){
                  let totalfish = args[2];
                  let commonfish_value = botData.commonfishvalue;
                  let cost  = commonfish_value * totalfish;
                  if(totalfish){
                    if(!isNaN(totalfish) && Math.sign(totalfish) === 1){
                      if(totalfish % 1=== 0){
                      
                           sell('common fish','🐟',totalfish,cost,'fish');
                        
                      
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
                   
                        sell('common fish','🐟',1,commonfish_value,'fish');
                    
                  }
                }else if(argsone_name === 'shark'){
                  let totalfish = args[1];
                  let shark_value = botData.sharkvalue;
                  let cost  = shark_value * totalfish;
                  if(totalfish){
                    if(!isNaN(totalfish) && Math.sign(totalfish) === 1){
                      if(totalfish % 1=== 0){
                      
                           sell('shark','🦈',totalfish,cost,'fish');
                        
                      
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
                   
                        sell('shark','🦈',1,shark_value,'fish');
                    
                  }
                }else if(argsone_name === 'octopus'){
                  let totalfish = args[2];
                  let octopus_value = botData.octopusvalue;
                  let cost  = octopus_value * totalfish;
                  if(totalfish){
                    if(!isNaN(totalfish) && Math.sign(totalfish) === 1){
                      if(totalfish % 1=== 0){
                      
                           sell('octopus','🐙',totalfish,cost,'fish');
                        
                      
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
                   
                        sell('octopus','🐙',1,octopus_value,'fish');
                    
                  }
                }else if(argsone_name === 'uncommon' && argstwo_name === 'fish'){
                  let totalfish = args[2];
                  let goldfish_value = botData.goldfishvalue;
                  let cost  = goldfish_value * totalfish;
                  if(totalfish){
                    if(!isNaN(totalfish) && Math.sign(totalfish) === 1){
                      if(totalfish % 1=== 0){
                      
                           sell('uncommon fish','🐠',totalfish,cost,'fish');
                        
                      
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
                   
                        sell('uncommon fish','🐠',1,goldfish_value,'fish');
                    
                  }
                }else if(argsone_name === 'humming' && argstwo_name === 'bird' ){
                  let totalfish = args[2];
                  let hummingbird_value = botData.hummingbirdvalue;
                  let cost  = hummingbird_value * totalfish;
                  if(totalfish){
                    if(!isNaN(totalfish) && Math.sign(totalfish) === 1){
                      if(totalfish % 1=== 0){
                      
                           sell('humming bird','',totalfish,cost,'hunt');
                        
                      
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
                   
                        sell('humming bird','',1,hummingbird_value,'hunt');
                    
                  }
                }else if(argsone_name === 'wolf'){
                  let totalwolf = args[1];
                  let wolfvalue = botData.wolfvalue;
                  let cost  = wolfvalue * totalwolf;
                  if(totalwolf){
                    if(!isNaN(totalwolf) && Math.sign(totalwolf) === 1){
                      if(totalwolf % 1=== 0){
                      
                           sell('wolf','',totalwolf,cost,'hunt');
                        
                      
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
                   
                        sell('wolf','',1,wolfvalue,'hunt');
                    
                  }
                }else if(argsone_name === 'squirrel' ){
                  let totalsquirrel = args[1];
                  let squirrelvalue = botData.squirrelvalue;
                  let cost  = squirrelvalue * totalsquirrel;
                  if(totalsquirrel){
                    if(!isNaN(totalsquirrel) && Math.sign(totalsquirrel) === 1){
                      if(totalsquirrel % 1=== 0){
                      
                           sell('squirrel','',totalsquirrel,cost,'hunt');
                        
                      
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
                   
                        sell('squirrel','',1,squirrelvalue,'hunt');
                    
                  }
                }else if(argsone_name === 'fox'){
                  let totalfox = args[2];
                  let foxvalue = botData.foxvalue;
                  let cost  = foxvalue * totalfox;
                  if(totalfox){
                    if(!isNaN(totalfox) && Math.sign(totalfox) === 1){
                      if(totalfox % 1=== 0){
                      
                           sell('fox','',totalfox,cost,'hunt');
                        
                      
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
                   
                        sell('fox','',1,foxvalue,'hunt');
                    
                  }
                }else if(argsone_name === 'woodpecker'){
                  let totalwoodpecker = args[1];
                  let woodpeckervalue = botData.woodpeckervalue;
                  let cost  = woodpeckervalue * totalwoodpecker;
                  if(totalwoodpecker){
                    if(!isNaN(totalwoodpecker) && Math.sign(totalwoodpecker) === 1){
                      if(totalwoodpecker % 1=== 0){
                      
                           sell('woodpecker','',totalwoodpecker,cost,'hunt');
                        
                      
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
                   
                        sell('woodpecker','',1,woodpeckervalue,'hunt');
                    
                  }
                }else if(argsone_name === 'grass'){
                  let totalgrass = args[1];
                  let grassvalue = botData.grassvalue;
                  let cost  = grassvalue * totalgrass;
                  if(totalgrass){
                    if(!isNaN(totalgrass) && Math.sign(totalgrass) === 1){
                      if(totalgrass % 1=== 0){
                      
                           sell('grass','',totalgrass,cost,'dig');
                        
                      
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
                   
                        sell('grass','',1,grassvalue,'dig');
                    
                  }
                }else if(argsone_name === 'dirt'){
                  let totaldirt = args[1];
                  let dirtvalue = botData.dirtvalue;
                  let cost  = dirtvalue * totaldirt;
                  if(totaldirt){
                    if(!isNaN(totaldirt) && Math.sign(totaldirt) === 1){
                      if(totaldirt % 1=== 0){
                      
                           sell('dirt','<:dirt:904039581224153098>',totaldirt,cost,'dig');
                        
                      
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
                   
                        sell('dirt','<:dirt:904039581224153098>',1,dirtvalue,'dig');
                    
                  }
                }else if(argsone_name === 'boot' || argsone_name === 'boots'){
                  let totalboot = args[1];
                  let bootvalue = botData.bootsvalue;
                  let cost  = bootvalue * totalboot;
                  if(totalboot){
                    if(!isNaN(totalboot) && Math.sign(totalboot) === 1){
                      if(totalboot % 1=== 0){
                      
                           sell('boots','👢',totalboot,cost,'dig');
                        
                      
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
                   
                        sell('boots','👢',1,bootvalue,'dig');
                    
                  }
                }else if(argsone_name === 'ancient' && argstwo_name === 'coin'){
                  let totalancient = args[2];
                  let coinvalue = botData.ancientcoin;
                  let cost  = coinvalue * totalancient;
                  if(totalancient){
                    if(!isNaN(totalancient) && Math.sign(totalancient) === 1){
                      if(totalancient % 1=== 0){
                      
                           sell('ancient coin','<:ancientcoin:903586746640519178>',totalancient,cost,'dig');
                        
                      
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
                   
                        sell('ancient coin','<:ancientcoin:903586746640519178>',1,coinvalue,'dig');
                    
                  }
                }else{
                  message.channel.send(`${message.author} that item is not available to sell`);
                }
              }else{
                var msec = n - lastsell;
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
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use sell again!.`);
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