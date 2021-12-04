const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports={
    name:'use',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
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
                 argsthree_name = argstwo.toLowerCase();
            }
            let lastuse;
            let d = new Date();
            let n = d.getTime();
            if(userData.lastuse){
              lastuse = userData.lastuse;
            }else{
              lastuse = 0;
            }
          
            
            if(argsone_name){
              if(n - lastuse >= 5000){
                  if(argsone_name === 'lock'){
                      if(userData.lock>= 1){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastuse:n2
                        });
                        const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },{
                              lockactive:'enable'
                          });
                        const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                {
                                    $inc:{
                                        lock:-1,
                                        nolock:1
                                    }
                                  
                                }
                        );
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`:lock: Lock Added`)
                        embed.setDescription(`${message.author}, lock has been added to your wallet and no one will be able to steal from you. Note this item is of one time use.`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        embed.setColor(`#30CC71`);
                        message.channel.send({embeds:[embed]});
                      }else{
                        if(userData.partner !== 0){
                          let partnerid = userData.partner;
                          let partnerData = await userModel.findOne({userID:partnerid});
                          if(partnerData.lock >= 1){
                            const embed =new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username}, You don't have lock so would you like to use your partner ${userData. partnername}'s lock. Use yes or no button to answer!`);
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
                                  let d2 = new Date();
                                  let n2 = d2.getTime();
                                  const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastuse:n2
                                  });
                                  const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                          {
                                              $inc:{
                                                  nolock:1
                                              }
                                            
                                          }
                                  );
                                  const partnerresponse = await userModel.findOneAndUpdate({userID:partnerid},
                                    {
                                        $inc:{
                                            lock:-1
                                        }
                                      
                                    }
                                );
                                  const embed2 = new Discord.MessageEmbed();
                                  embed2.setTitle(`:lock: Lock Added`)
                                  embed2.setDescription(`${message.author}, lock has been added to your wallet and no one will be able to steal from you. Note this item is of one time use.`);
                                  embed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                  embed2.setTimestamp();
                                  embed2.setColor(`#30CC71`);
                                  await i.update({ embeds:[embed2],components:[]});
                                }else if(i.customId==='no'){
                                    await i.update({components:[]});
                                }
                            });
        
                            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        
                          }else{
                            message.channel.send(`${message.author}, You don't own that item!`);
                          }
                        }else{
                          message.channel.send(`${message.author}, You don't own that item!`);
                        }
                      }
                  }
                  if(argsone_name === 'beer'){
                    if(userData.beer >= 1){
                        let d2 = new Date();
                        let n2 = d2.getTime();
                        const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                          lastuse:n2
                        });
                        const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                          {
                              $inc:{
                                  beer:-1,
          
                              } 
                            
                          }
                        );
                        let random = Math.floor(Math.random() * 5);
                        if(random === 2 || random=== 3 || random=== 4){
                          let randomcoin = Math.floor(Math.random()*1000);
                          if(userData.wallet >= randomcoin){
                          const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                            {
                                $inc:{
                                    wallet:-randomcoin,
                                    networth:-randomcoin
                                }
                              
                            }
                          );
                          message.channel.send(`${message.author} You drunk too much! and someone stole from you <:UC:878195863413981214> ${randomcoin}`);
                        }else if(userData.bank>= randomcoin){
                          const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                            {
                                $inc:{
                                    bank:-randomcoin,
                                    networth:-randomcoin
                                    
                                }
                              
                            }
                          );
                          message.channel.send(`${message.author} You drunk too much! and someone stole from you <:UC:878195863413981214> ${randomcoin}`);
                        }else{
                          message.channel.send(`${message.author} You drunk whole jug of beer! and now you are drunk`);
                        }
                      }else{
                        message.channel.send(`${message.author} You drunk whole jug of beer! and now you are drunk`);
                      }
                      
                    }else{
                      if(userData.partner !== 0){
                        let partnerid = userData.partner;
                        let partnerData = await userModel.findOne({userID:partnerid});
                        if(partnerData.beer >= 1){
                          const embed =new Discord.MessageEmbed();
                          embed.setAuthor(`${message.author.username}, You don't have beer so would you like to use your partner ${userData.partnername}'s beer. Use yes or no button to answer!`);
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
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastuse:n2
                                });
                                const partnerresponse = await userModel.findOneAndUpdate({userID:partnerid},
                                  {
                                      $inc:{
                                          beer:-1
                                      }
                                    
                                  }
                              );
                                    let random = Math.floor(Math.random() * 5);
                                    if(random === 2 || random=== 3 || random=== 4){
                                      let randomcoin = Math.floor(Math.random()*1000);
                                      if(userData.wallet >= randomcoin){
                                      const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                        {
                                            $inc:{
                                                wallet:-randomcoin,
                                                networth:-randomcoin
                                            }
                                          
                                        }
                                      );
                                      message.channel.send(`${message.author} You drunk too much! and someone stole from you <:UC:878195863413981214> ${randomcoin}`);
                                    }else if(userData.bank>= randomcoin){
                                      const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                        {
                                            $inc:{
                                                bank:-randomcoin,
                                                networth:-randomcoin
                                                
                                            }
                                          
                                        }
                                      );
                                      message.channel.send(`${message.author} You drunk too much! and someone stole from you <:UC:878195863413981214> ${randomcoin}`);
                                    }else{
                                      message.channel.send(`${message.author} You drunk whole jug of beer! and now you are drunk`);
                                    }
                                  }else{
                                    message.channel.send(`${message.author} You drunk whole jug of beer! and now you are drunk`);
                                  }
                                  await i.update({components:[]});
                              }else if(i.customId==='no'){
                                  await i.update({components:[]});
                              }
                          });
      
                          collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      
                        }else{
                          message.channel.send(`${message.author}, You don't own that item!`);
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't own that item!`);
                      }
                    }
                  }
                  if(argsone_name === 'coffee'){
                    if(userData.coffee>=1){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastuse:n2
                      });
                      const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                        {
                            $inc:{
                                coffee:-1,
                                xp:50
        
                            } 
                          
                        }
                      );
                      message.channel.send(`${message.author}, You drunk coffee and got 50 xp!`);
                    }else{
                      if(userData.partner !== 0){
                        let partnerid = userData.partner;
                        let partnerData = await userModel.findOne({userID:partnerid});
                        if(partnerData.coffee >= 1){
                          const embed =new Discord.MessageEmbed();
                          embed.setAuthor(`${message.author.username}, You don't have coffee so would you like to use your partner ${userData. partnername}'s coffee. Use yes or no button to answer!`);
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
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastuse:n2
                                });
                                const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                        {
                                            $inc:{
                                                xp:50
                                            }
                                          
                                        }
                                );
                                const partnerresponse = await userModel.findOneAndUpdate({userID:partnerid},
                                  {
                                      $inc:{
                                          coffee:-1
                                      }
                                    
                                  }
                              );
                              await i.update({components:[]});
                              message.channel.send(`${message.author}, You drunk coffee and got 50 xp!`);
                              }else if(i.customId==='no'){
                                  await i.update({components:[]});
                              }
                          });
      
                          collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      
                        }else{
                          message.channel.send(`${message.author}, You don't own that item!`);
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't own that item!`);
                      }

                    }
                  }
                  if(argsone_name === 'pizza' && argstwo_name === 'slice'){
                    if(userData.pizzaslice >= 1){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastuse:n2
                      });
                      const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                        {
                            $inc:{
                                pizzaslice:-1,
                                xp:4500
        
                            } 
                          
                        }
                      );
                      const embed = new Discord.MessageEmbed();
                      embed.setAuthor(`${message.author.username}, You ate whole pizza slice!`,message.author.displayAvatarURL());
                      embed.setDescription(`**You ate whole 🍕 pizza slice and got 4500 xp and increased your daily and monthly amount!**`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                    }else{
                      if(userData.partner !== 0){
                        let partnerid = userData.partner;
                        let partnerData = await userModel.findOne({userID:partnerid});
                        if(partnerData.pizzaslice >= 1){
                          const embed =new Discord.MessageEmbed();
                          embed.setAuthor(`${message.author.username}, You don't have pizza slice so would you like to use your partner ${userData. partnername}'s pizza slice. Use yes or no button to answer!`);
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
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastuse:n2
                                });
                                const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                        {
                                            $inc:{
                                                xp:50
                                            }
                                          
                                        }
                                );
                                const partnerresponse = await userModel.findOneAndUpdate({userID:partnerid},
                                  {
                                      $inc:{
                                          pizzaslice:-1
                                      }
                                    
                                  }
                              );
                              await i.update({components:[]});
                              const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`${message.author.username}, You ate whole pizza slice!`,message.author.displayAvatarURL());
                                embed.setDescription(`**You ate whole 🍕 pizza slice and got 4500 xp and increased your daily and monthly amount!**`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            
                              }else if(i.customId==='no'){
                                  await i.update({components:[]});
                              }
                          });
      
                          collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      
                        }else{
                          message.channel.send(`${message.author}, You don't own that item!`);
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't own that item!`);
                      }
      
                    }
                  }
                  if(argsone_name === 'green' && argstwo_name === 'apple'){
                    if(userData.greenapple >= 1){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastuse:n2
                      });
                      const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                        {
                            $inc:{
                                greenapple:-1,
                                xp:750
        
                            } 
                          
                        }
                      );
                      const embed = new Discord.MessageEmbed();
                      embed.setAuthor(`${message.author.username}, You ate green apple!`,message.author.displayAvatarURL());
                      embed.setDescription(`**You ate whole 🍏 green apple and got 750 xp**`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                    }else{
                      if(userData.partner !== 0){
                        let partnerid = userData.partner;
                        let partnerData = await userModel.findOne({userID:partnerid});
                        if(partnerData.greenapple >= 1){
                          const embed =new Discord.MessageEmbed();
                          embed.setAuthor(`${message.author.username}, You don't have green apple so would you like to use your partner ${userData. partnername}'s green apple. Use yes or no button to answer!`);
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
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastuse:n2
                                });
                                const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                        {
                                            $inc:{
                                              
                                                xp:1500
                                            }
                                          
                                        }
                                );
                                const partnerresponse = await userModel.findOneAndUpdate({userID:partnerid},
                                  {
                                      $inc:{
                                        greenapple:-1
                                      }
                                    
                                  }
                              );
                              await i.update({components:[]});
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`${message.author.username}, You ate green apple!`,message.author.displayAvatarURL());
                              embed.setDescription(`**You ate whole 🍏 green apple and got 1500 xp**`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            
                              }else if(i.customId==='no'){
                                  await i.update({components:[]});
                              }
                          });
      
                          collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      
                        }else{
                          message.channel.send(`${message.author}, You don't own that item!`);
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't own that item!`);
                      }
      
                    }
                  }
                  if(argsone_name === 'bubble' && argstwo_name === 'tea'){
                    if(userData.bubbletea >= 1){
                      let d2 = new Date();
                      let n2 = d2.getTime();
                      const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                        lastuse:n2
                      });
                      const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                        {
                            $inc:{
                                bubbletea:-1,
                                xp:50
        
                            } 
                          
                        }
                      );
                      const embed = new Discord.MessageEmbed();
                      embed.setAuthor(`${message.author.username}, You drunk 🧋 bubble tea!`,message.author.displayAvatarURL());
                      embed.setDescription(`**You drunk whole 🧋 bubble tea and got 50 xp**`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                    }else{
                      if(userData.partner !== 0){
                        let partnerid = userData.partner;
                        let partnerData = await userModel.findOne({userID:partnerid});
                        if(partnerData.bubbletea >= 1){
                          const embed =new Discord.MessageEmbed();
                          embed.setAuthor(`${message.author.username}, You don't have bubble tea so would you like to use your partner ${userData. partnername}'s bubble tea. Use yes or no button to answer!`);
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
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const newuse = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  lastuse:n2
                                });
                                const response2 = await userModel.findOneAndUpdate({userID:message.author.id},
                                        {
                                            $inc:{
                                              
                                                xp:50
                                            }
                                          
                                        }
                                );
                                const partnerresponse = await userModel.findOneAndUpdate({userID:partnerid},
                                  {
                                      $inc:{
                                        bubbletea:-1
                                      }
                                    
                                  }
                              );
                              await i.update({components:[]});
                              const embed = new Discord.MessageEmbed();
                              embed.setAuthor(`${message.author.username}, You drunk 🧋 bubble tea!`,message.author.displayAvatarURL());
                              embed.setDescription(`**You ate whole 🧋 bubble tea and got 50 xp**`);
                              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            
                              }else if(i.customId==='no'){
                                  await i.update({components:[]});
                              }
                          });
      
                          collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      
                        }else{
                          message.channel.send(`${message.author}, You don't own that item!`);
                        }
                      }else{
                        message.channel.send(`${message.author}, You don't own that item!`);
                      }
      
                    }
                  }
              }else{
                var msec = n - lastuse;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = 5 - ss;
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Wait bro!`);
                embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use that item again!. The default cooldown is of **5** seconds but for premium users it is of **3** seconds to become a premium user use premium command.`);
                message.channel.send({embeds:[embed]});
              }
      
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, Please mention what you want to use!`);
                message.channel.send({embeds:[embed]});
            }
        }else{
           message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
        }
    }
}