const Discord = require('discord.js');
const ProfileSchema = require('../models/profileSchema');
module.exports={
    name:'truth',
   async execute(message,args){
        const serverData = await ProfileSchema.findOne({guildID:message.guild.id});
        if(serverData){
            var topics = ['do you like hello there meme?','is your crush in this server','do you know who is the crush of your crush','who is your crush?','did you ever pee on your pants','did you lie to your crush?','did you ever drink alcohol?','Will you ever cheat with your partner?','What are the 3 things which you like about your crush/partner','What do you think your crush thinks about you?','What is one thing that you always wanted to do but you never got chance to do it','Which is the most embarassing music you listen to?','what’s the most embarrassing tv show you watch?','do you know your crushes favorite tv show?','how many times did you get rick rolled','What’s the last lie you told?','What was the most embarrassing thing you’ve ever done on a date?','Name someone you’ve pretended to like but actually couldn’t stand.','What’s your most bizarre nickname?','What’s been your most physically painful experience?','What bridges are you glad that you burned?','What’s the craziest thing you’ve done on public transportation?','If you met a genie, what would your three wishes be?','What’s the meanest thing you’ve ever said to someone else?','What’s one thing you’d do if you knew there no consequences?','What’s the craziest thing you’ve done in front of a mirror?',' Who are you most jealous of?',
            'Who’s the oldest person you’ve dated?','How many times a week do you wear the same pants?','Would you date your high school crush today?','What’s one movie you’re embarrassed to admit you enjoy?','Have you ever peed in a pool?','What app do you waste the most time on?','Have you ever been nude in public?','What is the youngest age partner you’d date?','Have you ever picked your nose in public?','Have you ever lied about your age?','What’s the longest you’ve gone without showering?','Which of your family members annoys you the most and why?','What is your greatest fear in a relationship?','What’s the most embarrassing text in your phone right now?','Have you ever stolen something from work?',' What’s the longest you’ve gone without brushing your teeth?','What’s your biggest regret in life?','Who would you hate to see naked?','Would you break up with your partner for $1 million?'];
            if(serverData.truth){
                if(serverData.truth !== topics.length ){
                    let truth = serverData.truth;
                    const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Truth:`);
                            embed.setDescription(`**${topics[truth]}**`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#404EED`);
                            message.channel.send({embeds:[embed]});
                    const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                        $inc:{
                            truth:1
                        }
                    });
                }else{
                    const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                        
                            truth:1
                        
                    });
                    const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Truth:`);
                            embed.setDescription(`**${topics[0]}**`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#404EED`);
                            message.channel.send({embeds:[embed]});
                }
            }else{
                const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                    truth:1
                });
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Truth:`);
                embed.setDescription(`**${topics[0]}**`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                embed.setColor(`#404EED`);
                message.channel.send({embeds:[embed]});
                
            }
        }else{
            var topics = ['do you like hello there meme?','is your crush in this server','do you know who is the crush of your crush','who is your crush?','did you ever pee on your pants','did you lie to your crush?','did you ever drink alcohol?','Will you ever cheat with your partner?','What are the 3 things which you like about your crush/partner','What do you think your crush thinks about you?','What is one thing that you always wanted to do but you never got chance to do it','Which is the most embarassing music you listen to?','what’s the most embarrassing tv show you watch?','do you know your crushes favorite tv show?','how many times did you get rick rolled','What’s the last lie you told?','What was the most embarrassing thing you’ve ever done on a date?','Name someone you’ve pretended to like but actually couldn’t stand.','What’s your most bizarre nickname?','What’s been your most physically painful experience?','What bridges are you glad that you burned?','What’s the craziest thing you’ve done on public transportation?','If you met a genie, what would your three wishes be?','What’s the meanest thing you’ve ever said to someone else?','What’s one thing you’d do if you knew there no consequences?','What’s the craziest thing you’ve done in front of a mirror?',' Who are you most jealous of?',
            'Who’s the oldest person you’ve dated?','How many times a week do you wear the same pants?','Would you date your high school crush today?','What’s one movie you’re embarrassed to admit you enjoy?','Have you ever peed in a pool?','What app do you waste the most time on?','Have you ever been nude in public?','What is the youngest age partner you’d date?','Have you ever picked your nose in public?','Have you ever lied about your age?','What’s the longest you’ve gone without showering?','Which of your family members annoys you the most and why?','What is your greatest fear in a relationship?','What’s the most embarrassing text in your phone right now?','Have you ever stolen something from work?',' What’s the longest you’ve gone without brushing your teeth?','What’s your biggest regret in life?','Who would you hate to see naked?','Would you break up with your partner for $1 million?'];
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Truth:`);
            embed.setDescription(`**${topics[Math.floor(Math.random() * topics.length)]}**`);
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setColor(`#404EED`);
            message.channel.send({embeds:[embed]});
        }
    }
}