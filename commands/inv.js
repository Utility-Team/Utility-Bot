const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const profileModel = require('../models/profileSchema');
module.exports={
  name:'inv',
  aliases:['inv','inventory'],
  async execute(message,args){
    let userData = await userModel.findOne({userID:message.author.id});
    let serverData = await profileModel.findOne({guildID:message.guild.id});
    const target = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
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
          let lastinv;
          if(userData.lastinv){
            lastinv= userData.lastinv;
          }else{
            lastinv=0
          }
          var d = new Date();
          var n = d.getTime();
          let timeup;
          let timeup2;
          if(userData.premium === 'enable'){
            timeup = 20000;
            timeup2 = 20;
          }else{
            timeup = 35000;
            timeup2 =35;
          }
          if(userData && n - lastinv >= timeup){
              var d2 = new Date();
              var n2 = d2.getTime();
              const response  = await userModel.findOneAndUpdate({userID:message.author.id},
              {
                  lastinv:n2
              });
              if(!target){ 
                  let mainembed = new Discord.MessageEmbed();
                  mainembed.setTitle(`${message.author.username}'s inventory`);
                  mainembed.setThumbnail(`${avatar}`);
                  mainembed.setFooter(`Requested by ${message.author.username}`,avatar);
                  mainembed.setTimestamp();
                  let jewelleryembed = new Discord.MessageEmbed();
                  let toolsembed = new Discord.MessageEmbed();
                  let gadgetsembed = new Discord.MessageEmbed();
                  let foodembed = new Discord.MessageEmbed();
                  let collectableembed = new Discord.MessageEmbed();
                  let huntfishembed = new Discord.MessageEmbed();

                  let toolsembed2 = new Discord.MessageEmbed();
                  toolsembed2.setAuthor(`${message.author.username}'s inventory`,avatar);
                  toolsembed2.setDescription(`You don't own any tools.`);
                  toolsembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                  let gadgetsembed2 = new Discord.MessageEmbed();
                  gadgetsembed2.setAuthor(`${message.author.username}'s inventory`,avatar);
                  gadgetsembed2.setDescription(`You don't own any gadgets.`);
                  gadgetsembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                  let foodembed2 = new Discord.MessageEmbed();
                  foodembed2.setAuthor(`${message.author.username}'s inventory`,avatar);
                  foodembed2.setDescription(`You don't own any food items.`);
                  foodembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                  let jewelleryembed2 = new Discord.MessageEmbed();
                  jewelleryembed2.setAuthor(`${message.author.username}'s inventory`,avatar);
                  jewelleryembed2.setDescription(`You don't own any jewellery items`);
                  jewelleryembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                  let collectableembed2 = new Discord.MessageEmbed();
                  collectableembed2.setAuthor(`${message.author.username}'s inventory`,avatar);
                  collectableembed2.setDescription(`You don't own any collectable items`);
                  collectableembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                  let huntfishembed2 = new Discord.MessageEmbed();
                  huntfishembed2.setAuthor(`${message.author.username}'s inventory`,avatar);
                  huntfishembed2.setDescription(`You don't have any item`);
                  huntfishembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                  if(userData.inventory && userData.inventory.length>0){
                      for(var x = 0;x<=userData.inventory.length;x++){
                          if(userData.inventory[x]){
                              if(x<5){
                                  if(userData.inventory[x].category === 'hunt'){
                                      mainembed.addFields({name:`${userData.inventory[x].name}`,value:`${userData.inventory[x].quantity}`});
                                  }else{
                                      mainembed.addFields({name:`${userData.inventory[x].emoji} ${userData.inventory[x].name}`,value:`${userData.inventory[x].quantity}`});

                                  }
                              }
                              if(userData.inventory[x].category === 'jewellery'){
                                  jewelleryembed.addFields({name:`${userData.inventory[x].emoji} ${userData.inventory[x].name}`,value:`${userData.inventory[x].quantity}`});
                              }
                              if(userData.inventory[x].category=== 'food'){
                                  foodembed.addFields({name:`${userData.inventory[x].emoji} ${userData.inventory[x].name}`,value:`${userData.inventory[x].quantity}`});  
                              }
                              if(userData.inventory[x].category=== 'gadgets'){
                                      gadgetsembed.addFields({name:`${userData.inventory[x].emoji} ${userData.inventory[x].name}`,value:`${userData.inventory[x].quantity}`});  
                              }
                              if(userData.inventory[x].category === 'collectables'){
                                  collectableembed.addFields({name:`${userData.inventory[x].emoji} ${userData.inventory[x].name}`,value:`${userData.inventory[x].quantity}`});
                              }
                              if(userData.inventory[x].category === 'fish'){
                                  huntfishembed.addFields({name:`${userData.inventory[x].emoji} ${userData.inventory[x].name}`,value:`${userData.inventory[x].quantity}`});
                              }
                              if(userData.inventory[x].category === 'hunt'){
                                  huntfishembed.addFields({name:`${userData.inventory[x].name}`,value:`${userData.inventory[x].quantity}`});

                              }
                              if(userData.inventory[x].category === 'dig'){
                                  huntfishembed.addFields({name:`${userData.inventory[x].emoji} ${userData.inventory[x].name}`,value:`${userData.inventory[x].quantity}`});

                              }
                              if(x === userData.inventory.length - 1){
                                toolsembed.addFields({name:`🎣 Fishing Rod`,value:`${userData.fishingrod}`},
                                 {name:`<:rifle:883578413888184350> Hunting Rifle`,value:`${userData.huntingrifle}`},
                                 {name:`🔒 Lock`,value:`${userData.lock}`},
                                );
                                if(userData.creditpoints){
                                    if(userData.creditpoints>0){
                                         toolsembed.addFields({name:`Credit Points`,value:`${userData.creditpoints}`});
                                    }
                                }
                                  jewelleryembed.setTitle(`${message.author.username}'s inventory`);
                                  jewelleryembed.setThumbnail(`${avatar}`);
                                  jewelleryembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                  gadgetsembed.setAuthor(`${message.author.username}'s inventory`,avatar);
                                  gadgetsembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                  toolsembed.setAuthor(`${message.author.username}'s inventory`,avatar);
                                  toolsembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                  foodembed.setAuthor(`${message.author.username}'s inventory`,avatar);
                                  foodembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                  collectableembed.setAuthor(`${message.author.username}'s inventory`,avatar);
                                  collectableembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                  huntfishembed.setAuthor(`${message.author.username}'s inventory`,avatar);
                                  huntfishembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                  console.log(jewelleryembed);
                                  const row = new Discord.MessageActionRow().addComponents(
                                      new Discord.MessageSelectMenu()
                                      .setCustomId('option')
                                      .setPlaceholder('Other Stats...')
                                      .addOptions([
                                      {
                                      label:'Food',
                                      value:'food2',
                                      description:'shows food items owned by you'
                                      },
                                      {
                                      label:'Tools',
                                      value:'tools2',
                                      description:'shows tools owned by you'
                                      },
                                      {
                                      label:'Hunt , Fish & Dig',
                                      value:'hunt',
                                      description:'shows items related to hunting & fishing'
                                      },
                                      {
                                      label:'Collectables',
                                      value:'collectables2',
                                      description:'shows collectables items owned by you'
                                  },
                                  {
                                      label:'Gadgets',
                                      value:'gadgets2'
                                  },
                                  {
                                      label:'Jewellery',
                                      value:'jewellery2'
                                  }
                                      
                                      ])
                                  );
                                  const m = await message.channel.send({embeds:[mainembed],components:[row]});
                                  const filter = (interaction)=> interaction.user.id === message.author.id || target.id ;
                                  let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
                                  collector.on("collect",async (interaction)=>{
                                  
                                  if(interaction.values[0]=='food2'){
                                      if(foodembed.fields.length>0){
                                          await  interaction.reply({embeds:[foodembed]});
                                      }else{
                                          await interaction.reply({embeds:[foodembed2]});
                                      }
                                  }
                                  if(interaction.values[0]=='tools2'){
                                          if(toolsembed.fields.length>0){
                                              await interaction.reply({embeds:[toolsembed]});
                                          }else{
                                              await interaction.reply({embeds:[toolsembed2]});
                                          }
                                  }
                                  if(interaction.values[0]=='collectables2'){
                                      if(collectableembed.fields.length>0){
                                          await interaction.reply({embeds:[collectableembed]});
                                      }else{
                                          await interaction.reply({embeds:[collectableembed2]});
                                      }
                                  }
                                  if(interaction.values[0]== 'hunt'){
                                      if(huntfishembed.fields.length>0){
                                          await interaction.reply({embeds:[huntfishembed]});
                                      }else{
                                          await interaction.reply({embeds:[huntfishembed2]});
                                      }
                                  }
                                  
                                  if(interaction.values[0] == 'gadgets2'){
                                      if(gadgetsembed.fields.length>0){
                                      await interaction.reply({embeds:[gadgetsembed]});
                                      }else{
                                          await interaction.reply({embeds:[gadgetsembed2]});
                                      }
                                  }

                                  if(interaction.values[0] == 'jewellery2'){
                                      if(jewelleryembed.fields.length>0){
                                          await interaction.reply({embeds:[jewelleryembed]});
                                      }else{
                                          await interaction.reply({embeds:[jewelleryembed2]});
                                      }
                                  }
                              
                                  
                                  });   
                                  collector.on('end', collected =>{ 
                                    console.log(`Collected ${collected.size} items`);
                                  });
                              }
                              
                          }
                      }
                  }else{
                        let creditpoints;
                        if(userData.creditpoints){
                            creditpoints = userData.creditpoints
                        }else{
                            creditpoints = 0;
                        }
                        if(userData.fishingrod === 0 && userData.huntingrifle === 0 && userData.lock === 0 && creditpoints === 0){
                            let embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}'s inventory`);
                            embed.setThumbnail(`${avatar}`);
                            embed.setDescription(`You don't have any items in the inventory`);
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                            let embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}'s inventory`);
                            embed.setThumbnail(`${avatar}`);
                            embed.addFields({name:`🎣 Fishing Rod`,value:`${userData.fishingrod}`},
                             {name:`<:rifle:883578413888184350> Hunting Rifle`,value:`${userData.huntingrifle}`},
                             {name:`🔒 Lock`,value:`${userData.lock}`},
                             {name:`Credit Points:`,value:`${creditpoints}`}
                            );
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }
                  }
              }else{
                  const memberTarget = message.guild.members.cache.get(target.id);
                  let targetData = await userModel.findOne({userID:target.id});
                      if(targetData){
                          let targetavatar;
                          if(targetData.avatar){
                            if(targetData.avatar !== '' && targetData.premium === 'enable'){
                                targetavatar = targetData.avatar;
                            }else{
                                targetavatar = memberTarget.user.displayAvatarURL();
                            }
                          }else{
                              targetavatar = memberTarget.user.displayAvatarURL();
                          }
                          let mainembed = new Discord.MessageEmbed();
                          mainembed.setTitle(`${memberTarget.user.username}'s inventory`);
                          mainembed.setThumbnail(`${targetavatar}`);
                          mainembed.setFooter(`Requested by ${message.author.username}`,avatar);
                          mainembed.setTimestamp();
                          let jewelleryembed = new Discord.MessageEmbed();
                          let toolsembed = new Discord.MessageEmbed();
                          let gadgetsembed = new Discord.MessageEmbed();
                          let foodembed = new Discord.MessageEmbed();
                          let collectableembed = new Discord.MessageEmbed();
                          let huntfishembed = new Discord.MessageEmbed();

                          let toolsembed2 = new Discord.MessageEmbed();
                          toolsembed2.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                          toolsembed2.setDescription(`You don't own any tools.`);
                          toolsembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                          let gadgetsembed2 = new Discord.MessageEmbed();
                          gadgetsembed2.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                          gadgetsembed2.setDescription(`You don't own any gadgets.`);
                          gadgetsembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                          let foodembed2 = new Discord.MessageEmbed();
                          foodembed2.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                          foodembed2.setDescription(`You don't own any food items.`);
                          foodembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                          let jewelleryembed2 = new Discord.MessageEmbed();
                          jewelleryembed2.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                          jewelleryembed2.setDescription(`You don't own any jewellery items`);
                          jewelleryembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                          let collectableembed2 = new Discord.MessageEmbed();
                          collectableembed2.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                          collectableembed2.setDescription(`You don't own any collectable items`);
                          collectableembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                          let huntfishembed2 = new Discord.MessageEmbed();
                          huntfishembed2.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                          huntfishembed2.setDescription(`You don't have any item`);
                          huntfishembed2.setFooter(`use ${serverData.prefix}buy item (to buy an item)`);

                          if(targetData.inventory && targetData.inventory.length >0){
                              console.log('it exists');
                              for(var x = 0;x<=targetData.inventory.length;x++){
                                  if(targetData.inventory[x]){
                                      if(x<5){
                                          if(targetData.inventory[x].category === 'hunt'){
                                              mainembed.addFields({name:`${targetData.inventory[x].name}`,value:`${targetData.inventory[x].quantity}`});
                                          }else{
                                              mainembed.addFields({name:`${targetData.inventory[x].emoji} ${targetData.inventory[x].name}`,value:`${targetData.inventory[x].quantity}`});
                                          }
                                      }
                                      if(targetData.inventory[x].category === 'jewellery'){
                                          jewelleryembed.addFields({name:`${targetData.inventory[x].emoji} ${targetData.inventory[x].name}`,value:`${targetData.inventory[x].quantity}`});
                                      }
                                    
                                      if(targetData.inventory[x].category=== 'food'){
                                          foodembed.addFields({name:`${targetData.inventory[x].emoji} ${targetData.inventory[x].name}`,value:`${targetData.inventory[x].quantity}`});  
                                      }
                                      if(targetData.inventory[x].category=== 'gadgets'){
                                              gadgetsembed.addFields({name:`${targetData.inventory[x].emoji} ${targetData.inventory[x].name}`,value:`${targetData.inventory[x].quantity}`});  
                                      }
                                      if(targetData.inventory[x].category === 'collectables'){
                                          collectableembed.addFields({name:`${targetData.inventory[x].emoji} ${targetData.inventory[x].name}`,value:`${targetData.inventory[x].quantity}`});
                                      }
                                      if(targetData.inventory[x].category === 'fish'){
                                          huntfishembed.addFields({name:`${targetData.inventory[x].emoji} ${targetData.inventory[x].name}`,value:`${targetData.inventory[x].quantity}`});
                                      }
                                      if(targetData.inventory[x].category === 'hunt'){
                                          huntfishembed.addFields({name:`${targetData.inventory[x].name}`,value:`${targetData.inventory[x].quantity}`});
                                      }
                                      if(targetData.inventory[x].category === 'dig'){
                                          huntfishembed.addFields({name:`${targetData.inventory[x].emoji} ${targetData.inventory[x].name}`,value:`${targetData.inventory[x].quantity}`});
                                      }
                                      if(x === targetData.inventory.length - 1){
                                                toolsembed.addFields({name:`🎣 Fishing Rod`,value:`${targetData.fishingrod}`},
                                                {name:`<:rifle:883578413888184350> Hunting Rifle`,value:`${targetData.huntingrifle}`},
                                                {name:`🔒 Lock`,value:`${targetData.lock}`},
                                            );
                                            if(targetData.creditpoints){
                                                if(targetData.creditpoints>0){
                                                     toolsembed.addFields({name:`Credit Points`,value:`${targetData.creditpoints}`});
                                                }
                                            }
                                          jewelleryembed.setTitle(`${memberTarget.user.username}'s inventory`);
                                          jewelleryembed.setThumbnail(`${targetavatar}`);
                                          jewelleryembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                          gadgetsembed.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                                          gadgetsembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                          toolsembed.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                                          toolsembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                          foodembed.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                                          foodembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                          collectableembed.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                                          collectableembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                          huntfishembed.setAuthor(`${memberTarget.user.username}'s inventory`,targetavatar);
                                          huntfishembed.setFooter(`type ${serverData.prefix}use item (to use an item)`);
                                          console.log(jewelleryembed);
                                          const row = new Discord.MessageActionRow().addComponents(
                                              new Discord.MessageSelectMenu()
                                              .setCustomId('option')
                                              .setPlaceholder('Other Stats...')
                                              .addOptions([
                                              {
                                              label:'Food',
                                              value:'fooditems',
                                              description:'shows food items owned by you'
                                              },
                                              {
                                              label:'Tools',
                                              value:'toolitems',
                                              description:'shows tools owned by you'
                                              },
                                              {
                                              label:'Hunt , Fish & Dig',
                                              value:'hunt',
                                              description:'shows items related to hunting & fishing'
                                              },
                                              {
                                              label:'Collectables',
                                              value:'collectableitems',
                                              description:'shows collectables items owned by you'
                                              },
                                              {
                                                  label:'Gadgets',
                                                  value:'gadgetitems'
                                              },
                                              {
                                                  label:'Jewellery',
                                                  value:'jewelleryitems'
                                              }
                                                  
                                                  ])
                                              );
                                          const m = await message.channel.send({embeds:[mainembed],components:[row]});
                                          const filter = (interaction)=> interaction.user.id === message.author.id || target.id ;
                                          let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
                                          collector.on("collect",async (interaction)=>{
                                          
                                          if(interaction.values[0]=='fooditems'){
                                              if(foodembed.fields.length>0){
                                                  await  interaction.reply({embeds:[foodembed]});
                                              }else{
                                                  await interaction.reply({embeds:[foodembed2]});
                                              }
                                          }
                                          if(interaction.values[0]=='toolitems'){
                                                  if(toolsembed.fields.length>0){
                                                      await interaction.reply({embeds:[toolsembed]});
                                                  }else{
                                                      await interaction.reply({embeds:[toolsembed2]});
                                                  }
                                          }
                                          if(interaction.values[0]=='collectableitems'){
                                              if(collectableembed.fields.length>0){
                                                  await interaction.reply({embeds:[collectableembed]});
                                              }else{
                                                  await interaction.reply({embeds:[collectableembed2]});
                                              }
                                          }
                                          if(interaction.values[0]== 'hunt'){
                                              if(huntfishembed.fields.length>0){
                                                  await interaction.reply({embeds:[huntfishembed]});
                                              }else{
                                                  await interaction.reply({embeds:[huntfishembed2]});
                                              }
                                          }
                                          
                                          if(interaction.values[0] == 'gadgetitems'){
                                              if(gadgetsembed.fields.length>0){
                                              await interaction.reply({embeds:[gadgetsembed]});
                                              }else{
                                                  await interaction.reply({embeds:[gadgetsembed2]});
                                              }
                                          }

                                          if(interaction.values[0] == 'jewelleryitems'){
                                              if(jewelleryembed.fields.length>0){
                                                  await interaction.reply({embeds:[jewelleryembed]});
                                              }else{
                                                  await interaction.reply({embeds:[jewelleryembed2]});
                                              }
                                          }
                                      
                                          
                                          });   
                                          collector.on('end', collected =>{ 
                                             console.log(`Collected ${collected.size} items`);
                                          });
                                      }
                                      
                                  }
                              }
                          }else{
                            let creditpoints;
                            if(targetData.creditpoints){
                                creditpoints = targetData.creditpoints
                            }else{
                                creditpoints = 0;
                            }
                            if(targetData.fishingrod === 0 && targetData.huntingrifle === 0 && targetData.lock === 0 && creditpoints === 0){
                              let embed = new Discord.MessageEmbed();
                              embed.setTitle(`${memberTarget.user.username}'s inventory`);
                              embed.setThumbnail(`${targetavatar}`);
                              embed.setDescription(`You don't have any items in the inventory`);
                              embed.setFooter(`Requested by ${message.author.username}`,avatar);
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                            }else{
                                let embed = new Discord.MessageEmbed();
                                embed.setTitle(`${memberTarget.user.username}'s inventory`);
                                embed.setThumbnail(`${targetavatar}`);
                                embed.addFields({name:`🎣 Fishing Rod`,value:`${targetData.fishingrod}`},
                                {name:`<:rifle:883578413888184350> Hunting Rifle`,value:`${targetData.huntingrifle}`},
                                {name:`🔒 Lock`,value:`${targetData.lock}`},
                                {name:`Credit Points:`,value:`${creditpoints}`}
                                );
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                            }
                          }
                      }else{
                          message.channel.send(`${target}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

                      }
              }
      }else{
          var msec = n - lastinv;
          console.log(msec);
          var ss = Math.floor(msec / 1000);
          var second = timeup2 - ss;
          if(userData.premium !== 'enable'){
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Wait bro!`);
            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check inventory again!. The default cooldown is of **35** seconds but for premium users it is of **25** seconds to become a premium user type ;premium.`);
            message.channel.send({embeds:[embed]});
          }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Chill bro!`);
            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use inventory again!.`);
            embed.setColor('#025CFF');
            message.channel.send({embeds:[embed]});
          }
      }

    }else{
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

    }

  }
}