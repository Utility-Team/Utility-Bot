const Discord = require('discord.js');
const suggestionModel = require('../models/suggestionSchema');
module.exports = {
    name:`suggestion`,
    async execute(message,args,client){
            if(args[0]){
                let d = new Date();
                let n = d.getTime();
                let lastsuggestion;
                const userData = await suggestionModel.findOne({userID:message.author.id});
                if(userData){
                    if(userData.lastsuggestion){
                        lastsuggestion = userData.lastsuggestion
                    }else{
                        lastsuggestion = 0;
                    }
                }else{
                    lastsuggestion = 0;
                }
                if(n - lastsuggestion >= 600000){
                        let reason1 = args;
                        let reason = args.join(' ');
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Thanks for your suggestion!`);
                        message.channel.send({embeds:[embed]});
                        let server = client.guilds.cache.get('819180667673378816');
                        const suggestions = server.channels.cache.find(i=>i.name ==='suggestions');
                        const embed2 = new Discord.MessageEmbed();
                        embed2.setAuthor(`Suggestion from ${message.author.username}#${message.author.discriminator}`,message.author.displayAvatarURL());
                        embed2.setDescription(`Suggestion - ${reason}`);
                        suggestions.send({embeds:[embed2]});
                        if(userData){
                            let d2 = new Date();
                            let n2 = d.getTime();
                            let suggestions = userData.suggestions;
                            let newsuggestion = {
                                name:`${reason}`,
                                time:n2
                            }
                            suggestions.push(newsuggestion);
                            const response = await suggestionModel.findOneAndUpdate({userID:message.author.id},{
                                $inc:{
                                    totalsuggestions:1
                                },
                                suggestions:suggestions,
                                lastsuggestion:n2
                            });
                        }else{
                            let d2 = new Date();
                            let n2 = d.getTime();
                            let suggestions = [];
                            let newsuggestion = {
                                name:`${reason}`,
                                time:n2
                            }
                            suggestions.push(newsuggestion);
                            let profileset = await suggestionModel.create({
                                userID:message.author.id,
                                username:message.author.username,
                                discriminator:message.author.discriminator,
                                totalsuggestions:1,
                                suggestions:suggestions,
                                totalreports:0,
                                reports:[],
                                lastreport:0,
                                lastsuggestion:n2,
                                reported:0,
                                timesreported:[]
                            });
                            profileset.save();
                        }
                }else{
                    var msec = n - lastsuggestion;
                    console.log(msec);
                    var ss = Math.floor(msec / 1000);
                    var second = 600 - ss;
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`Wait bro!`);
                    embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to suggest again!.`);
                    message.channel.send({embeds:[embed]});
                    
                }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username} please also mention your suggestion`);
                message.channel.send({embeds:[embed]});
            }
    }
}