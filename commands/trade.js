const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
module.exports={
    name:'trade',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        const target = message.mentions.users.first();
        let argsone;
        let argsone_name;
        let argstwo;
        let argstwo_name;
        let argsthree
        let argsthree_name;
        if(args[1]){
          argsone = args[1];
          argsone_name = argsone.toLowerCase();
        }
        if(args[2]){
          argstwo = args[2];
          argstwo_name = argstwo.toLowerCase();
        }
        if(args[3]){
          argsthree = args[3];
          argsthree_name = argsthree.toLowerCase(); 
        }
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
            if(target){
              let targetData = await userModel.findOne({userID:target.id});
              if(targetData){
                 if(argsone_name === 'beer'){
                    let number = args[2];
                    let price = args[3];
                   if(price){
                        if(!isNaN(price) && Math.sign(price) === 1){
                            if(price % 1=== 0){
                                if(targetData.wallet >= price){
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.beer >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let totalbeer = number;
                                                    let cost = price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totalbeer} :beer: beer from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totalbeer} :beer: beer from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                beer:-totalbeer,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                beer:totalbeer,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} beer to trade`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention number of beer you want to trade!`);
                                        embed.setDescription(`example - trade @name beer quantity price`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                    message.channel.send({embeds:[embed]});
                                } 
                         
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                            message.channel.send({embeds:[embed]});
                        }
                  
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention price of beer you want to trade!`);
                        embed.setDescription(`example - trade @name beer quantity price`);
                        message.channel.send({embeds:[embed]});
                    }

                   
                     
                 }else if(argsone_name === 'coffee'){
                    let number = args[2];
                    let price = args[3];
                    if(price){
                        if(!isNaN(price) && Math.sign(price) === 1){
                            if(price % 1=== 0){
                              if(targetData.wallet >= price){
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.coffee >= number){
                                                let botData = await botModel.findOne({botid:1});
                                                let coffee = botData.coffeevalue;
                                                let totalcoffee = number;
                                                let cost = price;
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(cost)  <= 1000000000){
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totalcoffee} :coffee: coffee from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totalcoffee} :coffee: coffee from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                coffee:-totalcoffee,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                coffee:totalcoffee,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} coffee to trade`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention number of coffee you want to trade!`);
                                        embed.setDescription(`example - trade @name coffee quantity price`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                    message.channel.send({embeds:[embed]});
                                }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                            message.channel.send({embeds:[embed]});
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention price of coffee you want to trade!`);
                        embed.setDescription(`example - trade @name coffee quantity price`);
                        message.channel.send({embeds:[embed]});
                    }
                   
                     
                 }if(argsone_name === 'pizza' && argstwo_name === 'slice'){
                    let number = args[3];
                    let price = args[4];
                    if(price){
                        if(!isNaN(price) && Math.sign(price) === 1){
                            if(price % 1=== 0){
                              if(targetData.wallet >= price){
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.pizzaslice >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let pizza = botData.pizzavalue;
                                                    let totalpizza = number;
                                                    let cost = price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totalpizza} :pizza: pizza slice from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totalpizza} :pizza: pizza slice from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                pizzaslice:-totalpizza,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                pizzaslice:totalpizza,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} pizza slice to trade`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention number of pizza slice you want to trade!`);
                                        embed.setDescription(`example - trade @name pizza slice quantity price`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                    message.channel.send({embeds:[embed]});
                                }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                            message.channel.send({embeds:[embed]});
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention price of pizza slice you want to trade!`);
                        embed.setDescription(`example - trade @name pizza slice quantity price`);
                        message.channel.send({embeds:[embed]});
                    }
                  
                     
                 }if(argsone_name === 'green' && argstwo_name === 'apple'){
                    let number = args[3];
                    let price = args[4];
                    if(price){
                        if(!isNaN(price) && Math.sign(price) === 1){
                            if(price % 1=== 0){
                                if(targetData.wallet>= price){
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.greenapple >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let apple = botData.greenvalue;
                                                    let totalapple = number;
                                                    let cost = price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totalapple} :green_apple: green apple from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totalapple} :green_apple: green apple from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                greenapple:-totalapple,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                greenapple:totalapple,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} green apple to trade`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention number of green apple you want to trade!`);
                                        embed.setDescription(`example - trade @name green apple quantity price`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                    message.channel.send({embeds:[embed]});
                                }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                               
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                            message.channel.send({embeds:[embed]});
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention price of green apple you want to trade!`);
                        embed.setDescription(`example - trade @name green apple quantity price`);
                        message.channel.send({embeds:[embed]});
                    }
                  
                     
                 }if(argsone_name === 'lock'){
                    let number = args[2];
                    let price = args[3];
                    if(price){
                        if(!isNaN(price) && Math.sign(price) === 1){
                            if(price % 1=== 0){
                              if(targetData.wallet>= price){
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.lock >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let lock = botData.lockvalue;
                                                    let totallock = number;
                                                    let cost = price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totallock} :lock: lock from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totallock} :lock: lock from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                lock:-totallock,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                lock:totallock,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} lock to sell`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention number of lock you want to trade!`);
                                        embed.setDescription(`example - trade @name lock quantity price`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                    message.channel.send({embeds:[embed]});
                                }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                            message.channel.send({embeds:[embed]});
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention price of lock you want to trade!`);
                        embed.setDescription(`example - trade @name lock quantity price`);
                        message.channel.send({embeds:[embed]});
                    }
                   
                     
                 }if(argsone_name === 'key'){
                    let number = args[2];
                    let price = args[3];
                    if(price){
                        if(!isNaN(price) && Math.sign(price) === 1){
                            if(price % 1=== 0){
                              if(targetData.wallet>= price){
                                if(number){
                                    if(!isNaN(number) && Math.sign(number) === 1){
                                      if(number % 1=== 0){
                                          if(userData.key >= number){
                                            if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                let botData = await botModel.findOne({botid:1});
                                                let key = botData.keyvalue;
                                                let totalkey = number;
                                                let cost = price;
                                                const embed = new Discord.MessageEmbed();
                                                embed.setDescription(`${target}, Do you wanna buy ${totalkey} :key: key from ${message.author} for ${cost}. Answer with yes or no.`)
                                                const row = new Discord.MessageActionRow()
                                                .addComponents(
                                                    new Discord.MessageButton()
                                                        .setCustomId('yes')
                                                        .setLabel('Yes')
                                                        .setStyle('SUCCESS'),
                                                    new Discord.MessageButton()
                                                        .setCustomId('no')
                                                        .setLabel('No')
                                                        .setStyle('DANGER')
                                                    
                                                );
                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Purchased`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${target}, You have successfully purchased ${totalkey} :key: key from ${message.author} for ${cost}`);
                                                embed2.setTimestamp();
                                                
                                                const m = await message.channel.send({embeds:[embed],components:[row]});
                                                const ifilter = i => i.user.id === target.id;
                            
                                                const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                            
                                                collector.on('collect', async i => {
                                                    if (i.customId === 'yes') {
                                                        console.log(target.id);
                                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                            $inc:{
                                                            key:-totalkey,
                                                            wallet:cost,
                                                            networth:cost
                                                            },
                                                        });
                                                        const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                            $inc:{
                                                            key:totalkey,
                                                            wallet:-cost,
                                                            networth:-cost
                                                            },
                                                        });
                            
                                                        await i.update({ embeds:[embed2],components:[]});
                                                    }else if(i.customId==='no'){
                                                        await i.update({components: [] });
                                                        message.channel.send(`${message.author}, ${target.username} said no!`)
                                                    }
                                                });
                            
                                                collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`❌ Trade Failed`);
                                                embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                message.channel.send({embeds:[embed]});s
                                            }
                                            
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have ${number} key to sell`);
                                            message.channel.send({embeds : [embed]});
                                        }
                                      }else{
                                          const embed = new Discord.MessageEmbed();
                                          embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                          message.channel.send({embeds:[embed]});
                                      }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${message.author.username}, Please mention number of key you want to trade!`);
                                    embed.setDescription(`example - trade @name key quantity price`);
                                    message.channel.send({embeds:[embed]});
                                }
                              }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                message.channel.send({embeds:[embed]});
                              }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                            message.channel.send({embeds:[embed]});
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention price of key you want to trade!`);
                        embed.setDescription(`example - trade @name key quantity price`);
                        message.channel.send({embeds:[embed]});
                    }
                   
                     
                 }if(argsone_name === 'gold' && argstwo_name === 'trophy'){
                    let number = args[3];
                    let price = args[4];
                    if(price){
                        if(!isNaN(price) && Math.sign(price) === 1){
                            if(price % 1=== 0){
                              if(targetData.wallet>= price){
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.goldtrophy >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let trophy = botData.trophyvalue;
                                                    let totaltrophy = number;
                                                    let cost =  price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totaltrophy} :trophy: gold trophy from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totaltrophy} :trophy: gold trophy from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                goldtrophy:-totaltrophy,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                goldtrophy:totaltrophy,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} gold trophy to sell`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention number of gold trophy you want to trade!`);
                                        embed.setDescription(`example - trade @name gold trophy quantity price`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                    message.channel.send({embeds:[embed]});
                                }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                            message.channel.send({embeds:[embed]});
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention price of gold trophy you want to trade!`);
                        embed.setDescription(`example - trade @name gold trophy quantity price`);
                        message.channel.send({embeds:[embed]});
                    }
               
                     
                 }if(argsone_name === 'gold' && argstwo_name === 'medal'){
                    let number = args[3];
                    let price = args[4];
                    if(price){
                        if(!isNaN(price) && Math.sign(price) === 1){
                            if(price % 1=== 0){
                              if(targetData.wallet>= price){
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.goldmedal >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let goldmedal = botData.goldvalue;
                                                    let totalgold = number;
                                                    let cost = price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totalgold} :first_place: gold medal from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totalgold} :first_place: gold medal from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                goldmedal:-totalgold,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                goldmedal:totalgold,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} gold medal to sell`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention number of gold medal you want to trade!`);
                                        embed.setDescription(`example - trade @name gold medal quantity price`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                    message.channel.send({embeds:[embed]});
                                }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                            message.channel.send({embeds:[embed]});
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention price of gold medal you want to trade!`);
                        embed.setDescription(`example - trade @name gold medal quantity price`);
                        message.channel.send({embeds:[embed]});
                    }
                   
                     
                 }if(argsone_name === 'silver' && argstwo_name === 'medal'){
                    let number = args[3];
                    let price = args[4];
                    if(price){
                        if(!isNaN(price) && Math.sign(price) === 1){
                            if(price % 1=== 0){
                              if(targetData.wallet>= price){
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.silvermedal >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let silvermedal = botData.silvervalue
                                                    ;
                                                    let totalsilver = number;
                                                    let cost = price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totalsilver} 🥈 silver medal from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totalsilver} 🥈 silver medal from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                silvermedal:-totalsilver,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                silvermedal:totalsilver,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} silver medal to trade`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention number of silver medal you want to trade!`);
                                        embed.setDescription(`example - trade @name silver medal quantity price`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                    message.channel.send({embeds:[embed]});
                                }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                            message.channel.send({embeds:[embed]});
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention price of silver medal you want to trade!`);
                        embed.setDescription(`example - trade @name gold medal quantity price`);
                        message.channel.send({embeds:[embed]});
                    }
        
                }else if(argsone_name === 'hunting' && argstwo_name === 'rifle'){
                     let number = args[3];
                     let price = args[4];
                        if(price){
                            if(!isNaN(price) && Math.sign(price) === 1){
                                if(price % 1=== 0){
                                    if(targetData.wallet>= price){
                                        if(number){
                                            if(!isNaN(number) && Math.sign(number) === 1){
                                            if(number % 1=== 0){
                                                if(userData.huntingrifle >= number){
                                                    if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                        let botData = await botModel.findOne({botid:1});
                                                        let huntingrifle = botData.huntgun
                                                        ;
                                                        let totalrifle = number;
                                                        let cost = price;
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setDescription(`${target}, Do you wanna buy ${totalrifle} <:rifle:883578413888184350> hunting rifle from ${message.author} for ${cost}. Answer with yes or no.`)
                                                        const row = new Discord.MessageActionRow()
                                                        .addComponents(
                                                            new Discord.MessageButton()
                                                                .setCustomId('yes')
                                                                .setLabel('Yes')
                                                                .setStyle('SUCCESS'),
                                                            new Discord.MessageButton()
                                                                .setCustomId('no')
                                                                .setLabel('No')
                                                                .setStyle('DANGER')
                                                            
                                                        );
                                                        const embed2 = new Discord.MessageEmbed();
                                                        embed2.setTitle(`✅ Successfully Purchased`);
                                                        embed2.setColor(`#30CC71`);
                                                        embed2.setDescription(`${target}, You have successfully purchased ${totalrifle} <:rifle:883578413888184350> hunting rifle from ${message.author} for ${cost}`);
                                                        embed2.setTimestamp();
                                                        
                                                        const m = await message.channel.send({embeds:[embed],components:[row]});
                                                        const ifilter = i => i.user.id === target.id;
                                    
                                                        const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                    
                                                        collector.on('collect', async i => {
                                                            if (i.customId === 'yes') {
                                                                console.log(target.id);
                                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                    $inc:{
                                                                    huntingrifle:-totalrifle,
                                                                    wallet:cost,
                                                                    networth:cost
                                                                    },
                                                                });
                                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                    $inc:{
                                                                    huntingrifle:totalrifle,
                                                                    wallet:-cost,
                                                                    networth:-cost
                                                                    },
                                                                });
                                    
                                                                await i.update({ embeds:[embed2],components:[]});
                                                            }else if(i.customId==='no'){
                                                                await i.update({components: [] });
                                                                message.channel.send(`${message.author}, ${target.username} said no!`)
                                                            }
                                                        });
                                    
                                                        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                    }else{
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setTitle(`❌ Trade Failed`);
                                                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                        message.channel.send({embeds:[embed]});
                                                    }
                                                    
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`${message.author.username}, You don't have ${totalrifle} hunting rifle to trade`);
                                                    message.channel.send({embeds : [embed]});
                                                }
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                                message.channel.send({embeds:[embed]});
                                            }
                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                                message.channel.send({embeds:[embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention number of hunting rifle you want to trade!`);
                                            embed.setDescription(`example - trade @name hunting rifle quantity price`);
                                            message.channel.send({embeds:[embed]});
                                        }            
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                    message.channel.send({embeds:[embed]});
                                }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention price of hunting rifle you want to trade!`);
                            embed.setDescription(`example - trade @name hunting rifle quantity price`);
                            message.channel.send({embeds:[embed]});
                        }
                                            
                }else if(argsone_name === 'fishing' && argstwo_name === 'rod'){
                    let number = args[3];
                    let price = args[4];
                       if(price){
                           if(!isNaN(price) && Math.sign(price) === 1){
                               if(price % 1=== 0){
                                   if(targetData.wallet>= price){
                                       if(number){
                                           if(!isNaN(number) && Math.sign(number) === 1){
                                           if(number % 1=== 0){
                                               if(userData.fishingrod >= number){
                                                 if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                            let botData = await botModel.findOne({botid:1});
                                                            let fishingrod = botData.fishingpole
                                                            ;
                                                            let totalrod = number;
                                                            let cost = price;
                                                            const embed = new Discord.MessageEmbed();
                                                            embed.setDescription(`${target}, Do you wanna buy ${totalrod} :fishing_pole_and_fish: fishing rod from ${message.author} for ${cost}. Answer with yes or no.`)
                                                            const row = new Discord.MessageActionRow()
                                                            .addComponents(
                                                                new Discord.MessageButton()
                                                                    .setCustomId('yes')
                                                                    .setLabel('Yes')
                                                                    .setStyle('SUCCESS'),
                                                                new Discord.MessageButton()
                                                                    .setCustomId('no')
                                                                    .setLabel('No')
                                                                    .setStyle('DANGER')
                                                                
                                                            );
                                                            const embed2 = new Discord.MessageEmbed();
                                                            embed2.setTitle(`✅ Successfully Purchased`);
                                                            embed2.setColor(`#30CC71`);
                                                            embed2.setDescription(`${target}, You have successfully purchased ${totalrod} :fishing_pole_and_fish: fishing rod from ${message.author} for ${cost}`);
                                                            embed2.setTimestamp();
                                                            
                                                            const m = await message.channel.send({embeds:[embed],components:[row]});
                                                            const ifilter = i => i.user.id === target.id;
                                        
                                                            const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                        
                                                            collector.on('collect', async i => {
                                                                if (i.customId === 'yes') {
                                                                    console.log(target.id);
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        $inc:{
                                                                        fishingrod:-totalrod,
                                                                        wallet:cost,
                                                                        networth:cost
                                                                        },
                                                                    });
                                                                    const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                        $inc:{
                                                                        fishingrod:totalrod,
                                                                        wallet:-cost,
                                                                        networth:-cost
                                                                        },
                                                                    });
                                        
                                                                    await i.update({ embeds:[embed2],components:[]});
                                                                }else if(i.customId==='no'){
                                                                    await i.update({components: [] });
                                                                    message.channel.send(`${message.author}, ${target.username} said no!`);
                                                                }
                                                            });
                                        
                                                            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                    }else{
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setTitle(`❌ Trade Failed`);
                                                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                        message.channel.send({embeds:[embed]});
                                                    }
                                               }else{
                                                   const embed = new Discord.MessageEmbed();
                                                   embed.setTitle(`${message.author.username}, You don't have ${number} fishing rod to trade`);
                                                   message.channel.send({embeds : [embed]});
                                               }
                                           }else{
                                               const embed = new Discord.MessageEmbed();
                                               embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                               message.channel.send({embeds:[embed]});
                                           }
                                           }else{
                                               const embed = new Discord.MessageEmbed();
                                               embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                               message.channel.send({embeds:[embed]});
                                           }
                                       }else{
                                           const embed = new Discord.MessageEmbed();
                                           embed.setTitle(`${message.author.username}, Please mention number of fishing rod you want to trade!`);
                                           embed.setDescription(`example - trade @name fishing rod quantity price`);
                                           message.channel.send({embeds:[embed]});
                                       }            
                                   }else{
                                       const embed = new Discord.MessageEmbed();
                                       embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                       message.channel.send({embeds:[embed]});
                                   }
                               }else{
                                   const embed = new Discord.MessageEmbed();
                                   embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                                   message.channel.send({embeds:[embed]});
                               }
                           }else{
                               const embed = new Discord.MessageEmbed();
                               embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                               message.channel.send({embeds:[embed]});
                           }
                       }else{
                           const embed = new Discord.MessageEmbed();
                           embed.setTitle(`${message.author.username}, Please mention price of fishing rod you want to trade!`);
                           embed.setDescription(`example - trade @name fishing rod quantity price`);
                           message.channel.send({embeds:[embed]});
                       }
                                           
               }else if(argsone_name === 'cryptocoin'){
                let number = args[2];
                let price = args[3];
                   if(price){
                       if(!isNaN(price) && Math.sign(price) === 1){
                           if(price % 1=== 0){
                               if(targetData.wallet>= price){
                                   if(number){
                                       if(!isNaN(number) && Math.sign(number) === 1){
                                       if(number % 1=== 0){
                                           if(userData.cryptocoin >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let totalcrypto = number;
                                                    let cost = price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totalcrypto} cryptocoin from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totalcrypto} cryptocoin from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                cryptocoin:-totalcrypto,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                cryptocoin:totalcrypto,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                           }else{
                                               const embed = new Discord.MessageEmbed();
                                               embed.setTitle(`${message.author.username}, You don't have ${number} cryptocoin to trade`);
                                               message.channel.send({embeds : [embed]});
                                           }
                                       }else{
                                           const embed = new Discord.MessageEmbed();
                                           embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                           message.channel.send({embeds:[embed]});
                                       }
                                       }else{
                                           const embed = new Discord.MessageEmbed();
                                           embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                           message.channel.send({embeds:[embed]});
                                       }
                                   }else{
                                       const embed = new Discord.MessageEmbed();
                                       embed.setTitle(`${message.author.username}, Please mention number of cryptocoin you want to trade!`);
                                       embed.setDescription(`example - trade @name cryptocoin quantity price`);
                                       message.channel.send({embeds:[embed]});
                                   }            
                               }else{
                                   const embed = new Discord.MessageEmbed();
                                   embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                                   message.channel.send({embeds:[embed]});
                               }
                           }else{
                               const embed = new Discord.MessageEmbed();
                               embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                               message.channel.send({embeds:[embed]});
                           }
                       }else{
                           const embed = new Discord.MessageEmbed();
                           embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                           message.channel.send({embeds:[embed]});
                       }
                   }else{
                       const embed = new Discord.MessageEmbed();
                       embed.setTitle(`${message.author.username}, Please mention price of cryptocoin you want to trade!`);
                       embed.setDescription(`example - trade @name cryptocoin quantity price`);
                       message.channel.send({embeds:[embed]});
                   }
                                       
           }else if(argsone_name === 'bubble' && argstwo_name === 'tea'){
            let number = args[3];
            let price = args[4];
               if(price){
                   if(!isNaN(price) && Math.sign(price) === 1){
                       if(price % 1=== 0){
                           if(targetData.wallet>= price){
                               if(number){
                                   if(!isNaN(number) && Math.sign(number) === 1){
                                   if(number % 1=== 0){
                                       if(userData.bubbletea >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let totalbubble = number;
                                                    let cost = price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totalbubble} 🧋bubble tea from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totalbubble} bubble tea from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                bubbletea:-totalbubble,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                bubbletea:totalbubble,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));

                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                       }else{
                                           const embed = new Discord.MessageEmbed();
                                           embed.setTitle(`${message.author.username}, You don't have ${number} bubble tea to trade`);
                                           message.channel.send({embeds : [embed]});
                                       }
                                   }else{
                                       const embed = new Discord.MessageEmbed();
                                       embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                       message.channel.send({embeds:[embed]});
                                   }
                                   }else{
                                       const embed = new Discord.MessageEmbed();
                                       embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                       message.channel.send({embeds:[embed]});
                                   }
                               }else{
                                   const embed = new Discord.MessageEmbed();
                                   embed.setTitle(`${message.author.username}, Please mention number of bubble tea you want to trade!`);
                                   embed.setDescription(`example - trade @name bubble tea quantity price`);
                                   message.channel.send({embeds:[embed]});
                               }            
                           }else{
                               const embed = new Discord.MessageEmbed();
                               embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                               message.channel.send({embeds:[embed]});
                           }
                       }else{
                           const embed = new Discord.MessageEmbed();
                           embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                           message.channel.send({embeds:[embed]});
                       }
                   }else{
                       const embed = new Discord.MessageEmbed();
                       embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                       message.channel.send({embeds:[embed]});
                   }
               }else{
                   const embed = new Discord.MessageEmbed();
                   embed.setTitle(`${message.author.username}, Please mention price of bubble tea you want to trade!`);
                   embed.setDescription(`example - trade @name bubble tea quantity price`);
                   message.channel.send({embeds:[embed]});
               } 
           }else if(argsone_name === 'ancient' && argstwo_name === 'coin'){
            let number = args[3];
            let price = args[4];
               if(price){
                   if(!isNaN(price) && Math.sign(price) === 1){
                       if(price % 1=== 0){
                           if(targetData.wallet>= price){
                               if(number){
                                   if(!isNaN(number) && Math.sign(number) === 1){
                                   if(number % 1=== 0){
                                       if(userData.ancientcoin >= number){
                                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(price) <= 1000000000){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let totalancient = number;
                                                    let cost = price;
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy ${totalancient} <:ancientcoin:903586746640519178> Ancient Coin from ${message.author} for ${cost}. Answer with yes or no.`)
                                                    const row = new Discord.MessageActionRow()
                                                    .addComponents(
                                                        new Discord.MessageButton()
                                                            .setCustomId('yes')
                                                            .setLabel('Yes')
                                                            .setStyle('SUCCESS'),
                                                        new Discord.MessageButton()
                                                            .setCustomId('no')
                                                            .setLabel('No')
                                                            .setStyle('DANGER')
                                                        
                                                    );
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle(`✅ Successfully Purchased`);
                                                    embed2.setColor(`#30CC71`);
                                                    embed2.setDescription(`${target}, You have successfully purchased ${totalancient} <:ancientcoin:903586746640519178> Ancient Coin from ${message.author} for ${cost}`);
                                                    embed2.setTimestamp();
                                                    
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            console.log(target.id);
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                $inc:{
                                                                ancientcoin:-totalancient,
                                                                wallet:cost,
                                                                networth:cost
                                                                },
                                                            });
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                ancientcoin:totalancient,
                                                                wallet:-cost,
                                                                networth:-cost
                                                                },
                                                            });
                                
                                                            await i.update({ embeds:[embed2],components:[]});
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${target.username} said no!`)
                                                        }
                                                    });
                                
                                                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));

                                                }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`❌ Trade Failed`);
                                                    embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                                                    message.channel.send({embeds:[embed]});
                                                }
                                                
                                       }else{
                                           const embed = new Discord.MessageEmbed();
                                           embed.setTitle(`${message.author.username}, You don't have ${number} ancient coin to trade`);
                                           message.channel.send({embeds : [embed]});
                                       }
                                   }else{
                                       const embed = new Discord.MessageEmbed();
                                       embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                       message.channel.send({embeds:[embed]});
                                   }
                                   }else{
                                       const embed = new Discord.MessageEmbed();
                                       embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                       message.channel.send({embeds:[embed]});
                                   }
                               }else{
                                   const embed = new Discord.MessageEmbed();
                                   embed.setTitle(`${message.author.username}, Please mention number of ancient coin you want to trade!`);
                                   embed.setDescription(`example - trade @name ancient coin quantity price`);
                                   message.channel.send({embeds:[embed]});
                               }            
                           }else{
                               const embed = new Discord.MessageEmbed();
                               embed.setTitle(`${target.username} doesn't have enough money in wallet to trade!`);
                               message.channel.send({embeds:[embed]});
                           }
                       }else{
                           const embed = new Discord.MessageEmbed();
                           embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                           message.channel.send({embeds:[embed]});
                       }
                   }else{
                       const embed = new Discord.MessageEmbed();
                       embed.setTitle(`${message.author.username}, Please mention a valid price!`);
                       message.channel.send({embeds:[embed]});
                   }
               }else{
                   const embed = new Discord.MessageEmbed();
                   embed.setTitle(`${message.author.username}, Please mention price of ancient coin you want to trade!`);
                   embed.setDescription(`example - trade @name ancient coin quantity price`);
                   message.channel.send({embeds:[embed]});
               }
           }


              }else{
                  message.channel.send(`${target}, You haven't joined the currency game. Please use join command to join the game.`);
              }
            }
        }else{
            message.channel.send(`${message.author}, You haven't joined the currency game. Please use join command to join the game.`);
        }
    }
}