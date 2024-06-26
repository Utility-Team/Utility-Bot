const Discord = require('discord.js');
const profileModel = require('../models/profileSchema');
module.exports = {
    name: 'ban',
    description: "This command bans a member!",
   async execute(message, args,client){
        var user =   message.guild.members.cache.find(member => member.id == message.author.id);
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if(target){
                    
                
                    console.log(message.member.permissions.has('BAN_MEMBERS'))
                if(message.member.permissions.has('BAN_MEMBERS')){
                    
                
                    if(!args[0]){
                        message.channel.send('kindly mention someone to ban')
                        return
                    }
                    let reason = args.slice(1).join(" ");
                    if(!reason) reason = 'no reason provided';
                    const memberTarget = message.guild.members.cache.get(target.id);
                
                    if(memberTarget.permissions.has('ADMINISTRATOR')){

                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Can't ban that member is an admin/mod`)
                        message.channel.send({embeds:[embed]});
                    

                    }else{
                if(memberTarget.roles.highest.position >= user.roles.highest.position){
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`❌Can't ban your role should be higher than the mentioned member's role`);
                    message.channel.send({embeds:[embed]});
                    }else{
                    
                        
                            if(memberTarget.roles.highest.position < message.guild.members.resolve(client.user).roles.highest.position){  
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`✅ ${memberTarget.user.username} has been banned successfully`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setColor(`#30CC71`);
                                embed.setTimestamp();
                                message.channel.send({embeds:[embed]});
                                memberTarget.ban();

                            

                               
                                

                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setDescription(`Please drag my role above the member role to make me able to ban that member`);
                                message.channel.send({embeds:[embed]});
                            }
                    }
                }
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.member.user.username} You do not have permissions to ban someone`)
                    message.channel.send({embeds:[embed]});
                }
    }else{
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`${message.author.username} Please mention a person who is in the server`);
        message.channel.send({embeds:[embed]});
        
    }
  }
}