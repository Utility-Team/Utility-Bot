const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'race',
    async execute(message,args){
        const target = message.mentions.users.first();
        if(args[0]){
            if(target){
                async function check_Rewards(userData,achievement,badge,power,category){
                    if(userData.rewards && userData.badges){
                        if(userData.rewards.length>0){
                            let check = 0;
                            for(var x = 0;x<=userData.rewards.length;x++){
                                if(userData.rewards[x]){
                                    if(userData.rewards[x].name === achievement){
                                        check = 5;
                                        console.log('it already exists');
                                        return;
                                    }
                                    if(x === userData.rewards.length && check <5){
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`🎉 Unlocked New Achievement!`);
                                        embed.setDescription(`You have unlocked **${achievement} achievement** and your reward is **${badge} 100 type races badge**`);
                                        embed.setTimestamp();
                                        message.channel.send({embeds:[embed]});
                                        let rewardsbadge = userData.rewards;
                                        let badgeData = userData.badges;
                                        let newrewardsData = {
                                            name:achievement,
                                            badge:badge,
                                            category:category
                                        }
                                        let newbadgeData = {
                                            name:achievement,
                                            badge:badge,
                                            power:power,
                                            category:category
                                        }
                                        rewardsbadge.push(newrewardsData);
                                        badgeData.push(newbadgeData);
                                       
                                          const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                              rewards:rewardsbadge,
                                              badges:badgeData
                                          });
                                        return;
                                    }
                                }else{
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`🎉 Unlocked New Achievement!`);
                                    embed.setDescription(`You have unlocked **${achievement} achievement** and your reward is **${badge} 100 type races badge**`);
                                    embed.setTimestamp();
                                    message.channel.send({embeds:[embed]});
                                    let rewardsbadge = userData.rewards;
                                    let badgeData = userData.badges;
                                    let newrewardsData = {
                                        name:achievement,
                                        badge:badge,
                                        category:category
                                    }
                                    let newbadgeData = {
                                        name:achievement,
                                        badge:badge,
                                        power:power,
                                        category:category
                                    }
                                    rewardsbadge.push(newrewardsData);
                                    badgeData.push(newbadgeData);  
                                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                        rewards:rewardsbadge,
                                        badges:badgeData
                                    });
                                    return;
                                }
                                
                            }
                        }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`🎉 Unlocked New Achievement!`);
                            embed.setDescription(`You have unlocked **${achievement} achievement** and your reward is **${badge} 100 type races badge**`);
                            embed.setTimestamp();
                            message.channel.send({embeds:[embed]});
                            let rewardsbadge = [];
                            let badgeData = []
                            let newrewardsData = {
                                name:achievement,
                                badge:badge,
                                category:'Donation'
                            }
                            let newbadgeData = {
                                name:achievement,
                                badge:badge,
                                power:power,
                                category:'Donation'
                            }
                            rewardsbadge.push(newrewardsData);
                            badgeData.push(newbadgeData);
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                rewards:rewardsbadge,
                                badges:badgeData
                            });
                            return;
                        }
                    }
                  }
                    async function run_race(targetid){
                        const embed2 = new Discord.MessageEmbed();
                        embed2.setTitle(`Racing Time!`);
                        embed2.setDescription(`Race will start in **5 seconds**`);
                        embed2.setThumbnail('https://i.ibb.co/Bw4V6Xm/emblem.png');
                        embed2.setFooter(`May the best win!`);
                        embed2.setColor(`#404EED`);
                        embed2.setTimestamp();
                        let m2 = await message.channel.send({embeds:[embed2]});
                        let val = 5;
                        let topics = ['may the force be with you!','come on! i can do this','climate change is real!','join the dark side!','Without the confidence, nothing can be accomplished','We love the things we love for what they are','Beauty is not in the face; beauty is a light in the heart','Love For All, Hatred For None','Change the world by being yourself','Every moment is a fresh beginning','What we think, we become','Tough times never last but tough people do','Have enough courage to start and enough heart to finish','Determine your priorities and focus on them','Be so good they can’t ignore you','Try to be a rainbow in someone’s cloud','There is no substitute for hard work','Wanting to be someone else is a waste of who you are','The time is always right to do what is right','The meaning of life is to give life meaning',"Dream is not the thing you see in sleep but is that thing that doesn't let you sleep"];
                        let topics2 = ['ᴍᴀʏ ᴛʜᴇ ꜰᴏʀᴄᴇ ʙᴇ ᴡɪᴛʜ ʏᴏᴜ!','ᴄᴏᴍᴇ ᴏɴ! ɪ ᴄᴀɴ ᴅᴏ ᴛʜɪꜱ','ᴄʟɪᴍᴀᴛᴇ ᴄʜᴀɴɢᴇ ɪꜱ ʀᴇᴀʟ!','ᴊᴏɪɴ ᴛʜᴇ ᴅᴀʀᴋ ꜱɪᴅᴇ!','ᴡɪᴛʜᴏᴜᴛ ᴛʜᴇ ᴄᴏɴꜰɪᴅᴇɴᴄᴇ, ɴᴏᴛʜɪɴɢ ᴄᴀɴ ʙᴇ ᴀᴄᴄᴏᴍᴘʟɪꜱʜᴇᴅ','ᴡᴇ ʟᴏᴠᴇ ᴛʜᴇ ᴛʜɪɴɢꜱ ᴡᴇ ʟᴏᴠᴇ ꜰᴏʀ ᴡʜᴀᴛ ᴛʜᴇʏ ᴀʀᴇ','ʙᴇᴀᴜᴛʏ ɪꜱ ɴᴏᴛ ɪɴ ᴛʜᴇ ꜰᴀᴄᴇ; ʙᴇᴀᴜᴛʏ ɪꜱ ᴀ ʟɪɢʜᴛ ɪɴ ᴛʜᴇ ʜᴇᴀʀᴛ','ʟᴏᴠᴇ ꜰᴏʀ ᴀʟʟ, ʜᴀᴛʀᴇᴅ ꜰᴏʀ ɴᴏɴᴇ','ᴄʜᴀɴɢᴇ ᴛʜᴇ ᴡᴏʀʟᴅ ʙʏ ʙᴇɪɴɢ ʏᴏᴜʀꜱᴇʟꜰ','ᴇᴠᴇʀʏ ᴍᴏᴍᴇɴᴛ ɪꜱ ᴀ ꜰʀᴇꜱʜ ʙᴇɢɪɴɴɪɴɢ','What we think, we become','ᴛᴏᴜɢʜ ᴛɪᴍᴇꜱ ɴᴇᴠᴇʀ ʟᴀꜱᴛ ʙᴜᴛ ᴛᴏᴜɢʜ ᴘᴇᴏᴘʟᴇ ᴅᴏ','ʜᴀᴠᴇ ᴇɴᴏᴜɢʜ ᴄᴏᴜʀᴀɢᴇ ᴛᴏ ꜱᴛᴀʀᴛ ᴀɴᴅ ᴇɴᴏᴜɢʜ ʜᴇᴀʀᴛ ᴛᴏ ꜰɪɴɪꜱʜ','ᴅᴇᴛᴇʀᴍɪɴᴇ ʏᴏᴜʀ ᴘʀɪᴏʀɪᴛɪᴇꜱ ᴀɴᴅ ꜰᴏᴄᴜꜱ ᴏɴ ᴛʜᴇᴍ','ʙᴇ ꜱᴏ ɢᴏᴏᴅ ᴛʜᴇʏ ᴄᴀɴ’ᴛ ɪɢɴᴏʀᴇ ʏᴏᴜ','ᴛʀʏ ᴛᴏ ʙᴇ ᴀ ʀᴀɪɴʙᴏᴡ ɪɴ ꜱᴏᴍᴇᴏɴᴇ’ꜱ ᴄʟᴏᴜᴅ','ᴛʜᴇʀᴇ ɪꜱ ɴᴏ ꜱᴜʙꜱᴛɪᴛᴜᴛᴇ ꜰᴏʀ ʜᴀʀᴅ ᴡᴏʀᴋ','ᴡᴀɴᴛɪɴɢ ᴛᴏ ʙᴇ ꜱᴏᴍᴇᴏɴᴇ ᴇʟꜱᴇ ɪꜱ ᴀ ᴡᴀꜱᴛᴇ ᴏꜰ ᴡʜᴏ ʏᴏᴜ ᴀʀᴇ','ᴛʜᴇ ᴛɪᴍᴇ ɪꜱ ᴀʟᴡᴀʏꜱ ʀɪɢʜᴛ ᴛᴏ ᴅᴏ ᴡʜᴀᴛ ɪꜱ ʀɪɢʜᴛ','ᴛʜᴇ ᴍᴇᴀɴɪɴɢ ᴏꜰ ʟɪꜰᴇ ɪꜱ ᴛᴏ ɢɪᴠᴇ ʟɪꜰᴇ ᴍᴇᴀɴɪɴɢ',"ᴅʀᴇᴀᴍ ɪꜱ ɴᴏᴛ ᴛʜᴇ ᴛʜɪɴɢ ʏᴏᴜ ꜱᴇᴇ ɪɴ ꜱʟᴇᴇᴘ ʙᴜᴛ ɪꜱ ᴛʜᴀᴛ ᴛʜɪɴɢ ᴛʜᴀᴛ ᴅᴏᴇꜱɴ'ᴛ ʟᴇᴛ ʏᴏᴜ ꜱʟᴇᴇᴘ"];
                        let phrase;
                        let phrase2;
                        let serverData = await serverModel.findOne({guildID:message.guild.id});
                        if(serverData.race){
                            if(serverData.race < topics2.length ){
                                console.log('here 1');
                                let race = serverData.race;
                                phrase = topics2[race];
                                phrase2 = topics[race];
                                const response = await serverModel.findOneAndUpdate({guildID:message.guild.id},{
                                    $inc:{
                                        race:1
                                    }
                                });
                            }else{
                                console.log('here 2');
                                let race = 0;
                                phrase = topics2[race];
                                phrase2 = topics[race];
                                const response = await serverModel.findOneAndUpdate({guildID:message.guild.id},{
                                        race:1
                                });
                            }
                        }else{
                            console.log('here 3');
                            let race = 0;
                            phrase = topics2[race];
                            phrase2 = topics[race];
                            const response = await serverModel.findOneAndUpdate({guildID:message.guild.id},{
                                race:1
                            });
                        }
                        let d;
                        let n;
                        console.log('phrase' + phrase);
                        for(var x = 0;x<=4;x++){
                            setTimeout(async ()=>{
                                val = val - 1;
                                    if(val >0){
                                        const embed2 = new Discord.MessageEmbed();
                                        embed2.setTitle(`Racing Time!`);
                                        embed2.setDescription(`Race will start in **${val} seconds**`);
                                        embed2.setThumbnail('https://i.ibb.co/Bw4V6Xm/emblem.png');
                                        embed2.setFooter(`May the best win!`);
                                        embed2.setColor(`#404EED`);
                                        embed2.setTimestamp();
                                        m2.edit({embeds:[embed2]});
                                    }else if(val === 0){
                                        let targetData2 = await userModel.findOne({userID:targetid});
                                        let userData2 = await userModel.findOne({userID:message.author.id});
                                        const embed2 = new Discord.MessageEmbed();
                                        embed2.setTitle(`Racing Time!`);
                                        embed2.setDescription(`Repeat this phrase **${phrase}**`);
                                        embed2.setThumbnail('https://i.ibb.co/Bw4V6Xm/emblem.png');
                                        embed2.setFooter(`May the best win!`);
                                        embed2.setColor(`#404EED`);
                                        embed2.setTimestamp();
                                        m2.edit({embeds:[embed2]});
                                        d = new Date();
                                        n = d.getTime();
                                       
                                        let choosen_work_lowercase = phrase2.toLowerCase();
                                        let chance = 'not done';
                                        const filter = m=> m.content.toLowerCase() === choosen_work_lowercase ;
                                        const collector = message.channel.createMessageCollector({filter,time:1000 * 22});
                                        collector.on('collect',async (m)=>{  
                                            console.log(m);
                                            let content = m.content;
                                            let content_lowercase = content.toLowerCase();
                                            let cheat_work_lowercase = phrase.toLowerCase();
                                            if(content_lowercase === choosen_work_lowercase ){
                                                if(m.author.id !== message.author.id && m.author.id !== target.id){
                                                    console.log(
                                                        'here'
                                                    );
                                                }else{
                                                    if(chance === 'not done'){
                                                        chance = 'done';
                                                        let d2 = new Date();
                                                        let n2 = d2.getTime();
                                                        let size = phrase.split(" ").length;
                                                        console.log(size);
                                                        let msec = n2 - n;
                                                        var ss = Math.floor(msec / 1000);
                                                        let mm = ss/60;
                                                        console.log('minutes' + mm);
                                                        let speed = size/ mm;
                                                        message.channel.send(`${m.author} won the race`);
                                                        const userData = await userModel.findOne({userID:m.author.id});
                                                        if(m.author.id === message.author.id){
                                                            console.log('step 1');
                                                            if(userData){
                                                                if(userData.totalraces >= 100){
                                                                    check_Rewards(userData,'Successfully playing 100 typing races','<:100racesbadge:938433859350040666>',2,'typing race');
                                                                }
                                                                let bestspeed;
                                                                if(userData.bestspeed){
                                                                    bestspeed = userData.bestspeed;
                                                                }else{
                                                                    bestspeed = 0;
                                                                }
                                                                if(speed > bestspeed){
                                                                    bestspeed = speed;
                                                                }
                                                                const response = await userModel.findOneAndUpdate({userID:m.author.id},{
                                                                    $inc:{
                                                                        totalraces:1,
                                                                        raceswon:1
                                                                    },
                                                                    bestspeed:bestspeed
                                                                });
                                                            }else{
                                                                let profile = await userModel.create({
                                                                    //user's id
                                                                     userID:m.author.id,
                                                                    //username
                                                                    username:m.author.username,
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
                                                                     background:'',
                                                                     premiumtype:0,
                                                                     totalraces:1,
                                                                     raceswon:1,
                                                                     bestspeed:speed,
                                                                     raceslost:0,
                                                                     avatar:'',
                                                                     background:'',
                                                                     huntingrifle:0,
                                                                     fishingrod:0,
                                                                     lock:0,
                                                                     boat:0,
                                                                     creditpoints:0,
                                                                     totalmoneydonated:0,
                                                                     totalmoneyreceived:0,
                                                                     totalitemsdonated:0,
                                                                     totalitemsreceived:0
                                                                  });
                                                                  profile.save();
                                                            }
                                                            const targetData = await userModel.findOne({userID:targetid});
                                                            if(targetData){
                                                                

                                                                const response = await userModel.findOneAndUpdate({userID:target.id},{
                                                                    $inc:{
                                                                        totalraces:1,
                                                                        raceslost:1,
                                                                    
                                                                    },
                                                                });
                                                            }else{
                                                                let profile = await userModel.create({
                                                                    //user's id
                                                                     userID:target.id,
                                                                    //username
                                                                    username:target.username,
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
                                                                     background:'',
                                                                     premiumtype:0,
                                                                     totalraces:1,
                                                                     raceslost:1,
                                                                     raceswon:0,
                                                                     avatar:'',
                                                                     background:'',
                                                                     huntingrifle:0,
                                                                     fishingrod:0,
                                                                     lock:0,
                                                                     boat:0,
                                                                     creditpoints:0,
                                                                     totalmoneydonated:0,
                                                                     totalmoneyreceived:0,
                                                                     totalitemsdonated:0,
                                                                     totalitemsreceived:0,
                                                                     bestspeed:0
                                                                  });
                                                                  profile.save();
                                                            }


                                                        }else if(m.author.id === target.id){
                                                            console.log('step 2');
                                                            if(userData){
                                                                let bestspeed;
                                                                if(userData.bestspeed){
                                                                    bestspeed = userData.bestspeed;
                                                                }else{
                                                                    bestspeed = 0;
                                                                }
                                                                if(speed > bestspeed){
                                                                    bestspeed = speed;
                                                                }
                                                                const response = await userModel.findOneAndUpdate({userID:target.id},{
                                                                    $inc:{
                                                                        totalraces:1,
                                                                        raceswon:1
                                                                    },
                                                                    bestspeed:bestspeed
                                                                });
                                                            }else{
                                                                let profile = await userModel.create({
                                                                    //user's id
                                                                     userID:target.id,
                                                                    //username
                                                                    username:target.username,
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
                                                                     background:'',
                                                                     premiumtype:0,
                                                                     totalraces:1,
                                                                     raceswon:1,
                                                                     raceslost:0,
                                                                     bestspeed:speed,
                                                                     avatar:'',
                                                                     background:'',
                                                                     huntingrifle:0,
                                                                     fishingrod:0,
                                                                     lock:0,
                                                                     boat:0,
                                                                     creditpoints:0,
                                                                     totalmoneydonated:0,
                                                                     totalmoneyreceived:0,
                                                                     totalitemsdonated:0,
                                                                     totalitemsreceived:0
                                                                  });
                                                                  profile.save();
                                                            }
                                                            const targetData = await userModel.findOne({userID:message.author.id});
                                                            if(targetData){
                                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                                    $inc:{
                                                                        totalraces:1,
                                                                        raceslost:1,
                                                                    
                                                                    },
                                                                });
                                                            }else{
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
                                                                     background:'',
                                                                     premiumtype:0,
                                                                     totalraces:1,
                                                                     raceslost:1,
                                                                     raceswon:0,
                                                                     avatar:'',
                                                                     background:'',
                                                                     huntingrifle:0,
                                                                     fishingrod:0,
                                                                     lock:0,
                                                                     boat:0,
                                                                     creditpoints:0,
                                                                     bestspeed:0
                                                                    
                                                                  });
                                                                  profile.save();
                                                            }
                                                        }
                                                    }
                                                 }
                                            
                                            }
                                        });

                                        collector.on('end',collected=>{      
                                            if(collected.size === 0){
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`No one answered!`);
                                                embed.setDescription(`This race has been called off cuz no one answered!`);
                                                embed.setColor('#FF470F');
                                                embed.setTimestamp();
                                                message.channel.send({embeds:[embed]});
                                            }
                                        });
                                    }
                            },1000);
                        }
                       
                        
                    }
                   
                        const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId('yes')
                                .setLabel('Yes')
                                .setStyle('SUCCESS'),
                            new Discord.MessageButton()
                                .setCustomId('no')
                                .setLabel('No')
                                .setStyle('DANGER')
                            
                        );
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Challenge from ${message.author.username}`);
                        embed.setDescription(`${target}, ${message.author} has challenged you for a typing race. Press yes to accept the challenge`);
                        embed.setColor(`#F1003B`);
                        const m =  await  message.channel.send({embeds:[embed],components:[row]});
                        const ifilter = (interaction)=> interaction.user.id === target.id;
                        const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                        collector.on('collect', async i => {
                            console.log(i)
                            if (i.customId === 'yes'){
                                await i.update({ components:[]});
                                run_race(i.user.id);
                            }else if(i.customId==='no'){
                                await i.update({components: [] });
                                message.channel.send(`${message.author}, ${target} said no!`)
                            }
                        });
    
                        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                    
                   
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, Please mention a valid user!`);
                message.channel.send({embeds:[embed]});
            }
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}, You forgot to mention a user!`);
            message.channel.send({embeds:[embed]});
        }
    }
}