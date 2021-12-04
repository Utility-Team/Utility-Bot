const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'userinfo',
    async execute(message,args){
        const target = message.mentions.users.first();
        if(target){
            let targetData = await userModel.findOne({userID:target.id});
            let status;
            if(message.member.presence.status)
            if(targetData){
                let bio = targetData.bio;
                let hobby = targetData.hobby;
                if(bio=== '' && hobby!== ''){
                    console.log('1 worked');
                    var embed = new Discord.MessageEmbed();
                    embed.setTitle("User's information");
                    embed.setColor('#4286f4');
                    embed.addFields(
                        {name:'User Name -',value:target.username},
                        {name:'discriminator:',value:target.discriminator},
                        {name:'User Id:',value: target.id},
                        {name:'Bot:',value:`${target.bot}`},
                        {name:'Created At:',value:`${target.createdAt}`},
                        {name:'Joined At:',value:`${message.guild.joinedAt}`},  
                        {name:'Hobbies:',value:`${hobby}`} ,
                    );
                    embed.setThumbnail(target.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                    message.channel.send({embeds:[embed]});

                }
                if(hobby === '' && bio !== ''){
                    console.log('2 worked');
                    var embed = new Discord.MessageEmbed();
                    embed.setTitle("User's information");
                    embed.setColor('#4286f4');
                    embed.addFields(
                        {name:'User Name -',value:target.username},
                        {name:'discriminator:',value:target.discriminator},
                        {name:'User Id:',value: target.id},
                        {name:'Bot:',value:`${target.bot}`},
                        {name:'Created At:',value:`${target.createdAt}`},
                        {name:'Joined At:',value:`${message.guild.joinedAt}`},
                        {name:'Bio:',value:`**${bio}**`}
                    );
                    embed.setThumbnail(target.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                    message.channel.send({embeds:[embed]});
                }
       
                let bot = message.author.bot;
              if(hobby === '' && bio === ''){
                console.log('3 worked');
                var embed = new Discord.MessageEmbed();
                embed.setTitle("User's information");
                embed.setColor('#4286f4');
                embed.addFields(
                    {name:'User Name -',value:target.username},
                    {name:'discriminator:',value:target.discriminator},
                    {name:'User Id:',value: target.id},
                    {name:'Bot:',value:`${target.bot}`},
                    {name:'Created At:',value:`${target.createdAt}`},
                    {name:'Joined At:',value:`${message.guild.joinedAt}`},
                );
                embed.setThumbnail(target.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
              }
              if(hobby !== '' && bio !== ''){
                console.log('4 worked');
                var embed = new Discord.MessageEmbed();
                embed.setTitle("User's information");
                embed.setColor('#4286f4');
                embed.addFields(
                    {name:'User Name -',value:target.username},
                    {name:'discriminator:',value:target.discriminator},
                    {name:'User Id:',value: target.id},
                    {name:'Bot:',value:`${target.bot}`},
                    {name:'Created At:',value:`${target.createdAt}`},
                    {name:'Joined At:',value:`${message.guild.joinedAt}`},
                
                    {name:'Hobbies:',value:`${hobby}`} ,
                    {name:'Bio:',value:`**${bio}**`}
                );
                embed.setThumbnail(target.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
              }
         
            }else{
                let bot = message.author.bot
                var embed = new Discord.MessageEmbed();
                embed.setTitle("User's information");
                embed.setColor('#4286f4');
                embed.addFields(
                    {name:'User Name -',value:target.username},
                    {name:'discriminator:',value:target.discriminator},
                    {name:'User Id:',value: target.id},
                    {name:'Bot:',value:`${target.bot}`},
                    {name:'Created At:',value:`${target.createdAt}`},
                    {name:'Joined At:',value:`${message.guild.joinedAt}`},   
                );
                embed.setThumbnail(target.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
                console.log(target.presence);
                console.log(target.user);
                console.log(message.author.roles);
            }
            

        }else{
            let userData = await userModel.findOne({userID:message.author.id});
            if(userData){
            let bio = userData.bio;
            let hobby = userData.hobby;
            if(bio=== '' && hobby !== ''){
                var embed = new Discord.MessageEmbed();
                embed.setTitle("User's information");
                embed.setColor('#4286f4');
                embed.addFields(
                    {name:'User Name -',value:message.author.username},
                    {name:'discriminator:',value:message.author.discriminator},
                    {name:'User Id:',value:message.author.id},
                    {name:'Bot:',value:`${message.author.bot}`},
                    {name:'Created At:',value:`${message.author.createdAt}`},
                    {name:'Joined At:',value:`${message.guild.joinedAt}`},
                    {name:'Status:',value:`${message.member.presence.status}`},
                    {name:'Hobbies:',value:`${hobby}`},
                
            
            
                    
                );
                embed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
            }
       
            if(hobby === '' && bio!== ''){
                var embed = new Discord.MessageEmbed();
                embed.setTitle("User's information");
                embed.setColor('#4286f4');
                embed.addFields(
                    {name:'User Name -',value:message.author.username},
                    {name:'discriminator:',value:message.author.discriminator},
                    {name:'User Id:',value:message.author.id},
                    {name:'Bot:',value:`${message.author.bot}`},
                    {name:'Created At:',value:`${message.author.createdAt}`},
                    {name:'Joined At:',value:`${message.guild.joinedAt}`},
                    {name:'Status:',value:`${message.member.presence.status}`},
                    {name:'Bio:',value:`**${bio}**`}
                
               
               
                    
                );
                embed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
            }
            if(hobby === '' && bio === ''){
                var embed = new Discord.MessageEmbed();
                embed.setTitle("User's information");
                embed.setColor('#4286f4');
                embed.addFields(
                    {name:'User Name -',value:message.author.username},
                    {name:'discriminator:',value:message.author.discriminator},
                    {name:'User Id:',value:message.author.id},
                    {name:'Bot:',value:`${message.author.bot}`},
                    {name:'Created At:',value:`${message.author.createdAt}`},
                    {name:'Joined At:',value:`${message.guild.joinedAt}`},
                    {name:'Status:',value:`${message.member.presence.status}`},
                
               
               
                    
                );
                embed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
            }
            if(hobby !== '' && bio !== ''){
                var embed = new Discord.MessageEmbed();
                embed.setTitle("User's information");
                embed.setColor('#4286f4');
                embed.addFields(
                    {name:'User Name -',value:message.author.username},
                    {name:'discriminator:',value:message.author.discriminator},
                    {name:'User Id:',value:message.author.id},
                    {name:'Bot:',value:`${message.author.bot}`},
                    {name:'Created At:',value:`${message.author.createdAt}`},
                    {name:'Joined At:',value:`${message.guild.joinedAt}`},
                    {name:'Status:',value:`${message.member.presence.status}`},
                    {name:'Hobbies:',value:`${hobby}`},
                    {name:'Bio:',value:`**${bio}**`}
                
               
               
                    
                );
                embed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
            }
            let bot = message.author.bot;
           
            }else{
                let bot = message.author.bot
                var embed = new Discord.MessageEmbed();
                embed.setTitle("User's information")
                embed.setColor('#4286f4')
                embed.addFields(
                    {name:'User Name -',value:message.author.username},
                    {name:'discriminator:',value:message.author.discriminator},
                    {name:'User Id:',value:message.author.id},
                    {name:'Bot:',value:`${message.author.bot}`},
                    {name:'Created At:',value:`${message.author.createdAt}`},
                    {name:'Joined At:',value:`${message.guild.joinedAt}`},
                    {name:'Status:',value:`${message.member.presence.status}`},
                 
                
               
               
                    
                );
                embed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
            }
            
        }
    }
}