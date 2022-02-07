const Discord = require('discord.js');
const ProfileSchema = require('../models/profileSchema')
module.exports = {
    name:'dare',
    async execute(message,args){
        const serverData = await ProfileSchema.findOne({guildID:message.guild.id});
        if(serverData){
            var topics = [ 'reveal something to an online friend','Rick roll someone of your choice','call someone the group you are playing with chooses','put on a tv show the group you are playing with decides ','text the last 3 people  THANOS (yes all caps)','watch one of your crushes favorite tv shows','share your entire day/school schedule with the group ','Express your feelings about you crush to your crush','Say "I hate you" to your crush',`Say "I really like you" to your crush and then don't answer`,'Kiss the person to your left.','Call your crush.','Dance with no music for 1 minute.','Let the person on your right draw on your face.','lick some lemon','Act like a chicken until your next turn.','Call a friend, pretend it’s their birthday, and sing “Happy Birthday” to them.','End each sentence with the word “not” until your next turn.','Name a famous person that looks like each player.','Dance like your life depends on it.','Pour ice down your pants.','Talk without closing your mouth.'];
            if(serverData.dare){
                if(serverData.dare !== topics.length ){
                    let dare = serverData.dare;
                    const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Dare:`);
                            embed.setDescription(`**${topics[dare]}**`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#404EED`);
                            message.channel.send({embeds:[embed]});
                    const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                        $inc:{
                            dare:1
                        }
                    });
                }else{
                    const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                        
                            dare:1
                        
                    });
                    const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Dare:`);
                            embed.setDescription(`**${topics[0]}**`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#404EED`);
                            message.channel.send({embeds:[embed]});
                }
            }else{
                const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                    dare:1
                });
            }
        }else{
            var topics = [ 'reveal something to an online friend','Rick roll someone of your choice','call someone the group you are playing with chooses','put on a tv show the group you are playing with decides ','text the last 3 people  THANOS (yes all caps)','watch one of your crushes favorite tv shows','share your entire day/school schedule with the group ','Express your feelings about you crush to your crush','Say "I hate you" to your crush',`Say "I really like you" to your crush and then don't answer`,'Kiss the person to your left.','Call your crush.','Dance with no music for 1 minute.','Let the person on your right draw on your face.','lick some lemon','Act like a chicken until your next turn.','Call a friend, pretend it’s their birthday, and sing “Happy Birthday” to them.','End each sentence with the word “not” until your next turn.','Name a famous person that looks like each player.','Dance like your life depends on it.','Pour ice down your pants.','Talk without closing your mouth.'];
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Dare:`);
            embed.setDescription(`**${topics[Math.floor(Math.random() * topics.length)]}**`);
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setColor(`#404EED`);
            message.channel.send({embeds:[embed]});
        }
    }
}