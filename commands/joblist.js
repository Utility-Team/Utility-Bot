const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const profileModel = require('../models/profileSchema');
module.exports={
    name:`joblist`,
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await profileModel.findOne({guildID:message.guild.id});
        let prefix
        if(serverData){
        prefix = serverData.prefix;
        }
         if(userData){
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
        var totalhour = userData.totalwork;
        console.log(totalhour)   
        if(!args[0] || args[0] === '1'){
            if(totalhour < 40){
                const embed = new Discord.MessageEmbed();
                embed.setTitle('Jobs in the game - ');
                embed.addFields({name:'✅ Discord Moderator',value:`Salary - 10,000 per hour`},
                {name:'❌ House Wife',value:`You require 50 work hours to unlock it`},
                {name:`❌ Doctor`,value:`You require 40 work hours to unlock it `},
                {name:`✅ Politician`,value:`Salary - 15,000 per hour`}
                );
                embed.setDescription('1 of 4 pages')
                embed.setFooter(`type ${prefix}jobslist 2 for more jobs`);
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
              }else if(totalhour >= 40 && totalhour < 50){
              const embed = new Discord.MessageEmbed();
                embed.setTitle('Jobs in the game - ');
                embed.addFields({name:'✅ Discord Moderator',value:`Salary - 10,000 per hour`},
                {name:'❌ House Wife',value:`You require 50 work hours to unlock it`},
                {name:`✅ Doctor`,value:`Salary - 20,000 per hour`},
                {name:`✅ Politician`,value:`Salary - 15,000 per hour`}
                );
                embed.setDescription('1 of 4 pages')
                embed.setFooter(`type ${prefix}jobslist 2 for more jobs`);
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});
          }else if(totalhour>=50){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'✅ Discord Moderator',value:`
            Salary - 10,000 per hour
            `},
            {name:'✅ House Wife',value:`
            Salary - 22,000 per hour
            `},
            {name:`✅ Doctor`,value:`
            Salary - 20,000 per hour
            `},
            {name:`✅ Politician`,value:`
                Salary - 15,000 per hour
            `}
            );
            embed.setDescription('1 of 4 pages')
            embed.setFooter(`type ${prefix}jobslist 2 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
          }
        }else if(args[0] === '2'){
          if(totalhour < 10){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'✅ Teacher',value:` 
            Salary - 12,000 per hour
            `},
            {name:'❌ Police Officer',value:`You require 10 work hours to unlock it`},
            {name:`❌ Twitch Streamer`,value:`You require 15 work hours to unlock it `},
            {name:`✅ Footballer`,value:`
              Salary - 14,000 per hour
            `}
            );
            embed.setDescription('2 of 4 pages')
            embed.setFooter(`type ${prefix}jobslist 3 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
          }else if(totalhour >=10 && totalhour < 15){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'✅ Teacher',value:`
            Salary - 12,000 per hour
            `},
            {name:'✅ Police Officer',value:`
              Salary - 12,000 per hour
            `},
            {name:`❌ Twitch Streamer`,value:`You require 15 work hours to unlock it `},
            {name:`✅ Footballer`,value:`
              Salary - 14,000 per hour
            `}
            );
            embed.setDescription('2 of 4 pages')
            embed.setFooter(`type ${prefix}jobslist 3 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
          }else if(totalhour >=15){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'✅ Teacher',value:`
            Salary - 12,000 per hour
            `},
            {name:'✅ Police Officer',value:`
            Salary - 12,000 per hour`},
            {name:`✅ Twitch Streamer`,value:`
            Salary - 15,000 per hour
            `},
            {name:`✅ Footballer`,value:`
              Salary - 14,000 per hour
            `}
            );
            embed.setDescription('2 of 4 pages')
            embed.setFooter(`type ${prefix}jobslist 3 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
          }
        }else if(args[0] === '3'){
          if(totalhour<12){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'❌ Painter',value:`You require 15 work hours to unlock it
            `},
            {name:'❌ Comedian',value:`You require 20 work hours to unlock it`},
            {name:`❌ Memer`,value:`You require 25 work hours to unlock it `},
            {name:`❌ Instagram Influencer`,value:`You require 12 hours to unlock it
            `}
            );
            embed.setDescription('3 of 4 pages');
            embed.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
          }else if(totalhour === 12 & totalhour <15){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'❌ Painter',value:`You require 15 work hours to unlock it
            `},
            {name:'❌ Comedian',value:`You require 20 work hours to unlock it`},
            {name:`❌ Memer`,value:`You require 25 work hours to unlock it `},
            {name:`✅ Instagram Influencer`,value:`
            Salary - 15,000 per hour
            `}
            );
            embed.setDescription('3 of 4 pages');
            embed.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
          }else if(totalhour>=15 && totalhour<20){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'✅ Painter',value:`
            Salary - 16,000 per hour
            `},
            {name:'❌ Comedian',value:`You require 20 work hours to unlock it`},
            {name:`❌ Memer`,value:`You require 25 work hours to unlock it `},
            {name:`✅ Instagram Influencer`,value:`
            Salary - 15,000 per hour
            `}
            );
            embed.setDescription('3 of 4 pages');
            embed.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
          }else if(totalhour >=20 && totalhour<25){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'✅ Painter',value:`
            Salary - 16,000 per hour
            `},
            {name:'✅ Comedian',value:`
              Salary - 18,000 per hour
            `},
            {name:`❌ Memer`,value:`You require 25 work hours to unlock it `},
            {name:`✅ Instagram Influencer`,value:`
            Salary - 15,000 per hour
            `}
            );
            embed.setDescription('3 of 4 pages');
            embed.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]})
          }else if(totalhour>=25){
              const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'✅ Painter',value:`
            Salary - 16,000 per hour
            `},
            {name:'✅ Comedian',value:`
              Salary - 18,000 per hour
            `},
            {name:`✅ Memer`,value:`
              Salary - 20,000 per hour
            `},
            {name:`✅ Instagram Influencer`,value:`
            Salary - 15,000 per hour
            `}
            );
            embed.setDescription('3 of 4 pages')
            embed.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed.setTimestamp();
           message.channel.send({embeds:[embed]})
          }
        }else if(args[0] === '4'){
         if(totalhour < 22){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'❌ Graphics Designer',value:`You require 25 work hours to unlock it
            `},
            {name:'❌ ShareMarket Expert',value:`You require 30 work hours to unlock it`},
            {name:`❌ Youtuber`,value:`You require 22 work hours to unlock it `},
            {name:`❌ Bot Developer`,value:`You require 40 work hours to unlock it
            `}
            );
            embed.setDescription('4 of 4 pages')
            embed.setFooter(`type ${prefix}jobslist 1 for more jobs`);
            embed.setTimestamp();
           message.channel.send({embeds:[embed]})
        }else if(totalhour >=22 && totalhour <25 ){
          const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'❌ Graphics Designer',value:`You require 25 work hours to unlock it
            `},
            {name:'❌ ShareMarket Expert',value:`You require 30 work hours to unlock it`},
            {name:`✅ Youtuber`,value:`
              Salary - 18,000 per hour
              `},
            {name:`❌ Bot Developer`,value:`You require 40 work hours to unlock it
            `}
            );
            embed.setDescription('4 of 4 pages')
            embed.setFooter(`type ${prefix}jobslist 1 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]})
        }else if(totalhour >= 25 && totalhour <30){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'✅ Graphics Designer',value:`
            Salary - 22,000 per hour
            `},
            {name:'❌ ShareMarket Expert',value:`You require 30 work hours to unlock it`},
            {name:`✅ Youtuber`,value:`
              Salary - 18,000 per hour
              `},
            {name:`❌ Bot Developer`,value:`You require 40 work hours to unlock it
            `}
            );
            embed.setDescription('4 of 4 pages')
            embed.setFooter(`type ${prefix}jobslist 1 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]})
        }else if(totalhour >=30 && totalhour <40){
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Jobs in the game - ');
            embed.addFields({name:'✅ Graphics Designer',value:`
            Salary - 22,000 per hour
            `},
            {name:'✅ ShareMarket Expert',value:`
              Salary - 25,000 per hour
            `},
            {name:`✅ Youtuber`,value:`
              Salary - 18,000 per hour
              `},
            {name:`❌ Bot Developer`,value:`You require 40 work hours to unlock it
            `}
            );
            embed.setDescription('4 of 4 pages')
            embed.setFooter(`type ${prefix}jobslist 1 for more jobs`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]})
         }else if(totalhour>=40){
          const embed = new Discord.MessageEmbed();
          embed.setTitle('Jobs in the game - ');
          embed.addFields({name:'✅ Graphics Designer',value:`
            Salary - 22,000 per hour
            `},
            {name:'✅ ShareMarket Expert',value:`
              Salary - 25,000 per hour
            `},
            {name:`✅ Youtuber`,value:`
              Salary - 18,000 per hour
              `},
            {name:`✅ Bot Developer`,value:`
              Salary - 27,000 per hour
            `}
            );
          embed.setDescription('4 of 4 pages')
          embed.setFooter(`type ${prefix}jobslist 1 for more jobs`);
          embed.setTimestamp();
          message.channel.send({embeds:[embed]})
    
        }
        }
      }else{ 
        message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
        }
       
}
}
//  