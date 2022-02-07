const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'fish',
    async execute(message,args){
        const userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(userData){
            let avatar;
            if(userData.avatar !== '' && userData.premium === 'enable'){
              avatar = userData.avatar;
            }else{
              avatar = message.author.displayAvatarURL();
            }
            async function update(item,emoji,category){
                let check = 0;
              if(userData.inventory){
                  console.log('work 1');
                  for(var x = 0;x<=userData.inventory.length;x++){
                      if(userData.inventory[x]){
                              if(item === userData.inventory[x].name && check < 5){
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ You got a ${emoji} ${item}!`);
                                embed.setDescription('You can keep or sell it using sell command');
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed.setTimestamp();
                                embed.setColor(`#30CC71`);
                                message.channel.send({embeds:[embed]});
                                check = 5;
                                let inventoryData = userData.inventory;
                                  inventoryData[x].quantity = parseInt(inventoryData[x].quantity) + 1;
                                  const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                  {
                                      inventory:inventoryData
                                  }    
                                  );
                              
                                  return;
                              }
                        
                         // }
                      }else if(x === userData.inventory.length & check < 5){
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ You got a ${emoji} ${item}!`);
                        embed.setDescription('You can keep or sell it using sell command');
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setTimestamp();
                        embed.setColor(`#30CC71`);
                        message.channel.send({embeds:[embed]});
                        let inventoryData = await userData.inventory;
                        let newData = {
                           name:item,
                           emoji:emoji,
                           quantity:1,
                           category:category
                         }
                        inventoryData.push(newData);
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},
                          {
                            inventory:inventoryData
                          }
                          );
  
                        return;
  
                      }
                  }
              }else{
                let newData = {
                    name:item,
                    emoji:emoji,
                    quantity:1,
                    category:category
                  }
                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                    inventory:[newData]
                });
                const embed = new Discord.MessageEmbed();
                embed.setAuthor(`✅ You got a ${emoji} ${item}!`);
                embed.setDescription('You can keep or sell it using sell command');
                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                embed.setTimestamp();
                embed.setColor(`#30CC71`);
                message.channel.send({embeds:[embed]});
              }
            }
            async function fish(){
              var d2 = new Date();
              var n2 = d2.getTime();  
              const response  = await userModel.findOneAndUpdate({userID:message.author.id},
              {
                lastfish:n2
              });
              let fish_chance = Math.floor(Math.random() * 3);
              console.log(fish_chance);
              if(fish_chance === 0){
                  message.reply(`You found nothing. Nice try!`);
              }else if(fish_chance === 1){
                  const chance = Math.floor(Math.random()*1000);
                  if(chance === 999){
                      message.reply(`You found a <:rarecoin:889378862708969482> rare coin. good job!`);
                  }else{
                     const random = Math.floor(Math.random()*100);
                      if(userData.wallet === 1000000000 || userData.wallet + random > 1000000000){
                          message.reply(`You found 🥫garbage and You got <:UC:878195863413981214> 0 for it!`);
                      }else{
                        
                          const response = await userModel.findOneAndUpdate({userID:message.author.id},
                          {
                              $inc:{   
                                  wallet:random,
                                  networth:random
                              }
                          } 
                              );
                          message.reply(`You found 🥫garbage and You got <:UC:878195863413981214> ${random} for it!`);
                      }
                  }
              }else if(fish_chance === 2){
                  let fish = ['🐠 gold fish','🐙 octopus','🐟 common fish','🦈shark'];
                  let fishgot = fish[Math.floor(Math.random() * fish.length)];
                  if(fishgot === '🐠 gold fish'){
                     update('uncommon fish','🐠','fish');
                  }else if(fishgot === '🐙 octopus'){
                     update('octopus','🐙','fish');
                  }else if(fishgot === '🐟 common fish'){
                     update('common fish','🐟','fish');
                  }else if(fishgot === '🦈shark'){
                     update('shark','🦈','fish');  
                  }
              
              }
            }
            async function check(userData){
              if(userData.fishingrod){
                if(userData.fishingrod>=1){
                  fish();
                  return;
                }else{
                  message.channel.send(`${message.author}, You don't have fishing rod for fishing. You can buy it using buy command`);

                }
              }else{
                message.channel.send(`${message.author}, You don't have fishing rod for fishing. You can buy it using buy command`);

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
                var d = new Date();
                var n = d.getTime();
                let lastfish = userData.lastfish;
                let timeup;
                let timeup2;
                if(userData.premium === 'enable'){
                  timeup = 15000;
                  timeup2 = 15;
                }else{
                  timeup = 30000;
                  timeup2 =30;
                }
                if(n- lastfish >= timeup){
                  check(userData);
                }else{  
                    var msec = n - lastfish;
                    console.log(msec);
                    var ss = Math.floor(msec / 1000);
                    var second = timeup2 - ss;
                    if(userData.premium !== 'enable'){
                      const embed = new Discord.MessageEmbed();
                      embed.setTitle(`Wait bro!`);
                      embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use fish again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                      message.channel.send({embeds:[embed]});
                    }else{
                      const embed = new Discord.MessageEmbed();
                      embed.setTitle(`Chill bro!`);
                      embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use fish again!.`);
                      embed.setColor('#025CFF');
                      message.channel.send({embeds:[embed]});
                    }
                }
        }else{
          message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
            
        }

    }
}