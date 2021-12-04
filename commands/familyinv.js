const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:`familyinv`,
    async execute(message,args){
     let userData = await userModel.findOne({userID:message.author.id});
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
             let level = Math.round(userinfo.xp/1500);
             const response = await userModel.findOneAndUpdate({
                 userID:message.author.id,
               },
               {
                 xp:userinfo.xp + 15,
                 commands:userinfo.commands + 1,
                 level:level
   
               }
               
               );
            }
          }
        if(userData.partner !== 0){
            var d = new Date();
            var n = d.getTime();
            let lastfamilyinv = userData.lastfamilyinv;
            if(n - lastfamilyinv >= 30000){
                var d2 = new Date();
                var n2 = d2.getTime();
                const response  = await userModel.findOneAndUpdate({userID:message.author.id},
                    {
                      lastfamilyinv:n2
                    });
            let partnerId = userData.partner;
            let partnerData = await userModel.findOne({userID:partnerId});
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}'s family inventory`);
            embed.setThumbnail(message.author.displayAvatarURL());
            embed.addFields({name:`💍 diamond ring`,value:`${userData.diamondring + partnerData.diamondring}`},
            {name:`🏆 gold trophy`,value:`${userData.goldtrophy + partnerData.goldtrophy}`},
            {name:`🥇 gold medal`,value:`${userData.goldmedal + partnerData.goldmedal}`},
            {name:`🥈 silver medal`,value:`${userData.silvermedal + partnerData.silvermedal}`},
            {name:`🔑 key`,value:`${userData.key + partnerData.key}`},
            {name:`🍕 pizza slice`,value:`${userData.pizzaslice + partnerData.pizzaslice}`},
            {name:`🍏 green apple`,value:`${userData.greenapple + partnerData.greenapple}`},
            {name:`:beer: beer`,value:`${userData.beer + partnerData.beer}`},
            {name:`:coffee: coffee`,value:`${userData.coffee + partnerData.coffee}`},
            {name:`:lock: lock`,value:`${userData.lock + partnerData.lock}`}
            );
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            
            const embed6 = new Discord.MessageEmbed();
            embed6.setTitle(`${message.author.username}'s family inventory`);
            embed6.addFields({name:`💍 diamond ring`,value:`${userData.diamondring + partnerData.diamondring}`},
            {name:`🏆 gold trophy`,value:`${userData.goldtrophy + partnerData.goldtrophy}`},
            {name:`🥇 gold medal`,value:`${userData.goldmedal + partnerData.goldmedal}`},
            {name:`🥈 silver medal`,value:`${userData.silvermedal + partnerData.silvermedal}`},
            {name:`🔑 key`,value:`${userData.key + partnerData.key}`},);
            embed6.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed6.setTimestamp();
   
            const embed7= new Discord.MessageEmbed();
            embed7.setTitle(`${message.author.username}'s family inventory`);
            embed7.addFields( {name:`:lock: lock`,value:`${userData.lock + partnerData.lock}`},
             {name:`<:rifle:883578413888184350> Hunting Rifle`,value:`${userData.huntingrifle + partnerData.huntingrifle}`},
             {name:`:fishing_pole_and_fish: Fishing rod`,value:`${userData.fishingrod + partnerData.fishingrod}`},
             {name:`<:boat:904243050279235675> Boat`,value:`${userData.boat + partnerData.boat}`}
            );
            embed7.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed7.setTimestamp();
  
            const embed8 = new Discord.MessageEmbed();
            embed8.setTitle(`${message.author.username}'s family inventory`);
            embed8.addFields({name:`🍕 pizza slice`,value:`${userData.pizzaslice + partnerData.pizzaslice}`},
            {name:`🍏 green apple`,value:`${userData.greenapple + partnerData.greenapple}`},
            {name:`:beer: beer`,value:`${userData.beer + partnerData.beer}`},
            {name:`:coffee: coffee`,value:`${userData.coffee + partnerData.coffee}`},
            {name:`🧋 Bubble Tea`,value:`${userData.bubbletea + partnerData.bubbletea}`},);
            embed8.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed8.setTimestamp();
  
            const collectableembed = new Discord.MessageEmbed();
            collectableembed.setTitle(`${message.author.username}'s family inventory`);
            collectableembed.addFields({name:`<:limitededitionlightsaber:889749246994169866> lightsaber`,value:`${userData.lightsaber + partnerData.lightsaber}`},
            {name:`<:newbountyhunter:889745554387648573> The Mandalorian Helmet`,value:`${userData.mandohelmet + partnerData.mandohelmet}`},
            {name:`<:bobafettedition:889747878870917170> Boba Fett Helmet`,value:`${userData.bobahelmet + partnerData.bobahelmet}`},
            {name:`<:KylorenHelmet:889750172115017738> Kylo Ren Helmet`,value:`${userData.kylohelmet + partnerData.kylohelmet}`},
            {name:`<:squidgamedoll2:898879068030787614> Squid Game Doll`,value:`${userData.squiddoll + partnerData.squiddoll}`}
            );
            collectableembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            collectableembed.setTimestamp();
  
            const huntembed2 = new Discord.MessageEmbed();
            huntembed2.setTitle(`${message.author.username}'s family inventory`);
            huntembed2.addFields({
             name:`Squirrel`,value:`${userData.squirrel + partnerData.squirrel}`
           },
           {
             name:`Fox`,value:`${userData.fox + partnerData.fox}`
           },
           {
             name:`woodpecker`,value:`${userData.woodpecker + partnerData.woodpecker}`
           },
           {
             name:`wolf`,value:`${userData.wolf + partnerData.wolf}`
           },
           {name:`humming bird`,value:`${userData.hummingbird + partnerData.hummingbird}`}
           );
           huntembed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
           huntembed2.setTimestamp();
  
           const fishembed = new Discord.MessageEmbed();
           fishembed.setTitle(`${message.author.username}'s family inventory`);
           fishembed.addFields({
             name:`🐟 Common Fish`,value:`${userData.commonfish + partnerData.commonfish}`
           },
           {
             name:`🐠 Gold Fish`,value:`${userData.goldfish + partnerData.goldfish}`
           },
           {
             name:`🐙 Octopus`,value:`${userData.octopus + partnerData.octopus}`
           },
           {
             name:`🦈 Shark`,value:`${userData.shark + partnerData.shark}`
           }
           );
           fishembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
           fishembed.setTimestamp();
  
           const digembed= new Discord.MessageEmbed();
           digembed.setTitle(`${message.author.username}'s family inventory`);
           digembed.addFields({
             name:`<:grass:904040046049505381> grass`,value:`${userData.grass + partnerData.grass}`
           },{
            name:`<:dirt:904039581224153098> dirt`,value:`${userData.dirt + partnerData.dirt}`
          },{
            name:`👢 boots`,value:`${userData.boots + partnerData.boots}`
          },{
            name:`<:ancientcoin:903586746640519178> Ancient Coins`,value:`${userData.ancientcoin + partnerData.ancientcoin}`
          });
          digembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
          digembed.setTimestamp();
            
          const row2 = new Discord.MessageActionRow()
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
              
          );
          const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('option')
            .setPlaceholder('Other Stats...')
            .addOptions([
              {
               label:'Food',
               value:'food',
               description:'shows food items owned by you'
             },
             {
               label:'Default',
               value:'default',
               description:'shows default embed'
             },
            {
              label:'Hunt & Fish',
              value:'hunt',
              description:'shows items related to hunting & fishing'
            },
            {
             label:'Collectables',
             value:'collectables',
             description:'shows collectables items owned by you'
           },
           {
             label:'Dig',
             value:'dig',
             description:'shows dig items owned by you'
           },
            
            ])
          );
  
          const row3 = new Discord.MessageActionRow()
          .addComponents(
              new Discord.MessageButton()
                  .setCustomId('page1')
                  .setLabel('1')
                  .setStyle('PRIMARY'),
              new Discord.MessageButton()
                  .setCustomId('page2')
                  .setLabel('2')
                  .setStyle('PRIMARY'),   
          );
      
          const m = await message.channel.send({embeds:[embed],components:[row,row2]});
          let m2;
          const ifilter = i => i.user.id === message.author.id;
          const collector2 = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });
      
    
          collector2.on('collect', async i => {
              
              if (i.customId === 'page1') {
                await i.update({ embeds:[embed]});
              }
              if(i.customId==='page2'){
                await i.update({embeds:[embed7]});
              }
              if(i.customId === 'page3'){
                await i.update({embeds:[embed6]});
              }
          });
    
          collector2.on('end', collected => console.log(`Collected ${collected.size} items`));
  
      
      
            //  message.channel.send({embeds:[embed],components:[row]});
             const filter = (interaction)=> interaction.user.id === message.author.id || target.id ;
             let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
             collector.on("collect",async (interaction)=>{
               await interaction.deferReply();
               if(interaction.values[0]=='food'){
                await  interaction.editReply({embeds:[embed8]});
               }
               if(interaction.values[0]=='default'){
                await  interaction.editReply({embeds:[embed]});
               }
               if(interaction.values[0]=='hunt'){
                 m2 = await  interaction.editReply({embeds:[huntembed2],components:[row3]});
                 const collector3 = m2.createMessageComponentCollector({ filter:ifilter, time: 30000 });
                 collector3.on('collect', async i => {
              
                  if (i.customId === 'page1') {
                    await i.update({ embeds:[huntembed2]});
                  }
                  if(i.customId==='page2'){
                    await i.update({embeds:[fishembed]});
                  }
                 });
        
                 collector3.on('end', collected => console.log(`Collected ${collected.size} items`));
               }
               if(interaction.values[0]=='collectables'){
                await  interaction.editReply({embeds:[collectableembed]});
              }
              if(interaction.values[0] == 'dig'){
                await interaction.editReply({embeds:[digembed]});
              }
             });   
             collector.on('end', collected =>{ 
              row.components[0].setDisabled(true);
               console.log(`Collected ${collected.size} items`)});
            
            }else{
                var msec = n - lastfamilyinv;
                console.log(msec);
                var ss = Math.floor(msec / 1000);
                var second = 30 - ss;
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Wait bro!`);
                embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check family inventory again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
                message.channel.send({embeds:[embed]});
            }                
        
        }else{
            message.channel.send(`${message.author}, You don't have a partner. Use propose command to marry someone!`);
        }
     }else{
         message.channel.send(`${message.author}, You haven't joined the currency game. Please use join command to join the game.`);
     }
    }
    
}