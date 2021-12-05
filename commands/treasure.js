const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'treasure',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        if(userData){
            if(userData.boat){
                let number = args[0];
                if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                        if(number % 1=== 0){
                         if(userData.wallet >= number){
                          if(number <= 50000){
                                let lasttreasure;
                                if(userData.lasttreasure){  
                                    lasttreasure = userData.lasttreasure;
                                }else{
                                    lasttreasure = 0;
                                }
                                var d = new Date();
                                var n = d.getTime();
                                if(n - lasttreasure >= 30000){

                                    if(userData.wallet < 1000000000 && userData.wallet + parseInt(number) <= 1000000000){
                                            var d2 = new Date();
                                            var n2 = d2.getTime();
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                lasttreasure:n2
                                            });
                                            const embed = new Discord.MessageEmbed();
                                            embed.setAuthor(`${message.author.username}, You have arrived to the island!`);
                                            embed.setDescription(`Time for treasure hunt! guess the treasure box from below!`);
                                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                            embed.setTimestamp();
                                            embed.setColor(`#404EED`);
                                            let treasuregot = Math.floor(Math.random(1,9) * 9 + 1);
                                            let treasuregot2 = Math.floor(Math.random(1,9) * 9 + 1);
                                            if(treasuregot === treasuregot2){
                                            if(treasuregot <= 6){
                                                treasuregot = treasuregot + 3;
                                            }

                                            }
                                            if(treasuregot - treasuregot2 === 1 || treasuregot - treasuregot2 === 2){
                                                if(treasuregot <= 6){
                                                    treasuregot = treasuregot + 3;
                                                }else{
                                                    treasuregot = treasuregot2 - 3;
                                                }
                                            }
                                            //899644829460463616

                                            console.log(treasuregot);
                                            console.log(treasuregot2);
                                            const row = new Discord.MessageActionRow()
                                            .addComponents(
                                                new Discord.MessageButton()
                                                    .setCustomId('page1')
                                                    .setLabel('H')
                                                    .setStyle('PRIMARY'),
                                                new Discord.MessageButton()
                                                    .setCustomId('page2')
                                                    .setLabel('E')
                                                    .setStyle('PRIMARY'),
                                                new Discord.MessageButton()
                                                    .setCustomId('page3')
                                                    .setLabel('L')
                                                    .setStyle('PRIMARY'),
                                            );  

                                            const row2 = new Discord.MessageActionRow()
                                            .addComponents(
                                                new Discord.MessageButton()
                                                    .setCustomId('page4')
                                                    .setLabel('H')
                                                    .setStyle('PRIMARY'),
                                                new Discord.MessageButton()
                                                    .setCustomId('page5')
                                                    .setLabel('E')
                                                    .setStyle('PRIMARY'),
                                                new Discord.MessageButton()
                                                    .setCustomId('page6')
                                                    .setLabel('L')
                                                    .setStyle('PRIMARY'),
                                            );  

                                            const row3 = new Discord.MessageActionRow()
                                            .addComponents(
                                                new Discord.MessageButton()
                                                    .setCustomId('page7')
                                                    .setLabel('O')
                                                    .setStyle('PRIMARY'),
                                                new Discord.MessageButton()
                                                    .setCustomId('page8')
                                                    .setLabel('B')
                                                    .setStyle('PRIMARY'),
                                                new Discord.MessageButton()
                                                    .setCustomId('page9')
                                                    .setLabel('R')
                                                    .setStyle('PRIMARY'),
                                            );  

                                        
                                            const m = await message.channel.send({embeds:[embed],components:[row,row2,row3]});
                                            const ifilter = i => i.user.id === message.author.id;
                                            const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                                            const collector2 = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setAuthor(`${message.author.username}, You found the treasure!`);
                                            embed2.setDescription(`You won the treasure hunt and got <:UC:878195863413981214> ${number}`);
                                            embed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                            embed2.setTimestamp();
                                            embed2.setColor(`#30CC71`);

                                            const embed3 = new Discord.MessageEmbed();
                                            embed3.setAuthor(`${message.author.username}, You failed!`);
                                            embed3.setDescription(`You failed to find the treasure and lost <:UC:878195863413981214> ${number} amount!`);
                                            embed3.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                            embed3.setTimestamp();
                                            embed3.setColor('#ED4245');

                                            const embed4 = new Discord.MessageEmbed();
                                            embed4.setAuthor(`${message.author.username}, 1 attempt left!`);
                                            embed4.setDescription(`You chose the wronge one and You have 1 attempt left!`);
                                            embed4.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                            embed4.setTimestamp();
                                            embed4.setColor('#ED4245');

                                            let used = false;
                                            let count = 0;
                                            collector.on('collect', async i => {
                                                if(used !== true){
                                                    if (i.customId === 'page' + treasuregot) {
                                                        used = true;
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
                                                    }else if(i.customId === 'page' + treasuregot2){
                                                        used = true;
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
                                                    }
                                                    // else if(i.customId === 'page' + treasuregot3){
                                                    //     used = true;
                                                    //     const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    //         $inc:{
                                                    //             wallet:number,
                                                    //             networth:number 
                                                    //         }
                                                    //     });
                                                    //     i.component.setStyle("SUCCESS");
                                                    //     i.component.setEmoji('🏆')
                                                    //     i.component.setDisabled(true)
                                                    //     await  i.update({
                                                    //         components: [
                                                    //             new Discord.MessageActionRow().addComponents(i.component)
                                                                
                                                    //         ],
                                                    //         embeds:[
                                                    //             embed2
                                                    //         ]
                                                    //     });
                                                    // }
                                                    else{
                                                        if(count === 0 ){
                                                                count = count + 1;
                                                                await  i.update({
                                                                        embeds:[
                                                                            embed4
                                                                        ]
                                                                    });
                                                        }else if(count === 1){
                                                                count = count + 1;
                                                                used = true;
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
                                                    }
                                                }
                                            
                                            });             
                                            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`❌ Treasure Hunt Failed`);
                                            embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            var msec = n - lasttreasure;
                                            console.log(msec);
                                            var ss = Math.floor(msec / 1000);
                                            var second = 30 - ss;
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`Wait bro!`);
                                            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play treasure hunt again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                                            message.channel.send({embeds:[embed]});
                                
                                        }
                               
                            }else{
                                message.channel.send(`${message.author}, You can't play a treasure game of more than 50000 coins`);
                            }
                        }else{
                            message.channel.send(`${message.author}, You don't have that much money in your wallet!`);
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
                    embed.setTitle(`Please also mention a valid amount!`);
                    message.channel.send({embeds:[embed]});
                }
            }else{
                message.channel.send(`${message.author}, You don't have boat to use treasure command.`);
            }
        }else{
            message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
        }
    }
}