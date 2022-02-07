const Discord = require('discord.js');
const muteModel = require('../models/muteSchema');
module.exports = {
    name: 'unmute',
    description: "This unmutes a member",
    async execute(message, args){
      const target = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
      if(target){
        if(message.member.permissions.has('MANAGE_MESSAGES')){
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            let memberTarget= message.guild.members.cache.get(target.id);
            if(memberTarget.roles.cache.some(role => role.name === 'Muted')) {          
              memberTarget.roles.remove(muteRole);
              let embed = new Discord.MessageEmbed();
              embed.setAuthor(`✅ Successfully Unmuted`);
              embed.addFields({name:`User:`,value:`${memberTarget.user.username}`},
                {name:`Unmuted by:`,value:`${message.author.username}`}
              );
              embed.setThumbnail(memberTarget.user.displayAvatarURL());
              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
              embed.setColor(`#30CC71`);
              embed.setTimestamp();
              message.channel.send({embeds:[embed]});

              let embed2 = new Discord.MessageEmbed();
              embed2.setAuthor(`From ${message.guild.name}`,message.guild.iconURL());
              embed2.addFields({name:`Action:`,value:`Unmuted`},
                {name:`Unmuted by:`,value:`${message.author.username}`}
              );
              embed2.setTimestamp();
              memberTarget.send({embeds:[embed2]}).catch((err)=>{
                console.log(err);
              });

              let memberData = await muteModel.findOne({userID:memberTarget.id,guildID:message.guild.id});
              if(memberData){
                let memberData2 = await muteModel.findOneAndUpdate({userID:memberTarget.id,guildID:message.guild.id},{
                  forevermute:'false'
                });
              }
           }else{
             message.channel.send(`${message.author}, the person you mentioned is already unmuted`);
           } 
        }else{
             message.channel.send('You do not have the permissions required to unmute someone')
        }
      }else{
            message.channel.send('Cant find that member!');
      }
    }
}