const Discord = require('discord.js');
const ProfileSchema = require('../models/profileSchema');
module.exports = {
    name: 'topic',
    description: "This gives a topic",
    async execute(message, args) {
        const serverData = await ProfileSchema.findOne({guildID:message.guild.id});
        if(serverData){
            var topics = ["would you like to drink tea or coffee", "choose one lose a hand or a leg","where would you take your girlfriend Paris or Rome","What is your favorite kind of kiss?","would you work on your dream company or the company which pays more","would you take pizza or burger","which one would you take Apple iphone or google pixel","Would you save your mom or your dad","If you could be invisible, what is the first thing you would do?" ,"What is a secret you kept from your parents?","What is the most embarrassing music you listen to?" ,'What is one thing you wish you could change about yourself?','Which one superpower will you want have?','Who do you hate, and why?','which is the first thing you do when you wake up in the morning?','Who motivates you?','What was the biggest thing you have ever won?','What will you buy if you become the richest person in the world?','Which thing you can not buy from money?','Who is your best friend and which thing you like most  about him/her ?','where do you see yourself in 10 years?','Which is the best thing you like about Summer?','Which season you like most and why?','When was the last time you lied?','When was the last time you cried?',"What's your biggest fear?","What's your biggest fantasy?","Have you ever cheated on someone?","What's the worst thing you've ever done?","What type of food do you like? ...","What would you do if you won a million dollars? ...","Which sports you like and why?","Which is best thing about the world that you like","Which one you like more dogs or cats?","Do you like traveling?","What's your favorite hobby?","Which Starbucks flavour you like the most?","Which is the best discord bot that you have ever used?","If u Would be in a room for 72 hours..and u can take anyone with u in there..whom would u take?","U have just 1 day to live...what are the thing u Would do?","U won two tickets to visit disney land.. whom would u give the second ticket to?","U won a lottery and got 2 million.. what would be the first think u will buy?","Which movie u like the most?",];
            if(serverData.topic){
                if(serverData.topic !== topics.length ){
                    let topic = serverData.topic;
                    const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Topic:`);
                            embed.setDescription(`**${topics[topic]}**`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#404EED`);
                            message.channel.send({embeds:[embed]});
                    const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                        $inc:{
                            topic:1
                        }
                    });
                }else{
                    const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                        
                            topic:1
                        
                    });
                    const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Topic:`);
                            embed.setDescription(`**${topics[0]}**`);
                            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                            embed.setTimestamp();
                            embed.setColor(`#404EED`);
                            message.channel.send({embeds:[embed]});
                }
            }else{
                const response = await ProfileSchema.findOneAndUpdate({guildID:message.guild.id},{
                    topic:1
                });
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Topic:`);
                embed.setDescription(`**${topics[0]}**`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                embed.setColor(`#404EED`);
                message.channel.send({embeds:[embed]});
            }
        }else{
            var topics = ["would you like to drink tea or coffee", "choose one lose a hand or a leg","where would you take your girlfriend Paris or Rome","What is your favorite kind of kiss?","would you work on your dream company or the company which pays more","would you take pizza or burger","which one would you take Apple iphone or google pixel","Would you save your mom or your dad","If you could be invisible, what is the first thing you would do?" ,"What is a secret you kept from your parents?","What is the most embarrassing music you listen to?" ,'What is one thing you wish you could change about yourself?','Which one superpower will you want have?','Who do you hate, and why?','which is the first thing you do when you wake up in the morning?','Who motivates you?','What was the biggest thing you have ever won?','What will you buy if you become the richest person in the world?','Which thing you can not buy from money?','Who is your best friend and which thing you like most  about him/her ?','where do you see yourself in 10 years?','Which is the best thing you like about Summer?','Which season you like most and why?','When was the last time you lied?','When was the last time you cried?',"What's your biggest fear?","What's your biggest fantasy?","Have you ever cheated on someone?","What's the worst thing you've ever done?","What type of food do you like? ...","What would you do if you won a million dollars? ...","Which sports you like and why?","Which is best thing about the world that you like","Which one you like more dogs or cats?","Do you like traveling?","What's your favorite hobby?","Which Starbucks flavour you like the most?","Which is the best discord bot that you have ever used?","If u Would be in a room for 72 hours..and u can take anyone with u in there..whom would u take?","U have just 1 day to live...what are the thing u Would do?","U won two tickets to visit disney land.. whom would u give the second ticket to?","U won a lottery and got 2 million.. what would be the first think u will buy?","Which movie u like the most?",];
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Topic:`);
            embed.setDescription(`**${topics[Math.floor(Math.random() * topics.length)]}**`);
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setColor(`#404EED`);
            message.channel.send({embeds:[embed]});
        }
    }
}