const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'give',
    aliases:['give','donate'],
    async execute(message,args){
        const target = message.mentions.users.first();
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(userData){
           async function both_Rewards(achievement,achievement2,prize,prize2,badge,badge2,power,power2){
               if(userData.rewards && userData.badges){
                   if(userData.rewards.length>0){
                       const embed = new Discord.MessageEmbed();
                       embed.setTitle(`🎉 Double Achievements Unlocked!`);
                       embed.setDescription(`You have unlocked **${achievement}** and **${achievement2} achievement** your rewards are **${prize + prize2}, ${badge} & ${badge2} badges**`);
                       embed.setTimestamp();
                       message.channel.send({embeds:[embed]});
                       let rewardData = userData.rewards;
                       let badgeData = userData.badges;
                       let newbadgeData={
                        name:achievement,
                        badge:badge,
                        power:power,
                        category:'Donation'
                       }
                       let newbadgeData2={
                        name:achievement2,
                        badge:badge2,
                        power:power2,
                        category:'Donation'
                       }
                       let newrewardsData={
                            name:achievement,
                            reward:`${prize}`,
                            badge:badge,
                            category:'Donation'    
                       }
                       let newrewardsData2={
                        name:achievement2,
                        reward:`${prize2}`,
                        badge:badge2,
                        category:'Donation'    
                       }
                       rewardData.push(newrewardsData);
                       rewardData.push(newrewardsData2);
                       badgeData.push(newbadgeData);
                       badgeData.push(newbadgeData2);
                       let totalprize = prize + prize2;
                       const response = await userModel.findOneAndUpdate({userID:message.author},{
                          $inc:{
                            networth:totalprize,
                            wallet:totalprize
                          },
                          rewards:rewardData,
                          badges:badgeData
                       });
                   }else{
                        console.log('3');
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`🎉 Double Achievements Unlocked!`);
                        embed.setDescription(`You have unlocked **${achievement}** and **${achievement2} achievement**  your rewards are **${prize + prize2}, ${badge} & ${badge2}**`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        let rewardData = [];
                        let badgeData = [];
                        let newbadgeData={
                        name:achievement,
                        badge:badge,
                        power:power,
                        category:'Donation'
                        }
                        let newbadgeData2={
                        name:achievement2,
                        badge:badge2,
                        power:power2,
                        category:'Donation'
                        }
                        let newrewardsData={
                            name:achievement,
                            reward:`${prize}`,
                            badge:badge,
                            category:'Donation'    
                        }
                        let newrewardsData2={
                        name:achievement2,
                        reward:`${prize2}`,
                        badge:badge2,
                        category:'Donation'    
                        }
                        rewardData.push(newrewardsData);
                        rewardData.push(newrewardsData2);
                        badgeData.push(newbadgeData);
                        badgeData.push(newbadgeData2);
                        let totalprize = prize + prize2;
                        const response = await userModel.findOneAndUpdate({userID:message.author},{
                            $inc:{
                                networth:totalprize,
                                wallet:totalprize
                            },
                            rewards:rewardData,
                            badges:badgeData
                        });
                   }
               }else{
                    console.log('4');
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`🎉 Double Achievements Unlocked!`);
                    embed.setDescription(`You have unlocked **${achievement}** and **${achievement2} achievement**  your rewards are **${prize + prize2}, ${badge} & ${badge2}**`);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    let rewardData = userData.rewards;
                    let badgeData = userData.badges;
                    let newbadgeData={
                    name:achievement,
                    badge:badge,
                    power:power,
                    category:'Donation'
                    }
                    let newbadgeData2={
                    name:achievement2,
                    badge:badge2,
                    power:power2,
                    category:'Donation'
                    }
                    let newrewardsData={
                        name:achievement,
                        reward:`${prize}`,
                        badge:badge,
                        category:'Donation'    
                    }
                    let newrewardsData2={
                    name:achievement2,
                    reward:`${prize2}`,
                    badge:badge2,
                    category:'Donation'    
                    }
                    rewardData.push(newrewardsData);
                    rewardData.push(newrewardsData2);
                    badgeData.push(newbadgeData);
                    badgeData.push(newbadgeData2);
                    let totalprize = prize + prize2;
                    const response = await userModel.findOneAndUpdate({userID:message.author},{
                        $inc:{
                            networth:totalprize,
                            wallet:totalprize
                        },
                        rewards:rewardData,
                        badges:badgeData
                    });
               }
           }
           async function check_Rewards(achievement,prize,badge,power){
                if(userData.rewards && userData.badges){
                    if(userData.rewards.length>0){
                        let check = 0;
                        for(var x=0;x<=userData.rewards.length;x++){
                            if(userData.rewards[x]){
                                console.log('step 1');
                                if(userData.rewards[x].name === achievement && check<5){
                                    check = 5;
                                    console.log('it already exists');
                                    return;
                                }
                                if(x === userData.rewards.length && check<5){
                                    console.log('step 2');
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`🎉 Unlocked New Achievement!`);
                                    embed.setDescription(`You have unlocked **${achievement} achievement** and your reward is **${prize} & ${badge} badge**`);
                                    embed.setTimestamp();
                                    message.channel.send({embeds:[embed]});
                                    let badgeData = userData.badges;
                                    let rewardData = userData.rewards;
                                    let newbadgeData={
                                        name:achievement,
                                        badge:badge,
                                        power:power,
                                        category:'Donation'
                                    }
                                    let newrewardsData={
                                        name:achievement,
                                        reward:`${prize}`,
                                        badge:badge,
                                        category:'Donation'    
                                    }
                                    badgeData.push(newbadgeData);
                                    rewardData.push(newrewardsData);
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        $inc:{
                                            networth:prize,
                                            wallet:prize
                                        },
                                        rewards:rewardData,
                                        badges:badgeData
                                    });
                                }
                            }
                        }
                    }else{
                        console.log('step 3');
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`🎉 Unlocked New Achievement!`);
                        embed.setDescription(`You have unlocked **${achievement} achievement** and your reward is **${prize} & ${badge} badge**`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                        let badgeData = [];
                        let rewardData = [];
                        let newbadgeData={
                            name:achievement,
                            badge:badge,
                            power:power,
                            category:'Donation'
                        }
                        let newrewardsData={
                            name:achievement,
                            reward:`${prize}`,
                            badge:badge,
                            category:'Donation'    
                        }
                        badgeData.push(newbadgeData);
                        rewardData.push(newrewardsData);
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                                networth:prize,
                                wallet:prize
                            },
                            rewards:rewardData,
                            badges:badgeData
                        });

                    }
                }else{
                    console.log('step 4');
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`🎉 Unlocked New Achievement!`);
                    embed.setDescription(`You have unlocked **${achievement} achievement** and your reward is **${prize} & ${badge} badge**`);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    let badgeData = [];
                    let rewardData = [];
                    let newbadgeData={
                        name:achievement,
                        badge:badge,
                        power:power,
                        category:'Donation'
                    }
                    let newrewardsData={
                        name:achievement,
                        reward:`${prize}`,
                        badge:badge,
                        category:'Donation'    
                    }
                    badgeData.push(newbadgeData);
                    rewardData.push(newrewardsData);
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                        $inc:{
                            networth:prize,
                            wallet:prize
                        },
                        rewards:rewardData,
                        badges:badgeData
                    });
                }
           }
            if(target){ 
                let targetData = await userModel.findOne({userID:target.id});    
                if(targetData){
                    if(!isNaN(args[1]) && Math.sign(args[1]) === 1){
                        if(userData.wallet >= args[1]){
                            if(targetData.wallet < 5000000000 && targetData.wallet + parseInt(args[1])<=5000000000 ){
                                let wallet = userData.wallet - args[1];
                                let networth = userData.networth - args[1];
                                let wallet2 = targetData.wallet + args[1];
                                let networth2 = targetData.networth + args[1];
                                const response = await userModel.findOneAndUpdate({
                                    userID:message.author.id,
                                },
                                {  
                                $inc: {
                                    wallet:-args[1],
                                    networth:-args[1],
                                    totalmoneydonated:parseInt(args[1])

                                },
                                }
                                )
                                const response2 = await userModel.findOneAndUpdate({
                                    userID:target.id,
                                },
                                {  
                                $inc: {
                                    wallet:args[1],
                                    networth:args[1],
                                    totalmoneyreceived:parseInt(args[1])
                                },
                                }
                                );
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Transferred`);
                                embed.setDescription(`You have successfully transferred ${args[1]} to <@!${target.id}>. Now your currrent wallet balance is ${wallet}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                embed.setColor(`#30CC71`);
                                message.channel.send({embeds:[embed]});
                                if(userData.rewards){
                                    if(userData.totalmoneydonated + parseInt(args[1])>=100000){
                                        console.log('here 2');
                                        check_Rewards('Donation of 100k Coins',10000,'<:moneysharingbadge:925707445593051177>',1);
                                    }
                                    if(userData.totalmoneydonated + parseInt(args[1])>=1000000){
                                        if(userData.totalmoneydonated >= 100000){
                                            console.log('here');
                                            check_Rewards('Donation of 1m Coins',100000,'<:1mmoneysharingbadge:933625773192003624>',5);
                                        }else{
                                            both_Rewards('Donation of 100k Coins','Donation of 1m Coins',10000,100000,'<:moneysharingbadge:925707445593051177>','<:1mmoneysharingbadge:933625773192003624>',1,5);
                                        }
                                    }
                                }
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${target} can't have more than 5 billion coins in their wallet`);
                                message.channel.send({embeds:[embed]});
                            }
                

                        }else{
                            message.channel.send(`${message.author}, You dont' have enough money in your wallet!`);
                        }
                        
                    }else{
                            message.channel.send(`${message.author} Please mention a valid number!`);
                    }
                        
                }else{
                   message.channel.send(`${targetData}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
                   
                }
            }else{
                message.channel.send(`${message.author},You forgot to mention the person to give money!`);
            }
        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
           
        }
    }
}