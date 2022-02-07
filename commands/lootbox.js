const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'lootbox',
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
            if(userData.premium === 'enable'){
                if(userData.premiumtype === 2 || userData.premiumtype === 3){
                    let lootbox;
                    if(userData.lootbox){
                        lootbox = userData.lootbox;
                    }else{
                        lootbox = 0;
                    }
                    let lootboxlimit;
                    if(userData.premiumtype === 2){
                        lootboxlimit = 1;
                    }else if(userData.premiumtype === 3){
                        lootboxlimit = 2;
                    }
                    console.log(lootboxlimit);    
                    if(parseInt(lootboxlimit) > parseInt(lootbox)){
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
                        let avatar;
                        if(userData.avatar){
                            avatar = userData.avatar;
                        }else{
                            avatar = message.author.displayAvatarURL();
                        }
                        let box_chance = Math.floor(Math.random() * 3);
                        if(box_chance === 0){
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Opened Lootbox!`);
                            embed.setThumbnail('https://www.linkpicture.com/q/magic-box.png');
                            embed.addFields({name:`🔒 Lock (x 5)`,value:`**🧋 Bubble Tea (x 2)**`},
                            {name:`🍏 Green Apple (x 2)`,value:`**🥇 Gold Medal (x 1)**`},
                            {name:`<:carkey:939817013721833552> Car Key (x 1)`,value:`**🐟 Common Fish (x 2)**`},
                            {name:`🐠 Uncommon Fish (x 5)`,value:`**<:ancientcoin:903586746640519178> Ancient Coin (x 2)**`},
                            {name:`Wolf (x 1)`,value:`**🎣 Fishing Rod (x 1)**`},
                            {name:`<:rarecoin:939818593305108491> Rare Coin (x 1)`,value:`**<:creditpoint:925956240209772564> Credit Points (x 10k)**`},
                            {name:`<:santacap:925292343291170826> Santa Cap (x 2)`,value:`**☕ Coffee (x 5)**`},
                            {name:`<:smartphone:918057432264101978> Smartphone (x 1)`,value:`**<:uc:922720730272137256> 150k**`}
                            );
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setColor(`#FAE979`);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});

                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    networth:150000,
                                    wallet:150000,
                                    lootbox:1,
                                    lock:5,
                                    fishingrod:1,
                                    creditpoints:10000
                                }
                            });
                            addItem('Bubble Tea','🧋',2,'food');
                            addItem('Green Apple','🍏',2,'food');
                            addItem('Car Key','<:carkey:939817013721833552>',1,'collectables');
                            addItem('Uncommon Fish','🐠',5,'fish');
                            addItem('Common Fish','🐟',2,'fish');
                            addItem('Ancient Coin','<:ancientcoin:903586746640519178>',2,'dig');
                            addItem('Wolf','',1,'hunt');
                            addItem('Rare Coin','<:rarecoin:939818593305108491>',1,'collectables');
                            addItem('Santa Cap','<:santacap:925292343291170826>',2,'collectables');
                            addItem('Coffee','☕',5,'food');
                            addItem('Smartphone','<:smartphone:918057432264101978>',1,'gadgets');




                            
                            
                        }

                        if(box_chance === 1){

                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Opened Lootbox!`);
                            embed.setThumbnail('https://www.linkpicture.com/q/magic-box.png');
                            embed.addFields({name:`🔒 Lock (x 5)`,value:`**🧋 Bubble Tea (x 2)**`},
                            {name:`🍏 Green Apple (x 2)`,value:`**🥇 Gold Medal (x 1)**`},
                            {name:`<:carkey:939817013721833552> Car Key (x 1)`,value:`**🐟 Common Fish (x 2)**`},
                            {name:`🐠 Uncommon Fish (x 5)`,value:`**<:ancientcoin:903586746640519178> Ancient Coin (x 2)**`},
                            {name:`🦈 Shark (x 1)`,value:`**🎣 Fishing Rod (x 1)**`},
                            {name:`<:rarecoin:939818593305108491> Rare Coin (x 1)`,value:`**<:laptop:918059938612404255> Laptop (x 1)**`},
                            {name:`<:santacap:925292343291170826> Santa Cap (x 2)`,value:`**☕ Coffee (x 5)**`},
                            {name:`<:creditpoint:925956240209772564> Credit Points (x 10k)`,value:`**<:uc:922720730272137256> 150k**`}
                            );
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setColor(`#FAE979`);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});

                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    networth:150000,
                                    wallet:150000,
                                    lootbox:1,
                                    lock:5,
                                    fishingrod:1,
                                    creditpoints:10000
                                }
                            });
                            addItem('Bubble Tea','🧋',2,'Food');
                            addItem('Green Apple','🍏',2,'Food');
                            addItem('Gold Medal','🥇',1,'Jewellery');
                            addItem('Car Key','<:carkey:939817013721833552>',1,'collectables');
                            addItem('Uncommon Fish','🐠',5,'fish');
                            addItem('Common Fish','🐟',2,'fish');
                            addItem('Ancient Coin','<:ancientcoin:903586746640519178>',2,'dig');
                            addItem('Shark','🦈',1,'fish');
                            addItem('Rare Coin','<:rarecoin:939818593305108491>',1,'collectables');
                            addItem('Santa Cap','<:santacap:925292343291170826>',2,'collectables');
                            addItem('Coffee','☕',5,'food');
                            addItem('Laptop','<:laptop:918059938612404255>',1,'gadgets');

                        }

                        if(box_chance === 2){
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Opened Lootbox!`);
                            embed.setThumbnail('https://www.linkpicture.com/q/magic-box.png');
                            embed.addFields({name:`🔒 Lock (x 5)`,value:`**🧋 Bubble Tea (x 2)**`},
                            {name:`🍏 Green Apple (x 1)`,value:`**🍕 Pizza Slice (x 1)**`},
                            {name:`🦈 Shark (x 2)`,value:`**<:rifle:883578413888184350> Hunting Rifle (x 1)**`},
                            {name:`<:rarecoin:939818593305108491> Rare Coin (x 1)`,value:`**<:santacap:925292343291170826> Santa Cap (x 2)**`},
                            {name:`☕ Coffee (x 2)`,value:`**<:spideybadge:918017281106255922> Spidey Badge (x 1)**`},
                            {name:`<:vrglass:939429040245334036> VR Glasses (x 1)`,value:`**🥇 Gold Medal (x 1**)`},
                            {name:`<:creditpoint:925956240209772564> Credit Points (x 10k)`,value:`**<:uc:922720730272137256> 150k**`}
                            );
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setColor(`#FAE979`);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});

                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    networth:150000,
                                    wallet:150000,
                                    lootbox:1,
                                    lock:5,
                                    huntingrifle:1,
                                    creditpoints:10000
                                }
                            });
                            addItem('Bubble Tea','🧋',2,'food');
                            addItem('Green Apple','🍏',1,'food');
                            addItem('Pizza Slice','🍕',1,'food');
                            addItem('Gold Medal','🥇',1,'Jewellery');
                            addItem('Uncommon Fish','🐠',5,'fish');
                            addItem('Ancient Coin','<:ancientcoin:903586746640519178>',2,'dig');
                            addItem('Shark','🦈',2,'fish');
                            addItem('Rare Coin','<:rarecoin:939818593305108491>',1,'collectables');
                            addItem('Santa Cap','<:santacap:925292343291170826>',2,'collectables');
                            addItem('Coffee','☕',5,'food');
                            addItem('VR Glasses','<:vrglass:939429040245334036>',1,'gadgets');
                        }
                    }else{
                        let embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, you have already collected all your lootboxes`);
                        embed.setColor('#025CFF');
                        message.channel.send({embeds:[embed]});
                    }
                }else{
                   const embed  = new Discord.MessageEmbed();
                   embed.setTitle(`Premium tier 2 or above required!`);
                   embed.setDescription(`${message.author.username} you require premium tier 2 or above for this command`);
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