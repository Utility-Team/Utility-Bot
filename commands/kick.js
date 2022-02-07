const Discord = require('discord.js')
module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    execute(message, args,client){
        var user =   message.guild.members.cache.find(member => member.id == message.author.id);
        const target = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
    if(target){
        
      
        console.log(message.member.permissions.has('KICK_MEMBERS'))
    if(message.member.permissions.has('KICK_MEMBERS')){
        
      
        if(!args[0]){
            message.channel.send('kindly mention someone to kick')
            return
        }
        let reason = args.slice(1).join(" ");
        if(!reason) reason = 'no reason provided';
        const memberTarget = message.guild.members.cache.get(target.id);
      
        if(memberTarget.permissions.has('ADMINISTRATOR')){

            const embed = new Discord.MessageEmbed();
            embed.setTitle(`❌ Can't kick that member is an admin/mod`)
            message.channel.send({embeds:[embed]})
         

        }else{
     if(memberTarget.roles.highest.position >= user.roles.highest.position){
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`❌Can't kick your role should be higher than the mentioned member's role`);
        message.channel.send({embeds:[embed]})
        }else{
        
            
                if(memberTarget.roles.highest.position < message.guild.members.resolve(client.user).roles.highest.position){    
                    const embed2 = new Discord.MessageEmbed();
                    embed2.setTitle(`From ${message.guild.name}`);
                    embed2.setThumbnail(`${message.guild.iconURL()}`);
                    embed2.addFields({name:`**Action: You have been kicked**`,value:`Reason: ${reason}`});
                    embed2.setTimestamp();
                    memberTarget.send({embeds:[embed2]});
                    memberTarget.kick();
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`✅ ${memberTarget.user.username} has been kicked successfully`);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                  
                
                }else{
                     const embed = new Discord.MessageEmbed();
                     embed.setDescription(`Please drag my role above the member role to make me able to kick that member`);
                     message.channel.send({embeds:[embed]})
                    }
        }
    }
    }else{
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`${message.member.user.username}, You do not have permissions to kick someone`)
        message.channel.send({embeds:[embed]})
    }
    }else{
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`${message.author.username}, Please mention a person who is in the server`);
        message.channel.send({embeds:[embed]})        
    }
  }
}