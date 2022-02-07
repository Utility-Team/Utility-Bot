const Discord = require('discord.js');
module.exports = {
    name:'channelremove',
    aliases:['channelremove','cr','channelr'],
    async execute(message,args){
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(args[0]){
            if(target){
                if(message.member.permissions.has('ADMINISTRATOR')){
                    const memberTarget = message.guild.members.cache.get(target.id);
                    if(memberTarget.permissions.has('ADMINISTRATOR')){
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Can't deny access that member is an admin/mod`);
                        message.channel.send({embeds:[embed]});
                    }else{
                        message.channel.permissionOverwrites.create(target,{VIEW_CHANNEL:false});
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ ${memberTarget.user.username} has been denied access to this channel`);
                        embed.setColor(`#30CC71`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                    }

                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.member.user.username} You do not have permission to use this command`);
                    message.channel.send({embeds:[embed]});
                }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, Please mention a valid person!`);
                message.channel.send({embeds:[embed]});
            }
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}, Please also mention someone!`);
            message.channel.send({embeds:[embed]});
        }
    }
}