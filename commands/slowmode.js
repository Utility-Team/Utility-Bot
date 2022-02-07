const Discord = require('discord.js');
const { execute } = require("./ban");
const profileModel = require('../models/profileSchema');
module.exports={
    name:'slowmode',
    description:'This commands slow down the particular channel',
  async execute(message, args, client) {
    if(message.member.permissions.has('MANAGE_CHANNELS') ){
       if(!args[0])return message.channel.send('You did not specify the time in seconds you wish to set');
       if(isNaN(args[0])) return message.channel.send('This is not a number');
       
      if(args[0] <= 21600){
      
       let number =  args[0]
       let reason1 = args;
       delete reason1[0];
       let reason = args.join(' ');
       if(!reason){
         reason = "No reason provided";
       }
       message.channel.setRateLimitPerUser(number,reason);
       message.channel.send(`The slowmode of this channel is set to **${number}s** with the reason: ${reason}`);
       const profile = await profileModel.findOne({guildID:message.guild.id});
       const logsID = profile.logschannel
       if(profile){
       const logs_channel = message.guild.channels.cache.find(i=>i.id ===logsID);
       if(logs_channel){
           const embed2 = new Discord.MessageEmbed();
           var serverIcon = message.guild.iconURL();
           embed2.setAuthor(`Slowmode Changed`,serverIcon);
           embed2.addFields({name:`Changed by:`,value:`${message.author.username}`},
           {name:`Channel:`,value:`<#${message.channel.id}>`},
           {name:`New Slowmode:`,value:`${number}s`}
           );
           embed2.setFooter(`Channel ID: ${message.channel.id}`)
           embed2.setColor(`#358BFC`);
           embed2.setTimestamp();

           logs_channel.send({embeds:[embed2]}); 
       }
       }
      }else{
          message.reply('Sorry you cannot set slowmode for more than 21600 seconds!');
      }
    }else{
       message.reply(`You don't have perms to set the slowmode`);
    }
  }
   
}