const Discord = require('discord.js');
const superagent = require('superagent');
module.exports={
    name:'kiss',
    async execute(message,args){
        const embed = new Discord.MessageEmbed();
        const target = message.mentions.users.first() 
        if(target){
        if (message.mentions.users.first().id === message.author.id) return message.channel.send(`${message.author}, You can't kiss yourself`);
       
        const { body } = await superagent
        .get("https://nekos.life/api/kiss");
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`${message.author.username} kissed ${target.username}`);
        embed.setImage(body.url);
        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setColor(`#404EED`);
        message.channel.send({embeds:[embed]});
        }else{
            message.channel.send(`${message.author}, Please mention who you want to kiss!`);
        }
    }
}