const Discord = require('discord.js');
const suggestionModel = require('../models/suggestionSchema');
module.exports = {
    name:`report`,
    async execute(message,args,client){
            const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            if(target){
                if(args[1]){
                        const memberTarget = message.guild.members.cache.get(target.id);
                        let d = new Date();
                        let n = d.getTime();
                        let lastreport;
                        const userData = await suggestionModel.findOne({userID:message.author.id});
                        if(userData){
                            if(userData.lastreport){
                                lastreport = userData.lastreport;
                            }else{
                                lastreport = 0;
                            }
                        }else{
                            lastreport = 0;
                        }
                        if(n - lastreport >= 600000){
                                let reason1 = args;
                                delete reason1[0];
                                let reason = args.join(' ');
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`Successfully reported that user!`);
                                message.channel.send({embeds:[embed]});
                                let server = client.guilds.cache.get('856486919419854859');
                                const suggestions = server.channels.cache.find(i=>i.name ==='reports');
                                const embed2 = new Discord.MessageEmbed();
                                embed2.setAuthor(`Reported by ${message.author.username}#${message.author.discriminator}`,message.author.displayAvatarURL());
                                embed2.addFields({name:`User Reported:`,value:`${memberTarget.user.username}`},{name:`Reason:`,value:`${reason}`});
                                suggestions.send({embeds:[embed2]});
                                if(userData){
                                    let d2 = new Date();
                                    let n2 = d.getTime();
                                    let reports = userData.reports;
                                    let newreport = {
                                        user:`${memberTarget.user.username}`,
                                        reason:`${reason}`,
                                        time:n2
                                    }
                                    reports.push(newreport);
                                    const response = await suggestionModel.findOneAndUpdate({userID:message.author.id},{
                                        $inc:{
                                            totalreports:1
                                        },
                                        reports:reports,
                                        lastreport:n2
                                    });
                                }else{
                                    let d2 = new Date();
                                    let n2 = d2.getTime();
                                    let reports = [];
                                    let newreport = {
                                        user:`${memberTarget.user.username}`,
                                        reason:`${reason}`,
                                        time:n2
                                    }
                                    reports.push(newreport);
                                    let profileset = await suggestionModel.create({
                                        userID:message.author.id,
                                        username:message.author.username,
                                        discriminator:message.author.discriminator,
                                        totalsuggestions:0,
                                        suggestions:[],
                                        totalreports:1,
                                        reports:reports,
                                        lastreport:n2,
                                        lastsuggestion:0,
                                        reported:0,
                                        timesreported:[]
                                    });
                                    profileset.save();
                                }
                                const targetData = await suggestionModel.findOne({userID:target.id});
                                if(targetData){
                                    let d2 = new Date();
                                    let n2 = d2.getTime();
                                    let reports = userData.timesreported;
                                    let newreport = {
                                        reportedby:`${message.author.username}`,
                                        reason:`${reason}`,
                                        time:n2
                                    }
                                    reports.push(newreport);
                                    const response = await suggestionModel.findOneAndUpdate({userID:target.id},{
                                        $inc:{
                                            reported:1
                                        },
                                        timesreported:reports,
                                        lastreport:n2
                                    });
                                }else{
                                    let d2 = new Date();
                                    let n2 = d2.getTime();
                                    let reports = userData.timesreported;
                                    let newreport = {
                                        reportedby:`${message.author.username}`,
                                        reason:`${reason}`,
                                        time:n2
                                    }
                                    reports.push(newreport);
                                    let profileset = await suggestionModel.create({
                                        userID:target.id,
                                        username:memberTarget.user.username,
                                        discriminator:memberTarget.user.discriminator,
                                        totalsuggestions:0,
                                        suggestions:[],
                                        totalreports:0,
                                        reports:[],
                                        lastreport:0,
                                        lastsuggestion:0,
                                        reported:1,
                                        timesreported:reports
                                    });
                                    profileset.save();
                                }
                        }else{
                            var msec = n - lastreport;
                            console.log(msec);
                            var ss = Math.floor(msec / 1000);
                            var second = 600 - ss;
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Wait bro!`);
                            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to report again!.`);
                            message.channel.send({embeds:[embed]});
                            
                        }
               
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, you forgot to mention the reason!`);
                    message.channel.send({embeds:[embed]});
                }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, you forgot to mention the user to report!`);
                message.channel.send({embeds:[embed]});
            }
    }
}