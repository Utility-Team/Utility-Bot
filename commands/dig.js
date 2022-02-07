const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports ={
    name:'dig',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
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
            if(userData.avatar){
              if(userData.avatar !== '' && userData.premium === 'enable'){
                avatar = userData.avatar;
              }else{
                avatar = message.author.displayAvatarURL();
              }
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
                                embed.setAuthor(`✅ You got a ${item}!`);
                                embed.setDescription('You can keep or sell it using sell command');
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed.setTimestamp();
                                embed.setColor(`#30CC71`);
                                message.channel.send({embeds:[embed]});
                                check = 5;
                                let inventoryData = userData.inventory;
                                  inventoryData[x].quantity = parseInt(inventoryData[x].quantity) + parseInt(1);
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
                        embed.setAuthor(`✅ You got a ${item}!`);
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
                embed.setAuthor(`✅ You got a ${item}!`);
                embed.setDescription('You can keep or sell it using sell command');
                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                embed.setTimestamp();
                embed.setColor(`#30CC71`);
                message.channel.send({embeds:[embed]});
              }
            }
            let lastdig;
            if(!userData.lastdig){
              lastdig = 0;
              }else{
                lastdig = userData.lastdig
              }
              var d = new Date();
              var n = d.getTime();
              let timeup;
              let timeup2;
              if(userData.premium === 'enable'){
                timeup = 15000;
                timeup2 = 15;
              }else{
                timeup = 30000;
                timeup2 =30;
              }
              if(n- lastdig >= timeup){
                var d2 = new Date();
                var n2 = d2.getTime();
                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                  lastdig:n2
                })
                let dig_chance = Math.floor(Math.random() * 2);
                if(dig_chance === 0){    
                message.channel.send(`${message.author} , You found nothing but Nice try!`);
                }
                
                if(dig_chance === 1){
                let random_chance = Math.floor(Math.random()*5);
                if(random_chance === 0){
                   update('dirt','<:dirt:904039581224153098>','dig');
                }
                if(random_chance === 1){
                    update('boots','👢','dig');
                 
                }
                if(random_chance === 2){
                    update('grass','<:grass:904040046049505381>','dig');
                }
                if(random_chance === 3){
                    let random_number = Math.floor(Math.random() * 1000);
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                    $inc:{
                        networth:random_number,
                        wallet:random_number
                    }
                    });
                
                message.channel.send(`${message.author} , You found 🥫garbage and got ${random_number} for it!`);
        
                }
                if(random_chance === 4){
                    update('ancient coin','<:ancientcoin:903586746640519178>','dig');
                }
                }
              }else{
                var msec = n - lastdig;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = timeup2 - ss;
                if(userData.premium !== 'enable'){
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Wait bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use dig again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                  message.channel.send({embeds:[embed]});
                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Chill bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use dig again!.`);
                  embed.setColor('#025CFF');
                  message.channel.send({embeds:[embed]});
                }
              }

        }else{
          message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
           
        }
    }
}