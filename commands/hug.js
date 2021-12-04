const Discord = require('discord.js');
const superagent = require('superagent');
module.exports={
    name:'hug',
    async execute(message,args){
        const embed = new Discord.MessageEmbed();
        const target = message.mentions.users.first();
        if(target){
        if (target.id === message.author.id) return message.channel.send(`${message.author}, You can't hug yourself`);
       
        const { body } = await superagent
        .get("https://nekos.life/api/hug");
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`${message.author.username} hugged ${target.username}`);
        embed.setImage(body.url);
        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setColor(`#404EED`);
        message.channel.send({embeds:[embed]});
        }else{
            message.channel.send(`${message.author}, Please mention who you want to hug!`);
        }
    
    }
}