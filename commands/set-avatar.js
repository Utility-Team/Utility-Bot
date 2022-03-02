const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel  = require('../models/profileSchema');
module.exports = {
    name:'set-avatar',
    aliases:['set-avatar','setavatar','s-avatar','savatar'],
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(userData){
            function isImgLink(url) {
                if(typeof url !== 'string') return false;
                return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
            }
            if(userData.premium === 'enable'){
                if(userData.premiumtype === 3){
                    if(args[0]){
                        let imagethere = true;
                        if(!isImgLink(args[0])){
                            imagethere = false;
                        }
                        if(imagethere === true){
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                avatar:args[0]
                            });
                            const embed = new Discord.MessageEmbed();
                            embed.setAuthor(`${message.author.username}, your avatar has been set successfully!`);
                            embed.setColor(`#30CC71`);
                            message.channel.send({embeds:[embed]});
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`${message.author.username}, Please share link which only contains the image`);
                            message.channel.send({embeds:[embed]});
                        }
                        
                    }else{
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            avatar:''
                        });
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`${message.author.username}, your avatar has been set successfully!`);
                        embed.setColor(`#30CC71`);
                        message.channel.send({embeds:[embed]});
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