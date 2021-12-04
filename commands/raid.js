const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'raid',
    async execute(message,args){
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(serverData){
         
            let userData = await userModel.findOne({userID:message.author.id});
            const target = message.mentions.users.first();
            if(userData){
                if(serverData.raid !== 'disable'){
                    if(target){
                    if(userData.mode !== 'unactive'){
                        
                        let targetData = await userModel.findOne({userID:target.id});
                    if(targetData){
                        if(target.id !== message.author.id){
                            let lastraid = userData.lastraid;
                            var d = new Date();
                            var n = d.getTime();
                            if(n - userData.lastraid >= 25000){
                               if(n- targetData.gotraided >= 60000){
                                    if(targetData.mode !== 'unactive'){
                                    
                                        if(targetData.lockactive === 'enable'){
                                        let money  = Math.floor(Math.random() * 1000);
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`❌ Your raid failed`);
                                        embed.setDescription(`You raided ${target.username} just to realize that he/she has a lock and you paid police ${money}`);
                                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                        embed.setColor('#ED4245');
                                        message.channel.send({embeds:[embed]});
                                        var d2 = new Date();
                                        var n2 = d2.getTime();
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            lastraid:n2,
                                            $inc:{
                                                wallet:-money,
                                                networth:-money
                                            }
                                        });
                                       
                                        const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                          gotraided:n2
                                        });
                                        console.log(targetData.lockactive);
                                            if(targetData.nolock === 1){
                                            
                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    nolock:-1
                                                },
                                                lockactive:'disable'
                                            });
                                            }else if(targetData.nolock > 1){
                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        nolock:-1
                                                    },
                                                });
                                            }
                                        }else{
                                            let wallet = targetData.wallet;
                                            if(wallet === 0){
                                                message.channel.send(`${message.author}, You can't raid the person has 0 money in wallet`);
                                            }else{
                                                let money2  = Math.floor(Math.random() * wallet);
                                                var d2 = new Date();
                                                var n2 = d2.getTime();
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    lastraid:n2,
                                                    $inc:{
                                                        wallet:money2,
                                                        networth:money2
                                                    }
                                                });
                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    gotraided:n2,
                                                    $inc:{
                                                        wallet:-money2,
                                                        networth:-money2
                                                    }
                                                });
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`✅ Raided ${target.username}`);
                                                embed.setDescription(`You have successfully raided ${target.username} and got ${money2}.`);
                                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                                message.channel.send({embeds:[embed]});
                                            }
                                            
                                        }
                                    }else{
                                        message.channel.send(`${message.author}, The person you tried to raid is in **unactive** mode.`);
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`Wait bro!`);
                                    embed.setDescription(`The person you tried to raid has already been raided few seconds back. You can't raid that person for some time.`);
                                    message.channel.send({embeds:[embed]});
                                }

                            }else{
                                var msec = n - lastraid;
                                console.log(msec);
                                var ss = Math.floor(msec / 1000);
                                var second = 25 - ss;
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`Wait bro!`);
                                embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to raid again!. The default cooldown is of **25** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                                message.channel.send({embeds:[embed]});
                            }   

                    }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, You can't raid yourself!`);
                    message.channel.send({embeds:[embed]});
                    }
                        }else{
                            message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
                        }
                    }else{
                        message.channel.send(`${message.author}, you can't raid in **unactive** mode.`);
                    }
                    }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, Please mention a user to raid!`);
                    message.channel.send({embeds:[embed]});
                    }
                }else{
                    message.channel.send(`${message.author}, raid is disabled in this server`);
                }
            }else{
                message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
            }
            
        }
    }
}