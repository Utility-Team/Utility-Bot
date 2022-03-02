const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'profile',
    async execute(message,args,client){
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const serverData = await serverModel.findOne({guildID:message.guild.id});
        let userData = await userModel.findOne({userID:message.author.id});
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
        if(userData){ 
              async function check_Rewards(achievement,reward1,badge,power){
                      if(userData.rewards && userData.badges){
                          if(userData.rewards.length>0){
                              let check = 0;
                              for(var x = 0;x<=userData.rewards.length;x++){
                                  if(userData.rewards[x]){
                                      if(userData.rewards[x].name === achievement){
                                          check = 5;
                                          console.log('it already exists');
                                          return;
                                      }
                                      if(x === userData.rewards.length && check <5){
                                          const embed = new Discord.MessageEmbed();
                                          embed.setTitle(`🎉 Unlocked New Achievement!`);
                                          embed.setDescription(`You have unlocked **${achievement} achievement** and your rewards are **${reward1} & ${badge}**`);
                                          embed.setTimestamp();
                                          message.channel.send({embeds:[embed]});
                                          let rewardsbadge = userData.rewards;
                                          let badgeData = userData.badges;
                                          let newrewardsData = {
                                              name:achievement,
                                              reward:reward1,
                                              badge:badge,
                                              category:'Donation'
                                          }
                                          let newbadgeData = {
                                              name:achievement,
                                              badge:badge,
                                              power:power,
                                              category:'Donation'
                                          }
                                          rewardsbadge.push(newrewardsData);
                                          badgeData.push(newbadgeData);
                                          const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                              $inc:{
                                                networth:reward1,
                                                wallet:reward1
                                              },
                                              rewards:rewardsbadge,
                                              badges:badgeData
                                          });
                                      }
                                  }else{
                                      const embed = new Discord.MessageEmbed();
                                      embed.setTitle(`🎉 Unlocked New Achievement!`);
                                      embed.setDescription(`You have unlocked **${achievement} achievement** and your rewards are **${reward1} & ${badge}**`);
                                      embed.setTimestamp();
                                      message.channel.send({embeds:[embed]});
                                      let rewardsbadge = userData.rewards;
                                      let badgeData = userData.badges;
                                      let newrewardsData = {
                                          name:achievement,
                                          reward:reward1,
                                          badge:badge,
                                          category:'Donation'
                                      }
                                      let newbadgeData = {
                                          name:achievement,
                                          badge:badge,
                                          power:power,
                                          category:'Donation'
                                      }
                                      rewardsbadge.push(newrewardsData);
                                      badgeData.push(newbadgeData);
                                      const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                          $inc:{
                                            networth:reward1,
                                            wallet:reward1
                                          },
                                          rewards:rewardsbadge,
                                          badges:badgeData
                                      });
                                      return;
                                  }
                                  
                              }
                          }else{
                              const embed = new Discord.MessageEmbed();
                              embed.setTitle(`🎉 Unlocked New Achievement!`);
                              embed.setDescription(`You have unlocked **${achievement} achievement** and your rewards are **${reward1} & ${badge}**`);
                              embed.setTimestamp();
                              message.channel.send({embeds:[embed]});
                              let rewardsbadge = [];
                              let badgeData = []
                              let newrewardsData = {
                                  name:achievement,
                                  reward:reward1,
                                  badge:badge,
                                  category:'Donation'
                              }
                              let newbadgeData = {
                                  name:achievement,
                                  badge:badge,
                                  power:power,
                                  category:'Donation'
                              }
                              rewardsbadge.push(newrewardsData);
                              badgeData.push(newbadgeData);
                              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                  $inc:{
                                    networth:reward1,
                                    wallet:reward1
                                  },
                                  rewards:rewardsbadge,
                                  badges:badgeData
                              });
                          }
                      }
              }
              if(userData.commands>= 1000){
                check_Rewards('Execution of 1000 commands',25000,'<:1000commandsbadge:925729580680097833>',3);
              }
              if(userData.commands>= 5000){
                check_Rewards('Execution of 5000 commands',45000,'<:5000commandsbadge:938431994625392670>',4);
              }
              if(userData.commands>= 10000){
                check_Rewards('Execution of 10000 commands',100000,'<:10000commandsbadge:938432131108077628>',5);
              }
              var d = new Date();
              var n = d.getTime();
              let lastprofile = userData.lastprofile;
              let timeup;
              let timeup2;
              if(userData.premium === 'enable'){
                timeup = 15000;
                timeup2 = 15;
              }else{
                timeup = 30000;
                timeup2 =30;
              }
              if(n - lastprofile>= timeup){
                var d2 = new Date();
                var n2 = d2.getTime();  
                const response  = await userModel.findOneAndUpdate({userID:message.author.id},
                  {
                    lastprofile:n2
                });
                if(target){
                    const memberTarget = message.guild.members.cache.get(target.id);
                    let targetData = await userModel.findOne({userID:target.id});
                     if(targetData){
                         let jobname = targetData.job;
                         let targetavatar;
                         let avatar;
                         if(targetData.job === ''){
                           jobname = 'none';
                         }
                         if(targetData.avatar){
                           if(targetData.premium === 'enable' && targetData.avatar !== ''){
                             targetavatar = targetData.avatar;
                           }else{
                             targetavatar = memberTarget.user.displayAvatarURL();
                           }
                         }else{
                             targetavatar = memberTarget.user.displayAvatarURL();
                         }

                         if(userData.avatar){
                          if(userData.premium === 'enable' && userData.avatar !== ''){
                            avatar = userData.avatar;
                          }else{
                             avatar = message.author.displayAvatarURL();
                          }
                         }else{
                            avatar = message.author.displayAvatarURL();
                         }
                         let banklimit;
                         if(targetData.banklimit){
                           banklimit = targetData.banklimit;
                         }else{
                           banklimit = 0;
                         }
                         let bank_limit = targetData.level * 10000 + banklimit;
                         if(targetData.level === 0){
                         bank_limit = 5000 + userData.banklimit;
                        }
                        
                        const embed = new Discord.MessageEmbed();
                        if(targetData.badges){
                          if(targetData.badges.length >0){
                            let badges = targetData.badges;
                            let arr = [];
                            badges.sort((a,b)=>b.power - a.power);
                            let val = 0;
                            badges.forEach((e)=>{
                              val = val + 1;
                              if(val <= 3){
                              arr.push(e.badge);
                              }
                            });       
                            embed.setDescription(`**Badges: ${arr.join(' ' + ' ')}** `);
                          }
                        }
                         embed.setTitle(`${memberTarget.user.username}'s profile`);
                         embed.setThumbnail(targetavatar);
                         embed.addFields(
                         {name:`Xp:`,value:`${targetData.xp}`,inline:true},
                         {name:'Level:',value:`${targetData.level}`,inline:true},
                         {name:`Net Worth:`,value:`<:uc:922720730272137256> ${targetData.networth}`},
                         {name:'Wallet:',value:`<:uc:922720730272137256> ${targetData.wallet}`},
                         {name:`CryptoCoins:`,value:`${targetData.cryptocoin}`},
                         {name:`Bank:`,value:`<:uc:922720730272137256> ${targetData.bank}/${bank_limit}`},
                         {name:`Job:`,value:`${jobname}`,inline:true},
                         {name:`Salary:`,value:`<:uc:922720730272137256> ${targetData.salary}`,inline:true},
                         {name:`Commands Runned:`,value:`${targetData.commands}`},
                         {name:'Total Work Hours:',value:`${targetData.totalwork}`}
                         );
                         embed.setFooter(`Requested by ${message.author.username}`,avatar);
                         embed.setColor('#FFFFFF');
                         embed.setTimestamp();
                      
                         let totalmatches = targetData.totalrps;
                         let totalwon = targetData.wonrps;
                         let winpercent = totalwon * 100 / totalmatches;
                         const rpsembed = new Discord.MessageEmbed();
                         rpsembed.setTitle(`${memberTarget.user.username}'s Rps Stats`);
                         rpsembed.setThumbnail(targetavatar);
                         rpsembed.addFields({name:`Total Rps Matches Played:`,value:`${targetData.totalrps}`},
                         {name:`Matches Won:`,value:`${targetData.wonrps}`},
                         {name:`Matches Lost:`,value:`${targetData.lostrps}`},
                         {name:`Matches Tie:`,value:`${targetData.tierps}`},
                         {name:`Win %:`,value:`${winpercent}`}
                         );
                         rpsembed.setFooter(`Requested by ${message.author.username}`,avatar);
                         rpsembed.setColor('#8CD96B');
                         rpsembed.setTimestamp();

                         let totalmoneydonated;
                         if(targetData.totalmoneydonated){
                           totalmoneydonated = targetData.totalmoneydonated;
                         }else{
                           totalmoneydonated = 0;
                         }
                         let totalmoneyreceived;
                         if(targetData.totalmoneyreceived){
                           totalmoneyreceived = targetData.totalmoneyreceived;
                         }else{
                           totalmoneyreceived = 0;
                         }
                         let totalitemsdonated;
                         if(targetData.totalitemsdonated){
                           totalitemsdonated = targetData.totalitemsdonated;
                         }else{
                           totalitemsdonated = 0;
                         }
                         let totalitemsreceived;
                         if(targetData.totalitemsreceived){
                           totalitemsreceived = targetData.totalitemsreceived;
                         }else{
                           totalitemsreceived = 0;
                         }
                          const sharingembed = new Discord.MessageEmbed();
                          sharingembed.setTitle(`${memberTarget.user.username}'s Sharing Stats`);
                          sharingembed.setThumbnail(`${targetavatar}`);
                          sharingembed.addFields({name:`Total Money Donated:`,value:`<:uc:922720730272137256> ${totalmoneydonated}`},
                          {name:`Total Money Received:`,value:`<:uc:922720730272137256> ${totalmoneyreceived}`},
                          {name:`Total Items Donated:`,value:`${totalitemsdonated}`},
                          {name:`Total Items Received:`,value:`${totalitemsreceived}`}
                          );
                          sharingembed.setFooter(`Requested by ${message.author.username}`,avatar);
                          sharingembed.setColor('#02D9FF');
                          sharingembed.setTimestamp();

                          const row = new Discord.MessageActionRow().addComponents(
                             new Discord.MessageSelectMenu()
                             .setCustomId('option')
                             .setPlaceholder('Other Stats...')
                             .addOptions([
                              {
                                label:'Overall Stats',
                                value:'overall',
                                description:'shows your overall stats',
                                emoji:'<:profile:945317106809974784>'
                              },   
                              {
                                label:'Gamble Stats',
                                value:'gamble',
                                description:'shows your gamble stats',
                                emoji:'<:lottery:938436846403346492>'
                              },
                              {
                                label:'Rps Stats',
                                value:'rps',
                                description:'shows your rps stats',
                                emoji:'<:rockpaperscissors:945317106071769159>'
                              },
                              {
                                label:'Sharing Stats',
                                value:'sharingstats',
                                description:'shows your sharing stats',
                                emoji:'<:sharingstats:945317106570907729>'
                              },
                             ])
                           );
                           message.channel.send({embeds:[embed],components:[row]});
                           const filter = (interaction)=> interaction.user.id === message.author.id;
                           let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
                           collector.on("collect",async(interaction)=>{
                              if(interaction.values[0]=='gamble'){
                                let targetnew = await userModel.findOne({userID:target.id});
                                const gambleembed2 = new Discord.MessageEmbed();
                                gambleembed2.setTitle(`${memberTarget.user.username}'s Gamble Stats`);
                                gambleembed2.setThumbnail(targetavatar);
                                gambleembed2.addFields({name:`Total Gambles Played`,value:`${targetnew.totalgamble}`},
                                {name:`Gambles Won`,value:`${targetnew.wongamble}`},
                                {name:`Gambles Lost`,value:`${targetnew.lostgamble}`},
                                {name:`Gambles Tie`,value:`${targetnew.tiegamble}`}
                                );
                                gambleembed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                gambleembed2.setColor('#FF0000');
                                gambleembed2.setTimestamp();
                                interaction.update({embeds:[gambleembed2]});
                              }
                            if(interaction.values[0]=='overall'){
                                interaction.update({embeds:[embed]});
                            }
                            if(interaction.values[0]=='rps'){
                                interaction.update({embeds:[rpsembed]});
                            }
                            if(interaction.values[0] == 'sharingstats'){
                              interaction.update({embeds:[sharingembed]});
                            }
                          });   
                          collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                    }else{
                      message.channel.send(`${target}, You haven't joined currency game yet. Type ${serverData.prefix}join to join the game`);
                    }         
                }else{    
                  let jobname = userData.job;
                  let avatar;
                  if(userData.job === ''){
                    jobname = 'none';
                  }
                  if(userData.avatar){
                    if(userData.premium === 'enable' && userData.avatar !== ''){
                      avatar = userData.avatar;
                    }else{
                      avatar = message.author.displayAvatarURL();
                    }
                  }else{
                    avatar = message.author.displayAvatarURL();
                  }                
                  let banklimit;
                  if(userData.banklimit){
                    banklimit = userData.banklimit;
                  }else{
                    banklimit = 0;
                  }
                  let bank_limit = userData.level * 10000 + banklimit;
                  if(userData.level === 0){
                   bank_limit = 5000 + userData.banklimit;
                  }
                  const embed = new Discord.MessageEmbed();
                  if(userData.badges){
                    if(userData.badges.length>0){
                      let badges = userData.badges;
                      let arr = [];
                      badges.sort((a,b)=>b.power - a.power);
                      let val = 0;
                      badges.forEach((e)=>{
                        val = val + 1;
                        if(val <= 3){
                        arr.push(e.badge);
                        }
                      });       
                      arr.join(' ');
                      embed.setDescription(`**Badges: ${arr.join('  ' + ' ')}** `);
                    }
                  }
                  embed.setTitle(`${message.author.username}'s profile`);
                  embed.setThumbnail(avatar);
                  embed.addFields(
                  {name:`Xp:`,value:`${userData.xp}`,inline:true},
                  {name:'Level:',value:`${userData.level}`,inline:true},
                  {name:`Net Worth:`,value:`<:uc:922720730272137256> ${userData.networth}`},
                  {name:'Wallet:',value:`<:uc:922720730272137256> ${userData.wallet}`},
                  {name:`CryptoCoins:`,value:`${userData.cryptocoin}`},
                  {name:`Bank:`,value:`<:uc:922720730272137256> ${userData.bank}/${bank_limit}`},
                  {name:`Job:`,value:`${jobname}`,inline:true},
                  {name:`Salary:`,value:`<:uc:922720730272137256> ${userData.salary}`,inline:true},
                  {name:`Commands Runned:`,value:`${userData.commands}`},
                  {name:'Total Work Hours:',value:`${userData.totalwork}`},
                  );
                  embed.setFooter(`Requested by ${message.author.username}`,avatar);
                  embed.setColor('#FFFFFF');
                  embed.setTimestamp();
              
                  let totalmatches = userData.totalrps;
                  let totalwon = userData.wonrps;
                  let winpercent = totalwon * 100 / totalmatches;

                  const rpsembed = new Discord.MessageEmbed();
                  rpsembed.setTitle(`${message.author.username}'s Rps Stats`);
                  rpsembed.setThumbnail(`${avatar}`);
                  rpsembed.addFields({name:`Total Rps Matches Played:`,value:`${userData.totalrps}`},
                  {name:`Matches Won:`,value:`${userData.wonrps}`},
                  {name:`Matches Lost:`,value:`${userData.lostrps}`},
                  {name:`Matches Tie:`,value:`${userData.tierps}`},
                  {name:`Win %:`,value:`${winpercent}`}
                  );
                  rpsembed.setFooter(`Requested by ${message.author.username}`,avatar);
                  rpsembed.setColor('#8CD96B');
                  rpsembed.setTimestamp();
                  
                  let totalmoneydonated;
                  if(userData.totalmoneydonated){
                    totalmoneydonated = userData.totalmoneydonated;
                  }else{
                    totalmoneydonated = 0;
                  }
                  let totalmoneyreceived;
                  if(userData.totalmoneyreceived){
                    totalmoneyreceived = userData.totalmoneyreceived;
                  }else{
                    totalmoneyreceived = 0;
                  }
                  let totalitemsdonated;
                  if(userData.totalitemsdonated){
                    totalitemsdonated = userData.totalitemsdonated;
                  }else{
                    totalitemsdonated = 0;
                  }
                  let totalitemsreceived;
                  if(userData.totalitemsreceived){
                    totalitemsreceived = userData.totalitemsreceived;
                  }else{
                    totalitemsreceived = 0;
                  }
                  const sharingembed = new Discord.MessageEmbed();
                  sharingembed.setTitle(`${message.author.username}'s Sharing Stats`);
                  sharingembed.setThumbnail(`${avatar}`);
                  sharingembed.addFields({name:`Total Money Donated:`,value:`<:uc:922720730272137256> ${totalmoneydonated}`},
                  {name:`Total Money Received:`,value:`<:uc:922720730272137256> ${totalmoneyreceived}`},
                  {name:`Total Items Donated:`,value:`${totalitemsdonated}`},
                  {name:`Total Items Received:`,value:`${totalitemsreceived}`}
                  );
                  sharingembed.setFooter(`Requested by ${message.author.username}`,avatar);
                  sharingembed.setColor('#02D9FF');
                  sharingembed.setTimestamp();

                  const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                    .setCustomId('option')
                    .setPlaceholder('Other Stats...')
                    .addOptions([
                      {
                        label:'Overall Stats',
                        value:'overall',
                        description:'shows your overall stats',
                        emoji:'<:profile:945317106809974784>'
                      },   
                      {
                      label:'Gamble Stats',
                      value:'gamble',
                      description:'shows your gamble stats',
                      emoji:'<:lottery:938436846403346492>'
                    },
                    {
                    label:'Rps Stats',
                    value:'rps',
                    description:'shows your rps stats',
                    emoji:'<:rockpaperscissors:945317106071769159>'
                  },
                  {
                    label:'Sharing Stats',
                    value:'sharingstats',
                    description:'shows your sharing stats',
                    emoji:'<:sharingstats:945317106570907729>'
                  },
                    ])
                  );
                  message.channel.send({embeds:[embed],components:[row]});
                  const filter = (interaction)=> interaction.user.id === message.author.id;
                  let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
                  collector.on("collect",async(interaction)=>{
                    if(interaction.values[0]=='gamble'){
                        let targetnew = await userModel.findOne({userID:message.author.id});
                        const gambleembed2 = new Discord.MessageEmbed();
                        gambleembed2.setTitle(`${message.author.username}'s Gamble Stats`);
                        gambleembed2.setThumbnail(avatar);
                        gambleembed2.addFields({name:`Total Gambles Played:`,value:`${targetnew.totalgamble}`},
                        {name:`Gambles Won:`,value:`${targetnew.wongamble}`},
                        {name:`Gambles Lost:`,value:`${targetnew.lostgamble}`},
                        {name:`Gambles Tie:`,value:`${targetnew.tiegamble}`}
                        );;
                        gambleembed2.setFooter(`Requested by ${message.author.username}`,avatar);
                        gambleembed2.setColor('#FF0000');
                        gambleembed2.setTimestamp();
                        interaction.update({embeds:[gambleembed2]});
                    }
                    if(interaction.values[0]=='overall'){
                      interaction.update({embeds:[embed]});
                    }
                    if(interaction.values[0]=='rps'){
                      interaction.update({embeds:[rpsembed]});
                    }
                    if(interaction.values[0] === 'sharingstats'){
                      interaction.update({embeds:[sharingembed]});
                    }
                  });   
                  collector.on('end', collected => console.log(`Collected ${collected.size} items`));

                  }

              }else{
                var msec = n - lastprofile;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = timeup2 - ss;
                if(userData.premium !== 'enable'){
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Wait bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check profile again!. The default cooldown is of **30** seconds but for premium users it is of **15** seconds to become a premium user use premium command.`);
                  message.channel.send({embeds:[embed]});
                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`Chill bro!`);
                  embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check profile again!.`);
                  embed.setColor('#025CFF');
                  message.channel.send({embeds:[embed]});
                }
              }
        }else{
          message.channel.send(`${message.author}, You haven't joined currency game yet. Type ${serverData.prefix}join to join the game`);
        }
    }
}