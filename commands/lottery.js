const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'lottery',
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
          let number = args[0];
            let lastlottery;
           if(userData.lastlottery){  
                                    lastlottery = userData.lastlottery;
                                }else{
                                    lastlottery = 0;
                                }
          var d = new Date();
          var n = d.getTime();
        if(n - lastlottery >= 20000){ 
            if(number){
            if(!isNaN(number) && Math.sign(number) === 1){
                if(number % 1=== 0){
                    if(userData.wallet >= number){
                      if(number <= 25000){
                        if(userData.wallet < 5000000000 && userData.wallet + parseInt(number) <= 5000000000){
                                var d2 = new Date();
                                var n2 = d2.getTime();
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastlottery:n2
                                });
                                    const embed = new Discord.MessageEmbed();
                                    embed.setAuthor(`${message.author.username}, Time for Lottery!`);
                                    embed.setDescription(`Choose one from the below options!`);
                                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                    embed.setTimestamp();
                                    embed.setColor(`#404EED`);
                                    let lotterygot = Math.floor(Math.random() * 5 + 1);
                                    let lotterygot2 = Math.floor(Math.random() * 5 + 1);
                                    if(lotterygot === lotterygot2){
                                        lotterygot2 = lotterygot - 2;
                                    }
                                    console.log(lotterygot);
                                    console.log(lotterygot2)
                                    
                                    const row = new Discord.MessageActionRow()
                                    .addComponents(
                                        new Discord.MessageButton()
                                            .setCustomId('page1')
                                            .setEmoji('<:lottery:938436846403346492>')
                                            .setStyle('PRIMARY'),
                                        new Discord.MessageButton()
                                            .setCustomId('page2')
                                            .setEmoji('<:lottery:938436846403346492>')
                                            .setStyle('PRIMARY'),
                                        new Discord.MessageButton()
                                            .setCustomId('page3')
                                            .setEmoji('<:lottery:938436846403346492>')
                                            .setStyle('PRIMARY'),
                                        new Discord.MessageButton()
                                            .setCustomId('page4')
                                            .setEmoji('<:lottery:938436846403346492>')
                                            .setStyle('PRIMARY'),
                                            new Discord.MessageButton()
                                            .setCustomId('page5')
                                            .setEmoji('<:lottery:938436846403346492>')
                                            .setStyle('PRIMARY'),
                                    
                                        
                                    );
                                    
                                    
                                    
                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                    const ifilter = i => i.user.id === message.author.id;
                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                                    const embed2 = new Discord.MessageEmbed();
                                    embed2.setAuthor(`${message.author.username}, You won the lottery!`);
                                    embed2.setDescription(`You won the lottery and got <:UC:878195863413981214> ${number} amount!`);
                                    embed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                    embed2.setTimestamp();
                                    embed2.setColor(`#30CC71`);

                                    const embed3 = new Discord.MessageEmbed();
                                    embed3.setAuthor(`${message.author.username}, You lost the lottery!`);
                                    embed3.setDescription(`You lost the lottery and lost <:UC:878195863413981214> ${number} amount!`);
                                    embed3.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                    embed3.setTimestamp();
                                    embed3.setColor('#ED4245');
                                    collector.on('collect', async i => {
                                        
                                        if (i.customId === 'page' + lotterygot) {
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    wallet:number,
                                                    networth:number
                                                }
                                            });
                                            i.component.setStyle("SUCCESS");
                                            i.component.setEmoji('🏆')
                                            i.component.setDisabled(true)
                                            await  i.update({
                                                components: [
                                                    new Discord.MessageActionRow().addComponents(i.component)
                                                    
                                                ],
                                                embeds:[
                                                    embed2
                                                ]
                                            });
                                        }else if(i.customId === 'page' + lotterygot2){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    wallet:number,
                                                    networth:number
                                                }
                                            });
                                            i.component.setStyle("SUCCESS");
                                            i.component.setEmoji('🏆')
                                            i.component.setDisabled(true)
                                            await  i.update({
                                                components: [
                                                    new Discord.MessageActionRow().addComponents(i.component)
                                                    
                                                ],
                                                embeds:[
                                                    embed2
                                                ]
                                            });
                                        }else{
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    wallet:-number,
                                                    networth:-number
                                                }
                                            }); 
                                            i.component.setStyle("DANGER")
                                            i.component.setDisabled(true)
                                        await  i.update({
                                                components: [
                                                    new Discord.MessageActionRow().addComponents(i.component)
                                                ],
                                                embeds:[
                                                    embed3
                                                ]
                                            });
                                        }
                                    });
                                
                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`❌ Lottery Failed`);
                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                            message.channel.send({embeds:[embed]});
                        }
                        
                    }else{
                  message.channel.send(`${message.author}, You can't play a lottery of more than 25000 coins`);
                    }
                 }else{
                  
                        const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, You don't have that much money in your wallet`);
                    message.channel.send({embeds:[embed]});
                 }
                }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Please also mention a valid amount!`);
                message.channel.send({embeds:[embed]});
                }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Please also mention a valid amount!`);
                message.channel.send({embeds:[embed]});
            }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Please also mention the amount!`);
                message.channel.send({embeds:[embed]});
            }    
        }else{
            var msec = n - lastlottery;
            console.log(msec);
            var ss = Math.floor(msec / 1000);
            var second = 20 - ss;
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Wait bro!`);
            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use lottery again!. The default cooldown is of **20** seconds but for premium users it is of **10** seconds to become a premium user use premium command.`);
            message.channel.send({embeds:[embed]});
  
        }
       }else{
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
        
       }
    }
}