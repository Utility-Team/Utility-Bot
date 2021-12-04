const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'work',
    async execute(message,args){
     let userData = await userModel.findOne({userID:message.author.id});
     if(userData){
        let job = userData.job;
       
        let userinfo = await userModel.findOne({userID:message.author.id});
        if(userinfo){
       if(userinfo.xp / 1500 === 0){
         const response = await userModel.findOneAndUpdate({
             userID:message.author.id,
           },
           {
             xp:userinfo.xp + 15,
             level:userinfo.level + 1,
             commands:userinfo.commands + 1
 
            }
           
           );
       }else{
        const response = await userModel.findOneAndUpdate({
            userID:message.author.id,
          },
          {
            xp:userinfo.xp + 15,
            commands:userinfo.commands + 1

           }
          
          );
       }
     }
        if(args[0]){
          if(!job || job===''){
            var d = new Date();
            var n = d.getTime();
            let lastresign = userData.lastresign
            if(n - userData.lastresign >= 3600000){
              let workname = args.join(' ');
              console.log(workname);
              let jobname = workname.toLowerCase();
              if(jobname === 'discord moderator'){
                  const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'discord moderator',
                            salary:10000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Discord Moderator. Your salary is 10,000 per hour
                  `);
              }else if(jobname === 'house wife'){
                if(userData.totalwork >= 50){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'house wife',
                            salary:22000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a House Wife. Your salary is 22,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'doctor'){
                if(userData.totalwork >= 40){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'doctor',
                            salary:20000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Doctor. Your salary is 20,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'politician'){
                
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'politican',
                            salary:15000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Politician. Your salary is 15,000 per hour
                  `);

              }else if(jobname === 'teacher'){
                if(userData.totalhour >= 50){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'teacher',
                            salary:12000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Teacher. Your salary is 12,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'police officer'){
                if(userData.totalwork >= 10){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'police officer',
                            salary:12000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Police Officer. Your salary is 12,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'twitch streamer'){
                if(userData.totalwork >= 15){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'twitch streamer',
                            salary:15000
            
                          }
                          
                          );
                  message.channel.send(`${message.author.username}, Congratulations You are appointed as a Twitch Streamer. Your salary is 15,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'footballer'){
                
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'footballer',
                            salary:14000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Footballer. Your salary is 14,000 per hour
                  `);
              }else if(jobname === 'painter'){
                if(userData.totalwork >= 15){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'painter',
                            salary:16000
            
                          }
                          
                          );
                  message.channel.send(`${message.author.username}, Congratulations You are appointed as a Painter. Your salary is 16,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'comedian'){
                if(userData.totalwork >= 20){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'comedian',
                            salary:18000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Comedian. Your salary is 18,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'memer'){
                if(userData.totalwork >= 25){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'memer',
                            salary:20000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Memer. Your salary is 20,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'instagram influencer'){
                if(userData.totalwork >= 12){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'instagram influencer',
                            salary:15000
                          }
                          
                          );
                  message.channel.send(`${message.author.username}, Congratulations You are appointed as a Instagram Influencer. Your salary is 15,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }   
              }else if(jobname === 'graphics designer'){
                  if(userData.totalwork >= 25){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'graphics  designer',
                            salary:22000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Graphics Designer. Your salary is 22,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }

              }else if(jobname === 'sharemarket expert'){
                if(userData.totalwork >= 30){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'sharemarket expert',
                            salary:25000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a ShareMarket Expert. Your salary is 25,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'youtuber'){
                if(userData.totalwork >= 22){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'youtuber',
                            salary:18000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Youtuber. Your salary is 18,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'bot developer'){
                if(userData.totalwork >= 40){
                    const response = await userModel.findOneAndUpdate({
                            userID:message.author.id,
                          },
                          {
                            job:'bot developer',
                            salary:27000
            
                          }
                          
                          );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Bot Developer. Your salary is 27,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`${message.author.username}, this isn't a job available in the game`);
                  message.channel.send({embeds:[embed]});
              }
            }else{
              let next_work = n -  lastresign;
              var msec = next_work;
              var hh = Math.floor(msec / 1000 / 60 / 60);
              msec -= hh * 1000 * 60 * 60;
              var mm = Math.floor(msec / 1000 / 60);
              msec -= mm * 1000 * 60;
              var ss = Math.floor(msec / 1000);
              msec -= ss * 1000;
              var time = 60 - mm;
              const embed = new Discord.MessageEmbed();
              embed.setTitle(`Wait bro!`);
              embed.setDescription(`${message.author}, You are in a cooldown. You can't join another job for ${time}mins `);
              embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
              embed.setTimestamp();
              message.channel.send({embeds:[embed]});
            }
          }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}, You already have job use ;resign to quit that job`);
            message.channel.send({embeds:[embed]});
        }
        }else{
         let job = userData.job;
         if(job !== ''){
            if(userData.wallet < 1000000000 && userData.wallet + userData.salary <= 1000000000){
                  let lastworked = userData.dailywork;
                  let salary = userData.salary;
                  let totalwork = userData.totalwork;
                  const  update  = async ()=>{
                    let userData2 = await userModel.findOne({userID:message.author.id});
                    var d2 = new Date();
                    var n2 = d2.getTime();
                    let wallet  = userData2.wallet + userData2.salary;
                    let networth = userData2.networth + userData2.salary;
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      dailywork:n2,
                      wallet:wallet,
                      networth:networth,
                      $inc:{
                        totalwork:1
                      }

                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, You worked and earned ${userData2.salary}!`);
                    message.channel.send({embeds:[embed]});
                  }
                  const lost = async ()=>{
                    let userData2 = await userModel.findOne({userID:message.author.id});
                    var d2 =new Date();
                    var n2 = d2.getTime();
                    let wallet  = userData2.wallet;
                    let networth = userData2.networth;
                    let halfsalary = userData.salary/2;
                    let salary2 = Number((halfsalary).toFixed(2));
                    let newwallet = wallet + salary2;
                    let newnetworth = networth + salary2;
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      dailywork:n2,
                      wallet:newwallet, 
                      networth:newnetworth,
                      $inc:{
                        totalwork:1
                      }
                    });
                    const embed = new Discord.MessageEmbed();
                    embed.setAuthor(`${message.author.username}, You failed it!`);
                    embed.setDescription(`You got ${salary2} cuz you failed to complete the work. Work again after 1hr`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setColor('#ED4245');
                    message.channel.send({embeds:[embed]});            
                  }
                  var d = new Date();
                  var n = d.getTime();
                  if(n - lastworked >= 3600000){
                    if(userData.totalwork % 15 === 0){
                      let new_salary = 1500;
                      message.channel.send(`${message.author}, Congratulations! Your salary has been increased to <:UC:878195863413981214> ${new_salary}`);
                      const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        salary:new_salary
                      }
                      })
                    }
                    const words = ['i love to work','never ever give up',"let's goo",'i love to cosplay','stay hungry! stay foolish!','a long time ago , a galaxy far far away','eat, sleep, code & repeat'];
                    let choosen_work = words[Math.floor(Math.random() * words.length)];
                    message.channel.send(`${message.author}, Rewrite this phrase : **${choosen_work}**. You have 15 seconds!`);
                    const filter = m=> m.author.id === message.author.id;
                    const collector = message.channel.createMessageCollector({filter,time:1000 * 15,max:1});
                    collector.on('collect',(m)=>{  
                      console.log(m);
                      let content = m.content;
                      let content_lowercase = content.toLowerCase();
                      if(content_lowercase === choosen_work){
                        update();
                      }else{
                        lost();
                        
                      }
                    });

                    collector.on('end',collected=>{
                      console.log(`Collected ${collected.size}`);
                      if(collected.size === 0){
                        lost();
                      }
                    });
                }else{
                  let next_work = n - lastworked ;
                  var msec = next_work;
                  var hh = Math.floor(msec / 1000 / 60 / 60);
                  msec -= hh * 1000 * 60 * 60;
                  var mm = Math.floor(msec / 1000 / 60);
                  msec -= mm * 1000 * 60;
                  var ss = Math.floor(msec / 1000);
                  msec -= ss * 1000;
                  var time = 60 - mm;
          
                  message.channel.send(`${message.author}, You are in cooldown work again after ${time}mins `);
                }
            }else{
              const embed = new Discord.MessageEmbed();
              embed.setTitle(`❌ Work Failed`);
              embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
              message.channel.send({embeds:[embed]});
            }
          }else{
            message.channel.send(`${message.author}, You don't have a job!. Use ;jobslist to see the available jobs`);

          }
        
        }
       
     }else{
      message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
     }
    }
}