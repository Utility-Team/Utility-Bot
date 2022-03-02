const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'badges',
    aliases:['badges','badge','mybadges','mybadge'],
    async execute(message,args){
        const userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(userData){
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
                if(!args[0]){
                    if(userData.badges){
                        if(userData.badges.length>0){
                            let mainembed = new Discord.MessageEmbed();
                            mainembed.setTitle(`${message.author.username}'s badges`);
                            let secondembed = new Discord.MessageEmbed();
                            secondembed.setTitle(`${message.author.username}'s badges`);
                            let arr = [];
                            let badges = userData.badges;
                            badges.sort((a,b)=>b.power - a.power);
                            let val = 0;
                            badges.forEach(async (e)=>{
                                val = val + 1;
                                if(val <=10){
                                mainembed.addFields({name:`${e.name}:`,value:`${e.badge}`});
                                }
                                if(val>10){
                                secondembed.addFields({name:`${e.name}:`,value:`${e.badge}`});
                                }
                                if(val === badges.length){
                                    mainembed.setThumbnail(`${avatar}`);
                                    mainembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                    mainembed.setTimestamp();
                                    secondembed.setThumbnail(`${avatar}`);
                                    secondembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                    secondembed.setTimestamp();
                                    if(val >10){
                                        const row = new Discord.MessageActionRow()
                                        .addComponents(
                                            new Discord.MessageButton()
                                                .setCustomId('page1')
                                                .setLabel('1')
                                                .setStyle('PRIMARY'),
                                            new Discord.MessageButton()
                                                .setCustomId('page2')
                                                .setLabel('2')
                                                .setStyle('PRIMARY'),
                                            
                                        );
                                        const m = await message.channel.send({embeds:[mainembed],components:[row]});
                                        const ifilter = i => i.user.id === message.author.id;
                                        const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                                
                                        collector.on('collect', async i => {
                                            
                                            if (i.customId === 'page1') {
                                            await i.update({embeds:[mainembed]});
                                            }
                                            if(i.customId==='page2'){
                                            await i.update({embeds:[secondembed]});
                                            }
                                        });
                                
                                        collector.on('end', collected => console.log(`Collected ${collected.size} items`));  
                                    }else{                        
                                        message.channel.send({embeds:[mainembed]});
                                    }
                                }
                            
                            });       
                        }else{
                            let mainembed = new Discord.MessageEmbed();
                            mainembed.setTitle(`${message.author.username}'s badges`);
                            mainembed.setThumbnail(avatar);
                            mainembed.setDescription(`You don't have any badges yet`);
                            mainembed.setFooter(`type ${serverData.prefix}rewards for more info`);
                            mainembed.setTimestamp();
                            message.channel.send({embeds:[mainembed]});
                        }
                    }else{
                        let mainembed = new Discord.MessageEmbed();
                        mainembed.setTitle(`${message.author.username}'s badges`);
                        mainembed.setThumbnail(avatar);
                        mainembed.setDescription(`You don't have any badges yet`);
                        mainembed.setFooter(`type ${serverData.prefix}rewards for more info`);
                        mainembed.setTimestamp();
                        message.channel.send({embeds:[mainembed]});
                    }
                }else{
                    if(target){
                        const memberTarget = message.guild.members.cache.get(target.id);
                        let targetData = await userModel.findOne({userID:memberTarget.id});
                        if(targetData){
                            let targetimage;
                            if(targetData.premium === 'enable'){
                                if(targetData.premiumtype === '3'){
                                    if(targetData.premium !== ''){
                                        targetimage = targetData.avatar;
                                    }else{
                                        targetimage = memberTarget.user.displayAvatarURL();
                                    }
                                }else{
                                    targetimage = memberTarget.user.displayAvatarURL();
                                }
                            }else{
                                targetimage = memberTarget.user.displayAvatarURL();
                            }
                            if(targetData.badges){
                                if(targetData.badges.length>0){
                                    let mainembed = new Discord.MessageEmbed();
                                    mainembed.setTitle(`${memberTarget.user.username}'s badges`);
                                    let secondembed = new Discord.MessageEmbed();
                                    secondembed.setTitle(`${memberTarget.user.username}'s badges`);
                                    let arr = [];
                                    let badges = targetData.badges;
                                    badges.sort((a,b)=>b.power - a.power);
                                    let val = 0;
                                    badges.forEach(async (e)=>{
                                        val = val + 1;
                                        if(val <=10){
                                        mainembed.addFields({name:`${e.name}:`,value:`${e.badge}`});
                                        }
                                        if(val>10){
                                        secondembed.addFields({name:`${e.name}:`,value:`${e.badge}`});
                                        }
                                        if(val === badges.length){
                                            mainembed.setThumbnail(`${targetimage}`);
                                            mainembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                            mainembed.setTimestamp();
                                            secondembed.setThumbnail(`${targetimage}`);
                                            secondembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                            secondembed.setTimestamp();
                                            if(val >10){
                                                const row = new Discord.MessageActionRow()
                                                .addComponents(
                                                    new Discord.MessageButton()
                                                        .setCustomId('page1')
                                                        .setLabel('1')
                                                        .setStyle('PRIMARY'),
                                                    new Discord.MessageButton()
                                                        .setCustomId('page2')
                                                        .setLabel('2')
                                                        .setStyle('PRIMARY'),
                                                    
                                                );
                                                const m = await message.channel.send({embeds:[mainembed],components:[row]});
                                                const ifilter = i => i.user.id === message.author.id;
                                                const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                                        
                                                collector.on('collect', async i => {
                                                    
                                                    if (i.customId === 'page1') {
                                                    await i.update({embeds:[mainembed]});
                                                    }
                                                    if(i.customId==='page2'){
                                                    await i.update({embeds:[secondembed]});
                                                    }
                                                });
                                        
                                                collector.on('end', collected => console.log(`Collected ${collected.size} items`));  
                                            }else{                        
                                                message.channel.send({embeds:[mainembed]});
                                            }
                                        }
                                    
                                    });       
                                }else{
                                    let mainembed = new Discord.MessageEmbed();
                                    mainembed.setTitle(`${memberTarget.user.username}'s badges`);
                                    mainembed.setThumbnail(targetimage);
                                    mainembed.setDescription(`${memberTarget.user.username} doesn't have any badges yet`);
                                    mainembed.setFooter(`type ${serverData.prefix}rewards for more info`);
                                    mainembed.setTimestamp();
                                    message.channel.send({embeds:[mainembed]});
                                }
                            }else{
                                let mainembed = new Discord.MessageEmbed();
                                mainembed.setTitle(`${memberTarget.user.username}'s badges`);
                                mainembed.setThumbnail(targetimage);
                                mainembed.setDescription(`${memberTarget.user.username} doesn't have any badges yet`);
                                mainembed.setFooter(`type ${serverData.prefix}rewards for more info`);
                                mainembed.setTimestamp();
                                message.channel.send({embeds:[mainembed]});
                            }
                        }else{
                            message.channel.send(`${target}, You haven't joined the game. Type ${serverData.prefix}join to join the game`); 
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid user!`);
                        message.channel.send({embeds:[embed]});
                    }
                }
        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`); 
        }
    }
}