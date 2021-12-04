const Discord = require('discord.js');
module.exports={
    name:'premium',
    execute(message,args){
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Premium Coming Soon!`);
        embed.setDescription(`Dear ${message.author}, the premium subscription of the bot is coming soon! which will give you premium experience and you will get exclusive commands and less cool down time and more.`);
        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
        embed.setColor(`#404EED`);
        embed.setTimestamp();
        message.channel.send({embeds:[embed]});
    }
}