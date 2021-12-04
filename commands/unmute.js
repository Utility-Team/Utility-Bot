const Discord = require('discord.js')
module.exports = {
    name: 'unmute',
    description: "This unmutes a member",
    execute(message, args){

        const target = message.mentions.users.first();
      if(target){
        if(message.member.permissions.has('MANAGE_MESSAGES')){
        
        //Rest of your code
    
              let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                   let mainRole = message.guild.roles.cache.find(role => role.name === 'RT Advertiser');
 
            let memberTarget= message.guild.members.cache.get(target.id);
         
          if (memberTarget.roles.cache.some(role => role.name === 'Muted')) {
           
             
               memberTarget.roles.remove(muteRole.id);
             //  memberTarget.roles.add(mainRole.id)
               var embed = new Discord.MessageEmbed()
                embed.setTitle(`${target.username} has been unmuted by ${message.author.username} `)
                embed.setThumbnail(target.displayAvatarURL())
                message.channel.send({embeds:[embed]});
               var embed2 = new Discord.MessageEmbed()
               embed2.setTitle(`From ${message.guild.name}`);
               embed2.setDescription(`You were unmuted by ${message.author.username}`);
               embed2.setThumbnail(target.displayAvatarURL());
               embed2.setTimestamp();
               target.send({embeds:[embed2]})  
            
          
          
           
          }else{
            message.channel.send('The person you mention is already unmuted')
          }
        }else{
             message.channel.send('Sorry , You do not have the permissions required to unmute someone')
        }
      } else{
            message.channel.send('Cant find that member!');
      }
    }
}