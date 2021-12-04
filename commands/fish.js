const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'fish',
    async execute(message,args){
        const userData = await userModel.findOne({userID:message.author.id});
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
           if(userData.fishingrod> 0){
                var d = new Date();
                var n = d.getTime();
                let lastfish = userData.lastfish;
                if(n- lastfish >= 30000){
                        var d2 = new Date();
                        var n2 = d2.getTime();  
                        const response  = await userModel.findOneAndUpdate({userID:message.author.id},
                        {
                          lastfish:n2
                        });
                        let fish_chance = Math.floor(Math.random() * 3);
                        console.log(fish_chance);
                        if(fish_chance === 0){
                            message.reply(`You found nothing. Nice try!`);
                        }else if(fish_chance === 1){
                            const chance = Math.floor(Math.random()*1000);
                            if(chance === 999){
                                message.reply(`You found a <:rarecoin:889378862708969482> rare coin. good job!`);
                            }else{
                               const random = Math.floor(Math.random()*100);
                                if(userData.wallet === 1000000000 || userData.wallet + random > 1000000000){
                                    message.reply(`You found 🥫garbage and You got <:UC:878195863413981214> 0 for it!`);
                                }else{
                                  
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},
                                    {
                                        $inc:{   
                                            wallet:random,
                                            networth:random
                                        }
                                    } 
                                        );
                                    message.reply(`You found 🥫garbage and You got <:UC:878195863413981214> ${random} for it!`);
                                }
                            }
                        }else if(fish_chance === 2){
                        let fish = ['🐠 gold fish','🐙 octopus','🐟 common fish','🦈shark'];
                        let fishgot = fish[Math.floor(Math.random() * fish.length)];
                        if(fishgot === '🐠 gold fish'){
                            const update = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    goldfish:1
                                }
                            });
                        }else if(fishgot === '🐙 octopus'){
                                const update = await userModel.findOneAndUpdate({userID:message.author.id},{
                                    $inc:{
                                        octopus:1
                                    }
                                });
                        }else if(fishgot === '🐟 common fish'){
                            const update = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    commonfish:1
                                }
                            });
                        }else if(fishgot === '🦈shark'){
                            const update = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    shark:1
                                }
                            });
                        }
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ You got a ${fishgot}!`);
                        embed.setDescription('You can keep or sell it using sell command');
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        embed.setColor(`#30CC71`);
                        message.channel.send({embeds:[embed]});
                        }
                }else{
                    var msec = n - lastfish;
                    console.log(msec);
                    var ss = Math.floor(msec / 1000);
                    var second = 30 - ss;
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`Wait bro!`);
                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use fish again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                    message.channel.send({embeds:[embed]});
                }
            }else{
                message.channel.send(`${message.author}, You don't have fishing rod to fish!`)
            }
        }else{
            message.channel.send(`${message.author} You haven't joined the currency game. Please type ;join to join the game.`)
        }

    }
}