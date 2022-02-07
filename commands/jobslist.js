const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const profileModel = require('../models/profileSchema');
module.exports={
    name:`jobslist`,
    aliases:['jobslist','joblist','workslist','worklist'],
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
            const embed = new Discord.MessageEmbed();
            if(totalhour < 40){
               
                embed.setTitle('Jobs in the game - ');
                embed.addFields({name:'✅ Discord Moderator',value:`Salary - 10,000 per hour`},
                {name:'❌ House Wife',value:`You require 50 work hours to unlock it`},
                {name:`❌ Doctor`,value:`You require 40 work hours to unlock it `},
                {name:`✅ Politician`,value:`Salary - 15,000 per hour`},
                {name:'✅ Teacher',value:`Salary - 12,000 per hour`}
                );
                embed.setDescription('1 of 5 pages');
                embed.setFooter(`type ${prefix}jobslist 2 for more jobs`);
                embed.setTimestamp();
                
                
              }else if(totalhour >= 40 && totalhour < 50){
                embed.setTitle('Jobs in the game - ');
                embed.addFields({name:'✅ Discord Moderator',value:`Salary - 10,000 per hour`},
                {name:'❌ House Wife',value:`You require 50 work hours to unlock it`},
                {name:`✅ Doctor`,value:`Salary - 20,000 per hour`},
                {name:`✅ Politician`,value:`Salary - 15,000 per hour`},
                {name:'✅ Teacher',value:`Salary - 12,000 per hour`}
                );
                embed.setDescription('1 of 5 pages');
                embed.setFooter(`type ${prefix}jobslist 2 for more jobs`);
                embed.setTimestamp();
                
          }else if(totalhour>=50){
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
            `},
            {name:'✅ Teacher',value:`Salary - 12,000 per hour`}
            );
            embed.setDescription('1 of 5 pages');
            embed.setFooter(`type ${prefix}jobslist 2 for more jobs`);
            embed.setTimestamp();
            
          }

          //for embed2
          const embed2 = new Discord.MessageEmbed();
          if(totalhour < 10){
           
            embed2.setTitle('Jobs in the game - ');
            embed2.addFields(
            {name:'❌ Police Officer',value:`You require 10 work hours to unlock it`},
            {name:`❌ Twitch Streamer`,value:`You require 15 work hours to unlock it `},
            {name:`✅ Footballer`,value:`
              Salary - 14,000 per hour
            `},
            {name:'❌ Painter',value:`You require 15 work hours to unlock it
            `},
            {name:`❌ Youtuber`,value:`You require 22 work hours to unlock it `},
            );
            embed2.setDescription('2 of 5 pages');
            embed2.setFooter(`type ${prefix}jobslist 3 for more jobs`);
            embed2.setTimestamp();
            
          }else if(totalhour >=10 && totalhour < 15){
            embed2.setTitle('Jobs in the game - ');
            embed2.addFields(
            {name:'✅ Police Officer',value:`
              Salary - 12,000 per hour
            `},
            {name:`❌ Twitch Streamer`,value:`You require 15 work hours to unlock it `},
            {name:`✅ Footballer`,value:`
              Salary - 14,000 per hour
            `},
            {name:'❌ Painter',value:`You require 15 work hours to unlock it
            `},
            {name:`❌ Youtuber`,value:`You require 22 work hours to unlock it `},
            );
            embed2.setDescription('2 of 5 pages');
            embed2.setFooter(`type ${prefix}jobslist 3 for more jobs`);
            embed2.setTimestamp();
            
          }else if(totalhour >=15 && totalhour<22){
            embed2.setTitle('Jobs in the game - ');
            embed2.addFields(
            {name:'✅ Police Officer',value:`
            Salary - 12,000 per hour`},
            {name:`✅ Twitch Streamer`,value:`
            Salary - 15,000 per hour
            `},
            {name:`✅ Footballer`,value:`
              Salary - 14,000 per hour
            `},
            {name:'✅ Painter',value:`
            Salary - 16,000 per hour
            `},
            {name:`❌ Youtuber`,value:`You require 22 work hours to unlock it `},
            );
            embed2.setDescription('2 of 5 pages');
            embed2.setFooter(`type ${prefix}jobslist 3 for more jobs`);
            embed2.setTimestamp();
           
          }else if(totalhour>= 22){
            embed2.setTitle('Jobs in the game - ');
            embed2.addFields(
            {name:'✅ Police Officer',value:`
            Salary - 12,000 per hour`},
            {name:`✅ Twitch Streamer`,value:`
            Salary - 15,000 per hour
            `},
            {name:`✅ Footballer`,value:`
              Salary - 14,000 per hour
            `},
            {name:'✅ Painter',value:`
            Salary - 16,000 per hour
            `},
            {name:`✅ Youtuber`,value:`
            Salary - 18,000 per hour
            `},
            );
            embed2.setDescription('2 of 5 pages');
            embed2.setFooter(`type ${prefix}jobslist 3 for more jobs`);
            embed2.setTimestamp();
          }

          //embed3
          const embed3 = new Discord.MessageEmbed();
          if(totalhour<12){
        
            embed3.setTitle('Jobs in the game - ');
            embed3.addFields(
            {name:'❌ Comedian',value:`You require 20 work hours to unlock it`},
            {name:`❌ Memer`,value:`You require 25 work hours to unlock it `},
            {name:`❌ Instagram Influencer`,value:`You require 12 hours to unlock it
            `},
            {name:'❌ Graphics Designer',value:`You require 25 work hours to unlock it
            `},
            {name:'❌ ShareMarket Expert',value:`You require 30 work hours to unlock it`},
            );
            embed3.setDescription('3 of 5 pages');;
            embed3.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed3.setTimestamp();
          
          }else if(totalhour === 12 & totalhour <15){
            embed3.setTitle('Jobs in the game - ');
            embed3.addFields(
            {name:'❌ Comedian',value:`You require 20 work hours to unlock it`},
            {name:`❌ Memer`,value:`You require 25 work hours to unlock it `},
            {name:`✅ Instagram Influencer`,value:`
            Salary - 15,000 per hour
            `},
            {name:'❌ Graphics Designer',value:`You require 25 work hours to unlock it
            `},
            {name:'❌ ShareMarket Expert',value:`You require 30 work hours to unlock it`},
            );
            embed3.setDescription('3 of 5 pages');;
            embed3.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed3.setTimestamp();
          }else if(totalhour>=15 && totalhour<20){
            embed3.setTitle('Jobs in the game - ');
            embed3.addFields(
            {name:'❌ Comedian',value:`You require 20 work hours to unlock it`},
            {name:`❌ Memer`,value:`You require 25 work hours to unlock it `},
            {name:`✅ Instagram Influencer`,value:`
            Salary - 15,000 per hour
            `},
            {name:'❌ Graphics Designer',value:`You require 25 work hours to unlock it
            `},
            {name:'❌ ShareMarket Expert',value:`You require 30 work hours to unlock it`},
            );
            embed3.setDescription('3 of 5 pages');;
            embed3.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed3.setTimestamp();
            
          }else if(totalhour >=20 && totalhour<25){
            embed3.setTitle('Jobs in the game - ');
            embed3.addFields(
            {name:'✅ Comedian',value:`
              Salary - 18,000 per hour
            `},
            {name:`❌ Memer`,value:`You require 25 work hours to unlock it `},
            {name:`✅ Instagram Influencer`,value:`
            Salary - 15,000 per hour
            `},
            {name:'❌ Graphics Designer',value:`You require 25 work hours to unlock it
            `},
            {name:'❌ ShareMarket Expert',value:`You require 30 work hours to unlock it`},
            );
            embed3.setDescription('3 of 5 pages');;
            embed3.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed3.setTimestamp();
          }else if(totalhour>=25 && totalhour<30){
            embed3.setTitle('Jobs in the game - ');
            embed3.addFields(
            {name:'✅ Comedian',value:`
              Salary - 18,000 per hour
            `},
            {name:`✅ Memer`,value:`
              Salary - 20,000 per hour
            `},
            {name:`✅ Instagam Influencer`,value:`
            Salary - 15,000 per hour
            `},
            {name:'✅ Graphics Designer',value:`
            Salary - 22,000 per hour
            `},
            {name:'❌ ShareMarket Expert',value:`You require 30 work hours to unlock it`},
            );
            embed3.setDescription('3 of 5 pages');
            embed3.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed3.setTimestamp();
          }else if(totalhour>=30){
            embed3.setTitle('Jobs in the game - ');
            embed3.addFields(
            {name:'✅ Comedian',value:`
              Salary - 18,000 per hour
            `},
            {name:`✅ Memer`,value:`
              Salary - 20,000 per hour
            `},
            {name:`✅ Instagram Influencer`,value:`
            Salary - 15,000 per hour
            `},
            {name:'✅ Graphics Designer',value:`
            Salary - 22,000 per hour
            `},
            {name:'✅ ShareMarket Expert',value:`
              Salary - 25,000 per hour
            `},
            );
            embed3.setDescription('3 of 5 pages');
            embed3.setFooter(`type ${prefix}jobslist 4 for more jobs`);
            embed3.setTimestamp();
          }


          //embed4
          const embed4 = new Discord.MessageEmbed();
          if(totalhour <10){
          
            embed4.setTitle('Jobs in the game - ');
            embed4.addFields( 
            {name:`❌ Bot Developer`,value:`You require 40 work hours to unlock it
            `},
            {name:`❌ Santa Claus`,value:`You require 45 work hours to unlock it
            `},
            {name:`❌ Spider Man`,value:`You require 10 hours of work to unlock this job!`},
            {name:`❌ Captain America`,value:`You require 25 hours of work to unlock this job!`},
            {name:`❌ Iron Man`,value:`You require 25 hours of work to unlock this job!`},
            {name:`❌ Black Widow`,value:`You require 10 hours to unlock this job!`}     
            );
            embed4.setDescription('4 of 5 pages');;
            embed4.setFooter(`type ${prefix}work job name to join that job`);
            embed4.setTimestamp();
        }else if(totalhour >10 && totalhour<22){   
          embed4.setTitle('Jobs in the game - ');
          embed4.addFields( 
          {name:`❌ Bot Developer`,value:`You require 40 work hours to unlock it
          `},
          {name:`❌ Santa Claus`,value:`You require 45 work hours to unlock it
          `}, 
          {name:`✅ Spider Man`,value:`Save the world and get 15,000 per hour`},
          {name:`❌ Captain America`,value:`You require 25 hours of work to unlock this job!`},
          {name:`I❌ ron Man`,value:`You require 25 hours of work to unlock this job!`},
          {name:`✅ Black Widow`,value:`Salary - <:UC:878195863413981214> **15,000** per hour **#blackwidow**`}

            
          );
          embed4.setDescription('4 of 5 pages');;
          embed4.setFooter(`type ${prefix}work job name to join that job`);
          embed4.setTimestamp();
            
        }else if(totalhour >=22 && totalhour <25 ){
            embed4.setTitle('Jobs in the game - ');
            embed4.addFields(     
            {name:`❌ Bot Developer`,value:`You require 40 work hours to unlock it
            `},
            {name:`❌ Santa Claus`,value:`You require 45 work hours to unlock it
            `},
            {name:`Spider Man`,value:`Save the world and get 15,000 per hour`},
            {name:`Captain America`,value:`You require 25 hours of work to unlock this job!`},
            {name:`Iron Man`,value:`You require 25 hours of work to unlock this job!`},
            {name:`✅ Black Widow`,value:`Salary - <:UC:878195863413981214> **15,000** per hour **#blackwidow**`}

              
            
            );
            embed4.setDescription('4 of 5 pages');;
            embed4.setFooter(`type ${prefix}work job name to join that job`);
            embed4.setTimestamp();
        }else if(totalhour >= 25 && totalhour <30){
            embed4.setTitle('Jobs in the game - ');
            embed4.addFields( 
            {name:`❌ Bot Developer`,value:`You require 40 work hours to unlock it
            `},
            {name:`❌ Santa Claus`,value:`You require 45 work hours to unlock it
            `},
            {name:`Spider Man`,value:`Save the world and get 15,000 per hour`},
            {name:`Captain America`,value:`Salary - 22,000 per hour #AvengersAssemble`},
            {name:`Iron Man`,value:`Salary - <:UC:878195863413981214> **22,000** per hour **#Jarvis**`},
            {name:`✅ Black Widow`,value:`Salary - <:UC:878195863413981214> **15,000** per hour **#blackwidow**`}

              
            
            );
            embed4.setDescription('4 of 5 pages');;
            embed4.setFooter(`type ${prefix}work job name to join that job`);
            embed4.setTimestamp();
        }else if(totalhour >=30 && totalhour <40){
            embed4.setTitle('Jobs in the game - ');
            embed4.addFields(
            {name:`❌ Bot Developer`,value:`You require 40 work hours to unlock it
            `},
            {name:`❌ Santa Claus`,value:`You require 45 work hours to unlock it
            `},
            {name:`Spider Man`,value:`Save the world and get 15,000 per hour`},
            {name:`Captain America`,value:`Salary - 22,000 per hour #AvengersAssemble`},
            {name:`Iron Man`,value:`Salary - <:UC:878195863413981214> **22,000** per hour **#Jarvis**`},
            {name:`✅ Black Widow`,value:`Salary - <:UC:878195863413981214> **15,000** per hour **#blackwidow**`}

              
            
            );
            embed4.setDescription('4 of 5 pages');;
            embed4.setFooter(`type ${prefix}work job name to join that job`);
            embed4.setTimestamp();
        }else if(totalhour>=40 && totalhour<45){
          embed4.setTitle('Jobs in the game - ');
          embed4.addFields(
            {name:`✅ Bot Developer`,value:`
              Salary - 27,000 per hour
            `},
            {name:`❌ Santa Claus`,value:`You require 45 work hours to unlock it
            `},
            {name:`Spider Man`,value:`Save the world and get 15,000 per hour`},
            {name:`Captain America`,value:`Salary - 22,000 per hour #AvengersAssemble`},
               {name:`Iron Man`,value:`Salary - <:UC:878195863413981214> **22,000** per hour **#Jarvis**`},
              {name:`✅ Black Widow`,value:`Salary - <:UC:878195863413981214> **15,000** per hour **#blackwidow**`}

              
            
            );
          embed4.setDescription('4 of 5 pages');;
          embed4.setFooter(`type ${prefix}work job name to join that job`);
          embed4.setTimestamp();
        }else if(totalhour>=45){
            embed4.setTitle('Jobs in the game - ');
            embed4.addFields(
              {name:`✅ Bot Developer`,value:`
                Salary - 27,000 per hour
              `},
              {name:`✅ Santa Claus`,value:`Salary - 25,000 per hour
              `},
              {name:`Spider Man`,value:`**Save the world** and get <:UC:878195863413981214> **15,000** per hour`},
              {name:`Captain America`,value:`Salary - <:UC:878195863413981214> **22,000** per hour **#AvengersAssemble**`},
              {name:`Iron Man`,value:`Salary - <:UC:878195863413981214> **22,000** per hour **#Jarvis**`},
              {name:`✅ Black Widow`,value:`Salary - <:UC:878195863413981214> **15,000** per hour **#blackwidow**`}

              
              );
            embed4.setDescription('4 of 5 pages');;
            embed4.setFooter(`type ${prefix}work job name to join that job`);
            embed4.setTimestamp();
        }
        const embed5 = new Discord.MessageEmbed();
        if(totalhour<10){
          embed5.setTitle(`Jobs in the game -`);
          embed5.addFields(
            {name:`Ladybug`,value:`You require 15 hours of work to unlock this job!`},
            {name:`Cat Noir`,value:`You require 15 hours of work to unlock this job!`},
            {name:`Bounty Hunter`,value:`You require 20 hours of work to unlock this job!`},
            {name:`Jedi`,value:`You require 20 hours of work to unlock this job!`},
            {name:`Sith`,value:`You require 10 hours of work to unlock this job!`},
            {name:`Harry Potter`,value:`You require 20 hours of work to unlock this job!`}
          );
          embed5.setDescription('5 of 5 pages');
          embed5.setFooter(`type ${prefix}work job name to join that job`);
          embed5.setTimestamp();
        }else if(totalhour>=10 && totalhour < 15){
          embed5.setTitle(`Jobs in the game -`);
          embed5.addFields(
            {name:`Ladybug`,value:`You require 15 hours of work to unlock this job!`},
            {name:`Cat Noir`,value:`You require 15 hours of work to unlock this job!`},
            {name:`Bounty Hunter`,value:`20 hours of work to unlock this job!`},
            {name:`Jedi`,value:`You require 20 hours of work to unlock this job!`},
            {name:`Sith`,value:`Salary: <:UC:878195863413981214> **22,000** per hour`},
            {name:`Harry Potter`,value:`You require 20 hours of work to unlock this job!`}
          );
          embed5.setDescription('5 of 5 pages');
          embed5.setFooter(`type ${prefix}work job name to join that job`);
          embed5.setTimestamp();
        }else if(totalhour >= 15 && totalhour <20){
          embed5.setTitle(`Jobs in the game -`);
          embed5.addFields(
            {name:`Ladybug`,value:`**Save Paris from ShadowMoth** and get <:UC:878195863413981214> **22,000** per hour`},
            {name:`Cat Noir`,value:`**Save Paris with 💗 Ladybug** and get <:UC:878195863413981214> **22,000** per hour`},
            {name:`Bounty Hunter`,value:`You require 20 hours of work to unlock this job!`},
            {name:`Jedi`,value:`You require 20 hours of work to unlock this job!`},
            {name:`Sith`,value:`Salary: <:UC:878195863413981214> **22,000** per hour`},
            {name:`Harry Potter`,value:`You require 20 hours of work to unlock this job!`}
          );
          embed5.setDescription('5 of 5 pages');
          embed5.setFooter(`type ${prefix}work job name to join that job`);
          embed5.setTimestamp();
        }else if(totalhour>=20){
          embed5.setTitle(`Jobs in the game -`);
          embed5.addFields(
            {name:`Ladybug`,value:`**Save Paris from ShadowMoth** and get <:UC:878195863413981214> **22,000** per hour`},
            {name:`Cat Noir`,value:`**Save Paris with 💗 Ladybug** and get <:UC:878195863413981214> **22,000** per hour`},
            {name:`Bounty Hunter`,value:`**become bounty hunter** and get <:UC:878195863413981214> **22,000** per hour`},
            {name:`Jedi`,value:`**become the peace keeper of galaxy** and get <:UC:878195863413981214> **22,000** per hour`},
            {name:`Sith`,value:`Salary: <:UC:878195863413981214> **22,000** per hour`},
            {name:`Harry Potter`,value:`Salary: <:UC:878195863413981214> **22,000** per hour`}
          );
          embed5.setDescription('5 of 5 pages');
          embed5.setFooter(`type ${prefix}work job name to join that job`);
          embed5.setTimestamp();
        }

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('page1')
                .setLabel('1')
                .setStyle('PRIMARY'),
            new Discord.MessageButton()
                .setCustomId('page2')
                .setLabel('2')
                .setStyle('PRIMARY'),
            new Discord.MessageButton()
                .setCustomId('page3')
                .setLabel('3')
                .setStyle('PRIMARY'),
            new Discord.MessageButton()
                .setCustomId('page4')
                .setLabel('4')
                .setStyle('PRIMARY'),
            new Discord.MessageButton()
                .setCustomId('page5')
                .setLabel('5')
                .setStyle('PRIMARY'),
            
        );
        const m = await message.channel.send({embeds:[embed],components:[row]});
        const ifilter = i => i.user.id === message.author.id;
        const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });

        collector.on('collect', async i => {
            
            if (i.customId === 'page1') {
              await i.update({ embeds:[embed]});
            }
            if(i.customId==='page2'){
              await i.update({embeds:[embed2]});
            }
            if(i.customId === 'page3'){
              await i.update({embeds:[embed3]});
            }
            if(i.customId === 'page4'){
              await i.update({embeds:[embed4]});
            }
            if(i.customId === 'page5'){
              await i.update({embeds:[embed5]});
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    

        }
      }else{ 
        message.channel.send(`${message.author}, You haven't joined the game. Type ${prefix}join to join the game`);
       
      }
       
}
}
//  