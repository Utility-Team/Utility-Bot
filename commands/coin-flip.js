const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'coin-flip',
    aliases:['coin-flip','coinflip'],
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let coin_chance = Math.floor(Math.random() * 2);
        let result;
        if(userData){
            let number = args[0];
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
            if(!isNaN(number) && Math.sign(number) === 1){
                  if(number % 1=== 0){  
                        let d = new Date();
                        let n = d.getTime();
                        let lastcoinflip;
                        if(userData.lastcoinflip){
                            lastcoinflip = userData.lastcoinflip;
                        }else{
                            lastcoinflip = 0;
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
                        if(n - lastcoinflip >= timeup){
                            if(number <= 25000){
                                let d2 = new Date();
                                let n2 = d2.getTime();
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    lastcoinflip:n2
                                });
                                let embed = new Discord.MessageEmbed();
                                embed.setTitle(`Head or Tails`);
                                embed.setDescription(`Select between Heads or Tails`);
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed.setTimestamp();

                                let winembed = new Discord.MessageEmbed();
                                winembed.setAuthor(`You won!`);
                                winembed.addFields({name:`Amount Won:`,value:`<:uc:922720730272137256> ${args[0]}`},{name:`You chose:`,value:`heads`},{name:`Result:`,value:`heads`});
                                winembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                winembed.setTimestamp();
                                winembed.setColor(`#30CC71`);

                                let loseembed = new Discord.MessageEmbed();
                                loseembed.setAuthor(`You lost!`);
                                loseembed.addFields({name:`Amount Lost:`,value:`<:uc:922720730272137256> ${args[0]}`},{name:`You chose:`,value:`heads`},{name:`Result:`,value:`Tails`});
                                loseembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                loseembed.setTimestamp();
                                loseembed.setColor(`#C41731`)

                                let winembed2 = new Discord.MessageEmbed();
                                winembed2.setAuthor(`You won!`);
                                winembed2.addFields({name:`Amount Won:`,value:`<:uc:922720730272137256> ${args[0]}`},{name:`You chose:`,value:`tails`},{name:`Result:`,value:`tails`});
                                winembed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                winembed2.setTimestamp();
                                winembed2.setColor(`#30CC71`);

                                let loseembed2 = new Discord.MessageEmbed();
                                loseembed2.setAuthor(`You lost!`);
                                loseembed2.addFields({name:`Amount Lost:`,value:`<:uc:922720730272137256> ${args[0]}`},{name:`You chose:`,value:`tails`},{name:`Result:`,value:`heads`});
                                loseembed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                loseembed2.setTimestamp();
                                loseembed2.setColor(`#C41731`)
                                const row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageButton()
                                        .setCustomId('heads')
                                        .setLabel('Head')
                                        .setStyle('PRIMARY'),
                                    new Discord.MessageButton()
                                        .setCustomId('tails')
                                        .setLabel('Tail')
                                        .setStyle('PRIMARY'),
                                    
                                );
                                const m = await message.channel.send({embeds:[embed],components:[row]});
                                const ifilter = i => i.user.id === message.author.id;
                                const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                                if(coin_chance === 0){
                                    result = 'heads';
                                }
                                if(coin_chance === 1){
                                    result = 'tails';
                                }
                                collector.on('collect', async i => {
                                    
                                    if (i.customId === 'heads') {
                                        if(result === 'heads'){
                                            await i.update({ embeds:[winembed],components:[]});
                                            if(userData.wallet < 5000000000 && userData.wallet + number <= 5000000000){
                                                const respone2 = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        networth:number,
                                                        wallet:number
                                                    }
                                                });
                                            }
                                        }else{
                                            await i.update({embeds:[loseembed],components:[]});
                                          
                                                const respone2 = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        networth:-number,
                                                        wallet:-number
                                                    }
                                                });
                                            
                                        }
                                    }
                                    if(i.customId==='tails'){
                                        if(result === 'heads'){
                                            await i.update({ embeds:[winembed2],components:[]});
                                            if(userData.wallet < 5000000000 && userData.wallet + number <= 5000000000){
                                                const respone2 = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        networth:number,
                                                        wallet:number
                                                    }
                                                });
                                            }
                                        }else{
                                            await i.update({embeds:[loseembed2],components:[]});
                                          
                                                const respone2 = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        networth:-number,
                                                        wallet:-number
                                                    }
                                                });
                                            
                                        }
                                    
                                    }
                                });
                        
                                collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                            }else{
                                message.channel.send(`${message.author}, you can't bet more than 25000 in coinflip`);
                            }
                        }else{
                            var msec = n - lastcoinflip;
                            console.log(msec);
                            var ss = Math.floor(msec / 1000);
                            var second = timeup2 - ss;
                            if(userData.premium !== 'enable'){
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Wait bro!`);
                            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use coinflip again!. The default cooldown is of **20** seconds but for premium users it is of **10** seconds to become a premium user use premium command.`);
                            message.channel.send({embeds:[embed]});
                            }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Chill bro!`);
                            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use coinflip again!.`);
                            embed.setColor('#025CFF');
                            message.channel.send({embeds:[embed]});
                            }
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
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
        }
    }

}