const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const wait = require('util').promisify(setTimeout);
module.exports = {
    name:'profile',
    async execute(message,args,client){
        const target = message.mentions.users.first() || message.author;
        let userData = await userModel.findOne({userID:message.author.id});
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
                  let level = Math.round(userinfo.xp/1500);
                  const response = await userModel.findOneAndUpdate({
                      userID:message.author.id,
                    },
                    {
                      xp:userinfo.xp + 15,
                      commands:userinfo.commands + 1,
                      level:level
        
                    }
                    
                    );
                 }
               }
        if(userData){ 
              let lastprofileData = await userModel.findOne({userID:message.author.id});
              var d = new Date();
              var n = d.getTime();
              let lastprofile = lastprofileData.lastprofile;
              if(n - lastprofile>= 30000){
                var d2 = new Date();
                var n2 = d2.getTime();  
                 const response  = await userModel.findOneAndUpdate({userID:message.author.id},
                  {
                    lastprofile:n2
                  });
                console.log(n - lastprofile / 1000);
                if(target){
                  if(target.id === message.author.id){
                    let targetData = await userModel.findOne({userID:target.id});
                     if(targetData){
                         let pic =  target.displayAvatarURL();
                         let jobname = targetData.job;
                         if(targetData.job === ''){
                           jobname = 'none';
                         }
                         let targetData2 = await userModel.findOne({userID:target.id});
      
                         if(targetData2 && targetData2.userID !== target.id){
                     
                         let bank_limit = targetData.level * 10000;
                         if(targetData.level === 0){
                          bank_limit = 5000;
                        }
                         const embed = new Discord.MessageEmbed();
                         embed.setTitle(`${target.username}'s profile`);
                         embed.setThumbnail(pic);
                         embed.addFields(
                         {name:`Xp`,value:`${targetData2.xp}`},
                         {name:'Level',value:`${targetData2.level}`},
                         {name:`Commands Runned`,value:`${targetData2.commands}`},
                         {name:`Net Worth`,value:`<:UC:878195863413981214> ${targetData2.networth}`},
                         {name:'Wallet',value:`<:UC:878195863413981214> ${targetData2.wallet}`},
                         {name:`Bank`,value:`<:UC:878195863413981214> ${targetData2.bank}/${bank_limit}`},
                         {name:`Crypto Coins`,value:`${targetData2.cryptocoin}`},
                         {name:`Job`,value:`${jobname}`},
                         {name:`Salary`,value:`<:UC:878195863413981214> ${targetData2.salary}`},
                         {name:'Total Work Hours',value:`${targetData2.totalwork}`},
                         );
                         embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                         embed.setTimestamp();
      
                         const gambleembed = new Discord.MessageEmbed();
                         gambleembed.setTitle(`${target.username}'s Gamble Stats`);
                         gambleembed.setThumbnail(pic);
                         gambleembed.addFields({name:`Total Gambles Played`,value:`${targetData2.totalgamble}`},
                         {name:`Gambles Won`,value:`${targetData2.wongamble}`},
                         {name:`Gambles Lost`,value:`${targetData2.lostgamble}`},
                         {name:`Gambles Tie`,value:`${targetData2.tiegamble}`}
                         );
                         gambleembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
                         gambleembed.setTimestamp();
                          let totalmatches = targetData2.totalrps;
                          let totalwon = targetData2.wonrps;
                          let winpercent = totalwon * 100 / totalmatches;
                         const rpsembed = new Discord.MessageEmbed();
                         rpsembed.setTitle(`${target.username}'s Rps Stats`);
                         rpsembed.setThumbnail(pic);
                         rpsembed.addFields({name:`Total Rps Matches Played`,value:`${targetData2.totalrps}`},
                         {name:`Matches Won`,value:`${targetData2.wonrps}`},
                         {name:`Matches Lost`,value:`${targetData2.lostrps}`},
                         {name:`Matches Tie`,value:`${targetData2.tierps}`},
                         {name:`Win %`,value:`${winpercent}`}
                         );
                         rpsembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
                         rpsembed.setTimestamp();
      
                         const row = new Discord.MessageActionRow().addComponents(
                             new Discord.MessageSelectMenu()
                             .setCustomId('option')
                             .setPlaceholder('Other Stats...')
                             .addOptions([
                               {
                                 label:'Overall Stats',
                                 value:'overall',
                                 description:'shows your overall stats'
                               },
                               {
                               label:'Gamble Stats',
                               value:'gamble',
                               description:'shows your gamble stats'
                             },
                             {
                              label:'Rps Stats',
                              value:'rps',
                              description:'shows your rps stats'
                            },
                             ])
                           );
                           message.channel.send({embeds:[embed],components:[row]});
                           const filter = (interaction)=> interaction.user.id === message.author.id;
                           console.log('actual - '+  message.author.id + 'database - ' + targetData.userID);
      
                           let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
                                          collector.on("collect",async(interaction)=>{
                                            // await interaction.deferReply();
                                         //   await interaction.deferReply();
                                            if(interaction.values[0]=='gamble'){
                                              let targetnew = await userModel.findOne({userID:target.id});
                                              const gambleembed2 = new Discord.MessageEmbed();
                                              gambleembed2.setTitle(`${target.username}'s Gamble Stats`);
                                              gambleembed2.setThumbnail(pic);
                                              gambleembed2.addFields({name:`Total Gambles Played`,value:`${targetnew.totalgamble}`},
                                              {name:`Gambles Won`,value:`${targetnew.wongamble}`},
                                              {name:`Gambles Lost`,value:`${targetnew.lostgamble}`},
                                              {name:`Gambles Tie`,value:`${targetnew.tiegamble}`}
                                              );
                                              gambleembed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
                                              gambleembed2.setTimestamp();
                                              console.log("hecker's mother father bad manners " , gambleembed2);
                                             interaction.reply({embeds:[gambleembed2]});
                                             
                                          }
                                          if(interaction.values[0]=='overall'){
                                  //          console.log(embed);
                                           interaction.reply({embeds:[embed]});
                                         }
                                         if(interaction.values[0]=='rps'){
                                          //          console.log(embed);
                                                   interaction.reply({embeds:[rpsembed]});
                                         }
                                       });   
                           collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                           
                         }
                     }else{
                       message.channel.send(`${target} You haven't joined the currency game. Please type join to join the game`);
                     }
                  }else{
                    let targetData = await userModel.findOne({userID:target.id});
                     if(targetData){
                         let pic =  target.displayAvatarURL();
                         let jobname = targetData.job;
                         if(targetData.job === ''){
                           jobname = 'none';
                         }
                         let targetData2 = await userModel.findOne({userID:target.id});
                         let bank_limit = targetData.level * 10000;
                         if(targetData.level === 0){
                          bank_limit = 5000;
                        }
                         if(targetData2 && targetData2.userID !== target.id){
                         const embed = new Discord.MessageEmbed();
                         embed.setTitle(`${target.username}'s profile`);
                         embed.setThumbnail(pic);
                         embed.addFields(
                         {name:`Xp`,value:`${targetData2.xp}`},
                         {name:'Level',value:`${targetData2.level}`},
                         {name:`Commands Runned`,value:`${targetData2.commands}`},
                         {name:`Net Worth`,value:`<:UC:878195863413981214> ${targetData2.networth}`},
                         {name:'Wallet',value:`<:UC:878195863413981214> ${targetData2.wallet}`},
                         {name:`Bank`,value:`<:UC:878195863413981214> ${targetData2.bank}/${bank_limit}`},
                         {name:`Crypto Coins`,value:`${targetData2.cryptocoin}`},
                         {name:`Job`,value:`${jobname}`},
                         {name:`Salary`,value:`<:UC:878195863413981214> ${targetData2.salary}`},
                         {name:'Total Work Hours',value:`${targetData2.totalwork}`}
                         );
                         embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                         embed.setTimestamp();
      
                         const gambleembed = new Discord.MessageEmbed();
                         gambleembed.setTitle(`${target.username}'s Gamble Stats`);
                         gambleembed.setThumbnail(pic);
                         gambleembed.addFields({name:`Total Gambles Played`,value:`${targetData2.totalgamble}`},
                         {name:`Gambles Won`,value:`${targetData2.wongamble}`},
                         {name:`Gambles Lost`,value:`${targetData2.lostgamble}`},
                         {name:`Gambles Tie`,value:`${targetData2.tiegamble}`}
                         );
                         gambleembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
                         gambleembed.setTimestamp();
                         let totalmatches = targetData2.totalrps;
                         let totalwon = targetData2.wonrps;
                         let winpercent = totalwon * 100 / totalmatches;
                         const rpsembed = new Discord.MessageEmbed();
                         rpsembed.setTitle(`${target.username}'s Rps Stats`);
                         rpsembed.setThumbnail(pic);
                         rpsembed.addFields({name:`Total Rps Matches Played`,value:`${targetData2.totalrps}`},
                         {name:`Matches Won`,value:`${targetData2.wonrps}`},
                         {name:`Matches Lost`,value:`${targetData2.lostrps}`},
                         {name:`Matches Tie`,value:`${targetData2.tierps}`},
                         {name:`Win %`,value:`${winpercent}`}
                         );
                         rpsembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
                         rpsembed.setTimestamp();

                  
      
                         const row = new Discord.MessageActionRow().addComponents(
                             new Discord.MessageSelectMenu()
                             .setCustomId('option')
                             .setPlaceholder('Other Stats...')
                             .addOptions([
                               {
                                 label:'Overall Stats',
                                 value:'overall',
                                 description:'shows your overall stats'
                               },
                               {
                               label:'Gamble Stats',
                               value:'gamble',
                               description:'shows your gamble stats'
                             },
                             {
                              label:'Rps Stats',
                              value:'rps',
                              description:'shows your rps stats'
                            },
                             ])
                           );
                           message.channel.send({embeds:[embed],components:[row]});
                           const filter = (interaction)=> interaction.user.id === message.author.id;
                           console.log('actual - '+  message.author.id + 'database - ' + targetData.userID);
      
                           let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
                                          collector.on("collect",async(interaction)=>{
      
                                         //  await interaction.deferReply();
                                            if(interaction.values[0]=='gamble'){
                                              let targetnew = await userModel.findOne({userID:target.id});
                                              const gambleembed2 = new Discord.MessageEmbed();
                                              gambleembed2.setTitle(`${target.username}'s Gamble Stats`);
                                              gambleembed2.setThumbnail(pic);
                                              gambleembed2.addFields({name:`Total Gambles Played`,value:`${targetnew.totalgamble}`},
                                              {name:`Gambles Won`,value:`${targetnew.wongamble}`},
                                              {name:`Gambles Lost`,value:`${targetnew.lostgamble}`},
                                              {name:`Gambles Tie`,value:`${targetnew.tiegamble}`}
                                              );
                                              gambleembed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
                                              gambleembed2.setTimestamp();
                                              console.log("hecker's mother father bad manners " , gambleembed2);
                                             interaction.reply({embeds:[gambleembed2]});
                                             
                                          }
                                          if(interaction.values[0]=='overall'){
                                  //          console.log(embed);
                                           interaction.reply({embeds:[embed]});
                                         }
                                         if(interaction.values[0]=='rps'){
                                          //          console.log(embed);
                                                   interaction.reply({embeds:[rpsembed]});
                                                 }
                                       });   
                           collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                           
                         }
                     }else{
                      message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
                     }
                  }
                }
             
    

              }else{
                var msec = n - lastprofile;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = 30 - ss;
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Wait bro!`);
                embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check profile again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                message.channel.send({embeds:[embed]});
      
              }
        }else{
          message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
        }
    }
}