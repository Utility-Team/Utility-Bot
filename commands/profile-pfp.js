const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports= {
    name:'profile-pfp',
    aliases:['profile-pfp','pfp','profilepfp','profile-pic','profilepic'],
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        const target = message.mentions.users.first();
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
        if(userData){
            if(userData.premium === 'enable'){
                if(target){
                    let targetData = await userModel.findOne({userID:target.id});
                    if(targetData){ 
                        let targetavatar;
                        if(targetData.avatar){
                            targetavatar = targetData.avatar;
                        }else{
                            const response = await userModel.findOne({userID:target.id},{
                                avatar:target.displayAvatarURL()
                            });
                            targetavatar = target.displayAvatarURL();
                        }
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${target.username}'s game pic`);
                        embed.setImage(`${targetavatar}`);
                        embed.setFooter(`Requested by ${message.author.username}`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                    }else{
                        message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
                    }
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}'s game pic`);
                    embed.setImage(`${avatar}`);
                    embed.setFooter(`Requested by ${message.author.username}`);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Premium Required`);
                embed.setDescription(`${message.author}, You need premium subscription to use pfp command so use premium command to upgrade your subscription.`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
            }
        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

        }
    }
}