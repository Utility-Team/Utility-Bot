const Discord = require('discord.js')
const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "This mutes a member",
    async execute(message, args) {
        const target = message.mentions.users.first();
        if (target) {


         if(message.member.permissions.has('MANAGE_MESSAGES')){
           
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            let memberTarget = message.guild.members.cache.get(target.id);
          if(!memberTarget.permissions.has('ADMINISTRATOR')){
        
            if (!args[1]){
             if(muteRole){             
              if(message.mentions.members.first().roles.highest.comparePositionTo(message.guild.roles.cache.find(role => role.name === 'Muted')) < 0){
                memberTarget.roles.add(muteRole.id);
                var embed = new Discord.MessageEmbed()
                embed.setTitle(`${target.username} has been muted by ${message.author.username} `)
                embed.setThumbnail(target.displayAvatarURL())
                message.channel.send({embeds:[embed]})
                var embed2 = new Discord.MessageEmbed();
                embed2.setTitle(`From ${message.guild.name}`);
                embed2.setDescription(`You were muted by ${message.author.username}`);
                embed2.setThumbnail(target.displayAvatarURL())
                embed2.setTimestamp();
                target.send({embeds:[embed2]});
              }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`❌ Can't mute that person`);
                embed.setDescription(`Kindly drag muted role above the mentioned person's highest role`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                embed.setColor('#ED4245');
                message.channel.send({embeds:[embed]});
              }
            }else{
                    try {
                      muteRole = await message.guild.roles.create({
                        data:{
                        name: "Muted",
                        color: "#000000",
                        permissions:[]
                        }
                      });
            
                      message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muteRole, {
                            SEND_MESSAGES: false,
                            MANAGE_MESSAGES: false,
                            READ_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                      });
                  } catch(e) {
                    console.log(e.stack);
                  }
                  if(message.mentions.members.first().roles.highest.comparePositionTo(message.guild.roles.cache.find(role => role.name === 'Muted')) < 0){
           
                  memberTarget.roles.add(muteRole);
                  var embed = new Discord.MessageEmbed()
                  embed.setTitle(`${target.username} has been muted by ${message.author.username} `)
                  embed.setThumbnail(target.displayAvatarURL())
                  message.channel.send({embeds:[embed]});
                  var embed2 = new Discord.MessageEmbed();
                  embed2.setTitle(`From ${message.guild.name}`);
                  embed2.setDescription(`You were muted by ${message.author.username}`);
                  embed2.setThumbnail(target.displayAvatarURL())
                  embed2.setTimestamp();
                  target.send({embeds:[embed2]});
                  }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`❌ Can't mute that person`);
                    embed.setDescription(`Kindly drag muted role above the mentioned person's highest role`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setColor('#ED4245');
                    message.channel.send({embeds:[embed]});
                  }
              
            }
                return
            }else{
            
              if(muteRole){

             
                if(message.mentions.members.first().roles.highest.comparePositionTo(message.guild.roles.cache.find(role => role.name === 'Muted')) < 0){
           
                 memberTarget.roles.add(muteRole)
                  var embed = new Discord.MessageEmbed()
                   embed.setTitle(`${target.username} has been muted by ${message.author.username} for ${ms(ms(args[1]))} `)
                   embed.setThumbnail(target.displayAvatarURL())
                   message.channel.send({embeds:[embed]});
                   var embed2 = new Discord.MessageEmbed();
                   embed2.setTitle(`From ${message.guild.name}`);
                   embed2.setDescription(`You were muted by ${message.author.username} for ${ms(ms(args[1]))}`);
                   embed2.setThumbnail(target.displayAvatarURL())
                   embed2.setTimestamp();
                   target.send({embeds:[embed2]});
                   setTimeout(  async () => {
                   
                       await memberTarget.roles.remove(muteRole);
                  
                      
                   }, ms(args[1]));
                  }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`❌ Can't mute that person`);
                    embed.setDescription(`Kindly drag muted role above the mentioned person's highest role`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setColor('#ED4245');
                    message.channel.send({embeds:[embed]});
                  }
                  
                
               }else{
                      try {
                        muteRole = await message.guild.roles.create({
                          data:{
                          name: "Muted",
                          color: "#000000",
                          permissions:[]
                          }
                        });
              
                        message.guild.channels.cache.forEach(async (channel, id) => {
                          await channel.createOverwrite(muteRole, {
                              SEND_MESSAGES: false,
                              MANAGE_MESSAGES: false,
                              READ_MESSAGES: false,
                              ADD_REACTIONS: false
                          });
                        });
                    } catch(e) {
                      console.log(e.stack);
                    }
                    if(message.mentions.members.first().roles.highest.comparePositionTo(message.guild.roles.cache.find(role => role.name === 'Muted')) < 0){
           
                    memberTarget.roles.add(muteRole);
                    var embed = new Discord.MessageEmbed()
                    embed.setTitle(`${target.username} has been muted by ${message.author.username} for ${ms(ms(args[1]))} `)
                    embed.setThumbnail(target.displayAvatarURL())
                    message.channel.send({embeds:[embed]});
                    var embed2 = new Discord.MessageEmbed();
                    embed2.setTitle(`From ${message.guild.name}`);
                    embed2.setDescription(`You were muted by ${message.author.username} for ${ms(ms(args[1]))}`);
                    embed2.setThumbnail(target.displayAvatarURL())
                    embed2.setTimestamp();
                    target.send(embed2);
                    setTimeout(  async () => {
                   
                      await memberTarget.roles.remove(muteRole);
                 
                     
                  }, ms(args[1]));
                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`❌ Can't mute that person`);
                  embed.setDescription(`Kindly drag muted role above the mentioned person's highest role`);
                  embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                  embed.setTimestamp();
                  embed.setColor('#ED4245');
                  message.channel.send({embeds:[embed]});
                }

               }
             
            
            }

          }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`❌ Can't mute that member is an admin/mod`);
            message.channel.send({embeds:[embed]});
          
          }
         }else{
             message.channel.send('You do not the have the required permissions to mute someone')
         }
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Cant find that member!`);
            message.channel.send({embeds:[embed]});
        }
    }
}
