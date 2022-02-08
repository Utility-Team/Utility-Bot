const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'play',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(userData){
            let argsone;
            let argsone_name;
            let argstwo;
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
            async function play(item){
                let avatar;
                if(userData.avatar !== ''){
                  if(userData.premium === 'enable'){
                    avatar = userData.avatar;
                  }else{
                    avatar = message.author.displayAvatarURL();
                  }
                }else{
                    avatar = message.author.displayAvatarURL();
                }
                let check = 0;
                if(userData.inventory){
                    for(var x = 0;x<=userData.inventory.length;x++){
                        if(userData.inventory[x]){
                          if(userData.inventory[x].name === item){
                                if(item === userData.inventory[x].name && check < 5){
                                                    check = 5;
                                                    if(item !== 'VR Glasses'){
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setTitle(`Playing ${item}`);
                                                        embed.setDescription(`${message.author.username} what do you wanna do?`);
                                                        embed.setThumbnail(`${message.author.displayAvatarURL()}`);
                                                        const row = new Discord.MessageActionRow()
                                                        .addComponents(
                                                            new Discord.MessageButton()
                                                                .setCustomId(`streaming${message.author.id}`)
                                                                .setLabel('Streaming')
                                                                .setStyle('PRIMARY'),
                                                            new Discord.MessageButton()
                                                                .setCustomId(`gaming${message.author.id}`)
                                                                .setLabel('Gaming')
                                                                .setStyle('PRIMARY'),
                                                            new Discord.MessageButton()
                                                                .setCustomId(`editing${message.author.id}`)
                                                                .setLabel('Editing')
                                                                .setStyle('PRIMARY')
                                                            
                                                        );
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                        const ifilter = i => i.user.id === message.author.id;
                                    
                                                        const collector = m.createMessageComponentCollector({ filter:ifilter, time: 15000 });
                                    
                                                        collector.on('collect', async i => {
                                                            console.log('hello there' + i.guildId);
                                                            if (i.customId === `streaming${message.author.id}`) {
                                                                let time = Math.floor(Math.random() * 5 + 1);
                                                                let totalpeople = Math.floor(Math.random() * 100000 + 1);
                                                                let totalcomments = Math.floor(Math.random() * 10000 + 1);
                                                                let moneymade = Math.floor(Math.random()*5000+1);
                                                                const embed2 = new Discord.MessageEmbed();
                                                                embed2.setTitle(`You streamed for ${time} hrs`);
                                                                embed2.addFields({name:`👀 Total People Watched:`,value:`${totalpeople}`},
                                                                {name:`💬 Total comments:`,value:`${totalcomments}`},
                                                                {name:`Total Money Made:`,value:`<:uc:922720730272137256> ${moneymade}`}
                                                                );
                                                                embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                                                embed2.setColor(`#30CC71`);
                                                                embed2.setTimestamp();
                                                                await i.update({ embeds:[embed2],components:[]});
                                                                let n2 = new Date();
                                                                let d2 = n2.getTime();
                                                                if(userData.wallet < 5000000000 && userData.wallet + moneymade <= 5000000000){
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        $inc:{
                                                                            networth:moneymade,
                                                                            wallet:moneymade
                                                                        },
                                                                        lastplay:n2
                                                                    });
                                                                }else{
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        lastplay:n2
                                                                    });
                                                                }
                                                            }else if(i.customId ===`gaming${message.author.id}`){
                                                                let time = Math.floor(Math.random() * 5 + 1);
                                                                let totalmission = Math.floor(Math.random() * 10 + 1);
                                                                let totalkills = Math.floor(Math.random() * 5 + 1);
                                                                let moneymade = Math.floor(Math.random()*5000+1);
                                                                const embed2 = new Discord.MessageEmbed();
                                                                embed2.setTitle(`You did gaming for ${time} hrs`);
                                                                embed2.addFields({name:`Total Missions Completed:`,value:`${totalmission}`},
                                                                {name:`Total Kills:`,value:`${totalkills}`},
                                                                {name:`Total Money Made:`,value:`<:uc:922720730272137256> ${moneymade}`}
                                                                );
                                                                embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                                                embed2.setColor(`#30CC71`);
                                                                embed2.setTimestamp();
                                                                await i.update({ embeds:[embed2],components:[]});
                                                                let n2 = new Date();
                                                                let d2 = n2.getTime();
                                                                if(userData.wallet < 5000000000 && userData.wallet + moneymade <= 5000000000){
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        $inc:{
                                                                            networth:moneymade,
                                                                            wallet:moneymade
                                                                        },
                                                                        lastplay:n2
                                                                    });
                                                                }else{
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        lastplay:n2
                                                                    });
                                                                }
                                                            }else if(i.customId === `editing${message.author.id}`){
                                                                let time = Math.floor(Math.random() * 5 + 1);
                                                                let totalvideos = Math.floor(Math.random() * 5 + 1);
                                                                let totalthumbnails = Math.floor(Math.random() * 5 + 1);
                                                                let moneymade = Math.floor(Math.random()*5000+1);
                                                                const embed2 = new Discord.MessageEmbed();
                                                                embed2.setTitle(`You did editing for ${time} hrs`);
                                                                embed2.addFields({name:`Total Videos Edited:`,value:`${totalvideos}`},
                                                                {name:`Total Thumbnails Created:`,value:`${totalthumbnails}`},
                                                                {name:`Total Money Made:`,value:`<:uc:922720730272137256> ${moneymade}`}
                                                                );
                                                                embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                                                embed2.setColor(`#30CC71`);
                                                                embed2.setTimestamp();
                                                                await i.update({ embeds:[embed2],components:[]});
                                                                let n2 = new Date();
                                                                let d2 = n2.getTime();
                                                                if(userData.wallet < 5000000000 && userData.wallet + moneymade <= 5000000000){
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        $inc:{
                                                                            networth:moneymade,
                                                                            wallet:moneymade
                                                                        },
                                                                        lastplay:n2
                                                                    });
                                                                }else{
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        lastplay:n2
                                                                    });
                                                                }
                                                            }
                                                        });
                                    
                                                        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                        return;
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                        embed.setTitle(`Playing ${item}`);
                                                        embed.setDescription(`${message.author.username} what do you wanna do?`);
                                                        embed.setThumbnail(`${message.author.displayAvatarURL()}`);
                                                        const row = new Discord.MessageActionRow()
                                                        .addComponents(
                                                            new Discord.MessageButton()
                                                                .setCustomId(`streaming${message.author.id}`)
                                                                .setLabel('Stream in Metaverse')
                                                                .setStyle('PRIMARY'),
                                                            new Discord.MessageButton()
                                                                .setCustomId(`gaming${message.author.id}`)
                                                                .setLabel('Play in Metaverse')
                                                                .setStyle('PRIMARY'),
                                                            new Discord.MessageButton()
                                                                .setCustomId(`work${message.author.id}`)
                                                                .setLabel('Work in Metaverse')
                                                                .setStyle('PRIMARY')
                                                            
                                                        );
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                        const ifilter = i => i.user.id === message.author.id;
                                    
                                                        const collector = m.createMessageComponentCollector({ filter:ifilter, time: 15000 });
                                    
                                                        collector.on('collect', async i => {
                                                            console.log('hello there' + i.guildId);
                                                            if (i.customId === `streaming${message.author.id}`) {
                                                                let time = Math.floor(Math.random() * 5 + 1);
                                                                let totalpeople = Math.floor(Math.random() * 100000 + 1);
                                                                let totalcomments = Math.floor(Math.random() * 10000 + 1);
                                                                let moneymade = Math.floor(Math.random()*5000+1);
                                                                const embed2 = new Discord.MessageEmbed();
                                                                embed2.setTitle(`You streamed for ${time} hrs`);
                                                                embed2.addFields({name:`👀 Total People Watched:`,value:`${totalpeople}`},
                                                                {name:`💬 Total comments:`,value:`${totalcomments}`},
                                                                {name:`Total Money Made:`,value:`<:uc:922720730272137256> ${moneymade}`}
                                                                );
                                                                embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                                                embed2.setColor(`#30CC71`);
                                                                embed2.setTimestamp();
                                                                await i.update({ embeds:[embed2],components:[]});
                                                                let n2 = new Date();
                                                                let d2 = n2.getTime();
                                                                if(userData.wallet < 5000000000 && userData.wallet + moneymade <= 5000000000){
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        $inc:{
                                                                            networth:moneymade,
                                                                            wallet:moneymade
                                                                        },
                                                                        lastplay:n2
                                                                    });
                                                                }else{
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        lastplay:n2
                                                                    });
                                                                }
                                                            }else if(i.customId ===`gaming${message.author.id}`){
                                                                let time = Math.floor(Math.random() * 5 + 1);
                                                                let totalmission = Math.floor(Math.random() * 10 + 1);
                                                                let totalkills = Math.floor(Math.random() * 5 + 1);
                                                                let moneymade = Math.floor(Math.random()*5000+1);
                                                                const embed2 = new Discord.MessageEmbed();
                                                                embed2.setTitle(`You did gaming for ${time} hrs`);
                                                                embed2.addFields({name:`Total Missions Completed:`,value:`${totalmission}`},
                                                                {name:`Total Kills:`,value:`${totalkills}`},
                                                                {name:`Total Money Made:`,value:`<:uc:922720730272137256> ${moneymade}`}
                                                                );
                                                                embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                                                embed2.setColor(`#30CC71`);
                                                                embed2.setTimestamp();
                                                                await i.update({ embeds:[embed2],components:[]});
                                                                let n2 = new Date();
                                                                let d2 = n2.getTime();
                                                                if(userData.wallet < 5000000000 && userData.wallet + moneymade <= 5000000000){
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        $inc:{
                                                                            networth:moneymade,
                                                                            wallet:moneymade
                                                                        },
                                                                        lastplay:n2
                                                                    });
                                                                }else{
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        lastplay:n2
                                                                    });
                                                                }
                                                            }else if(i.customId === `work${message.author.id}`){
                                                                let time = Math.floor(Math.random() * 5 + 1);
                                                                let totalvideos = Math.floor(Math.random() * 5 + 1);
                                                                let totalthumbnails = Math.floor(Math.random() * 5 + 1);
                                                                let moneymade = Math.floor(Math.random()*5000+1);
                                                                const embed2 = new Discord.MessageEmbed();
                                                                embed2.setTitle(`You did editing for ${time} hrs`);
                                                                embed2.addFields({name:`Total Videos Edited:`,value:`${totalvideos}`},
                                                                {name:`Total Thumbnails Created:`,value:`${totalthumbnails}`},
                                                                {name:`Total Money Made:`,value:`<:uc:922720730272137256> ${moneymade}`}
                                                                );
                                                                embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                                                embed2.setColor(`#30CC71`);
                                                                embed2.setTimestamp();
                                                                await i.update({ embeds:[embed2],components:[]});
                                                                let n2 = new Date();
                                                                let d2 = n2.getTime();
                                                                if(userData.wallet < 5000000000 && userData.wallet + moneymade <= 5000000000){
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        $inc:{
                                                                            networth:moneymade,
                                                                            wallet:moneymade
                                                                        },
                                                                        lastplay:n2
                                                                    });
                                                                }else{
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        lastplay:n2
                                                                    });
                                                                }
                                                            }
                                                        });
                                    
                                                        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                        return;
                                                }
                 
                                           
                                        }
                            
                          }
                        }else if(x === userData.inventory.length & check < 5){
                         
                            message.channel.send(`${message.author}, You don't own that item`);
                          
                        }
                    }
                }else{
                    message.channel.send(`${message.author}, You don't own that item`);
                }
              }
            let lastplay;
            if(userData.lastplay){
                lastplay = userData.lastplay;
            }else{
                lastplay = 0;
            }
            let timeup;
            let timeup2;
            if(userData.premium === 'enable'){
                timeup = 10000;
                timeup2 = 10;
            }else{
                timeup = 20000;
                timeup2 = 20;
            }
            if(argsone_name === 'pc' || argsone_name === 'gaming' && argstwo_name === 'pc' || argsone_name === 'computer'){
                let d = new Date();
                let n = d.getTime();
                if(n - lastplay >= timeup){
                    play('Beast Pc');
                }else{
                    var msec = n - lastplay;
                    console.log(msec);
                    var ss = Math.floor(msec / 1000);
                    var second = timeup2 - ss;
                    if(userData.premium !== 'enable'){
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Wait bro!`);
                        embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play again!. The default cooldown is of **20** seconds but for premium users it is of **10** seconds to become a premium user use premium command.`);
                        message.channel.send({embeds:[embed]});
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Chill bro!`);
                        embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play again!.`);
                        embed.setColor('#025CFF');
                        message.channel.send({embeds:[embed]});
                    } 
                }
            }
            if(argsone_name === 'laptop'){
                let d = new Date();
                let n = d.getTime();
                if(n - lastplay >= timeup){
                    play('Laptop');
                }else{
                    var msec = n - lastplay;
                    console.log(msec);
                    var ss = Math.floor(msec / 1000);
                    var second = timeup2 - ss;
                    if(userData.premium !== 'enable'){
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Wait bro!`);
                        embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play again!. The default cooldown is of **20** seconds but for premium users it is of **10** seconds to become a premium user use premium command.`);
                        message.channel.send({embeds:[embed]});
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Chill bro!`);
                        embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play again!.`);
                        embed.setColor('#025CFF');
                        message.channel.send({embeds:[embed]});
                    } 
                }
            }
            if(argsone_name === 'vr glasses' || argsone_name === 'vr'){
                let d = new Date();
                let n = d.getTime();
                if(n - lastplay >= timeup){
                    play('VR Glasses');
                }else{
                    var msec = n - lastplay;
                    console.log(msec);
                    var ss = Math.floor(msec / 1000);
                    var second = timeup2 - ss;
                    if(userData.premium !== 'enable'){
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Wait bro!`);
                        embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play again!. The default cooldown is of **20** seconds but for premium users it is of **10** seconds to become a premium user use premium command.`);
                        message.channel.send({embeds:[embed]});
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Chill bro!`);
                        embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play again!.`);
                        embed.setColor('#025CFF');
                        message.channel.send({embeds:[embed]});
                    } 
                }
            }

        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
        }
    }
}