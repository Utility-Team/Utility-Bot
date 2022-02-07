const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'hunt',
    async execute(message,args,client){
      const userData = await userModel.findOne({userID:message.author.id});
      const serverData = await serverModel.findOne({guildID:message.guild.id});
      if(userData){
        let avatar;
        if(userData.avatar !== '' && userData.premium === 'enable'){
          avatar = userData.avatar;
        }else{
          avatar = message.author.displayAvatarURL();
        }
        async function hunt(){
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
                        embed.setAuthor(`${message.author.username}, You went to woods just to find garbage!`,avatar);
                        embed.setFooter(`I know it sucks!`);
                        embed.setTimestamp();
                        embed.setColor('#ED4245');
                        message.reply({embeds:[embed]});
                    

                    }

                    if(hunt_chance === 2){
                        const animals = ['squirrel','fox','woodpecker','wolf','humming bird'];
                        let animalgot = animals[Math.floor(Math.random() * animals.length)];
                        if(animalgot === 'squirrel'){
                          update('squirrel','hunt');
                        }
                        if(animalgot === 'fox'){
                          update('squirrel','hunt');
                        }
                        if(animalgot === 'woodpecker'){
                          update('squirrel','hunt');
                        }
                        if(animalgot === 'wolf'){
                            update('wolf','hunt');
                          
                        }
                        if(animalgot === 'humming bird'){
                          update('humming bird','hunt');
                            
                        }
                    }

        }
        async function update(item,category){
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
                              inventoryData[x].quantity = parseInt(inventoryData[x].quantity) +1;
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

        async function check(userData){
          if(userData.huntingrifle){
            if(userData.huntingrifle>=1){
              hunt();
              return;
            }else{
              message.channel.send(`${message.author}, You don't have hunting rifle for hunting. You can buy it using buy command`);

            }
          }else{
            message.channel.send(`${message.author}, You don't have hunting rifle for hunting. You can buy it using buy command`);
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
            let lasthunt = userData.lasthunt;
            let timeup;
            let timeup2;
            if(userData.premium === 'enable'){
              timeup = 15000;
              timeup2 = 15;
            }else{
              console.log('here');
              timeup = 30000;
              timeup2 = 30;
            }
            if(n-lasthunt>= timeup){
                    check(userData);
            }else{
                var msec = n - lasthunt;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = timeup2 - ss;
                if(userData.premium !== 'enable'){
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Wait bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use hunt again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                  message.channel.send({embeds:[embed]});
                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Chill bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use hunt again!.`);
                  embed.setColor('#025CFF');
                  message.channel.send({embeds:[embed]});
                }
            }  
      
      }else{
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
         
      }
    }
}