const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'trade',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
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
            //algorithm to send traded item to target
            async function sendTrade(target,targetData,item,emoji,quantity,category,price){
                let check = 0;
                if(targetData.wallet >= price){
                    for(var x = 0;x<= targetData.inventory.length;x++){
                        if(targetData.inventory[x]){
                            if(targetData.inventory[x].name === item){
                                if(item === targetData.inventory[x].name && check<5){
                                    check = 5;
                                    let inventoryData = targetData.inventory;
                                    inventoryData[x].quantity = parseInt(inventoryData[x].quantity) + parseInt(quantity);
                                    const response = await userModel.findOneAndUpdate({userID:targetData.userID},
                                    {
                                        $inc:{
                                            networth:-price,
                                            wallet:-price
                                        },
                                        inventory:inventoryData
                                    }    
                                    );      
                                    return;
                                }
                            }
                            if(x === targetData.inventory.length -1 && check<5){
                                check = 10;
                                let inventoryData = targetData.inventory;
                                let newData = {
                                    name:item,
                                    emoji:emoji,
                                    quantity:quantity,
                                    category:category
                                }
                                inventoryData.push(newData);
                                const response = await userModel.findOneAndUpdate({userID:targetData.userID},{
                                    $inc:{
                                        networth:-price,
                                        wallet:-price
                                    },
                                    inventory:inventoryData
                                });
                            }
                        }else if(targetData.inventory.length === 0){
                            let inventoryData = targetData.inventory;
                            let newData = {
                                name:item,
                                emoji:emoji,
                                quantity:quantity,
                                category:category
                            }
                            inventoryData.push(newData);
                            const response = await userModel.findOneAndUpdate({userID:targetData.userID},{
                                $inc:{
                                    networth:-price,
                                    wallet:-price
                                },
                                inventory:inventoryData
                            });
                        }
                    }
                }else{
                    message.channel.send(`${target} you don't have enough money to buy this item!`);
                    return;
                }
            }
            //trade algorithm
            async function trade(target,targetData,item,emoji,quantity,category,price){
                const memberTarget = message.guild.members.cache.get(target.id);
                let check = 0;
                if(userData.inventory){
                    for(var x = 0;x<=userData.inventory.length;x++){
                        if(userData.inventory[x]){
                            if(userData.inventory[x].name === item){
                                if(userData.wallet < 5000000000 && userData.wallet + parseInt(price) <= 5000000000){
                                        if(userData.inventory[x].quantity >= parseInt(quantity)){
                                            if(item === userData.inventory[x].name && check < 5){
                                                let d = new Date();
                                                let n = d.getTime();
                                                let lasttrade;
                                                if(userData.lasttrade){
                                                    lasttrade = userData.lasttrade;
                                                }else{
                                                    lasttrade = 0;
                                                }
                                                let timeup;
                                                let timeup2;
                                                if(userData.premium === 'enable'){
                                                    timeup = 3000;
                                                    timeup2 = 3;
                                                }else{
                                                    timeup = 5000;
                                                    timeup2 = 5;
                                                }
                                                if(n - lasttrade >= timeup){
                                                    console.log('pass the first phase');
                                                        if(targetData.inventory){
                                                            check = 5;
                                                            const embed = new Discord.MessageEmbed();
                                                            embed.setDescription(`${target}, Do you wanna buy ${quantity} ${emoji} ${item} from ${message.author} for ${price}. Answer with yes or no.`)
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
                                                            const m = await message.channel.send({embeds:[embed],components:[row]});
                                                            const ifilter = i => i.user.id === target.id;
                                        
                                                            const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                        
                                                            collector.on('collect', async i => {
                                                                if (i.customId === 'yes') {
                                                                    const embed2 = new Discord.MessageEmbed();
                                                                    embed2.setTitle(`✅ Successfully Traded`);
                                                                    embed2.setColor(`#30CC71`);
                                                                    embed2.setDescription(`${message.author}, You have successfully traded ${quantity} ${emoji} ${item} to ${target} for ${price}`);
                                                                    embed2.setTimestamp();
                                                                    await i.update({embeds:[embed2],components:[]});
                                                                    let inventoryData = userData.inventory;
                                                                    if(inventoryData[x]){
                                                                        console.log(inventoryData[x]);
                                                                        if(inventoryData[x].quantity>quantity){
                                                                            inventoryData[x].quantity = parseInt(inventoryData[x].quantity) - parseInt(quantity);
                                                                        }else if(inventoryData[x].quantity === quantity){
                                                                            inventoryData.splice(x,1);
                                                                            console.log(inventoryData);
                                                                        }
                                                                    }
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                                                    {
                                                                        inventory:inventoryData
                                                                    }    
                                                                    );
                                                                    let d2 = new Date();
                                                                    let n2 = d2.getTime();
                                                                    const response2 = await userModel.findOne({userID:message.author.id},{
                                                                        lasttrade:n2
                                                                    });
                                                                    sendTrade(target,targetData,item,emoji,quantity,category,price);
                                                                    return;
                                                                }else if(i.customId==='no'){
                                                                    await i.update({components: [] });
                                                                    message.channel.send(`${message.author}, ${memberTarget.user.username} said no!`);
                                                                    let d2 = new Date();
                                                                    let n2 = d2.getTime();
                                                                    const response2 = await userModel.findOne({userID:message.author.id},{
                                                                        lasttrade:n2
                                                                    });
                                                                }
                                                            });
                                        
                                                            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                            
                                                        
                                                        }else{
                                                            if(targetData.wallet >= price){
                                                                let d2 = new Date();
                                                                let n2 = d2.getTime();
                                                                const response2 = await userModel.findOne({userID:message.author.id},{
                                                                    lasttrade:n2
                                                                });
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
                                                                const m = await message.channel.send({embeds:[embed],components:[row]});
                                                                const ifilter = i => i.user.id === target.id;
                                            
                                                                const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                            
                                                                collector.on('collect', async i => {
                                                                    if (i.customId === 'yes') {
                                                                        const embed2 = new Discord.MessageEmbed();
                                                                        embed2.setTitle(`✅ Successfully Traded`);
                                                                        embed2.setColor(`#30CC71`);
                                                                        embed2.setDescription(`${message.author}, You have successfully traded ${quantity} ${emoji} ${item} to ${target} for ${price}`);
                                                                        embed2.setTimestamp();
                                                                        await i.update({embeds:[embed2],components:[]});
                                                                        check = 5;
                                                                        let inventoryData = userData.inventory;
                                                                        if(inventoryData[x].quantity>quantity){
                                                                            inventoryData[x].quantity = parseInt(inventoryData[x].quantity) - parseInt(quantity);
                                                                        }else if(inventoryData[x].quantity === quantity){
                                                                            inventoryData.splice(x,1);
                                                                        }
                                                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                                                        {
                                                                            $inc:{
                                                                                networth:price,
                                                                                wallet:price
                                                                            },
                                                                            inventory:inventoryData
                                                                        }    
                                                                        );
                                                                        let inventory = [];
                                                                        let newData = {
                                                                            item:item,
                                                                            emoji:emoji,
                                                                            quantity:parseInt(quantity),
                                                                            category:category
                                                                        };
                                                                        inventory.push(newData); 
                                                                        let d2 = new Date();
                                                                        let n2 = d2.getTime();
                                                                        const response2 = await userModel.findOneAndUpdate({userID:targetData.userID},{
                                                                            inventory:inventory,
                                                                            lasttrade:n2
                                                                        });
                                                                        return;
                                                                    }else if(i.customId==='no'){
                                                                        await i.update({components: [] });
                                                                        message.channel.send(`${message.author}, ${memberTarget.user.username} said no!`);
                                                                        let d2 = new Date();
                                                                        let n2 = d2.getTime();
                                                                        const response2 = await userModel.findOne({userID:message.author.id},{
                                                                            lasttrade:n2
                                                                        });
                                                                    }
                                                                });
                                            
                                                                collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                                                                
                                                            
                                                            }else{
                                                                message.channel.send(`${target} you don't have enough money to buy this item!`);

                                                            }
                                                        }
                                                }else{
                                                    var msec = n - lasttrade;
                                                    console.log(msec);
                                                    var ss = Math.floor(msec / 1000);
                                                    var second = timeup2 - ss;
                                                    if(userData.premium !== 'enable'){
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`Wait bro!`);
                                                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use trade again!. The default cooldown is of **5** seconds but for premium users it is of **3** seconds to become a premium user use premium command.`);
                                                    message.channel.send({embeds:[embed]});
                                                    }else{
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setTitle(`Chill bro!`);
                                                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use trade again!.`);
                                                    embed.setColor('#025CFF');
                                                    message.channel.send({embeds:[embed]});
                                                    }
                                                }

                                            }
                                        }else{
                                            message.channel.send(`${message.author}, You don't have that many ${userData.inventory[x].name} to trade`);
                                            return;
                                        }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`❌ Trade Failed`);
                                    embed.setDescription(`${message.author}, You can't have more than 5 billion coins in your wallet`);
                                    message.channel.send({embeds:[embed]});
                                    return;
                                }
                            }
                        }else if(x === userData.inventory.length && check < 5){
                            console.log('this is the error');
                            message.channel.send(`${message.author}, You don't own that item to trade`);
                        }
                    }         
                }else{
                    message.channel.send(`${message.author}, You don't own that item to trade`);
                }
            }
            if(target){
              if(message.author.id === target.id){
                  return message.channel.send(`${message.author}, you can't trade with yourself!`);
              }
              const memberTarget = message.guild.members.cache.get(target.id);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let totalbeer = number;
                                                let cost = price;
                                                trade(target,targetData,'Beer','🍺',number,'food',cost);
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
                                    embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let coffee = botData.coffeevalue;
                                                let totalcoffee = number;
                                                let cost = price;
                                                trade(target,targetData,'Coffee','☕',number,'food',cost);
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
                                    embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let pizza = botData.pizzavalue;
                                                let totalpizza = number;
                                                let cost = price;
                                                trade(target,targetData,'Pizza Slice','🍕',number,'food',cost,i);    
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
                                    embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let apple = botData.greenvalue;
                                                let totalapple = number;
                                                let cost = price;
                                                trade(target,targetData,'Green Apple','🍏',number,'food',cost,i);                               
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
                                    embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let lock = botData.lockvalue;
                                                let totallock = number;
                                                let cost = price;
                                                if(userData.lock>=number){
                                                    const embed = new Discord.MessageEmbed();
                                                    embed.setDescription(`${target}, Do you wanna buy 🔒 Lock from ${message.author} for ${price}. Answer with yes or no.`)
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
                                                    const m = await message.channel.send({embeds:[embed],components:[row]});
                                                    const ifilter = i => i.user.id === target.id;
                                
                                                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                
                                                    collector.on('collect', async i => {
                                                        if (i.customId === 'yes') {
                                                            const embed2 = new Discord.MessageEmbed();
                                                            embed2.setTitle(`✅ Successfully Traded`);
                                                            embed2.setColor(`#30CC71`);
                                                            embed2.setDescription(`${message.author}, You have successfully traded 🔒 Lock to ${target} for ${price}`);
                                                            embed2.setTimestamp();
                                                            await i.update({embeds:[embed2],components:[]});
                                                            let d2 = new Date();
                                                            let n2 = d2.getTime();
                                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                                            {
                                                                $inc:{
                                                                    networth:price,
                                                                    wallet:price,
                                                                    lock:-number
                                                                },
                                                                lasttrade:n2
                                                            }    
                                                            );
                                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                $inc:{
                                                                    networth:-price,
                                                                    wallet:-price,
                                                                    lock:number
                                                                }
                                                            });
                                                            return;
                                                        }else if(i.customId==='no'){
                                                            await i.update({components: [] });
                                                            message.channel.send(`${message.author}, ${memberTarget.user.username} said no!`);
                                                            let d2 = new Date();
                                                            let n2 = d2.getTime();
                                                            const response2 = await userModel.findOne({userID:message.author.id},{
                                                                lasttrade:n2
                                                            });
                                                        }
                                                    });    
                                                }else{
                                                    message.channel.send(`${message.author}, You don't have that many lock to trade`);
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
                                    embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                            let botData = await botModel.findOne({botid:1});
                                            let key = botData.keyvalue;
                                            let totalkey = number;
                                            let cost = price;
                                            trade(target,targetData,'Key','🔑',number,'jewellery',cost,i);                              
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
                                embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let trophy = botData.trophyvalue;
                                                let totaltrophy = number;
                                                let cost =  price;
                                                trade(target,targetData,'Gold Trophy','🏆',number,'jewellery',cost,i);                               
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
                                    embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let goldmedal = botData.goldvalue;
                                                let totalgold = number;
                                                let cost = price;
                                                trade(target,targetData,'Gold Medal','🥇',number,'jewellery',cost,i);                               
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
                                    embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let silvermedal = botData.silvervalue;
                                                let totalsilver = number;
                                                let cost = price;
                                                trade(target,targetData,'Silver Medal','🥈',number,'jewellery',cost,i);                               
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
                                    embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                    let botData = await botModel.findOne({botid:1});
                                                    let huntingrifle = botData.huntgun;
                                                    let totalrifle = number;
                                                    let cost = price;
                                                    if(userData.huntingrifle>= totalrifle){
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setDescription(`${target}, Do you wanna buy <:rifle:883578413888184350> Hunting Rifle from ${message.author} for ${price}. Answer with yes or no.`)
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
                                                        const m = await message.channel.send({embeds:[embed],components:[row]});
                                                        const ifilter = i => i.user.id === target.id;
                                    
                                                        const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                    
                                                        collector.on('collect', async i => {
                                                            if (i.customId === 'yes') {
                                                                const embed2 = new Discord.MessageEmbed();
                                                                embed2.setTitle(`✅ Successfully Traded`);
                                                                embed2.setColor(`#30CC71`);
                                                                embed2.setDescription(`${message.author}, You have successfully traded <:rifle:883578413888184350> Hunting Rifle to ${target} for ${price}`);
                                                                embed2.setTimestamp();
                                                                await i.update({embeds:[embed2],components:[]});
                                                                let d2 = new Date();
                                                                let n2 = d2.getTime();
                                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                                                {
                                                                    $inc:{
                                                                        networth:cost,
                                                                        wallet:cost,
                                                                        huntingrifle:-totalrifle
                                                                    },
                                                                    lasttrade:n2
                                                                }    
                                                                );
                                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                    $inc:{
                                                                        networth:-cost,
                                                                        wallet:-cost,
                                                                        huntingrifle:totalrifle
                                                                    }
                                                                });
                                                                return;
                                                            }else if(i.customId==='no'){
                                                                await i.update({components: [] });
                                                                message.channel.send(`${message.author}, ${memberTarget.user.username} said no!`);
                                                                let d2 = new Date();
                                                                let n2 = d2.getTime();
                                                                const response2 = await userModel.findOne({userID:message.author.id},{
                                                                    lasttrade:n2
                                                                });
                                                            }
                                                        });
                                    
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
                                        embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                        let botData = await botModel.findOne({botid:1});
                                                        let fishingrod = botData.fishingpole;
                                                        let totalrod = number;
                                                        let cost = price;
                                                        if(userData.fishingrod>=number){
                                                            const embed = new Discord.MessageEmbed();
                                                            embed.setDescription(`${target}, Do you wanna buy :fishing_pole_and_fish: Fishing Rod from ${message.author} for ${price}. Answer with yes or no.`)
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
                                                            const m = await message.channel.send({embeds:[embed],components:[row]});
                                                            const ifilter = i => i.user.id === target.id;
                                        
                                                            const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                        
                                                            collector.on('collect', async i => {
                                                                if (i.customId === 'yes') {
                                                                    const embed2 = new Discord.MessageEmbed();
                                                                    embed2.setTitle(`✅ Successfully Traded`);
                                                                    embed2.setColor(`#30CC71`);
                                                                    embed2.setDescription(`${message.author}, You have successfully traded :fishing_pole_and_fish: Fishing Rod to ${target} for ${price}`);
                                                                    embed2.setTimestamp();
                                                                    await i.update({embeds:[embed2],components:[]});
                                                                    let d2 = new Date();
                                                                    let n2 = d2.getTime();
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                                                    {
                                                                        $inc:{
                                                                            networth:price,
                                                                            wallet:price,
                                                                            fishingrod:-totalrod
                                                                        },
                                                                        lasttrade:n2
                                                                    }    
                                                                    );
                                                                    const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                        $inc:{
                                                                            networth:-price,
                                                                            wallet:-price,
                                                                            fishingrod:totalrod
                                                                        }
                                                                    });
                                                                    return;
                                                                }else if(i.customId==='no'){
                                                                    await i.update({components: [] });
                                                                    message.channel.send(`${message.author}, ${memberTarget.user.username} said no!`);
                                                                    let d2 = new Date();
                                                                    let n2 = d2.getTime();
                                                                    const response2 = await userModel.findOne({userID:message.author.id},{
                                                                        lasttrade:n2
                                                                    });
                                                                }
                                                            });    
                                                        }else{
                                                            message.channel.send(`${message.author}, You don't have that many fishing rod to trade`);
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
                                       embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                if(userData.wallet < 5000000000 && userData.wallet + parseInt(price) <= 5000000000){
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
                                                            message.channel.send(`${message.author}, ${memberTarget.user.username} said no!`)
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
                                   embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let totalbubble = number;
                                                let cost = price;
                                                trade(target,targetData,'Bubble Tea','🧋',number,'food',cost,i);                                           
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
                               embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                                                let botData = await botModel.findOne({botid:1});
                                                let totalancient = number;
                                                let cost = price;
                                                trade(target,targetData,'Ancient Coin','<:ancientcoin:903586746640519178>',number,'dig',cost,i);                                         
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
                               embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
            }else if(argsone_name === 'boat'){
                let number = args[2];
                let price = args[3];
                   if(price){
                       if(!isNaN(price) && Math.sign(price) === 1){
                           if(price % 1=== 0){
                               if(targetData.wallet>= price){
                                   if(number){
                                       if(!isNaN(number) && Math.sign(number) === 1){
                                            if(number % 1=== 0){
                                                    let botData = await botModel.findOne({botid:1});
                                                    let fishingrod = botData.fishingpole;
                                                    let totalrod = number;
                                                    let cost = price;
                                                    if(userData.boat>=number){
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setDescription(`${target}, Do you wanna buy <:boat:904243050279235675> Boat from ${message.author} for ${price}. Answer with yes or no.`)
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
                                                        const m = await message.channel.send({embeds:[embed],components:[row]});
                                                        const ifilter = i => i.user.id === target.id;
                                    
                                                        const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });
                                    
                                                        collector.on('collect', async i => {
                                                            if (i.customId === 'yes') {
                                                                const embed2 = new Discord.MessageEmbed();
                                                                embed2.setTitle(`✅ Successfully Traded`);
                                                                embed2.setColor(`#30CC71`);
                                                                embed2.setDescription(`${message.author}, You have successfully traded :fishing_pole_and_fish: Fishing Rod to ${target} for ${price}`);
                                                                embed2.setTimestamp();
                                                                await i.update({embeds:[embed2],components:[]});
                                                                let d2 = new Date();
                                                                let n2 = d2.getTime();
                                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                                                {
                                                                    $inc:{
                                                                        networth:price,
                                                                        wallet:price,
                                                                        boat:-number
                                                                    },
                                                                    lasttrade:n2
                                                                }    
                                                                );
                                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                                    $inc:{
                                                                        networth:-price,
                                                                        wallet:-price,
                                                                        boat:number
                                                                    }
                                                                });
                                                                return;
                                                            }else if(i.customId==='no'){
                                                                await i.update({components: [] });
                                                                message.channel.send(`${message.author}, ${memberTarget.user.username} said no!`);
                                                                let d2 = new Date();
                                                                let n2 = d2.getTime();
                                                                const response2 = await userModel.findOne({userID:message.author.id},{
                                                                    lasttrade:n2
                                                                });
                                                            }
                                                        });    
                                                    }else{
                                                        message.channel.send(`${message.author}, You don't have that many boat to trade`);
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
                                       embed.setTitle(`${message.author.username}, Please mention number of boat you want to trade!`);
                                       embed.setDescription(`example - trade @name boat quantity price`);
                                       message.channel.send({embeds:[embed]});
                                   }            
                               }else{
                                   const embed = new Discord.MessageEmbed();
                                   embed.setTitle(`${memberTarget.user.username} doesn't have enough money in wallet to trade!`);
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
                       embed.setTitle(`${message.author.username}, Please mention price of boat you want to trade!`);
                       embed.setDescription(`example - trade @name boat quantity price`);
                       message.channel.send({embeds:[embed]});
                   }
                                       
           }


              }else{
                message.channel.send(`${target}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

              }
            }
        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

        }
    }
}