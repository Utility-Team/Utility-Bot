const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'userinfo',
    aliases:['userinfo','uinfo'],
    async execute(message,args){
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            let targetData = await userModel.findOne({userID:target.id});
            let status;
            if(targetData){
                if(targetData.premium !== 'enable'){
                        let bio = targetData.bio;
                        let hobby = targetData.hobby;
                        if(bio=== '' && hobby!== ''){
                            console.log('1 worked');
                            var embed = new Discord.MessageEmbed();
                            embed.setTitle("User's information");
                            embed.setColor('#4286f4');
                            embed.addFields(
                                {name:'User Name -',value:memberTarget.user.username},
                                {name:'discriminator:',value:memberTarget.user.discriminator},
                                {name:'User Id:',value: memberTarget.user.id},
                                {name:'Bot:',value:`${memberTarget.user.bot}`},
                                {name:'Created At:',value:`${memberTarget.user.createdAt}`},
                                {name:'Joined At:',value:`${message.guild.joinedAt}`},  
                                {name:'Hobbies:',value:`${hobby}`} ,
                            );
                            embed.setThumbnail(memberTarget.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                            message.channel.send({embeds:[embed]});

                        }
                        if(hobby === '' && bio !== ''){
                            console.log('2 worked');
                            var embed = new Discord.MessageEmbed();
                            embed.setTitle("User's information");
                            embed.setColor('#4286f4');
                            embed.addFields(
                                {name:'User Name -',value:memberTarget.user.username},
                                {name:'discriminator:',value:memberTarget.user.discriminator},
                                {name:'User Id:',value: memberTarget.user.id},
                                {name:'Bot:',value:`${memberTarget.user.bot}`},
                                {name:'Created At:',value:`${memberTarget.user.createdAt}`},
                                {name:'Joined At:',value:`${message.guild.joinedAt}`},
                                {name:'Bio:',value:`**${bio}**`}
                            );
                            embed.setThumbnail(memberTarget.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                            message.channel.send({embeds:[embed]});
                        }
            
                        let bot = message.author.bot;
                    if(hobby === '' && bio === ''){
                        console.log('3 worked');
                        var embed = new Discord.MessageEmbed();
                        embed.setTitle("User's information");
                        embed.setColor('#4286f4');
                        embed.addFields(
                            {name:'User Name -',value:memberTarget.user.username},
                            {name:'discriminator:',value:memberTarget.user.discriminator},
                            {name:'User Id:',value: memberTarget.user.id},
                            {name:'Bot:',value:`${memberTarget.user.bot}`},
                            {name:'Created At:',value:`${memberTarget.user.createdAt}`},
                            {name:'Joined At:',value:`${message.guild.joinedAt}`},
                        );
                        embed.setThumbnail(memberTarget.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                        message.channel.send({embeds:[embed]});
                    }
                    if(hobby !== '' && bio !== ''){
                        console.log('4 worked');
                        var embed = new Discord.MessageEmbed();
                        embed.setTitle("User's information");
                        embed.setColor('#4286f4');
                        embed.addFields(
                            {name:'User Name -',value:memberTarget.user.username},
                            {name:'discriminator:',value:memberTarget.user.discriminator},
                            {name:'User Id:',value: memberTarget.user.id},
                            {name:'Bot:',value:`${memberTarget.user.bot}`},
                            {name:'Created At:',value:`${memberTarget.user.createdAt}`},
                            {name:'Joined At:',value:`${message.guild.joinedAt}`},
                            {name:'Hobbies:',value:`${hobby}`} ,
                            {name:'Bio:',value:`**${bio}**`}
                        );
                        embed.setThumbnail(memberTarget.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                        message.channel.send({embeds:[embed]});
                    }
                }else{
                    console.log('here 1');
                    let bio = targetData.bio;
                    let hobby = targetData.hobby;
                    let bg;
                    if(targetData.background !== ''){
                        bg = targetData.background;
                    }
                    var embed = new Discord.MessageEmbed();
                    embed.setTitle("User's information");
                    embed.setColor('#4286f4');
                    embed.addFields(
                        {name:'User Name -',value:memberTarget.user.username},
                        {name:'discriminator:',value:memberTarget.user.discriminator},
                        {name:'User Id:',value: memberTarget.user.id},
                        {name:'Bot:',value:`${memberTarget.user.bot}`},
                        {name:'Created At:',value:`${memberTarget.user.createdAt}`},
                        {name:'Joined At:',value:`${message.guild.joinedAt}`},
                    );
                    embed.setThumbnail(memberTarget.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                    if(bio !== ''){
                        embed.addFields({name:`Bio:`,value:`${bio}`});
                    }
                    if(hobby !== ''){
                        embed.addFields({name:`Hobbies:`,value:`${hobby}`});
                    }
                    if(targetData.background !== ''){
                        if(targetData.premiumtype === 3){
                                embed.setImage(`${bg}`);
                        }
                    }
                    message.channel.send({embeds:[embed]});
                }
         
            }else{
                let bot = message.author.bot
                var embed = new Discord.MessageEmbed();
                embed.setTitle("User's information");
                embed.setColor('#4286f4');
                embed.addFields(
                    {name:'User Name -',value:memberTarget.user.username},
                    {name:'discriminator:',value:memberTarget.user.discriminator},
                    {name:'User Id:',value: memberTarget.user.id},
                    {name:'Bot:',value:`${memberTarget.user.bot}`},
                    {name:'Created At:',value:`${memberTarget.user.createdAt}`},
                    {name:'Joined At:',value:`${message.guild.joinedAt}`},   
                );
                embed.setThumbnail(memberTarget.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
                console.log(memberTarget.presence);
                console.log(memberTarget.user);
                console.log(message.author.roles);
            }
            

        }else{
            let userData = await userModel.findOne({userID:message.author.id});
            if(userData){
                if(userData.premium !== 'enable'){
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
                }else{
                    let bio = userData.bio;
                    let hobby = userData.hobby;
                    let bg;
                    if(userData.background){
                        bg = userData.background
                    }
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
                    if(bio !== ''){
                        embed.addFields({name:`Bio:`,value:`${bio}`});
                    }
                    if(hobby !== ''){
                        embed.addFields({name:`Hobbies:`,value:`${hobby}`});
                    }
                    if(userData.background !== ''){
                        if(userData.premiumtype === 3){
                                embed.setImage(`${bg}`);
                        }
                    }
                    message.channel.send({embeds:[embed]});
                }
           
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
                    {name:'Status:',value:`${message.member.presence.status}`}
                );
                embed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                message.channel.send({embeds:[embed]});
            }
            
        }
    }
}