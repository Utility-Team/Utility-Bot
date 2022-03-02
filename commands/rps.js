const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'rps',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        const target = message.mentions.users.first();
        if(userData){
            let userinfo = await userModel.findOne({userID:message.author.id});
            if(userinfo){
                 if(userinfo.xp / 1500 === 0){
                   const response = await userModel.findOneAndUpdate({
                       userID:message.author.id,
                     },
                     {
                       $inc:{
                           xp:15,
                           level:1,
                           commands:1
                       }
                     } 
                     );
                 }else{
                   let level = Math.round(userinfo.xp/1500);
                   const response = await userModel.findOneAndUpdate({
                       userID:message.author.id,
                     },
                     {
                        $inc:{
                            xp:15,
                            level:1
                        }
                     }
                    );
                  }
                }
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
                async function check_Rewards(achievement,reward1,badge,power,category,prize,type){
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
                                            category:category
                                        }
                                        let newbadgeData = {
                                            name:achievement,
                                            badge:badge,
                                            power:power,
                                            category:category
                                        }
                                        rewardsbadge.push(newrewardsData);
                                        badgeData.push(newbadgeData);
                                        if(type === 'xp'){
                                          const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                              $inc:{
                                                xp:prize
                                              },
                                              rewards:rewardsbadge,
                                              badges:badgeData
                                          });
                                        }else{
                                          const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                              networth:prize,
                                              wallet:prize
                                            },
                                            rewards:rewardsbadge,
                                            badges:badgeData
                                        });
                                        }
                                        return;
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
                                        category:category
                                    }
                                    let newbadgeData = {
                                        name:achievement,
                                        badge:badge,
                                        power:power,
                                        category:category
                                    }
                                    rewardsbadge.push(newrewardsData);
                                    badgeData.push(newbadgeData);
                                    if(type === 'xp'){
                                      const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                          $inc:{
                                            xp:prize
                                          },
                                          rewards:rewardsbadge,
                                          badges:badgeData
                                      });
                                    }else{
                                      const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        $inc:{
                                          networth:prize,
                                          wallet:prize
                                        },
                                        rewards:rewardsbadge,
                                        badges:badgeData
                                      });
                                    }
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
                            if(type === 'xp'){
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                    xp:prize
                                    },
                                    rewards:rewardsbadge,
                                    badges:badgeData
                                });
                            }else{
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    networth:prize,
                                    wallet:prize
                                },
                                rewards:rewardsbadge,
                                badges:badgeData
                                });
                            }
                            return;
                        }
                    }
                  }
            var d = new Date();
            var n = d.getTime();
            let lastrps = userData.lastrps;  
            let timeup;
            let timeup2;
            if(userData.premium === 'enable'){
              timeup = 15000;
              timeup2 = 15;
            }else{
              timeup = 30000;
              timeup2 = 30;
            }
            if(n-lastrps>= timeup){
                if(userData.totalrps >= 100){
                    check_Rewards('Successfully playing 100 rps games','1000 xp!','<:playing100rpsgamesbadge:925730545747521546>',2,'rps games',1000,'xp');
                }
                if(userData.wonrps>=100){
                    check_Rewards('Successfully Winning 100 rps games','<:uc:922720730272137256> 15k','<:playing100rpsgamesbadge:925730545747521546>',2,'rps games',15000,'money');
                }
                if(userData.wonrps >= 1000){
                    check_Rewards('Winning 1000 rps games','<:uc:922720730272137256> 500k','<:winning1000rpsgamesbadge:925779028298838046>',5,'rps games',5000000,'money');
                }
                if(userData.totalrps >= 1000){
                    check_Rewards('Winning 1000 rps games','<:uc:922720730272137256> 500k','<:playing1000rpsgamesbadge:925749675020124252>',4,'rps games',5000000,'money');
                }

                if(!target){
                    var d2 = new Date();
                    var n2 = d2.getTime(); 
                    const response  = await userModel.findOneAndUpdate({userID:message.author.id},
                        {
                        lastrps:n2
                    });
                    if(args[0]){
                        let number = args[0];
                        if(Math.sign(number) === 1){
                        if(number % 1=== 0){
                            if(userData.wallet >= number){
                            function check_Winner(bot_choice,choice){
                                console.log(bot_choice);
                            console.log(message.author);
                                if(bot_choice === 'rock' && choice === 'scissor'){
                                    who_won = 'bot';
                                }else if(bot_choice === 'rock' && choice === 'paper'){
                                    who_won = 'user';
                                }else if(bot_choice === 'rock' && choice === 'rock'){
                                    who_won = 'tie';
                                }
                        
                                if(bot_choice === 'paper' && choice === 'rock'){
                                    who_won = 'bot';
                                }else if(bot_choice === 'paper' && choice === 'scissor'){
                                    who_won = 'user';
                                }else if(bot_choice === 'paper' && choice === 'paper'){
                                    who_won = 'tie';
                                }
                    
                    
                                if(bot_choice === 'scissor' && choice === 'paper'){
                                    who_won = 'bot';
                                }else if(bot_choice === 'scissor' && choice === 'rock'){
                                    who_won = 'user';
                                }else if(bot_choice === 'scissor' && choice === 'scissor'){
                                    who_won = 'tie';
                                }
                            
                        
                            }
                        async function result(bot_choice,choice){
                                if(bot_choice !== ' ' && choice !== ' '){
                                    if(who_won === 'bot'){
                                        const embed = new Discord.MessageEmbed();
                                        embed.setAuthor(`${message.author.username}, You lost the game`);
                                        embed.addFields({name:`Amount Lost`,value:`${number}`},{name:'You chose',value:`${choice}`},{name:'Bot chose',value:`${bot_choice}`});
                                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                        embed.setTimestamp();
                                        embed.setColor('#FF470F');
                                        message.channel.send({embeds:[embed]});
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                                totalrps:1,
                                                lostrps:1,
                                                wallet:-number,
                                                networth:-number
                                            }
                                        });
                                    }else if(who_won === 'user'){
                                        let amount_won = 2* number;
                                        const embed = new Discord.MessageEmbed();
                                        embed.setAuthor(`${message.author.username}, You won the game`);
                                        embed.addFields({name:`Amount Won`,value:`${amount_won}`},{name:'You chose',value:`${choice}`},{name:'Bot chose',value:`${bot_choice}`});
                                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                        embed.setTimestamp();
                                        embed.setColor(`#30CC71`);
                                        message.channel.send({embeds:[embed]});
                                    
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                                totalrps:1,
                                                wonrps:1,
                                                wallet:amount_won,
                                                networth:amount_won
                                            }
                                        });
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setAuthor(`${message.author.username}, It's a tie!`);
                                        embed.addFields({name:`Amount Lost`,value:`0`},{name:'You chose',value:`${choice}`},{name:'Bot chose',value:`${bot_choice}`});
                                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                        embed.setTimestamp();
                                        message.channel.send({embeds:[embed]});
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                                totalrps:1,
                                                tierps:1,
                                        }
                                        });
                                    }
                                }
                            }
                            let bot_choice = '';
                            let rps_chance = Math.floor(Math.random() * 3);
                            if(rps_chance === 0){
                                bot_choice = 'rock';
                            }else if(rps_chance === 1){
                                bot_choice = 'paper'
                            }else if(rps_chance === 2){
                                bot_choice = 'scissor';
                            }
                            let choice = '';
                        
                            let who_won = '';
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`<:rockpaperscissors:945317106071769159> Rock Paper Scissor`);
                            embed.setDescription('**Choose one and wisely between rock , paper & scissor**');
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setColor('#8CD96B');
                            embed.setTimestamp();
            
                            const row = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId('rock')
                                    .setEmoji('🪨')
                                    .setStyle('PRIMARY'),
                                new Discord.MessageButton()
                                    .setCustomId('paper')
                                    .setEmoji('<:paper:898069617241620571>')
                                    .setStyle('PRIMARY'),
                                
                                new Discord.MessageButton()
                                    .setCustomId('scissor')
                                    .setEmoji('<:scissor:898070174698209321>')
                                    .setStyle('PRIMARY')
                                
                            );
                        //  message.channel.send({embeds:[embed],components:[row]})
                        const m = await message.channel.send({embeds:[embed],components:[row]});
                            const ifilter = i => i.user.id === message.author.id;
                            
                            const collector = m.createMessageComponentCollector({ filter:ifilter, time: 15000 });
            
                            collector.on('collect', async i => {
                                console.log('hello there' + i.guildId);
                                if (i.customId === 'rock') {
                                    choice = 'rock';
                                    await i.update({ embeds:[embed],components:[]});
                                    check_Winner(bot_choice,choice);
                                    result(bot_choice,choice);
                                }else if(i.customId==='paper'){
                                    choice = 'paper';
                                    await i.update({ embeds:[embed],components:[]});
                                    check_Winner(bot_choice,choice);
                                    result(bot_choice,choice);
                                }else if(i.customId === 'scissor'){
                                    choice = 'scissor';
                                    await i.update({ embeds:[embed],components:[]});
                                    check_Winner(bot_choice,choice);
                                    result(bot_choice,choice);
                                }
                            });
                            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                            }else{
                                message.channel.send(`${message.author}, You don't have enough money in your wallet!`);
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid amount!`);
                            message.channel.send({embeds:[embed]});
                        }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please mention a valid amount!`);
                            message.channel.send({embeds:[embed]});
                        }
                    }else{
                        function check_Winner(bot_choice,choice){
                            console.log(bot_choice);
                            if(bot_choice === 'rock' && choice === 'scissor'){
                                who_won = 'bot';
                            }else if(bot_choice === 'rock' && choice === 'paper'){
                                who_won = 'user';
                            }else if(bot_choice === 'rock' && choice === 'rock'){
                                who_won = 'tie';
                            }
                    
                            if(bot_choice === 'paper' && choice === 'rock'){
                                who_won = 'bot';
                            }else if(bot_choice === 'paper' && choice === 'scissor'){
                                who_won = 'user';
                            }else if(bot_choice === 'paper' && choice === 'paper'){
                                who_won = 'tie';
                            }
                
                
                            if(bot_choice === 'scissor' && choice === 'paper'){
                                who_won = 'bot';
                            }else if(bot_choice === 'scissor' && choice === 'rock'){
                                who_won = 'user';
                            }else if(bot_choice === 'scissor' && choice === 'scissor'){
                                who_won = 'tie';
                            }
                        }
                    async function result(bot_choice,choice){
                            if(bot_choice !== ' ' && choice !== ' '){
                                if(who_won === 'bot'){
                                    const embed = new Discord.MessageEmbed();
                                    embed.setAuthor(`${message.author.username}, You lost the game`);
                                    embed.addFields({name:'You chose',value:`${choice}`},{name:'Bot chose',value:`${bot_choice}`});
                                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                    embed.setTimestamp();
                                    embed.setColor('#FF470F');
                                    message.channel.send({embeds:[embed]});
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        $inc:{
                                            totalrps:1,
                                            lostrps:1
                                        }
                                    });
                                }else if(who_won === 'user'){
                                    const embed = new Discord.MessageEmbed();
                                    embed.setAuthor(`${message.author.username}, You won the game`);
                                    embed.addFields({name:'You chose',value:`${choice}`},{name:'Bot chose',value:`${bot_choice}`});
                                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                    embed.setTimestamp();
                                    embed.setColor(`#30CC71`);
                                    message.channel.send({embeds:[embed]});
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        $inc:{
                                            totalrps:1,
                                            wonrps:1
                                        }
                                    });
                                }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`${message.author.username}, It's a tie!`);
                                embed.addFields({name:'You chose',value:`${choice}`},{name:'Bot chose',value:`${bot_choice}`});
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                        totalrps:1,
                                        tierps:1
                                    }
                                });
                                }
                            }
                        }
                        let bot_choice = '';
                        let rps_chance = Math.floor(Math.random() * 3);
                        if(rps_chance === 0){
                            bot_choice = 'rock';
                        }else if(rps_chance === 1){
                            bot_choice = 'paper'
                        }else if(rps_chance === 2){
                            bot_choice = 'scissor';
                        }
                        let choice = '';
                    
                        let who_won = '';
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`<:rockpaperscissors:945317106071769159> Rock Paper Scissor`);
                        embed.setDescription('**Choose one and wisely between rock , paper & scissor**');
                        embed.setFooter(`Requested by ${message.author.username}`,avatar);
                        embed.setColor('#8CD96B');
                        embed.setTimestamp();
        
                        const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId('rock')
                                .setEmoji('🪨')
                                .setStyle('PRIMARY'),
                            new Discord.MessageButton()
                                .setCustomId('paper')
                                .setEmoji('<:paper:898069617241620571>')
                                .setStyle('PRIMARY'),
                            
                            new Discord.MessageButton()
                                .setCustomId('scissor')
                                .setEmoji('<:scissor:898070174698209321>')
                                .setStyle('PRIMARY')
                            
                        );
                    //  message.channel.send({embeds:[embed],components:[row]})
                    const m = await message.channel.send({embeds:[embed],components:[row]});
                        const ifilter = i => i.user.id === message.author.id;
                        
                        const collector = m.createMessageComponentCollector({ filter:ifilter, time: 15000 });
        
                        collector.on('collect', async i => {
                            console.log('hello there' + i.guildId);
                            if (i.customId === 'rock') {
                                choice = 'rock';
                                await i.update({ embeds:[embed],components:[]});
                                check_Winner(bot_choice,choice);
                                result(bot_choice,choice);
                            }else if(i.customId==='paper'){
                                choice = 'paper';
                                await i.update({ embeds:[embed],components:[]});
                                check_Winner(bot_choice,choice);
                                result(bot_choice,choice);
                            }else if(i.customId === 'scissor'){
                                choice = 'scissor';
                                await i.update({ embeds:[embed],components:[]});
                                check_Winner(bot_choice,choice);
                                result(bot_choice,choice);
                            }
                        });
                        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                    }

                    
                }else{
                if(target.id === message.author.id) return message.channel.send(`${message.author}, You can't play rps with yourself!`);
                var d2 = new Date();
                var n2 = d2.getTime(); 
                const response  = await userModel.findOneAndUpdate({userID:message.author.id},
                        {
                        lastrps:n2
                        });
                let targetData = await userModel.findOne({userID:target.id});
                if(targetData){
                    function check_Winner2(bot_choice,choice){
                    
                    
                        console.log(bot_choice);
                        if(bot_choice === 'rock' && choice === 'scissor'){
                            who_won = 'bot';
                        }else if(bot_choice === 'rock' && choice === 'paper'){
                            who_won = 'user';
                        }else if(bot_choice === 'rock' && choice === 'rock'){
                            who_won = 'tie';
                        }
                
                        if(bot_choice === 'paper' && choice === 'rock'){
                            who_won = 'bot';
                        }else if(bot_choice === 'paper' && choice === 'scissor'){
                            who_won = 'user';
                        }else if(bot_choice === 'paper' && choice === 'paper'){
                            who_won = 'tie';
                        }
            
            
                        if(bot_choice === 'scissor' && choice === 'paper'){
                            who_won = 'bot';
                        }else if(bot_choice === 'scissor' && choice === 'rock'){
                            who_won = 'user';
                        }else if(bot_choice === 'scissor' && choice === 'scissor'){
                            who_won = 'tie';
                        }
                    
                    }
                async function result2(bot_choice,choice){
                        if(bot_choice !== ' ' && choice !== ' '){
                            if(who_won === 'bot'){
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`${target.username}, won the game`,target.displayAvatarURL());
                                embed.addFields({name:`${message.author.username} chose`,value:`${choice}`},{name:`${target.username} chose`,value:`${bot_choice}`});
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed.setTimestamp();
                                embed.setColor(`#30CC71`);
                                message.channel.send({embeds:[embed]});
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                        totalrps:1,
                                        lostrps:1
                                    }
                                });
                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                    $inc:{
                                        totalrps:1,
                                        wonrps:1
                                    }
                                });
                            }else if(who_won === 'user'){
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`${message.author.username},won the game`,avatar);
                                embed.addFields({name:`${message.author.username} chose`,value:`${choice}`},{name:`${target.username} chose`,value:`${bot_choice}`});
                                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed.setTimestamp();
                                embed.setColor(`#30CC71`);
                                message.channel.send({embeds:[embed]});
                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                        totalrps:1,
                                        wonrps:1
                                    }
                                });
                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                    $inc:{
                                        totalrps:1,
                                        lostrps:1
                                    }
                                });
                            }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username} & ${target.username}, It's a tie!`);
                            embed.addFields({name:`${message.author.username} chose`,value:`${choice}`},{name:`${target.username} chose`,value:`${bot_choice}`});
                            console.log('target choice : ' + bot_choice + 'user : choice : '+ choice);
                            embed.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    totalrps:1,
                                    tierps:1
                                }
                            });
                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                $inc:{
                                    totalrps:1,
                                    tierps:1
                                }
                            });
                            }
                        }
                    }
                    let bot_choice = '';
                    let choice = '';
                    let who_won = '';
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`<:rockpaperscissors:945317106071769159> Rock Paper Scissor`);
                    embed.setDescription(`${message.author},**choose one and wisely between rock , paper & scissor**`);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setColor('#8CD96B');
                    embed.setTimestamp();

                    const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('rock')
                            .setEmoji('🪨')
                            .setStyle('PRIMARY'),
                        new Discord.MessageButton()
                            .setCustomId('paper')
                            .setEmoji('<:paper:898069617241620571>')
                            .setStyle('PRIMARY'),
                        
                        new Discord.MessageButton()
                            .setCustomId('scissor')
                            .setEmoji('<:scissor:898070174698209321>')
                            .setStyle('PRIMARY')
                        
                    );

                    const row2 = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('rock2')
                            .setEmoji('🪨')
                            .setStyle('PRIMARY'),
                        new Discord.MessageButton()
                            .setCustomId('paper2')
                            .setEmoji('<:paper:898069617241620571>')
                            .setStyle('PRIMARY'),
                        
                        new Discord.MessageButton()
                            .setCustomId('scissor2')
                            .setEmoji('<:scissor:898070174698209321>')
                            .setStyle('PRIMARY')
                        
                    );

                    const embed2 = new Discord.MessageEmbed();
                    embed2.setTitle(`<:rockpaperscissors:945317106071769159> Rock Paper Scissor`);
                    embed2.setDescription(`${target},**choose one and wisely between rock , paper & scissor**`);
                    embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed2.setColor('#8CD96B');
                    embed2.setTimestamp();
                    const m = await message.reply({embeds:[embed],components:[row]});
                    const m2 = await message.channel.send({embeds:[embed2],components:[row2]});
                    const ifilter = i => i.user.id === message.author.id;
                    const ifilter2 = i => i.user.id === target.id;
                    
                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 60000 });

                    collector.on('collect', async i => {
                        console.log('hello there' + i.guildId);
                        if (i.customId === 'rock') {
                            choice = 'rock';
                            await i.update({ embeds:[embed],components:[]});
                            if(bot_choice !== ''){
                            check_Winner2(bot_choice,choice);
                            result2(bot_choice,choice);
                            }
                        }else if(i.customId==='paper'){
                            choice = 'paper';
                            await i.update({ embeds:[embed],components:[]});
                            if(bot_choice !== ''){
                                check_Winner2(bot_choice,choice);
                                result2(bot_choice,choice);
                            }
                        }else if(i.customId === 'scissor'){
                            choice = 'scissor';
                            await i.update({ embeds:[embed],components:[]});
                            if(bot_choice !== ''){
                                check_Winner2(bot_choice,choice);
                                result2(bot_choice,choice);
                            }
                        }
                    });
                    collector.on('end', collected => {
                        console.log(`Collected ${collected.size} items`);
                        if(collected.size === 0){
                            if(bot_choice !== ''){
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Time Up!`);
                            embed.setDescription(`**${message.author} didn't choose any of the given option so the match has been called off.**`);
                            embed.setColor('#ED4245');
                            message.channel.send({embeds:[embed]});
                            row.components[0].setDisabled(true)
                            row.components[1].setDisabled(true)
                            row.components[2].setDisabled(true)
                            row2.components[0].setDisabled(true)
                            row2.components[1].setDisabled(true)
                            row2.components[2].setDisabled(true)
                
                            }
                        }
                    });

                    const collector2 = m2.createMessageComponentCollector({ filter:ifilter2, time: 60000 });

                    collector2.on('collect', async i => {
                        console.log('hello there' + i.guildId);
                        if(i.customId === 'rock2'){
                            bot_choice = 'rock';
                            await i.update({ embeds:[embed2],components:[]});
                            if(choice !== ''){
                                check_Winner2(bot_choice,choice);
                                result2(bot_choice,choice);
                            }
                        }else if(i.customId === 'paper2'){
                            bot_choice = 'paper';
                            await i.update({ embeds:[embed2],components:[]});
                            if(choice !== ''){
                                check_Winner2(bot_choice,choice);
                                result2(bot_choice,choice);
                            }
                        }else if(i.customId === 'scissor2'){
                            bot_choice = 'scissor';
                            await i.update({ embeds:[embed2],components:[]});
                            if(choice !== ''){
                                check_Winner2(bot_choice,choice);
                                result2(bot_choice,choice);
                            }
                        }
                    });
                    collector2.on('end', collected =>{ 
                        console.log(`Collected ${collected.size} items`);
                        if(collected.size === 0){
                            if(choice !== ''){
                                console.log(choice);
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`Time Up!`);
                                embed.setDescription(`**${target} didn't choose any of the given option so the match has been called off.**`);
                                embed.setColor('#ED4245');
                                message.channel.send({embeds:[embed]});
                                row.components[0].setDisabled(true)
                                row.components[1].setDisabled(true)
                                row.components[2].setDisabled(true)
                                row2.components[0].setDisabled(true)
                                row2.components[1].setDisabled(true)
                                row2.components[2].setDisabled(true)
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`Time Up!`);
                                embed.setDescription(`**${target} and ${message.author} didn't choose any of the given option so the match has been called off.**`);
                                embed.setColor('#ED4245');
                                message.channel.send({embeds:[embed]});
                                row.components[0].setDisabled(true)
                                row.components[1].setDisabled(true)
                                row.components[2].setDisabled(true)
                                row2.components[0].setDisabled(true)
                                row2.components[1].setDisabled(true)
                                row2.components[2].setDisabled(true)
                            }
                        }
                    });
                    
                    
                }else{
                    message.channel.send(`${target}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

                }
                }
            }else{
                var msec = n - lastrps;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = timeup2 - ss;
                if(userData.premium !== 'enable'){
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`Wait bro!`);
                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play rps again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                    message.channel.send({embeds:[embed]});
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`Chill bro!`);
                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play rps
                     again!.`);
                    embed.setColor('#025CFF');
                    message.channel.send({embeds:[embed]});
                }
            }
            
        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

        }
    }
}