const Discord = require('discord.js');
const profileModel = require('../models/profileSchema');
module.exports = {
  name:'aboutbot',
  async execute(message,args){
    let profileData = await profileModel.findOne({guildID:message.guild.id});
    const embed = new Discord.MessageEmbed();
    embed.setTitle('Here is about the bot')
    embed.setDescription(`My name is Utility and i am a discord bot made by my creator abhishekkholiya#7965 who is a software developer. You can type ${profileData.prefix}help to know what all i can do and for getting my invite link you can type ${profileData.prefix}inviteme`)
    embed.setFooter('Thanks for Choosing Utility')
    message.channel.send({embeds:[embed]});
  }
}