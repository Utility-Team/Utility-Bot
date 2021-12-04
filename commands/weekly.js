const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports={
    name:'weekly',
    async execute(message,args){
      let userData = await userModel.findOne({userID:message.author.id});
      if(userData){
         const embed = new Discord.MessageEmbed();
         embed.setTitle(`Premium Required`);
         embed.setDescription(`${message.author}, You need premium subscription to use weekly command so use premium command to upgrade your subscription.`);
         embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
         embed.setTimestamp();
         message.channel.send({embeds:[embed]});
      }else{
        message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
      }
    }
}