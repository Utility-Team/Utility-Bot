const Discord = require('discord.js');
const suggestionModel = require('../models/suggestionSchema');
const serverModel = require('../models/profileSchema');
const botModel = require('../models/botSchema');
module.exports={
    name:'updates',
    aliases:['updates','update'],
    async execute(message,args){
        const userData = await suggestionModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(userData){
            let lastseen;
            if(userData.lastseen){
                lastseen = userData.lastseen;
            }else{
                lastseen = '';
            }
            if(lastseen === 'version4.1.5'){
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`New Update! version - 4.1.5 [BETA]`);
                embed.setThumbnail('https://i.ibb.co/M1LZkqY/version-4-1-5.jpg');
                embed.addFields({name:`What's new?`,value:`${serverData.prefix}leaderboard , ${serverData.prefix}scramble , ${serverData.prefix}coinflip , ${serverData.prefix}badges ,
                ${serverData.prefix}rewards , ${serverData.prefix}race , ${serverData.prefix}race-stat & more
                `},
                {name:`+ New Warning System`,value:`+ Better Mute Commands`},
                {name:`New Moderation Commands`,value:'added aliases for commands'}
                );
                embed.setColor('#EE7600');
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`New Update! version - 4.1.5 [BETA]`);
                embed.setThumbnail('https://i.ibb.co/M1LZkqY/version-4-1-5.jpg');
                embed.addFields({name:`What's new?`,value:`${serverData.prefix}leaderboard , ${serverData.prefix}scramble , ${serverData.prefix}coinflip , ${serverData.prefix}badges ,
                ${serverData.prefix}rewards , ${serverData.prefix}race , ${serverData.prefix}race-stat & more
                `},
                {name:`+ New Warning System`,value:`+ Better Mute Commands`},
                {name:`New Moderation Commands`,value:'added aliases for commands'}
                );
                embed.setColor('#EE7600');
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
                const response = await suggestionModel.findOneAndUpdate({userID:message.author.id},{
                    lastseen:'version4.1.5'
                });
                const resposne2 = await botModel.findOneAndUpdate({botid:1},{
                    $inc:{
                        totalseen:1
                    }
                });
            }
        
        }else{
           
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`New Update! version - 4.1.5 [BETA]`);
            embed.setThumbnail('https://i.ibb.co/M1LZkqY/version-4-1-5.jpg');
            embed.addFields({name:`What's new?`,value:`${serverData.prefix}leaderboard , ${serverData.prefix}scramble , ${serverData.prefix}coinflip , ${serverData.prefix}badges ,
            ${serverData.prefix}rewards , ${serverData.prefix}race , ${serverData.prefix}race-stat & more
            `},
            {name:`+ New Warning System`,value:`+ Better Mute Commands`},
            {name:`New Moderation Commands`,value:'added aliases for commands'}
            );
            embed.setColor('#EE7600');
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
            let profileset = await suggestionModel.create({
                userID:target.id,
                username:memberTarget.user.username,
                discriminator:memberTarget.user.discriminator,
                totalsuggestions:0,
                suggestions:[],
                totalreports:0,
                reports:[],
                lastreport:0,
                lastsuggestion:0,
                reported:1,
                timesreported:[],
                lastseen:'version4.1.5'
            });
            profileset.save();
            const resposne2 = await botModel.findOneAndUpdate({botid:1},{
                $inc:{
                    totalseen:1
                }
            });
        }

        
    }
}