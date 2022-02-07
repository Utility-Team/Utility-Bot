const Discord = require('discord.js');
let warnModel = require('../models/warnSchema');
module.exports={
    name:'warns',
    aliases:['warns','warnings'],
    async execute(message,args){
        const target = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
        if(target && !args[1]){
            const memberTarget = message.guild.members.cache.get(target.id);
            let warnData = await warnModel.findOne({userid:target.id,guildID:message.guild.id});
            console.log(warnData);
            if(warnData){
                if(warnData.reasons.length >0){
                    let arrnum = warnData.totalwarns - 1;
                    console.log(arrnum);
                    let embed = new Discord.MessageEmbed();
                    embed.setTitle(`${memberTarget.user.username}'s warnings`);
                    embed.setThumbnail(`${target.displayAvatarURL()}`);
                    embed.addFields({name:`Total Warns:`,value:`${warnData.totalwarns}`},
                    {name:`executor id:`,value:`${warnData.executorid}`},
                    {name:`Last Warn Reason:`,value:`${warnData.reasons[arrnum].reason}`}
                    );
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                }else{
                    let embed = new Discord.MessageEmbed();
                    embed.setTitle(`${memberTarget.user.username}'s warnings`);
                    embed.setThumbnail(`${target.displayAvatarURL()}`);
                    embed.addFields({name:`Total Warns:`,value:`0`},
                    {name:`executor id:`,value:`no one`},
                    );
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                }
            }else{
                let embed = new Discord.MessageEmbed();
                embed.setTitle(`${memberTarget.user.username}'s warnings`);
                embed.setThumbnail(`${target.displayAvatarURL()}`);
                embed.addFields({name:`Total Warns:`,value:`0`},
                {name:`executor id:`,value:`no one`},
                );
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
            }
        }else if(target && args[1]){
            const memberTarget = message.guild.members.cache.get(target.id);
            let warnData = await warnModel.findOne({userid:target.id,guildID:message.guild.id});
            if(warnData){
                console.log('length = ' + '' + warnData.reasons.length);
                if(!isNaN(args[1]) && Math.sign(args[1]) === 1){
                    if(args[1] % 1=== 0){  
                        if(warnData.reasons.length >= args[1]){
                            let arrnum = warnData.totalwarns - 1;
                            let embed = new Discord.MessageEmbed();
                            embed.setTitle(`${memberTarget.user.username}'s warning (${args[1]})`);
                            embed.setThumbnail(`${target.displayAvatarURL()}`);
                            embed.addFields({name:`executed by:`,value:`${warnData.reasons[args[1]-1].executorid}`},
                            {name:`Warn(${args[1]}) Reason:`,value:`${warnData.reasons[args[1]-1].reason}`}
                            );
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                        }else{
                            let embed = new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username}, warn ${args[1]} doesn't exist`);
                            message.channel.send({embeds:[embed]});
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
                let embed = new Discord.MessageEmbed();
                embed.setTitle(`${memberTarget.user.username}'s warnings`);
                embed.setThumbnail(`${target.displayAvatarURL()}`);
                embed.addFields({name:`Total Warns:`,value:`0`},
                {name:`executor id:`,value:`no one`},
                );
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
            }
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setAuthor(`${message.author.username}, Please mention someone who is in the server!`);
            message.channel.send({embeds:[embed]});
        }
    }
}
