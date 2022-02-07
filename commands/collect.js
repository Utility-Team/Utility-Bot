const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'collect',
    async execute(message,args){
        const userData = await userModel.findOne({userID:message.author.id});
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
            async function addItem(item,emoji,quantity,category){
                let check = 0;
                if(userData.inventory){
                    for(var x = 0;x<=userData.inventory.length;x++){
                        if(userData.inventory[x]){
                                if(item === userData.inventory[x].name && check < 5){
                                    check = 5;
                                    let inventoryData = userData.inventory;
                                    inventoryData[x].quantity = parseInt(inventoryData[x].quantity) + parseInt(quantity);
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                    {
                                        inventory:inventoryData
                                    }    
                                    );
                                
                                    return;
                                }
                        }else if(x === userData.inventory.length & check < 5){
                            let inventoryData = await userData.inventory;
                            let newData = {
                            name:item,
                            emoji:emoji,
                            quantity:quantity,
                            category:category
                            }
                            inventoryData.push(newData);
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},
                            {
                                inventory:inventoryData
                            }
                            );
                            return;
    
                        }
                    }
                }else{
                        let newData = [{
                            name:item,
                            emoji:emoji,
                            quantity:quantity,
                            category:category
                        }]
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            inventory:newData
                        });
                    return;
                        
                }
            }
            if(userData.premium === 'enable'){  
                if(userData.collect !== 'true'){
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
                    let box_chance = Math.floor(Math.random() * 3);
                    console.log(box_chance);
                    if(box_chance === 0){
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Here is what you found!`);
                        embed.setThumbnail('https://www.linkpicture.com/q/117821919_gettyimages-1227145901-removebg-preview.png');
                        embed.addFields({name:`🔒 Lock (x 2)`,value:`**🧋 Bubble Tea (x 5)**`},
                        {name:`☕ Coffee (x 5)`,value:`**<:premium:929716370994769951> Premium Badge**`},
                        {name:`🍏 Green Apple (x 2)`,value:`**🐟 Common Fish(x 5)**`},
                        {name:`🍺 Beer (x 2)`,value:`**<:uc:922720730272137256> 50k**`},
                        );
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setColor(`#404EED`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                                networth:50000,
                                wallet:50000,
                                lock:2
                            },
                            collect:'true'
                        });
                        addItem('Bubble Tea','🧋',5,'food');
                        addItem('Green Apple','🍏',2,'food');
                        addItem('Common Fish','🐟',5,'fish');
                        addItem('Coffee','☕',5,'food');
                    }

                    if(box_chance === 1){

                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Here is what you found!`);
                        embed.setThumbnail('https://www.linkpicture.com/q/117821919_gettyimages-1227145901-removebg-preview.png');
                        embed.addFields({name:`🔒 Lock (x 2)`,value:`**🧋 Bubble Tea (x 5)**`},
                        {name:`☕ Coffee (x 2)`,value:`**<:premium:929716370994769951> Premium Badge**`},
                        {name:`🍏 Green Apple (x 2)`,value:`**🦈 Shark (x 2)**`},
                        {name:`🍺 Beer (x 2)`,value:`**<:uc:922720730272137256> 50k**`},
                        );
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setColor(`#404EED`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                                networth:50000,
                                wallet:50000,
                                lock:2
                            },
                            collect:'true'
                        });
                        addItem('Bubble Tea','🧋',5,'food');
                        addItem('Green Apple','🍏',2,'food');
                        addItem('Shark','🦈',2,'fish');
                        addItem('Coffee','☕',2,'food');
                    }

                    if(box_chance === 2){
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Here is what you found!`);
                        embed.setThumbnail('https://www.linkpicture.com/q/117821919_gettyimages-1227145901-removebg-preview.png');
                        embed.addFields({name:`🔒 Lock (x 2)`,value:`**🧋 Bubble Tea (x 5)**`},
                        {name:`☕ Coffee (x 2)`,value:`**<:premium:929716370994769951> Premium Badge**`},
                        {name:`Wolf (x 1)`,value:`**<:uc:922720730272137256> 50k**`},
                        );
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setColor(`#404EED`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                                networth:50000,
                                wallet:50000,
                                lock:2
                            },
                            collect:'true'
                        });
                        addItem('Bubble Tea','🧋',5,'food');
                        addItem('Wolf','',1,'hunt');
                        addItem('Shark','🦈',2,'fish');
                        addItem('Coffee','☕',2,'food');

                    }
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, you have already used collect command!`);
                    embed.setColor('#025CFF');
                    message.channel.send({embeds:[embed]});
                }
                
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Premium required`);
                embed.setDescription(`Dear ${message.author}, the premium subscription of the bot is out! which will give you premium experience and you will get exclusive commands and less cool down time and more.`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setColor(`#404EED`);
                embed.setTimestamp();
                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel('Utility Premium')
                        .setStyle('LINK')
                        .setEmoji('<:patreonpremium:934410962990141440>')
                        .setURL('https://www.patreon.com/Utility?fan_landing=true')
                );
                message.channel.send({embeds:[embed],components:[row]});
            }
        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
        }
    }
}