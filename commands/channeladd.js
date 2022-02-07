const Discord = require('discord.js');
module.exports = {
    name:'channeladd',
    aliases:['channeladd','cadd'],
    async execute(message,args){
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(args[0]){
            if(target){
                const memberTarget = message.guild.members.cache.get(target.id);
                if(message.member.permissions.has('ADMINISTRATOR')){
                        message.channel.permissionOverwrites.create(target,{VIEW_CHANNEL:true,SEND_MESSAGES:true});
                        const embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ ${memberTarget.user.username} has been given access to this channel`);
                        embed.setColor(`#30CC71`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                    

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