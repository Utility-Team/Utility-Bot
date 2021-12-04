const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports ={
    name:'dig',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        if(userData){
            let lastdig;
            if(!userData.lastdig){
              lastdig = 0;
              }else{
                lastdig = userData.lastdig
              }
              var d = new Date();
              var n = d.getTime();
              if(n- lastdig >= 30000){
                var d2 = new Date();
                var n2 = d2.getTime();
                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                  lastdig:n2
                })
                let dig_chance = Math.floor(Math.random() * 2);
                if(dig_chance === 0){    
                message.channel.send(`${message.author} , You found nothing but Nice try!`);
                }
                
                if(dig_chance === 1){
                let random_chance = Math.floor(Math.random()*5);
                if(random_chance === 0){
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                    $inc:{
                        dirt:1
                    }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ ${message.author.username}, You dug and got some dirt!`);
                    embed.setDescription(`You can keep it or sell it using sell command.`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setColor(`#30CC71`);
                    message.channel.send({embeds:[embed]});
                }
                if(random_chance === 1){
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                        $inc:{
                            boots:1
                        }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ ${message.author.username}, You dug and got a pair of 👢 boots!`);
                    embed.setDescription(`You can keep it or sell it using sell command.`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setColor(`#30CC71`);
                    message.channel.send({embeds:[embed]});
                }
                if(random_chance === 2){
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                        $inc:{
                            grass:1
                        }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ ${message.author.username}, You dug and got some grass!`);
                    embed.setDescription(`You can keep it or sell it using sell command.`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setColor(`#30CC71`);
                    message.channel.send({embeds:[embed]});
                }
                if(random_chance === 3){
                    let random_number = Math.floor(Math.random() * 1000);
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                    $inc:{
                        networth:random_number,
                        wallet:random_number
                    }
                    });
                
                message.channel.send(`${message.author} , You found 🥫garbage and got ${random_number} for it!`);
        
                }
                if(random_chance === 4){
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                        $inc:{
                            ancientcoin:1
                        }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ ${message.author.username}, You dug and 1 ancient coin!`);
                    embed.setDescription(`You can keep it or sell it using sell command.`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setColor(`#30CC71`);
                    message.channel.send({embeds:[embed]});
                }
                }
              }else{
                var msec = n - lastdig;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = 30 - ss;
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Wait bro!`);
                embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use dig again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                message.channel.send({embeds:[embed]});
              }

        }else{
            message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
        }
    }
}