const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'find',
    aliases:['find','search'],
    async execute(message,args){
      let bush;
      let bedroom;
      let car;
      let pocket;
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
        var d = new Date();
        var n = d.getTime();
        let lastfind = userData.lastfind;
        let timeup;
        let timeup2;
        if(userData.premium === 'enable'){
          timeup = 15000;
          timeup2 = 15;
        }else{
          timeup = 30000;
          timeup2 =30;
        }
        if(n-lastfind >= timeup){
            if(userData.wallet < 5000000000 && userData.wallet + 1500 <= 5000000000){
                    var d2 = new Date();
                    var n2 = d2.getTime();  
                    const response  = await userModel.findOneAndUpdate({userID:message.author.id},
                    {
                        lastfind:n2
                    });
                const embed = new Discord.MessageEmbed();
                embed.setAuthor(`${message.author.username}, Where would you like to search?`,message.author.displayAvatarURL());
                embed.setDescription(`**Pick one from the given options.**`);
                const row = new Discord.MessageActionRow()
                .addComponents(
                bush =  new Discord.MessageButton()
                        .setCustomId('bushes')
                        .setLabel('Bushes')
                        .setStyle('PRIMARY'),
                bedroom =  new Discord.MessageButton()
                        .setCustomId('bedroom')
                        .setLabel('Bedroom')
                        .setEmoji('🛏️')
                        .setStyle('PRIMARY'),
                car =   new Discord.MessageButton()
                        .setCustomId('car')
                        .setLabel('Car')
                        .setEmoji('🚙')
                        .setStyle('PRIMARY'),
                pocket = new Discord.MessageButton()
                        .setCustomId('pocket')  
                        .setLabel('Pocket')
                        .setEmoji()
                        .setStyle('PRIMARY')
                );
            const m = await message.channel.send({embeds:[embed],components:[row]});
                const ifilter = i => i.user.id === message.author.id;

                const collector = m.createMessageComponentCollector({ filter:ifilter, time: 15000 });
                let find_chance = Math.floor(Math.random() * 2);
                console.log(find_chance);
                collector.on('collect', async i => {
                    if(i.customId === 'bushes'){
                        row.components[0].setDisabled(true)
                        row.components[1].setDisabled(true)
                        row.components[2].setDisabled(true)
                        row.components[3].setDisabled(true)
                        if(find_chance === 0){

                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`Searched the bushes!`);
                            embed2.setDescription(`**You found nothing in the bushes!**`);
                            embed.setColor(`#30CC71`);
                            i.update({ embeds:[embed2], components: [row] });
                        }
                        if(find_chance === 1){
                            let random_money = Math.floor(Math.random() * 1500);
                            const response = await userModel.findOneAndUpdate({userID:message.author},{
                                $inc:{
                                    wallet:random_money,
                                    networth:random_money
                                }
                            });
                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`Searched the bushes!`);
                            embed2.setDescription(`**You found <:UC:878195863413981214> ${random_money} in the bushes!**`);
                            embed2.setColor(`#30CC71`);
                            i.update({ embeds:[embed2], components: [row] });
                        }                
                    
                    }
                    if(i.customId === 'bedroom'){
                        row.components[0].setDisabled(true)
                        row.components[1].setDisabled(true)
                        row.components[2].setDisabled(true)
                        row.components[3].setDisabled(true)
                        if(find_chance === 0){

                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`Searched the bedroom!`);
                            embed2.setDescription(`**You found nothing in the bedroom!**`);
                            embed.setColor(`#30CC71`);
                            i.update({ embeds:[embed2], components: [row] });
                        }
                        if(find_chance === 1){
                            let random_money = Math.floor(Math.random() * 1500);
                            const response = await userModel.findOneAndUpdate({userID:message.author},{
                                $inc:{
                                    wallet:random_money,
                                    networth:random_money
                                }
                            });
                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`Searched the bedroom!`);
                            embed2.setDescription(`**You found <:UC:878195863413981214> ${random_money} in the bedroom!**`);
                            embed2.setColor(`#30CC71`);
                            i.update({ embeds:[embed2], components: [row] });
                        }                
                    }
                    if(i.customId === 'car'){
                        row.components[0].setDisabled(true)
                        row.components[1].setDisabled(true)
                        row.components[2].setDisabled(true)
                        row.components[3].setDisabled(true)
                        if(find_chance === 0){

                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`Searched the car!`);
                            embed2.setDescription(`**You found nothing in the car!**`);
                            embed.setColor(`#30CC71`);
                            i.update({ embeds:[embed2], components: [row] });
                        }
                        if(find_chance === 1){
                            let random_money = Math.floor(Math.random() * 1500);
                            const response = await userModel.findOneAndUpdate({userID:message.author},{
                                $inc:{
                                    wallet:random_money,
                                    networth:random_money
                                }
                            });
                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`Searched the car!`);
                            embed2.setDescription(`**You found <:UC:878195863413981214> ${random_money} in the car!**`);
                            embed2.setColor(`#30CC71`);
                            i.update({ embeds:[embed2], components: [row] });
                        }                
                    }
                    if(i.customId === 'pocket'){
                        row.components[0].setDisabled(true)
                        row.components[1].setDisabled(true)
                        row.components[2].setDisabled(true)
                        row.components[3].setDisabled(true)
                        if(find_chance === 0){

                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`Searched the pocket!`);
                            embed2.setDescription(`**You found nothing in the pocket!**`);
                            embed.setColor(`#30CC71`);
                            i.update({ embeds:[embed2], components: [row] });
                        }
                        if(find_chance === 1){
                            let random_money = Math.floor(Math.random() * 1500);
                            const response = await userModel.findOneAndUpdate({userID:message.author},{
                                $inc:{
                                    wallet:random_money,
                                    networth:random_money
                                }
                            });
                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`Searched the pocket!`);
                            embed2.setDescription(`**You found <:UC:878195863413981214> ${random_money} in the pocket!**`);
                            embed2.setColor(`#30CC71`);
                            i.update({ embeds:[embed2], components: [row] });
                        }                
                    }
                    
                });

                collector.on('end', collected => console.log(`Collected ${collected.size} items`));
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`❌ Find Failed`);
                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                message.channel.send({embeds:[embed]});
            }
        }else{
            var msec = n - lastfind;
            console.log(msec);
            var ss = Math.floor(msec / 1000);
            var second = timeup2 - ss;
            if(userData.premium !== 'enable'){
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Wait bro!`);
                embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use find again!. The default cooldown is of **30** seconds but for premium users it is of **25** seconds to become a premium user use premium command.`);
                message.channel.send({embeds:[embed]});
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Chill bro!`);
                embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use find again!.`);
                embed.setColor('#025CFF');
                message.channel.send({embeds:[embed]});
            }
        }
    
      }else{
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
         
      }
    }
}