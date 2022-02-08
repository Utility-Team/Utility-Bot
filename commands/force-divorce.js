const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'force-divorce',
    aliases:['force-divorce','forcedivorce'],
    async execute(message,args){
        const userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(userData){
            if(userData.premium === 'enable'){
                if(userData.premiumtype === 3){
                    if(userData.partner !== 0){
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username}, Do you wanna force divorce ${userData.partnername}? Yes or No`);
                            embed.setFooter(`Requested by ${message.author.username}`);
                            embed.setTimestamp();
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
                            const embed2 = new Discord.MessageEmbed();
                            embed2.setTitle(`Successfully divorced!`);
                            embed2.setDescription(`${message.author}, You have successfully divorced from ${userData.partnername}`);
                            embed2.setColor(`#30CC71`);
                            embed2.setTimestamp();
                            const m = await message.channel.send({embeds:[embed],components:[row]});
                            const ifilter = i => i.user.id === message.author.id;

                            const collector = m.createMessageComponentCollector({ filter:ifilter, time: 15000 });

                            collector.on('collect', async i => {
                                if (i.customId === 'yes') {      
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        partner:0,
                                        partnername:""
                                    });
                                    const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                        partner:0,
                                        partnername:""
                                    });
                                    await i.update({embeds:[embed2],components:[]});
                                }else if(i.customId==='no'){
                                    await i.update({components: [] });
                                }
                            });

                            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                    }
                
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`Premium Tier 3 required`);
                    embed.setDescription(`${message.author}, you require 3rd tier premium for this command`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Premium required`);
                embed.setDescription(`Dear ${message.author}, the premium subscription of the bot is out! which will give you premium experience and you will get exclusive commands and less cool down time and more.`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setColor(`#404EED`);
                embed.setTimestamp();
                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel('Utility Premium')
                        .setStyle('LINK')
                        .setEmoji('<:patreonpremium:934410962990141440>')
                        .setURL('https://www.patreon.com/Utility?fan_landing=true')
                );
                message.channel.send({embeds:[embed],components:[row]});
            }
        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
        }
    }
}