var Discord = require('discord.js')
module.exports  ={
    name:'avatar',
    description:'This commands gets the info and avatar of the person',
    execute(message,args){
        const target = message.mentions.users.first();
        if(target){
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${target.username}'s avatar`);
            embed.setImage(target.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
            embed.setTimestamp(); 
            embed.setColor(`#404EED`);
            message.channel.send({embeds:[embed]});
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}'s avatar`);
            embed.setImage(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
            embed.setTimestamp(); 
            embed.setColor(`#404EED`);
            message.channel.send({embeds:[embed]});
        }
    }
}