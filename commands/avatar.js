var Discord = require('discord.js')
module.exports  ={
    name:'avatar',
    aliases:['avatar','av'],
    description:'This commands gets the info and avatar of the person',
    execute(message,args){
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${memberTarget.user.username}'s avatar`);
            embed.setImage(memberTarget.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
            embed.setFooter(`Requested by ${message.author.username}`);
            embed.setTimestamp(); 
            embed.setColor(`#404EED`);
            message.channel.send({embeds:[embed]});
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}'s avatar`);
            embed.setImage(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
            embed.setFooter(`Requested by ${message.author.username}`);
            embed.setTimestamp(); 
            embed.setColor(`#404EED`);
            message.channel.send({embeds:[embed]});
        }
    }
}