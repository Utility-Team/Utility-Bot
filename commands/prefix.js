const Discord = require('discord.js');
const profileModel = require('../models/profileSchema');
module.exports={
  name:'prefix',
  aliases:['prefix','p'],
  async execute(message,args){
   if(message.member.permissions.has('ADMINISTRATOR')){
    if(!args[0]){
      let profileData = await profileModel.findOne({guildID: message.guild.id});
      const embed = new Discord.MessageEmbed();
      embed.setTitle(`The current prefix of the bot is ${profileData.prefix}`);
      message.channel.send({embeds:[embed]});
    }else{
      if(args[0].length<=4){
          let profileData = await profileModel.findOne({guildID: message.guild.id});
            
          const response = await profileModel.findOneAndUpdate({
            guildID:message.guild.id,
          },
          {  
            prefix:args[0]
          }
          )
          
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`${message.author.username} the prefix of the bot has been set to ${args[0]}`)
          message.channel.send({embeds:[embed]});
          let logschannel = profileData.logschannel;
          const logs_channel = message.guild.channels.cache.find(i=>i.id ===logschannel);
          if(logs_channel){
            const embed1 = new Discord.MessageEmbed();
            var serverIcon = message.guild.iconURL();
            embed1.setAuthor(`Prefix Changed`,serverIcon);
            embed1.addFields({name:`${message.author.username} has changed the bot's prefix`,value:`new prefix - **${args[0]}**`});
            embed1.setColor(`#30CC71`);
            embed1.setTimestamp();
            logs_channel.send({embeds:[embed1]});
          }
      }else{
        const embed = new Discord.MessageEmbed();
        embed.setAuthor(`${message.author.username}, you can't set a prefix of more than 4 characters!`);
        message.channel.send({embeds:[embed]});
      }

    }
   }else{
     const embed = new Discord.MessageEmbed();
     embed.setTitle(`${message.author.username}, You don't have the perms to change the prefix`);
     message.channel.send({embeds:[embed]});
   }
  }
}