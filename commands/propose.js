const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'propose',
    aliases:['propose','marry'],
    async execute(message,args){
        const target = message.mentions.users.first();
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
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
            if(target){
             const memberTarget = message.guild.members.cache.get(target.id);
             let targetData = await userModel.findOne({userID:target.id});
             if(targetData){
                 if(userData.diamondring !== 0){
                 if(userData.partner === 0){
                if(targetData.partner === 0){
                   const embed = new Discord.MessageEmbed();
                   embed.setDescription(`**${target}. Do you wanna partner/marry with ${message.author} ? Answer with yes or no**`);
                   embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
                   embed.setTimestamp();
                   const embed2 = new Discord.MessageEmbed();
                   embed2.setTitle(`${message.author.username} and ${memberTarget.uesr.username} are now married!.`)
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

                    const collector = m.createMessageComponentCollector({ filter:ifilter, time: 15000 });

                    collector.on('collect', async i => {
                        console.log('hello there' + i.guildId);
                        if (i.customId === 'yes') {
                         
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                 diamondring:-1
                                },
                                partner:target.id,
                                partnername:memberTarget.uesr.username + '#' + target.discriminator
                            });
                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                $inc:{
                                 diamondring:1
                                },
                                partner:message.author.id,
                                partnername:message.author.username + '#' + message.author.discriminator
                            });

                            await i.update({ embeds:[embed2],components:[]});
                        }else if(i.customId==='no'){
                            await i.update({components: [] });
                            message.channel.send(`${message.author}, ${memberTarget.user.username} said no!`)
                        }
                    });

                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                
                 
                }else{
                  message.channel.send(`${message.author}, The person you mentioned already has a partner!`);
                }
            }else{
                message.channel.send(`${message.author}, you are already married you need to divorce first!`);
            }
            }else{
                message.channel.send(`${message.author}, you don't have a diamond ring to propose!`);
            }
             }else{
                message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
             }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, Please mention someone who is in the server!`);
                message.channel.send({embeds:[embed]});
            }
        }else{
          message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

        }
    }
}