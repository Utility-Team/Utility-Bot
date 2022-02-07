const Discord = require('discord.js');
module.exports={
    name:'premium',
    execute(message,args){
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Premium is here!`);
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
}