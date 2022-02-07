const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'work',
    aliases:['work','job'],
    async execute(message,args){
     let userData = await userModel.findOne({userID:message.author.id});
     let serverData = await serverModel.findOne({guildID:message.guild.id});
     if(userData){
        let job = userData.job;
        let userinfo = await userModel.findOne({userID:message.author.id});
            if(userinfo){
              if(userinfo.xp / 1500 === 0){
                const response = await userModel.findOneAndUpdate({
                    userID:message.author.id,
                  },
                  {
                    $inc:{
                      xp:1,
                      level:1,
                      commands:1
                    },
                  }
                );
              }else{
                const response = await userModel.findOneAndUpdate({
                    userID:message.author.id,
                  },
                  {
                    $inc:{
                      xp:15,
                      commands:1
                    }
                  }
                );
              }
            }
            let avatar;
            if(userData.avatar !== '' && userData.premium === 'enable'){
              avatar = userData.avatar;
            }else{
              avatar = message.author.displayAvatarURL();
            }
        if(args[0]){
          if(!job || job ===''){
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
              }else if(jobname === 'santa claus'){
                if(userData.totalwork >= 45){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'santa claus',
                          salary:25000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Santa Claus. Your salary is 25,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'spider man' || jobname === 'spiderman'){
                if(userData.totalwork >= 10){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'spider man',
                          salary:15000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Spider Man. Your salary is 15,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'captain america'){
                if(userData.totalwork >= 25){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'captain america',
                          salary:22000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Captain America. Your salary is 22,000 per hour
                  `);
                }else{
                    message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'iron man'){
                if(userData.totalwork >= 25){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'iron man',
                          salary:22000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Iron Man. Your salary is 22,000 per hour
                  `);
                }else{
                  message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'black widow'){
                if(userData.totalwork >= 10){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'black widow',
                          salary:15000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Black Widow. Your salary is 15,000 per hour
                  `);
                }else{
                  message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'ladybug'){
                if(userData.totalwork >= 15){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'ladybug',
                          salary:18000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Ladybug. Your salary is 18,000 per hour
                  `);
                }else{
                  message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'cat noir'){
                if(userData.totalwork >= 15){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'cat noir',
                          salary:18000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Cat Noir. Your salary is 18,000 per hour
                  `);
                }else{
                  message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'jedi'){
                if(userData.totalwork >= 20){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'jedi',
                          salary:20000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Jedi. Your salary is 20,000 per hour
                  `);
                }else{
                  message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'sith'){
                if(userData.totalwork >= 10){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'sith',
                          salary:15000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Sith. Your salary is 15,000 per hour
                  `);
                }else{
                  message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'harry potter'){
                if(userData.totalwork >= 20){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'harry potter',
                          salary:20000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Harry Potter. Your salary is 20,000 per hour
                  `);
                }else{
                  message.channel.send(`${message.author.username}, You don't have enough experience for this job!`);
                }
              }else if(jobname === 'bounty hunter'){
                if(userData.totalwork >= 20){
                  const response = await userModel.findOneAndUpdate({
                          userID:message.author.id,
                        },
                        {
                          job:'bounty hunter',
                          salary:20000
          
                        }
                        
                        );
                  message.channel.send(`${message.author}, Congratulations You are appointed as a Bounty Hunter. Your salary is 20,000 per hour
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
              embed.setFooter(`Requested by ${message.author.username}`,avatar);
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
            if(userData.wallet < 5000000000 && userData.wallet + userData.salary <= 5000000000){
                  let workkind = Math.floor(Math.random() * 2);
                  console.log(workkind)
                  let worktype;
                  if(workkind === 0){
                    worktype = 'text';
                  }else{
                    if(job === 'spider man' || job === 'captain america' || job === 'iron man' || job === 'black widow' || job === 'ladybug' || job === 'cat noir' || job === 'bounty hunter' || job === 'jedi' || job === 'sith' || job === 'harry potter'){
                      worktype = 'play';
                    }else{
                      worktype = 'text';
                    }
                  }
                  console.log(worktype);
                  console.log(job);
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
                    embed.setTitle(`${message.author.username}, Great Work!`);
                    embed.setDescription(`You have successfully worked and earned <:uc:922720730272137256> ${salary}`);
                    embed.setColor(`#30CC71`);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
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
                    embed.setDescription(`You got <:uc:922720730272137256> ${salary2} cuz you failed to complete the work. Work again after 1hr`);
                    embed.setFooter(`Requested by ${message.author.username}`,avatar);
                    embed.setTimestamp();
                    embed.setColor('#ED4245');
                    message.channel.send({embeds:[embed]});            
                  }
                  var d = new Date();
                  var n = d.getTime();
                  if(n - lastworked >= 3600000){
                    if(userData.totalwork % 15 === 0){
                      let new_salary = 1500;
                      message.channel.send(`${message.author}, Congratulations! Your salary has been increased by <:uc:922720730272137256> ${new_salary}`);
                      const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        salary:new_salary
                      }
                      });
                    }
                    if(worktype === 'text'){
                        let words;
                        if(job === 'discord moderator'){
                        words = ['i love to mod','i have muted him',"stop spamming",'slowmode has been set to 5 seconds','check the audit logs!','stop acting like a mod','i am the mod'];
                        }else if(job === 'house wife'){
                          words = ['i love to work','the job of house wife is to takecare of house and family','dinner will be ready in few mins!','everyone come to the dinning table!'];
                        }else if(job === 'doctor'){
                          words = ['i love to help patients','i love to cure people','we must wear mask while going out','nurse can you help me with this?'];
                        }else if(job === 'politician'){
                          words = ['vote for me!','i will change your place','i am different from other politicians','i focus on doing best for my people'];
                        }else if(job === 'teacher'){
                          words = ['i love to help my students','teacher is the hero of a student','teaching is a pillar of the society','teaching is the creator of other professions'];
                        }else if(job === 'police officer'){
                          words = ['protecting innocents is my job',"let's find that robber",'we have arrested the robber','police is here'];
                        }else if(job === 'twitch streamer'){
                          words= ['twitch is my favorite platform','time to stream!','we got 50k views!','i love to stream','eat sleep stream repeat'];
                        }else if(job === 'footballer'){
                          words = ['i want to be the best footballer','football is my passion','all day i play football','practice makes the man perfect',"it's football not soccer"];
                        }else if(job === 'painter'){
                          words = ['paiting gives colors to my life','i love to paint','Mona Lisa is a beautiful painting','every canvas is a journey all its own'];
                        }else if(job === 'youtuber'){
                          words = ['i am a youtuber!','youtube is my favorite platform',"time to record my vlog",'subscribe or bad luck for 10 years','like it and share it','please type your comment below'];
                        }else if(job === 'comedian'){
                          words = ['this is a joke','this is funny','here is a joke','laughter is the best exercise','are you comedy me?'];
                        }else if(job === 'memer'){
                          words = ['posting memes is my job','this meme is great','i make memes','this is a meme'];
                        }else if(job === 'instagram influencer'){
                          words = ['instagram is my favorite platform','time to upload my reel','time to upload a story','time to post a photo','caption: #followforfollow','caption: #Likesforlikes'];
                        }else if(job === 'graphics designer'){
                          words = ['graphics designing is an art','my art is digital','i love to design','i will design it'];
                        }else if(job === 'sharemarket expert'){
                          words = ['sharemarket is up','i have purchased those shares','i got a profit of 50k in shares','i got a loss of 5k in shares'];                    
                        }else if(job === 'bot developer'){
                        words = ['i love to code','never ever give up',"checkout my new bot",'bugs teach me something','stay hungry! stay foolish!','bug#4008 fixed','eat sleep code repeat'];
                        }else if(job === 'santa claus'){
                          words = ['santa is here','merry christmas!','here are your gifts!',"be someone's santa and give fanta"];
                        }else if(job === 'spider man'){
                          words = ['spidey is here!','just your friendly neighborhood spider man','with great power comes great responsibility','i miss tony a lot','now everyone knows that i am spiderman'];
                        }else if(job === 'captain america'){
                          words = ['Avengers Assemble','i can do this all day',"let's do this together",'whatever it takes','i trust you tony'];
                        }else if(job === 'iron man'){
                          words = ['Jarvis get me my suit','I am Iron Man','cap do you trust me?','i love you 3000','whatever it takes'];
                        }else if(job === 'black widow'){
                          words = ['i am black widow',"You Made A Scene, Didn't You?","I'm Always Picking Up After You Boys",'You Get To Make Your Own Choices Now','whatever it takes','She’s Not Alone'];
                        }else if(job === 'ladybug'){
                          words = ['i am ladybug','miraculous ladybug!','lucky charm!','Tikki, spots on','Pound it','Bug out!'];
                        }else if(job === 'cat noir'){
                          words = ['i am cat noir','cataclysm','hello my lady!','i love the girl behind that mask'];
                        }else if(job === 'bounty hunter'){
                          words = ['i am bounty hunter',"He's No Good To Me Dead","I'll Kill You Just For The Pleasure!","You're Worth Enough Dead","Weapons are part of my religion"];
                        }else if(job === 'harry potter'){
                          words = ['wingardium leviosa'];
                        }else if(job === 'jedi'){
                          words = ['may the force be with you!','Your Focus Determines Your Reality','Confronting Fear Is The Destiny Of The Jedi','I Am One With The Force; The Force Is With Me'];
                        }else if(job === 'sith'){
                          words = ['True power comes from anger and agression','join the dark side','Darkness is a friend, an ally','I am a man of my word, Viceroy']
                        }
                    
                        let choosen_work = words[Math.floor(Math.random() * words.length)];
                        message.channel.send(`${message.author}, Repeat this phrase : **${choosen_work}** You have 22 seconds!`);
                        const filter = m=> m.author.id === message.author.id;
                        const collector = message.channel.createMessageCollector({filter,time:1000 * 22,max:1});
                        collector.on('collect',(m)=>{  
                          console.log(m);
                          let content = m.content;
                          let content_lowercase = content.toLowerCase();
                          let choosen_work_lowercase = choosen_work.toLowerCase();
                          if(content_lowercase === choosen_work_lowercase){
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
                        let gameState;
                        gameState = 'play'
                        let userhealth = 100;
                        let villainhealth = 100;
                        let randomattack = async (villain,i,jobname,userchoice)=>{
                          if(userchoice === 'punch'  && gameState === 'defense'){
                            userhealth = userhealth - 10;
                            let embed4 = new Discord.MessageEmbed();
                            embed4.setTitle(`You didn't defend and got hit!`);
                            embed4.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                            {name:`${villain}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`},
                            );
                            embed4.setDescription('select one from given moves');
                            embed4.setFooter(`Requested by ${message.author.username}`,avatar);
                            embed4.setTimestamp();
                            await i.update({embeds:[embed4]});
                            gameState = 'attack';
                          
                            }else{
                                let chance = Math.floor(Math.random()*1);
                                if(chance === 0){
                                  console.log(gameState);
                                  let attackembed = new Discord.MessageEmbed();
                                  attackembed.setTitle(`${villain} has attacked you! Quickly Defend`);
                                  attackembed.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                                  {name:`${villain}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                                  attackembed.setDescription('**select one from given moves**');
                                  attackembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                  attackembed.setTimestamp();
                                  gameState = 'defense';
        
                                  await i.update({embeds:[attackembed]});
                                }
                          }
                        }
                        let decide = async (userchoice,i,villainname,jobname)=>{  
                          if(userchoice === 'punch'){
                            if(gameState === 'attack'){
                              let chance = Math.floor(Math.random()*4);
                              if(chance === 0){
                                villainhealth = villainhealth - 10;
                                let embed5 = new Discord.MessageEmbed();
                                embed5.setAuthor(`Great punch!`);
                                embed5.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                                {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                                embed5.setDescription('select one from given moves');
                                embed5.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed5.setTimestamp();
                                if(villainhealth === 0 || userhealth === 0){
                                  await i.update({embeds:[embed5],components:[]});
                                }else{
                                   i.update({embeds:[embed5]});
                                }
                              }else if(chance === 1){
                                let embed1 = new Discord.MessageEmbed();
                                embed1.setAuthor(`${villainname} defended your punch`);
                                embed1.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                                {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                                embed1.setDescription('select one from given moves');
                                embed1.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed1.setTimestamp();
                                if(villainhealth === 0 || userhealth === 0){
                                 await i.update({embeds:[embed1],components:[]});
                                }else{
                                  await i.update({embeds:[embed1]});
                                }
                                
                              }else if(chance === 2){
                                userhealth = userhealth - 10;
                                let embed2 = new Discord.MessageEmbed();
                                embed2.setAuthor(`${villainname} defended your punch and punched you!`);
                                embed2.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                                {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                                embed2.setDescription('select one from given moves');
                                embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed2.setTimestamp();
                                embed2.setColor('#ED4245');
                                if(villainhealth ===0 || userhealth === 0){
                                  i.update({embeds:[embed2],components:[]});
                                }else{
                                  i.update({embeds:[embed2]});
                                }
                              }else if(chance === 3){
                                randomattack(villainname,i,jobname,'punch');
                              }
                            }
                          }
                          
                          if(userchoice === 'defend'){
                            if(gameState === 'attack'){
                              let embed3 = new Discord.MessageEmbed();
                              embed3.setTitle(`You can't defend right now! you need to attack`);
                              embed3.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                              {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                              embed3.setDescription('**select one from given moves**');
                              embed3.setFooter(`Requested by ${message.author.username}`,avatar);
                              embed3.setTimestamp();
                              await i.update({embeds:[embed3]});
                            }else{
                              let embed3 = new Discord.MessageEmbed();
                              embed3.setTitle(`Great Safe!`);
                              embed3.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                              {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                              embed3.setDescription('**select one from given moves**');
                              embed3.setFooter(`Requested by ${message.author.username}`,avatar);
                              embed3.setTimestamp();
                              i.update({embeds:[embed3]});
                              gameState = 'attack';
                            }
                          }                  
                          
                          if(userchoice === 'kick'){
                            if(gameState=== 'attack'){
                              let chance = Math.floor(Math.random()*4);
                              if(chance === 0){
                                villainhealth = villainhealth - 10;
                                let embed5 = new Discord.MessageEmbed();
                                embed5.setAuthor(`Great kick!`);
                                embed5.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                                {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                                embed5.setDescription('select one from given moves');
                                embed5.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed5.setTimestamp();
                                if(villainhealth === 0 || userhealth === 0){
                                  await i.update({embeds:[embed5],components:[]});
                                }else{
                                  await i.update({embeds:[embed5]});
                                }
                              }else if(chance === 1){
                                let embed1 = new Discord.MessageEmbed();
                                embed1.setAuthor(`${villainname} defended your kick`);
                                embed1.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                                {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                                embed1.setDescription('select one from given moves');
                                embed1.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed1.setTimestamp();
                                if(villainhealth === 0 || userhealth === 0){
                                 await i.update({embeds:[embed1],components:[]});
                                }else{
                                  await i.update({embeds:[embed1]});
                                }
                                
                              }else if(chance === 2){
                                userhealth = userhealth - 10;
                                let embed2 = new Discord.MessageEmbed();
                                embed2.setAuthor(`${villainname} defended your kick and kicked you!`);
                                embed2.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                                {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                                embed2.setDescription('select one from given moves');
                                embed2.setFooter(`Requested by ${message.author.username}`,avatar);
                                embed2.setTimestamp();
                                embed2.setColor('#ED4245');
                                if(villainhealth ===0 || userhealth === 0){
                                  i.update({embeds:[embed2],components:[]});
                                }else{
                                  i.update({embeds:[embed2]});
                                }
                              }else if(chance === 3){
                                randomattack(villainname,i,jobname,'kick');
                              }
                            }
                            }
                          
                        }
                        let startgame = async (villainname,jobname,specialmove)=>{
                          let embed = new Discord.MessageEmbed();
                          embed.setAuthor(`${jobname} vs ${villainname}`);
                          embed.addFields({name:`${jobname}'s Health:`,value:'<:healthbar:920163166531510333> 100%'},
                          {name:`${villainname} Health:`,value:`<:healthbar:920163166531510333> 100%`});
                          embed.setDescription('select one from given moves');
                          embed.setFooter(`Requested by ${message.author.username}`,avatar);
                          embed.setTimestamp();
                          let specialmovebutton;
                          let punchbutton;
                          let row = new Discord.MessageActionRow()
                          .addComponents(
                            punchbutton =  new Discord.MessageButton()
                                  .setCustomId('punch')
                                  .setLabel('Punch')
                                  .setEmoji('<:punching:935034690925105213>')
                                  .setStyle('PRIMARY'),
                              new Discord.MessageButton()
                                  .setCustomId('kick')
                                  .setLabel('Kick')
                                  .setEmoji('<:kicks:935034582389104640>')
                                  .setStyle('PRIMARY'),
                              new Discord.MessageButton()
                                  .setCustomId('defend')
                                  .setLabel('Defend')
                                  .setStyle('PRIMARY'),
                              
                          );
                          if(specialmove){
                            row.addComponents(specialmovebutton
                               = new Discord.MessageButton()
                              .setCustomId('specialmove')
                              .setLabel(`${specialmove}`)
                              .setStyle('SUCCESS')
                            )
                          }
                          const m = await message.channel.send({embeds:[embed],components:[row]});
                          const ifilter = i => i.user.id === message.author.id;
                          const collector = m.createMessageComponentCollector({ filter:ifilter, time: 600000 });
                          let movecount = 0;
                          collector.on('collect', async i => {
                            console.log(movecount);
                              
                              if (i.customId === 'punch') {
                                  movecount = movecount + 1;
                                  if(gameState === 'attack'){
                                    decide('punch',i,villainname,jobname);
                                  
                                    if(villainhealth === 0){
                                        update();
                                      //  await i.update({components:[]});
                                        
                                    }
                                    if(userhealth === 0){
                                      lost();
                                     // await i.update({components:[]});
                                        
                                    }
                              
                                  }else{
                                    randomattack(villainname,i,jobname,'punch');
                                  }
                              }
                              if (i.customId === 'kick') {
                                movecount = movecount + 1;
                                if(gameState === 'attack'){
                                  decide('kick',i,villainname,jobname);
                                
                                  if(villainhealth === 0){
                                      update();
                                    //  await i.update({components:[]});
                                      
                                  }
                                  if(userhealth === 0){
                                    lost();
                                   // await i.update({components:[]});
                                      
                                  }
                            
                                }else{
                                  randomattack(villainname,i,jobname,'punch');
                                }
                            }
                              if(movecount >= 15){
                                console.log(
                                  'your code is not working'
                                );
                                console.log(specialmovebutton);
                              
                              
                  
                              }

                              if(i.customId === 'specialmove'){
                                if(movecount >= 15){
                                  if(villainhealth === 10){
                                    villainhealth = villainhealth -10;
                                  }else{
                                    villainhealth = villainhealth - 20;
                                  }
                                  movecount = 0;
                                  let specialembed = new Discord.MessageEmbed();
                                  specialembed.setAuthor(`${jobname} used special move`);
                                  specialembed.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                                  {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                                  specialembed.setDescription('select one from given moves');
                                  specialembed.setFooter(`Requested by ${message.author.username}`,avatar);
                                  specialembed.setTimestamp();
                                  specialembed.setColor(`#30CC71`);
                                  gameState = 'attack';
                                  if(villainhealth === 0 || userhealth === 0){
                                    await i.update({embeds:[specialembed],components:[]});
                                  }else{
                                    await i.update({embeds:[specialembed]});
                                  }
                                  if(villainhealth === 0){
                                      update();
                                      
                                  }
                                  if(userhealth === 0){
                                    lost();
                                  }
                                }else{
                                  let nextmoves = 15-movecount;
                                  let embed = new Discord.MessageEmbed();
                                  embed.setAuthor(`you can use ${specialmovebutton.label} after ${nextmoves} moves`);
                                  embed.addFields({name:`${jobname}'s Health:`,value:`<:healthbar:920163166531510333> ${userhealth}%`},
                                  {name:`${villainname}'s Health:`,value:`<:healthbar:920163166531510333> ${villainhealth}%`});
                                  embed.setDescription('select one from given moves');
                                  embed.setFooter(`Requested by ${message.author.username}`,avatar);
                                  embed.setTimestamp();
                                  await i.update({embeds:[embed]});
                                }
                               
                              }
                              if(i.customId === 'defend'){
                                movecount= movecount + 1;
                                decide('defend',i,villainname,jobname);
                              }
                          });
                    
                          collector.on('end', collected => {
                            console.log(`Collected ${collected.size} items`);
                          });
                          }
                          if(job === 'black widow'){
                            let villain =  Math.floor(Math.random() * 3);
                            if(villain === 0){
                              startgame('Task Master','Black Widow','special move');
                            }else if(villain === 1){
                              startgame('Galactus','Black Widow','special move');
                            }else if(villain === 2){
                              startgame('Dr. Doom','Black Widow','special move');
                            }
                          }else if(job === 'spider man'){
                            let villain =  Math.floor(Math.random() * 6);
                            if(villain === 1){
                              startgame('The Green Goblin','Spider Man','electric web');
                            }else if(villain === 1){
                              startgame('Doctor Octopus','Spider Man','electric web');
                            }else if(villain === 2){
                              startgame('Sand Man','Spider Man','electric web');
                            }else if(villain === 3){
                              startgame('Lizard','Spider Man','electric web');
                            }else if(villain === 4){
                              startgame('Electro','Spider Man','electric web');
                            }else if(villain === 5){
                              startgame('Thanos','Spider Man','electric web')
                            }
                          }else if(job === 'iron man'){
                            let villain =  Math.floor(Math.random() * 6);
                            if(villain === 1){
                              startgame('Thanos','Iron Man','unibeam');
                            }else if(villain === 1){
                              startgame('Dr. Doom','Iron Man','unibeam');
                            }else if(villain === 2){
                              startgame('Ultron','Iron Man','unibeam');
                            }else if(villain === 3){
                              startgame('Justin Hammer','Iron Man','unibeam');
                            }else if(villain === 4){
                              startgame('Galactus','Iron Man','unibeam');
                            }else if(villain === 5){
                              startgame('Red Skull','Iron Man','unibeam');
                            }
                          }else if(job === 'captain america'){
                            let villain =  Math.floor(Math.random() * 6);
                            if(villain === 1){
                              startgame('Dr. Doom','Captain America','shield strike');
                            }else if(villain === 1){
                              startgame('Baron Zemo','Captain America','shield strike');
                            }else if(villain === 2){
                              startgame('Red Skull','Captain America','shield strike');
                            }else if(villain === 3){
                              startgame('Galactus','Captain America','shield strike');
                            }else if(villain === 4){
                              startgame('Thanos','Captain America','shield strike');
                            }else if(villain === 5){
                              startgame('Ultron','Captain America','shield strike');
                            }
                          }else if(job === 'ladybug'){  
                            let villain =  Math.floor(Math.random() * 6);
                            if(villain === 1){
                              startgame('Shadow Moth','Ladybug','lucky charm');
                            }else if(villain === 1){
                              startgame('Stormy Weather','Ladybug','lucky charm');
                            }else if(villain === 2){
                              startgame('Lady Wifi','Ladybug','lucky charm');
                            }else if(villain === 3){
                              startgame('Princess Fragrance','Ladybug','lucky charm');
                            }else if(villain === 4){
                              startgame('Mr. Pigeon','Ladybug','lucky charm');
                            }else if(villain === 5){
                              startgame('The Bubbler','Ladybug','lucky charm');
                            }
                          }else if(job === 'cat noir'){ 
                            let villain =  Math.floor(Math.random() * 6);
                            if(villain === 1){
                              startgame('Shadow Moth','Cat Noir','cataclysm');
                            }else if(villain === 1){
                              startgame('Stormy Weather','Cat Noir','cataclysm');
                            }else if(villain === 2){
                              startgame('Lady Wifi','Cat Noir','cataclysm');
                            }else if(villain === 3){
                              startgame('Princess Fragrance','Cat Noir','cataclysm');
                            }else if(villain === 4){
                              startgame('Mr. Pigeon','Cat Noir','cataclysm');
                            }else if(villain === 5){
                              startgame('The Bubbler','Cat Noir','cataclysm');
                            }
                          }else if(job === 'bounty hunter'){
                            let villain =  Math.floor(Math.random() * 5);
                            if(villain === 1){
                              startgame('Moff Gideon','Bounty Hunter','the child');
                            }else if(villain === 1){
                              startgame('Boba Fett','Bounty Hunter','the child');
                            }else if(villain === 2){
                              startgame('Captain Phasma','Bounty Hunter','the child');
                            }else if(villain === 3){
                              startgame('Cad Bane','Bounty Hunter','the child');
                            }else if(villain === 4){
                              startgame('Bo-Katan','Bounty Hunter','the child');
                            }
                          }else if(job === 'jedi'){
                            let villain =  Math.floor(Math.random() * 7);
                            if(villain === 1){
                              startgame('Darth Maul','Jedi','use force');
                            }else if(villain === 1){
                              startgame('Count Dooku','Jedi','use force');
                            }else if(villain === 2){
                              startgame('Savage Opress','Jedi','use force');
                            }else if(villain === 3){
                              startgame('Darth Sidious','Jedi','use force');
                            }else if(villain === 4){
                              startgame('Grand Inquisitor','Jedi','use force');
                            }else if(villain === 5){
                              startgame('Darth Vader','Jedi','use force');
                            }else if(villain === 6){
                              startgame('Kylo Ren','Jedi','use force');
                            }
                          }else if(job === 'sith'){
                            let villain =  Math.floor(Math.random() * 7);
                            if(villain === 1){
                              startgame('Master Kenobi','Sith','Force Choke');
                            }else if(villain === 1){
                              startgame('Master Skywalker','Sith','Force Choke');
                            }else if(villain === 2){
                              startgame('Luke Skywalker','Sith','Force Choke');
                            }else if(villain === 3){
                              startgame('Master Windu','Sith','Force Choke');
                            }else if(villain === 4){
                              startgame('Master Yoda','Sith','Force Choke');
                            }else if(villain === 5){
                              startgame('Master Plo koon','Sith','Force Choke');
                            }else if(villain === 6){
                              startgame('Rey Skywalker','Sith','Force Choke');
                            }
                          }else if(job === 'harry potter'){
                            let villain =  Math.floor(Math.random() * 7);
                            if(villain === 1){
                              startgame('Fenrir Greyback','Harry Potter','use wand');
                            }else if(villain === 1){
                              startgame('Bellatrix Lestrange','Harry Potter','use wand');
                            }else if(villain === 2){
                              startgame('Lord Voldemort','Harry Potter','use wand');
                            }else if(villain === 3){
                              startgame('Lucius Malfoy','Harry Potter','use wand');
                            }
                          }
                      }
                          
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
            message.channel.send(`${message.author}, You don't have a job!. Use ${serverData.prefix}joblist to see the available jobs`);

          }
        
        }
       
     }else{
                  message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

     }
    }
}