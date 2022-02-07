const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'raid',
    aliases:['raid','rob'],
    async execute(message,args){
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(serverData){
            let userData = await userModel.findOne({userID:message.author.id});
            const target = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
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
                       commands:1,
                       level:1
                     }
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
                if(serverData.raid !== 'disable'){
                    if(target){
                    const memberTarget = message.guild.members.cache.get(target.id);

                    if(userData.mode !== 'unactive'){
                        
                        let targetData = await userModel.findOne({userID:target.id});
                    if(targetData){
                        if(target.id !== message.author.id){
                            let lastraid = userData.lastraid;
                            var d = new Date();
                            var n = d.getTime();
                            let timeup;
                            let timeup2;
                            if(userData.premium === 'enable'){
                              timeup = 15000;
                              timeup2 = 15;
                            }else{
                              timeup = 25000;
                              timeup2 = 25;
                            }
                            if(n - userData.lastraid >= timeup){
                               if(n- targetData.gotraided >= 60000){
                                    if(targetData.mode !== 'unactive'){
                                    
                                        if(targetData.lockactive === 'enable'){
                                        let money  = Math.floor(Math.random() * 1000);
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`❌ Rob failed`);
                                        embed.setDescription(`You robbed ${memberTarget.user.username} just to realize that he/she has a lock and you paid police ${money}`);
                                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                        embed.setColor('#ED4245');
                                        message.channel.send({embeds:[embed]});
                                        if(targetData.premium === 'enable'){
                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle('⚠️ Rob Alert');
                                            embed2.setThumbnail(message.author.displayAvatarURL());
                                            embed2.setDescription(`**${message.author.username}#${message.author.discriminator}** tried to rob you in ${message.guild.name} from ${message.channel.name} channel`);
                                            embed2.setFooter(`Tip: set your mode to passive`);
                                            embed2.setTimestamp();
                                            let send = true;
                                            target.send({embeds:[embed2]}).catch(()=>{
                                                send = false;
                                            });
                                        }
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
                                                message.channel.send(`${message.author}, You can't rob the person has 0 money in wallet`);
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
                                                embed.setTitle(`✅ Robbed ${memberTarget.user.username}`);
                                                embed.setDescription(`You have successfully robbed ${memberTarget.user.username} and got ${money2}.`);
                                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                                message.channel.send({embeds:[embed]});
                                                if(targetData.premium === 'enable'){
                                                    const embed2 = new Discord.MessageEmbed();
                                                    embed2.setTitle('⚠️ Rob Alert');
                                                    embed2.setThumbnail(message.author.displayAvatarURL());
                                                    embed2.setDescription(`**${message.author.username}#${message.author.discriminator}** robbed ${money2} from you in ${message.guild.name} from ${message.channel.name} channel`);
                                                    embed2.setFooter(`Tip: set your mode to passive`);
                                                    embed2.setTimestamp();
                                                    let send = true;
                                                    target.send({embeds:[embed2]}).catch(()=>{
                                                        send = false;
                                                    });
                                                }
                                            }
                                            
                                        }
                                    }else{
                                        message.channel.send(`${message.author}, The person you tried to rob is in **unactive** mode.`);
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`Wait bro!`);
                                    embed.setDescription(`The person you tried to rob has already been robbed few seconds back. You can't rob that person for some time.`);
                                    message.channel.send({embeds:[embed]});
                                }

                            }else{
                                var msec = n - lastraid;
                                console.log(msec);
                                var ss = Math.floor(msec / 1000);
                                var second = timeup2 - ss;
                                if(userData.premium !== 'enable'){
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`Wait bro!`);
                                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to rob again!. The default cooldown is of **25** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                                    message.channel.send({embeds:[embed]});
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`Chill bro!`);
                                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to rob again!.`);
                                    embed.setColor('#025CFF');
                                    message.channel.send({embeds:[embed]});
                                }
                            }   

                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, You can't rob yourself!`);
                        message.channel.send({embeds:[embed]});
                    }
                        }else{
                            message.channel.send(`${target}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
                        }
                    }else{
                        message.channel.send(`${message.author}, you can't rob in **unactive** mode.`);
                    }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a user to rob!`);
                        message.channel.send({embeds:[embed]});
                    }
                }else{
                    message.channel.send(`${message.author}, rob is disabled in this server`);
                }
            }else{
                message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
            }
            
        }
    }
}