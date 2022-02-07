const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'gift',
    aliases:['gift','share'],
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
            async function check_Rewards(achievement,reward1,badge,power){
                    if(userData.rewards && userData.badges){
                        if(userData.rewards.length>0){
                            let check = 0;
                            for(var x = 0;x<=userData.rewards.length;x++){
                                if(userData.rewards[x]){
                                    if(userData.rewards[x].name === achievement){
                                        check = 5;
                                        console.log('it already exists');
                                        return;
                                    }
                                    if(x === userData.rewards.length && check <5){
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`🎉 Unlocked New Achievement!`);
                                        embed.setDescription(`You have unlocked **${achievement} achievement** and your rewards are **${reward1} & ${badge}**`);
                                        embed.setTimestamp();
                                        message.channel.send({embeds:[embed]});
                                        let rewardsbadge = userData.rewards;
                                        let badgeData = userData.badges;
                                        let newrewardsData = {
                                            name:achievement,
                                            reward:reward1,
                                            badge:badge,
                                            category:'Donation'
                                        }
                                        let newbadgeData = {
                                            name:achievement,
                                            badge:badge,
                                            power:power,
                                            category:'Donation'
                                        }
                                        rewardsbadge.push(newrewardsData);
                                        badgeData.push(newbadgeData);
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                                xp:reward1
                                            },
                                            rewards:rewardsbadge,
                                            badges:badgeData
                                        });
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`🎉 Unlocked New Achievement!`);
                                    embed.setDescription(`You have unlocked **${achievement} achievement** and your rewards are **${reward1} & ${badge}**`);
                                    embed.setTimestamp();
                                    message.channel.send({embeds:[embed]});
                                    let rewardsbadge = userData.rewards;
                                    let badgeData = userData.badges;
                                    let newrewardsData = {
                                        name:achievement,
                                        reward:reward1,
                                        badge:badge,
                                        category:'Donation'
                                    }
                                    let newbadgeData = {
                                        name:achievement,
                                        badge:badge,
                                        power:power,
                                        category:'Donation'
                                    }
                                    rewardsbadge.push(newrewardsData);
                                    badgeData.push(newbadgeData);
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        $inc:{
                                            xp:reward1
                                        },
                                        rewards:rewardsbadge,
                                        badges:badgeData
                                    });
                                    return;
                                }
                                
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`🎉 Unlocked New Achievement!`);
                                    embed.setDescription(`You have unlocked **${achievement} achievement** and your rewards are **${reward1} & ${badge}**`);
                                    embed.setTimestamp();
                                    message.channel.send({embeds:[embed]});
                                    let rewardsbadge = [];
                                    let badgeData = []
                                    let newrewardsData = {
                                        name:achievement,
                                        reward:reward1,
                                        badge:badge,
                                        category:'Donation'
                                    }
                                    let newbadgeData = {
                                        name:achievement,
                                        badge:badge,
                                        power:power,
                                        category:'Donation'
                                    }
                                    rewardsbadge.push(newrewardsData);
                                    badgeData.push(newbadgeData);
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        $inc:{
                                            xp:reward1
                                        },
                                        rewards:rewardsbadge,
                                        badges:badgeData
                                    });
                        }
                    }
            }
            async function sendGift(targetData,item,emoji,quantity,category){
                let check = 0;
                for(var x = 0;x<= targetData.inventory.length;x++){
                    if(targetData.inventory[x]){
                        if(targetData.inventory[x].name === item){
                            if(item === targetData.inventory[x].name && check<5){
                                check = 5;
                                let inventoryData = targetData.inventory;
                                inventoryData[x].quantity = parseInt(inventoryData[x].quantity) + parseInt(quantity);
                                const response = await userModel.findOneAndUpdate({userID:targetData.userID},
                                {
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
                            inventory:inventoryData
                        });
                    }
                }
            }
            async function gift(targetData,item,emoji,quantity,category){
                    let check = 0;
                    if(userData.inventory){
                        for(var x = 0;x<=userData.inventory.length;x++){
                            if(userData.inventory[x]){
                                if(userData.inventory[x].name === item){
                                    if(userData.inventory[x].quantity >= parseInt(quantity)){
                                        if(item === userData.inventory[x].name && check < 5){
                                            let d = new Date();
                                            let n = d.getTime();
                                            let lastgift;
                                            if(userData.lastgift){
                                                lastgift = userData.lastgift;
                                            }else{
                                                lastgift = 0;
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
                                            if(n - lastgift>= timeup){
                                                    if(targetData.inventory){
                                                        console.log('target Data exist');
                                                        const embed2 = new Discord.MessageEmbed();
                                                        embed2.setTitle(`✅ Successfully Gifted`);
                                                        embed2.setColor(`#30CC71`);
                                                        embed2.setDescription(`${message.author}, You have successfully gifted ${quantity} ${emoji} ${item} to ${target}`);
                                                        embed2.setTimestamp();
                                                        message.channel.send({embeds:[embed2]});
                                                        check = 5;
                                                        let inventoryData = userData.inventory;
                                                        if(inventoryData[x].quantity>quantity){
                                                            console.log('it really came here haha');
                                                            inventoryData[x].quantity -=  parseInt(quantity);
                                                            console.log('new quantity = ' + inventoryData[x]);
                                                        }else{
                                                            console.log('it really came here haha 2');
                                                            inventoryData.splice(x,1);
                                                            console.log(inventoryData);
                                                        }
                                                        let totalitemsdonated = userData.totalitemsdonated;
                                                        totalitemsdonated = parseInt(totalitemsdonated) + parseInt(quantity);
                                                        let d2 = new Date();
                                                        let n2 = d2.getTime();
                                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                                        {
                                                            inventory:inventoryData,
                                                            totalitemsdonated:totalitemsdonated,
                                                            lastgift:n2
                                                        }    
                                                        );
                                                        console.log('it came here');
                                                        console.log("target Data"+ targetData.inventory);
                                                        sendGift(targetData,item,emoji,quantity,category);
                                                        if(userData.totalitemsdonated + quantity>=10){
                                                            console.log('here 1');
                                                            check_Rewards('Donation of 10 Items','500 xp!','<:commonitemssharingbadge:925708875750080562>',1);
                                                        }
                                                        if(userData.totalitemsdonated + quantity>=10){
                                                            console.log('here 1');
                                                            check_Rewards('Donation of 50 Items','1000 xp!','<:50itemssharingbadge:925713392591835136>',2);
                                                            
                                                        }
                                                        if(userData.totalitemsdonated + quantity>=100){
                                                            console.log('here 1');
                                                            check_Rewards('Donation of 100 Items','1500 xp!','<:100itemssharingbadge:925728246174208000>',4);
                                                        }
                                                        return;
                                                    
                                                    }else{
                                                        const embed2 = new Discord.MessageEmbed();
                                                        embed2.setTitle(`✅ Successfully Gifted`);
                                                        embed2.setColor(`#30CC71`);
                                                        embed2.setDescription(`${message.author}, You have successfully gifted ${quantity} ${emoji} ${item} to ${target}`);
                                                        embed2.setTimestamp();
                                                        message.channel.send({embeds:[embed2]});
                                                        check = 5;
                                                        let inventoryData = userData.inventory;
                                                        if(inventoryData[x].quantity>quantity){
                                                            inventoryData[x].quantity = parseInt(inventoryData[x].quantity) - parseInt(quantity);
                                                        }else if(inventoryData[x].quantity === quantity){
                                                            inventoryData.splice(x,1);
                                                        }
                                                        let totalitemsdonated = userData.totalitemsdonated;
                                                        totalitemsdonated = parseInt(totalitemsdonated) + parseInt(quantity);
                                                        let d2 = new Date();
                                                        let n2 = d2.getTime();
                                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                                        {
                                                            inventory:inventoryData,
                                                            totalitemsdonated:totalitemsdonated,
                                                            lastgift:n2
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
                                                        console.log('new Data' + newData);
                                                        if(userData.totalitemsdonated + quantity>=10){
                                                            console.log('here 1');
                                                            check_Rewards('Donation of 10 Items','500 xp!','<:commonitemssharingbadge:925708875750080562>',1);
                                                            
                                                        }
                                                        if(userData.totalitemsdonated + quantity>=50){
                                                            console.log('here 1');
                                                            check_Rewards('Donation of 50 Items','1000 xp!','<:50itemssharingbadge:925713392591835136>',2);
                                                        }
                                                        if(userData.totalitemsdonated + quantity>=100){
                                                            console.log('here 1');
                                                            check_Rewards('Donation of 100 Items','1500 xp!','<:100itemssharingbadge:925728246174208000>',4);
                                                        }


                                                        const response2 = await userModel.findOneAndUpdate({userID:targetData.userID},{
                                                            inventory:inventory
                                                        });
                                                        
                                                        return;
                                                    }
                                                }else{
                                                    var msec = n - lastgift;
                                                    console.log(msec);
                                                    var ss = Math.floor(msec / 1000);
                                                    var second = timeup2 - ss;
                                                    if(userData.premium !== 'enable'){
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setTitle(`Wait bro!`);
                                                        embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use gift again!. The default cooldown is of **5** seconds but for premium users it is of **3** seconds to become a premium user use premium command.`);
                                                        message.channel.send({embeds:[embed]});
                                                        return;
                                                    }else{
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setTitle(`Chill bro!`);
                                                        embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use gift again!.`);
                                                        embed.setColor('#025CFF');
                                                        message.channel.send({embeds:[embed]});
                                                        return;
                                                    }
                                                }

                                        }
                                    }else{
                                        message.channel.send(`${message.author}, You don't have that many ${userData.inventory[x].name} to gift`);
                                        return;
                                    }
                                }
                            }else if(x === userData.inventory.length & check < 5){
                                message.channel.send(`${message.author}, You don't own that item to gift`);
                            }
                        }         
                    }else{
                        message.channel.send(`${message.author}, You don't own that item to gift`);
                    }
            }
            if(target){
              let targetData = await userModel.findOne({userID:target.id});
              if(targetData){
                if(argsone_name === 'beer'){
                    let number = args[2];
                    let price = args[3];  
                    if(number){
                        if(!isNaN(number) && Math.sign(number) === 1){
                            if(number % 1=== 0){
                                gift(targetData,'Beer','🍺',number,'food');  
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
                        gift(targetData,'Beer','🍺',1,'food');
                                        
                    }
                     
                }else if(argsone_name === 'coffee'){
                    let number = args[2];             
                    if(number){
                        if(!isNaN(number) && Math.sign(number) === 1){
                            if(number % 1=== 0){
                                gift(targetData,'Coffee','☕',number,'food');
                                            
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
                        gift(targetData,'Coffee','☕',1,'food');

                    }            
                }else if(argsone_name === 'pizza' && argstwo_name === 'slice'){
                    let number = args[3];              
                    if(number){ 
                        if(!isNaN(number) && Math.sign(number) === 1){
                            if(number % 1=== 0){
                                gift(targetData,'Pizza Slice','🍕',number,'food');
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
                        gift(targetData,'Pizza Slice','🍕',1,'food');     
                    }
                   
                     
                }else if(argsone_name === 'green' && argstwo_name === 'apple'){
                    let number = args[3];
                    if(number){
                        if(!isNaN(number) && Math.sign(number) === 1){
                            if(number % 1=== 0){
                                gift(targetData,'Green Apple','🍏',number,'food');         
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
                        gift(targetData,'Green Apple','🍏',1,'food');         
                    }                        
                }else if(argsone_name === 'lock'){
                    let number = args[2];
                    if(number){
                        if(!isNaN(number) && Math.sign(number) === 1){
                            if(number % 1=== 0){
                                if(userData.lock>=number){
                                    const embed2 = new Discord.MessageEmbed();
                                    embed2.setTitle(`✅ Successfully Gifted`);
                                    embed2.setColor(`#30CC71`);
                                    embed2.setDescription(`${message.author}, You have successfully gifted 🔒 **${number}** lock`);
                                    embed2.setTimestamp();
                                    message.channel.send({embeds:[embed2]});
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        $inc:{
                                            lock:-number,
                                            totalitemsdonated:number
                                        }
                                     });
                                     const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                         $inc:{
                                             lock:number,
                                             totalitemsreceived:number
                                         }
                                     });
                                    
                                }else{
                                    message.channel.send(`${message.author}, you don't have that many lock to gift`);
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
                        if(userData.lock>=1){
                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`✅ Successfully Gifted`);
                            embed2.setColor(`#30CC71`);
                            embed2.setDescription(`${message.author}, You have successfully gifted 🔒 **1** lock`);
                            embed2.setTimestamp();
                            message.channel.send({embeds:[embed2]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    lock:-1,
                                    totalitemsdonated:1
                                }
                             });
                             const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                 $inc:{
                                     lock:1,
                                     totalitemsreceived:1
                                 }
                             });
                            
                        }else{
                            message.channel.send(`${message.author}, you don't have that many lock to gift`);
                        }
                    }
                    
                     
                }else if(argsone_name === 'key'){
                    let number = args[2];
                    if(number){
                        if(!isNaN(number) && Math.sign(number) === 1){
                            if(number % 1=== 0){
                                gift(targetData,'Key','🔑',number,'jewellery');
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
                        gift(targetData,'Key','🔑',1,'jewellery');
                    }
                        
                }if(argsone_name === 'gold' && argstwo_name === 'trophy'){
                    let number = args[3];
              
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            gift(targetData,'Gold Trophy','🏆',number,'jewellery');
                                            
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
                                        gift(targetData,'Gold Trophy','🏆',1,'jewellery');
                                    }
                                       
                 }if(argsone_name === 'gold' && argstwo_name === 'medal'){
                    let number = args[3];
                 
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            gift(targetData,'Gold Medal','🥇',number,'jewellery');
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
                                        gift(targetData,'Gold Medal','🥇',1,'jewellery');
                                       
                                    }
                    
                     
                 }if(argsone_name === 'silver' && argstwo_name === 'medal'){
                    let number = args[3];
                
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            gift(targetData,'Silver Medal','🥈',number,'jewellery');
                                            
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
                                        gift(targetData,'Silver Medal','🥈',1,'jewellery');
                                        

                                    }
                   
                }else if(argsone_name === 'hunting' && argstwo_name === 'rifle'){
                    let number = args[3];
                  
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.huntingrifle>=number){
                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted <:rifle:883578413888184350> **${number}** hunting rifle`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        huntingrifle:-number,
                                                        totalitemsdonated:number
                                                    }
                                                 });
                                                 const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                     $inc:{
                                                         huntingrifle:number,
                                                         totalitemsreceived:number
                                                     }
                                                 });
                                                
                                            }else{
                                                message.channel.send(`${message.author}, you don't have that many hunting rifle to gift`);
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
                                        if(userData.huntingrifle>=1){
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted <:rifle:883578413888184350> **1** hunting rifle`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    huntingrifle:-1,
                                                    totalitemsdonated:1
                                                }
                                             });
                                             const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                 $inc:{
                                                     huntingrifle:1,
                                                     totalitemsreceived:1
                                                 }
                                             });
                                        }else{
                                            message.channel.send(`${message.author}, you don't have a hunting rifle to gift`);

                                        }
                                            

                                    }
                                          
                }else if(argsone_name === 'fishing' && argstwo_name === 'rod'){
                    let number = args[3];
                 
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.fishingrod>= number){
                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted 🎣 **${number}** Fishing Rod`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                   $inc:{
                                                       fishingrod:-number,
                                                       totalitemsdonated:number,
                                                   }
                                                });
                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        fishingrod:number,
                                                        totalitemsreceived:number
                                                    }
                                                });
                                            }else{
                                                message.channel.send(`${message.author}, you don't have a fishing rod to gift`);
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
                                        if(userData.fishingrod>= 1){
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 🎣 **1** Fishing Rod`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    fishingrod:-1,
                                                    totalitemsdonated:1
                                                }
                                             });
                                             const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                 $inc:{
                                                     fishingrod:1,
                                                     totalitemsreceived:1
                                                 }
                                             });
                                        }else{
                                            message.channel.send(`${message.author}, you don't have a fishing rod to gift`);
                                        }
                                       

                                    }
                   
                                           
               }else if(argsone_name === 'cryptocoin'){
                let number = args[2];
                let price = args[3];
           
                                if(number){
                                    if(!isNaN(number) && Math.sign(number) === 1){
                                    if(number % 1=== 0){
                                        if(userData.cryptocoin >= number){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    cryptocoin:-number,
                                                    totalitemsdonated:number
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    cryptocoin:number,
                                                    totalitemsreceived:number
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted ${number} cryptocoin to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});

                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have ${number} cryptocoin to gift`);
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
                                    if(userData.cryptocoin >= 1){
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                                cryptocoin:-1,
                                                totalitemsdonated:1
                                            }
                                        });

                                        const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                            $inc:{
                                                cryptocoin:1,
                                                totalitemsreceived:1
                                            }
                                        });

                                        const embed2 = new Discord.MessageEmbed();
                                        embed2.setTitle(`✅ Successfully Gifted`);
                                        embed2.setColor(`#30CC71`);
                                        embed2.setDescription(`${message.author}, You have successfully gifted 1 cryptocoin to ${target}`);
                                        embed2.setTimestamp();
                                        message.channel.send({embeds:[embed2]});
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, You don't have 1 cryptocoin to gift`);
                                        message.channel.send({embeds : [embed]});
                                    }

                                }
                                
                                                        
               }else if(argsone_name === 'bubble' && argstwo_name === 'tea'){
                let number = args[3];
           
                                if(number){
                                    if(!isNaN(number) && Math.sign(number) === 1){
                                    if(number % 1=== 0){
                                        gift(targetData,'Bubble Tea','🧋',number,'food');
                                        
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
                                    gift(targetData,'Bubble Tea','🧋',1,'food');
                                   
                                }
               }else if(argsone_name === 'boat'){
                let number = args[2];
           
                if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        if(userData.boat>= number){
                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`✅ Successfully Gifted`);
                            embed2.setColor(`#30CC71`);
                            embed2.setDescription(`${message.author}, You have successfully gifted <:boat:904243050279235675> **${number}** boat`);
                            embed2.setTimestamp();
                            message.channel.send({embeds:[embed2]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    boat:-number,
                                    totalitemsdonated:1
                                }
                             });
                             const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                 $inc:{
                                     boat:number,
                                     totalitemsreceived:1
                                 }
                             });
                        }else{
                            message.channel.send(`${message.author}, you don't have a boat to gift`);
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
                    if(userData.boat>= 1){
                        const embed2 = new Discord.MessageEmbed();
                        embed2.setTitle(`✅ Successfully Gifted`);
                        embed2.setColor(`#30CC71`);
                        embed2.setDescription(`${message.author}, You have successfully gifted <:boat:904243050279235675> **1** boat`);
                        embed2.setTimestamp();
                        message.channel.send({embeds:[embed2]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                                boat:-1
                            }
                         });
                         const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                             $inc:{
                                 boat:1
                             }
                         });
                    }else{
                        message.channel.send(`${message.author}, you don't have a boat to gift`);
                    }
                   
                   
                }
               }else if(argsone_name === 'credit' && argstwo_name === 'points'){
                let number = args[3];
           
                if(number){
                    if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                        if(userData.creditpoints>= number){
                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`✅ Successfully Gifted`);
                            embed2.setColor(`#30CC71`);
                            embed2.setDescription(`${message.author}, You have successfully gifted <:creditpoint:925956240209772564> **${number}** credit points`);
                            embed2.setTimestamp();
                            message.channel.send({embeds:[embed2]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    creditpoints:-number,
                                    totalitemsdonated:1
                                }
                             });
                             const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                 $inc:{
                                     creditpoints:number,
                                     totalitemsreceived:1
                                 }
                             });
                        }else{
                            message.channel.send(`${message.author}, you don't have a credit point to gift`);
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
                    if(userData.creditpoints>= 1){
                        const embed2 = new Discord.MessageEmbed();
                        embed2.setTitle(`✅ Successfully Gifted`);
                        embed2.setColor(`#30CC71`);
                        embed2.setDescription(`${message.author}, You have successfully gifted <:creditpoint:925956240209772564> **1** credit points`);
                        embed2.setTimestamp();
                        message.channel.send({embeds:[embed2]});
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                                creditpoints:-1,
                                totalitemsdonated:1
                            }
                         });
                         const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                             $inc:{
                                 creditpoints:1,
                                 totalitemsreceived:1
                             }
                         });
                    }else{
                        message.channel.send(`${message.author}, you don't have a credit points to gift`);
                    }
                   
                   
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