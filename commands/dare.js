const Discord = require('discord.js');
const ProfileSchema = require('../models/profileSchema')
module.exports = {
    name:'dare',
    async execute(message,args){
        const serverData = await ProfileSchema.findOne({guildID:message.guild.id});
        var topics = [ 'reveal something to an online friend','Rick roll someone of your choice','call someone the group you are playing with chooses','put on a tv show the group you are playing with decides ','text the last 3 people  THANOS (yes all caps)','watch one of your crushes favorite tv shows','share your entire day/school schedule with the group ','Express your feelings about you crush to your crush','Say "I hate you" to your crush',`Say "I really like you" to your crush and then don't answer`,'Kiss the person to your left.','Call your crush.','Dance with no music for 1 minute.','Let the person on your right draw on your face.','lick some lemon','Act like a chicken until your next turn.','Call a friend, pretend it’s their birthday, and sing “Happy Birthday” to them.','End each sentence with the word “not” until your next turn.','Name a famous person that looks like each player.','Dance like your life depends on it.','Pour ice down your pants.','Talk without closing your mouth.']
        if(serverData){
            if(!serverData.dare){
                const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                    dare:0
                });
            }
            if(serverData.dare<topics.length){
            const response2 = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                $inc:{
                    dare:1
                }
            });
            }
            let truth_count = serverData.dare;
            if(truth_count>=topics.length){
                const response2 = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                    dare:0
                 });
                 const serverData2 = await ProfileSchema.findOne({guildID:message.guild.id});
                 console.log('serverdata' + serverData2.dare);
                 truth_count = 0;
            }
             console.log(truth_count);
            console.log(topics[truth_count]);
          //  message.channel.send();
          //  console.log(topics[Math.floor(Math.random() * topics.length)]);
            if(truth_count>0){
    
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Dare - ${topics[truth_count]}`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                message.channel.send({embeds:[embed]});
           
            }
            if(truth_count=== 0){
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Dare - ${topics[0]}`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                message.channel.send({embeds:[embed]});
            }
        }
    }
}