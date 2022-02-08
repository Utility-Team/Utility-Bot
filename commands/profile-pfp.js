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