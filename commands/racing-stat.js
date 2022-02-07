const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'racing-stat',
    aliases:['racing-stat','racing-stats','race-stat','race-stats','racingstat','racingstats','racestat','racestats'],
    async execute(message,args){
        const userData = await userModel.findOne({userID:message.author.id});
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(args[0] && target){
            if(userData){
                const targetData = await userModel.findOne({userID:target.id});
                if(targetData){
                    let totalraces;
                    if(targetData.totalraces){
                        totalraces = targetData.totalraces;
                    }else{
                        totalraces = 0;
                    }
                    let raceswon;
                    if(targetData.raceswon){
                        raceswon = targetData.raceswon;
                    }else{
                        raceswon = 0;
                    }
                    let raceslost;
                    if(targetData.raceslost){
                        raceslost = targetData.raceslost;
                    }else{
                        raceslost = 0;
                    }
                    let bestspeed;
                    if(targetData.bestspeed){
                        bestspeed = targetData.bestspeed;
                    }else{
                        bestspeed = 0;
                    }   
                    let avatar;
                    if(targetData.avatar && targetData.premium === 'enable'){
                        avatar = targetData.avatar;
                    }else{
                        avatar = target.displayAvatarURL();
                    }
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${target.username}'s racing stats`);
                    embed.addFields({name:`Total Matches Played:`,value:`${totalraces}`},
                    {name:`Total Races Won:`,value:`${raceswon}`},
                    {name:`Total Races Lost:`,value:`${raceslost}`}
                    );
                    if(userData.bestspeed){
                       embed.addField({name:`Best Speed:`,value:`${bestspeed}`});
                    }
                    embed.setThumbnail(avatar);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${target.username}'s racing stats`);
                    embed.addFields({name:`Total Matches Played:`,value:`0`},
                        {name:`Total Races Won:`,value:`0`},
                        {name:`Total Races Lost:`,value:`0`},
                        {name:`Best Speed:`,value:`0`} 
                    );
                    embed.setThumbnail(target.displayAvatarURL());
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                }
            }
        }else{
            if(userData){
                let totalraces;
                if(userData.totalraces){
                    totalraces = userData.totalraces;
                }else{
                    totalraces = 0;
                }
                let raceswon;
                if(userData.raceswon){
                    raceswon = userData.raceswon;
                }else{
                    raceswon = 0;
                }
                let raceslost;
                if(userData.raceslost){
                    raceslost = userData.raceslost;
                }else{
                    raceslost = 0;
                }
                let bestspeed;
                if(userData.bestspeed){
                    bestspeed = userData.bestspeed;
                }else{
                    bestspeed = 0;
                }   
                let avatar;
                if(userData.avatar && userData.premium === 'enable'){
                    avatar = userData.avatar;
                }else{
                    avatar = message.author.displayAvatarURL();
                }
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}'s racing stats`);
                embed.addFields({name:`Total Matches Played:`,value:`${totalraces}`},
                {name:`Total Races Won:`,value:`${raceswon}`},
                {name:`Total Races Lost:`,value:`${raceslost}`},
                {name:`Best Speed:`,value:`${bestspeed}`} 
                );
                embed.setThumbnail(avatar);
                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}'s racing stats`);
                embed.addFields({name:`Total Matches Played:`,value:`0`},
                {name:`Total Races Won:`,value:`0`},
                {name:`Total Races Lost:`,value:`0`},
                {name:`Best Speed:`,value:`0`} 
                );
                embed.setThumbnail(message.author.displayAvatarURL());
                embed.setFooter(`Requested by ${message.author.username}`,avatar);
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
                let profile = await userModel.create({
                    //user's id
                     userID:message.author.id,
                    //username
                    username:message.author.username,
                     //money in wallet
                     wallet:1000,
                     //money in bank
                     bank:0,
                     //total money
                     networth:1000,
                     //job name
                     job:'',
                     //total commands runned
                     commands:0,
                     //last daily time
                     dailytime:0,
                     //last monthly time
                     monthlytime:0,
                     //last daily worked
                     dailywork:0,
                     //total gambles played
                     totalgamble:0,
                     //total gambles won
                     wongamble:0,
                     //total gambles lost
                     lostgamble:0,
                     //current salary
                     salary:0,
                     //total hours worked
                     totalwork:0,
                     //Utility CryptoCoins
                     cryptocoin:0,
                     //last gamble played
                     lastgamble:0,
                     //number of gambles tie
                     tiegamble:0,
                     //xp
                     xp:0,
                     //level
                     level:0,
                     //alphabet shares
                     alphabet:0,
                     //Utility shares
                     utility:0,
                     //facebook shares
                     facebook:0,
                     //microsoft shares
                     microsoft:0,
                     //apple shares
                     apple:0,
                     //tesla shares
                     tesla:0,
                     //mode
                     mode:'active',
                     //lock active or not
                     lockactive:'disable',
                     //last raid done by the user
                     lastraid:0,
                     //last resign
                     lastresign:0,
                     //last beg
                     lastbeg:0,
                     //number of locks in use
                     nolock:0,
                     //partner id
                     partner:0,
                     //partner name
                     partnername:'',
                     //last time the user got raided
                     gotraided:0,
                     //last profile
                     lastprofile:0,
                     //last inventory
                     lastinv:0,
                     //bio
                     bio:'',
                     //hobby
                     hobby:'',
                     //last family inv
                     lastfamilyinv:0,
                     //last find
                     lastfind:0,
                     //last fish
                     lastfish:0,
                     //last hunt
                     lasthunt:0,
                     //total rps
                     totalrps:0,
                     //won rps
                     wonrps:0,
                     //lost rps
                     lostrps:0,
                     //tie rps
                     tierps:0,
                     //last rps
                     lastrps:0,
                     //premium
                     premium:'disable',
                     //last premium
                     lastpremium:0,
                     //last passive
                     lastpassive:0,
                     //last shop
                     lastshop:0,
                     //last lottery
                     lastlottery:0,
                     //last dig
                     lastdig:0,
                     //last treasure
                     lasttreasure:0,
                     //last buy
                     lastbuy:0,
                     //last sell
                     lastsell:0,
                     //last use
                     lastuse:0,
                     avatar:'',
                     background:''
                  });
                  profile.save();
            }
        }
    }
}