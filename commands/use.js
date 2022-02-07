const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'use',
    aliases:['use','apply'],
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
                    xp:15,
                    level:1,
                    commands:1
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
            let argsone;
            let argsone_name;
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
            let lastuse;
            let d = new Date();
            let n = d.getTime();
            if(userData.lastuse){
              lastuse = userData.lastuse;
            }else{
              lastuse = 0;
            }
            //partner function
            async function checkPartner(partnerID,item,emoji,category,quantity){
              let check = 0;
              let partnerData = await userModel.findOne({userID:partnerID});
              if(partnerData.inventory){
                  for(var x = 0;x<=partnerData.inventory.length;x++){
                      if(partnerData.inventory[x]){
                        if(partnerData.inventory[x].name === item){
                          if(partnerData.inventory[x].quantity >= parseInt(quantity)){
                                      if(item === partnerData.inventory[x].name && check < 5){
                                        console.log('it came here yes');
                                          check = 5;
                                          let inventoryData = partnerData.inventory;
                                          if(inventoryData[x].quantity>1){
                                            console.log('it is here 2');
                                            inventoryData[x].quantity = parseInt(inventoryData[x].quantity) - parseInt(quantity);
                                          }else{
                                              inventoryData.splice(x,1);
                                          }
                                          const response = await userModel.findOneAndUpdate({userID:partnerID},
                                          {
                                              inventory:inventoryData
                                          }    
                                          );
                                          const embed =new Discord.MessageEmbed();
                                          embed.setAuthor(`${message.author.username}, You don't have ${item} so would you like to use your partner ${userData. partnername}'s ${item}. Use yes or no button to answer!`);
                                          embed.setTimestamp();
                                          const row = new Discord.MessageActionRow()
                                          .addComponents(
                                              new Discord.MessageButton()
                                                  .setCustomId('yes')
                                                  .setLabel('Yes')
                                                  .setStyle('SUCCESS'),
                                              new Discord.MessageButton()
                                                  .setCustomId('no')
                                                  .setLabel('No')
                                                  .setStyle('DANGER')
                                              
                                          );
                                          const m = await message.channel.send({embeds:[embed],components:[row]});
                                            const ifilter = i => i.user.id === message.author.id;
                        
                                            const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                        
                                            collector.on('collect', async i => {
                                                console.log('hello there' + i.guildId);
                                                if (i.customId === 'yes') {
                                                      const embed2 = new Discord.MessageEmbed();
                                                      embed2.setTitle(`${emoji} ${item} used!`);
                                                      embed2.setDescription(`You have successfully used **1 ${emoji} ${item}**`);
                                                      embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                                      embed2.setColor(`#30CC71`);
                                                      embed2.setTimestamp();
                                                      await i.update({embeds:[embed2],components:[]});
                                                      let d2 = new Date();
                                                      let n2 = d2.getTime();
                                                      const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                        lastuse:n2
                                                      });
                                                      if(item === 'Lock'){
                                                          const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                                                  {
                                                                      $inc:{
                                                                          nolock:1
                                                                      }
                                                                    
                                                                  }
                                                          );
                                                      }
                                                      if(item === 'Credit Points'){
                                                        const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                                          {
                                                              $inc:{
                                                                  banklimit:quantity
                                                              }
                                                            
                                                          }
                                                        );
                                                      }
                                                }else if(i.customId==='no'){
                                                    await i.update({components:[]});
                                                }
                                            });
                                            collector.on('end', collected => console.log(`Collected ${collected.size} items`));     
                                      }
                              }else{
                                message.channel.send(`${message.author}, You don't own that item!`);
                                return
                              }
                        }
                      }else if(x === partnerData.inventory.length & check < 5){
                        message.channel.send(`${message.author}, You don't own that item!`);
                      }
                  }
              }else{
                message.channel.send(`${message.author}, You don't own that item!`);
              }
            }
            //use function
            async function use(item,emoji,category,quantity){
              let check = 0;
              if(userData.inventory){
                  for(var x = 0;x<=userData.inventory.length;x++){
                      if(userData.inventory[x]){
                        if(userData.inventory[x].name === item){
                          if(parseInt(userData.inventory[x].quantity) >= parseInt(quantity)){
                                      if(item === userData.inventory[x].name && check < 5){
                                          if(item === 'Lock'){
                                            const response = await userModel.findOneAndUpdate({
                                              userID:message.author.id,
                                            },{
                                                lockactive:'enable'
                                            });
                                            const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                                    {
                                                        $inc:{
                                                            nolock:1
                                                        }
                                                      
                                                    }
                                            );
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`${emoji} ${item} used!`);
                                            embed2.setDescription(`You have successfully used **1 ${emoji} ${item}**`);
                                            embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                          }
                                          if(item === 'Beer'){
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`Drunk ${item}!`);
                                            embed2.setDescription(`You drunk whole jug of ${emoji} ${item}!`);
                                            embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                          }
                                          if(item === 'Bubble Tea'){
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`Drunk ${item}!`);
                                            embed2.setDescription(`You drunk whole ${emoji} ${item}!`);
                                            embed2.addFields({name:`Rewards -`,value:`+ 50 xp`});
                                            embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                          }
                                          if(item === 'Coffee'){
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`Drunk ${item}!`);
                                            embed2.setDescription(`You drunk whole ${emoji} ${item}!`);
                                            embed2.addFields({name:`Rewards -`,value:`+ 50 xp`});
                                            embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                          }
                                          if(item === 'Green Apple'){
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`Ate ${item}!`);
                                            embed2.setDescription(`You ate whole ${emoji} ${item}!`);
                                            embed2.addFields({name:`Rewards -`,value:`+ 1500 xp`});
                                            embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                          }
                                          if(item === 'Pizza Slice'){
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`Ate ${item}!`);
                                            embed2.setDescription(`You ate whole ${emoji} ${item}!`);
                                            embed2.addFields({name:`Rewards -`,value:`+ 4500 xp
                                             + increase in daily and monthly amount
                                            `});
                                            embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                          }
                                          if(item === 'Credit Points'){
                                            console.log('here 1');
                                            const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                                    {
                                                        $inc:{
                                                            banklimit:quantity
                                                        }
                                                      
                                                    }
                                            );
                                            let banklimit;
                                            if(userData.banklimit){
                                              banklimit = userData.banklimit;
                                            }else{
                                              banklimit = 0;
                                            }
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`${emoji} ${item} used!`);
                                            embed2.setDescription(`You have successfully used **1 ${emoji} ${item} and your bank limit has been increased to ${userData.level * 10000 + banklimit + quantity}**`);
                                            embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                          }
                                          check = 5;
                                          let inventoryData = userData.inventory;
                                          if(inventoryData[x].quantity>quantity){
                                              inventoryData[x].quantity = parseInt(inventoryData[x].quantity) - parseInt(quantity);
                                          }else{
                                              inventoryData.splice(x,1);
                                          }
                                          const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                          {
                                              inventory:inventoryData
                                          }    
                                          );
                                          let d2 = new Date();
                                          let n2 = d2.getTime();
                                          const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            lastuse:n2
                                          });
                                          return;
                                      }
                              }else{
                                console.log(userData.inventory[x].quantity);
                                message.channel.send(`${message.author}, You don't have that many ${userData.inventory[x].name} to use`);
                                return
                              }
                        }
                      }else if(x === userData.inventory.length & check < 5){
                        if(userData.partner !== 0){
                          console.log('partner confirmed');
                          checkPartner(userData.partner,item,emoji,category,1);
                        }else{
                          message.channel.send(`${message.author}, You don't own that item to use`);
                        }
                      }
                  }
              }else{
                  message.channel.send(`${message.author}, You don't own that item to use`);
              }
            }
            if(argsone_name){
              let timeup;
              let timeup2;
              if(userData.premium === 'enable'){
                timeup = 3000;
                timeup2 = 3;
              }else{
                timeup = 5000;
                timeup2 =5;
              }
              if(n - lastuse >= timeup){
                  if(argsone_name === 'lock'){
                    if(userData.lock >= 1){
                      const response = await userModel.findOneAndUpdate({
                        userID:message.author.id,
                      },{
                          lockactive:'enable'
                      });
                      const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                              {
                                  $inc:{
                                      nolock:1
                                  }
                                
                              }
                      );
                      const embed2 = new Discord.MessageEmbed();
                      embed2.setTitle(`🔒 Lock added!`);
                      embed2.setDescription(`You have successfully added **1 🔒 lock**`);
                      embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                      embed2.setColor(`#30CC71`);
                      embed2.setTimestamp();
                      message.channel.send({embeds:[embed2]});
                    }else{
                      message.channel.send(`${message.author}, you don't have lock to use`);
                    }
                  }
                  if(argsone_name === 'beer'){
                     use('Beer','🍺','food',1);
                  }
                  if(argsone_name === 'coffee'){
                     use('Coffee','☕','food',1);
                  }
                  if(argsone_name === 'pizza' && argstwo_name === 'slice'){
                    use('Pizza Slice','🍕','food',1);
                  }
                  if(argsone_name === 'green' && argstwo_name === 'apple'){
                    use('Green Apple','🍏','food',1);
                  }
                  if(argsone_name === 'bubble' && argstwo_name === 'tea'){
                    use('Bubble Tea','🧋','food',1);
                  }
                  if(argsone_name === 'credit' && argstwo_name === 'points' || argsone_name === 'credit' && argstwo_name === 'point'){
                    if(argsthree_name){
                      if(!isNaN(argsthree_name) && Math.sign(argsthree_name) === 1){
                        if(argsthree_name % 1=== 0){  
                           if(userData.creditpoints >= argsthree_name){
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                  banklimit:parseInt(argsthree_name),
                                  creditpoints:-parseInt(argsthree_name)
                                }
                              });
                              let banklimit;
                              if(userData.banklimit){
                                banklimit = userData.banklimit;
                              }else{
                                banklimit = 0;
                              }
                              let bankspace = userData.level * 10000;
                              const embed2 = new Discord.MessageEmbed();
                              embed2.setTitle(`<:creditpoint:925956240209772564> Credit Points used!`);
                              embed2.setDescription(`You have successfully used **${argsthree_name} <:creditpoint:925956240209772564> Credit Points and your bank limit has been increased to ${bankspace+ banklimit + argsthree_name}**`);
                              embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                              embed2.setColor(`#30CC71`);
                              embed2.setTimestamp();
                              message.channel.send({embeds:[embed2]});
                           }else{
                             const embed = new Discord.MessageEmbed();
                             embed.setTitle(`${message.author.username}, You don't have ${argsthree_name} credit points to use!`);
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
                      if(userData.creditpoints >= 1){
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            banklimit:1,
                            creditpoints:-1
                          }
                        });
                        let banklimit;
                        if(userData.banklimit){
                          banklimit = userData.banklimit;
                        }else{
                          banklimit = 0;
                        }
                        const embed2 = new Discord.MessageEmbed();
                        embed2.setTitle(`<:creditpoint:925956240209772564> Credit Points used!`);
                        embed2.setDescription(`You have successfully used **1 <:creditpoint:925956240209772564> Credit Points and your bank limit has been increased to ${userData.level * 10000 + banklimit + 1}**`);
                        embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed2.setColor(`#30CC71`);
                        embed2.setTimestamp();
                        message.channel.send({embeds:[embed2]});
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, You don't have 1 credit points to use!`);
                        message.channel.send({embeds:[embed]});
                      }
                    }
                  }
              }else{
                var msec = n - lastuse;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = timeup2 - ss;
                if(userData.premium !== 'enable'){
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`Wait bro!`);
                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use that item again!. The default cooldown is of **5** seconds but for premium users it is of **3** seconds to become a premium user use premium command.`);
                    message.channel.send({embeds:[embed]});
                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Chill bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use that item again!.`);
                  embed.setColor('#025CFF');
                  message.channel.send({embeds:[embed]});
                }
              }
      
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, Please mention what you want to use!`);
                message.channel.send({embeds:[embed]});
            }
        }else{
          message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

        }
    }
}