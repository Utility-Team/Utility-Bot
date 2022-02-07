const Discord = require('discord.js');
const userModel = require("../models/userSchema");
const serverModel = require("../models/profileSchema");
module.exports = {
    name:'scramble',
    async execute(message,args){
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        let userData = await userModel.findOne({userID:message.author.id});
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
            if(args[0]){
                let number = args[0];
                if(!isNaN(number) && Math.sign(number) === 1){
                      if(number % 1=== 0){  
                            let lastscramble;
                            if(userData.lastscramble){  
                                lastscramble = userData.lastscramble;
                            }else{
                                lastscramble = 0;
                            }
                            let timeup;
                            let timeup2;
                            if(userData.premium === 'enable'){
                              timeup = 7000;
                              timeup2 = 7;
                            }else{
                              timeup = 15000;
                              timeup2 = 15;
                            }
                            var d = new Date();
                            var n = d.getTime();
                            console.log(timeup);
                            if(n - lastscramble >= timeup){
                                if(userData.wallet >= args[0]){
                                    if(args[0]<= 15000){
                                        let words = ['toy','noise','bot','buy','tie','nope','hope','pack','rock','trim','air','rat','bruh','noob','stay'];
                                        let scramblewords = ['oty','iosen','tob','uby','iet','epon','epho','kacp','kroc','rimt','rai','tra','ruhb','boon','atsy'];
                                        // let word_number =Math.floor(Math.random() * words.length);
                                        let scramblenumber;
                                        if(userData.scramble){
                                            scramblenumber = userData.scramble;
                                            if(scramblenumber > scramblewords.length){
                                                scramblenumber= 0;
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    scramble:1
                                                });
                                            }else{
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        scramble:1
                                                    }
                                                });
                                            }
                                        }else{
                                            scramblenumber = 0;
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                scramble:1
                                            });
                                        }
                                        let word = scramblewords[scramblenumber];
                                        const row = new Discord.MessageActionRow();
                                        let embed = new Discord.MessageEmbed();
                                        for(var x in word){
                                            let letter = word.charAt(x);
                                            row.addComponents(
                                                new Discord.MessageButton()
                                                    .setCustomId(`${letter}${x}`)
                                                    .setLabel(`${letter}`)
                                                    .setStyle('PRIMARY'),                        
                                            );
                                            if(row.components.length === word.length ){
                                                console.log('working')  
                                                embed.setAuthor(`${message.author.username} unscramble the scrambled word`,avatar);
                                                embed.setFooter(`Requested by ${message.author.username}`);
                                                embed.setTimestamp();
                                                const m = await message.channel.send({embeds:[embed],components:[row]});
                                                const ifilter = i => i.user.id === message.author.id;
                                                const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                                                let guess = [];
                                                let guessingword;
                                                let count = 0;
                                                collector.on('collect', async i => {
                                                    for(var x in word){
                                                        if(i.customId===`${word[x]}${x}`){   
                                                        guess.push(word[x]);
                                                        count = count + 1;
                                                        guessingword = guess.join('');
                                                        let embed2 = new Discord.MessageEmbed();
                                                        embed2.setAuthor(`${message.author.username} time to unscramble!`);
                                                        embed2.setDescription(`Your guess ${guessingword}`);
                                                        embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                                        embed2.setTimestamp();
                                                        if(count !== word.length){
                                                            await i.update({embeds:[embed2]});
                                                        }else{
                                                            await i.update({embeds:[embed2],components:[]})
                                                        }
                                                        if(count === word.length){
                                                            if(guessingword === words[scramblenumber]){
                                                                let winembed = new Discord.MessageEmbed();
                                                                winembed.setTitle(`${message.author.username} you guessed it right!`);
                                                                winembed.setDescription(`You got <:uc:922720730272137256> ${args[0]} as a reward!`);
                                                                winembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                                                winembed.setColor(`#30CC71`);
                                                                winembed.setTimestamp();
                                                                message.channel.send({embeds:[winembed]});
                                                                var d2 = new Date();
                                                                var n2 = d2.getTime();
                                                                if(userData.wallet < 5000000000 && userData.wallet + args[0] <= 5000000000){
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        $inc:{
                                                                            wallet:args[0],
                                                                            networth:args[0]
                                                                        },
                                                                        lastscramble:n2
                                                                    });
                                                                }else{
                                                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                        lastscramble:n2
                                                                    });
                                                                }
                                                                
                                                            }else{
                                                                let loseembed = new Discord.MessageEmbed();
                                                                loseembed.setTitle(`${message.author.username} you Guessed It wrong`);
                                                                loseembed.setDescription(`You lost <:uc:922720730272137256> ${args[0]}, Better luck next time!`);
                                                                loseembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                                                loseembed.setColor('#ED4245');
                                                                loseembed.setTimestamp();
                                                                message.channel.send({embeds:[loseembed]});
                                                                var d2 = new Date();
                                                                var n2 = d2.getTime();
                                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                    $inc:{
                                                                        wallet:-args[0],
                                                                        networth:-args[0]
                                                                    },
                                                                    lastscramble:n2
                                                                });
                                                            }
                                                        }
                                                        }
                                                    }
                                                
                                                });             
                                                collector.on('end', async (collected) =>{ 
                                                    console.log(`Collected ${collected.size} items`);
                                                    if(collected.size === 0){
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setTitle(`🕐 Time up!`);
                                                        embed.setDescription(`You didn't respond in time`);
                                                        embed.setColor('#FF470F');
                                                        embed.setTimestamp();
                                                        message.reply({embeds:[embed]});
                                                    }else if(collected.size < word.length){
                                                        const embed = new Discord.MessageEmbed();
                                                        embed.setTitle(`🕐 You failed!`);
                                                        embed.setDescription(`You didn't unscramble the whole word`);
                                                        embed.setColor('#FF470F');
                                                        embed.setTimestamp();
                                                        message.reply({embeds:[embed]});
                                                        var d2 = new Date();
                                                        var n2 = d2.getTime();
                                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                            $inc:{
                                                                wallet:-args[0],
                                                                networth:-args[0]
                                                            },
                                                            lastscramble:n2
                                                        });
                                                    }
                                                });

                                            }
                                        }
                                    }else{
                                        message.channel.send(`${message.author}, You can't play a scramble of more than 15000!`);
                                    }
                                }else{      
                                   message.channel.send(`${message.author}, You don't have that much money in your wallet to scramble!`);
                                }
                            }else{
                                var msec = n - lastscramble;
                                console.log(msec);
                                var ss = Math.floor(msec / 1000);
                                var second = timeup2 - ss;
                                if(userData.premium !== 'enable'){
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`Wait bro!`);
                                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to play scramble again!. The default cooldown is of **15** seconds but for premium users it is of **10** seconds to become a premium user use premium command.`);
                                    message.channel.send({embeds:[embed]});
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`Chill bro!`);
                                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to use scramble again!.`);
                                    embed.setColor('#025CFF');
                                    message.channel.send({embeds:[embed]});
                                }
                    
                            }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please enter a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, Please enter a valid number!`);
                    message.channel.send({embeds:[embed]});
                }
            }else{
                let embed2 = new Discord.MessageEmbed();
                embed2.setAuthor(`${message.author.username}, Please mention amount also`);
                embed2.setDescription(`example - ${serverData.prefix}scramble 500`);
                message.channel.send({embeds:[embed2]});
            }
        }else{
            message.channel.send(`${message.author}, You are not registered in the game. Please use ${serverData.prefix}join command to join the game.`);
        }
    }
}