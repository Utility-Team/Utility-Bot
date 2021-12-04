const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'inventory',
    async execute(message,args){
      let userData2 = await userModel.findOne({userID:message.author.id});
      const target = message.mentions.users.first();
      var d = new Date();
      var n = d.getTime();
     if(userData2 && n - userData2.lastinv >= 35000 ){
         var d2 = new Date();
         var n2 = d2.getTime();
          const response  = await userModel.findOneAndUpdate({userID:message.author.id},
           {
             lastinv:n2
           });
      if(args[0]){

         if(target){
            let userData = await userModel.findOne({userID:target.id});
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
      
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${target.username}'s inventory`);
            embed.setThumbnail(target.displayAvatarURL());
            embed.addFields({name:`💍 diamond ring`,value:`${userData.diamondring}`},
            {name:`🏆 gold trophy`,value:`${userData.goldtrophy}`},
            {name:`🥇 gold medal`,value:`${userData.goldmedal}`},
            {name:`🥈 silver medal`,value:`${userData.silvermedal}`},
            {name:`🔑 key`,value:`${userData.key}`},
            {name:`🍕 pizza slice`,value:`${userData.pizzaslice}`},
            {name:`🍏 green apple`,value:`${userData.greenapple}`},
            {name:`:beer: beer`,value:`${userData.beer}`},
            {name:`:coffee: coffee`,value:`${userData.coffee}`},
            {name:`:lock: lock`,value:`${userData.lock}`}
            );
            embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed.setTimestamp();
            
            const embed6 = new Discord.MessageEmbed();
            embed6.setTitle(`${target.username}'s inventory`);
            embed6.addFields({name:`💍 diamond ring`,value:`${userData.diamondring}`},
            {name:`🏆 gold trophy`,value:`${userData.goldtrophy}`},
            {name:`🥇 gold medal`,value:`${userData.goldmedal}`},
            {name:`🥈 silver medal`,value:`${userData.silvermedal}`},
            {name:`🔑 key`,value:`${userData.key}`},);
            embed6.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed6.setTimestamp();
   
            const embed7= new Discord.MessageEmbed();
            embed7.setTitle(`${target.username}'s inventory`);
            embed7.addFields( {name:`:lock: lock`,value:`${userData.lock}`},
             {name:`<:rifle:883578413888184350> Hunting Rifle`,value:`${userData.huntingrifle}`},
             {name:`:fishing_pole_and_fish: Fishing rod`,value:`${userData.fishingrod}`},
             {name:`<:boat:904243050279235675> Boat`,value:`${userData.boat}`}
            );
            embed7.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed7.setTimestamp();

            const embed8 = new Discord.MessageEmbed();
            embed8.setTitle(`${target.username}'s inventory`);
            embed8.addFields({name:`🍕 pizza slice`,value:`${userData.pizzaslice}`},
            {name:`🍏 green apple`,value:`${userData.greenapple}`},
            {name:`:beer: beer`,value:`${userData.beer}`},
            {name:`:coffee: coffee`,value:`${userData.coffee}`},
            {name:`🧋 Bubble Tea`,value:`${userData.bubbletea}`},);
            embed8.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            embed8.setTimestamp();

            const collectableembed = new Discord.MessageEmbed();
            collectableembed.setTitle(`${target.username}'s inventory`);
            collectableembed.addFields({name:`<:limitededitionlightsaber:889749246994169866> lightsaber`,value:`${userData.lightsaber}`},
            {name:`<:newbountyhunter:889745554387648573> The Mandalorian Helmet`,value:`${userData.mandohelmet}`},
            {name:`<:bobafettedition:889747878870917170> Boba Fett Helmet`,value:`${userData.bobahelmet}`},
            {name:`<:KylorenHelmet:889750172115017738> Kylo Ren Helmet`,value:`${userData.kylohelmet}`},
            {name:`<:squidgamedoll2:898879068030787614> Squid Game Doll`,value:`${userData.squiddoll}`}
            );
            collectableembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
            collectableembed.setTimestamp();

            const huntembed2 = new Discord.MessageEmbed();
            huntembed2.setTitle(`${target.username}'s inventory`);
            huntembed2.addFields({
             name:`Squirrel`,value:`${userData.squirrel}`
           },
           {
             name:`Fox`,value:`${userData.fox}`
           },
           {
             name:`woodpecker`,value:`${userData.woodpecker}`
           },
           {
             name:`wolf`,value:`${userData.wolf}`
           },
           {name:`humming bird`,value:`${userData.hummingbird}`}
           );
           huntembed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
           huntembed2.setTimestamp();

           const fishembed = new Discord.MessageEmbed();
           fishembed.setTitle(`${target.username}'s inventory`);
           fishembed.addFields({
             name:`🐟 Common Fish`,value:`${userData.commonfish}`
           },
           {
             name:`🐠 Gold Fish`,value:`${userData.goldfish}`
           },
           {
             name:`🐙 Octopus`,value:`${userData.octopus}`
           },
           {
             name:`🦈 Shark`,value:`${userData.shark}`
           }
           );
           fishembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
           fishembed.setTimestamp();

           const digembed= new Discord.MessageEmbed();
           digembed.setTitle(`${target.username}'s inventory`);
           digembed.addFields({
             name:`<:grass:904040046049505381> grass`,value:`${userData.grass}`
           },{
            name:`<:dirt:904039581224153098> dirt`,value:`${userData.dirt}`
          },{
            name:`👢 boots`,value:`${userData.boots}`
          },{
            name:`<:ancientcoin:903586746640519178> Ancient Coins`,value:`${userData.ancientcoin}`
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
            message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
          }
         }else{
           const embed = new Discord.MessageEmbed();
           embed.setTitle(`${message.author}, Please mention someone who is in the server!`);
           message.channel.send({embeds:[embed]});
         }
      }else{
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
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`${message.author.username}'s inventory`);
          embed.setThumbnail(message.author.displayAvatarURL());
          embed.addFields({name:`💍 diamond ring`,value:`${userData.diamondring}`},
          {name:`🏆 gold trophy`,value:`${userData.goldtrophy}`},
          {name:`🥇 gold medal`,value:`${userData.goldmedal}`},
          {name:`🥈 silver medal`,value:`${userData.silvermedal}`},
          {name:`🔑 key`,value:`${userData.key}`},
          {name:`🍕 pizza slice`,value:`${userData.pizzaslice}`},
          {name:`🍏 green apple`,value:`${userData.greenapple}`},
          {name:`:beer: beer`,value:`${userData.beer}`},
          {name:`:coffee: coffee`,value:`${userData.coffee}`},
          {name:`:lock: lock`,value:`${userData.lock}`}
          );
          embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
          embed.setTimestamp();
          
          const embed6 = new Discord.MessageEmbed();
          embed6.setTitle(`${message.author.username}'s inventory`);
          embed6.addFields({name:`💍 diamond ring`,value:`${userData.diamondring}`},
          {name:`🏆 gold trophy`,value:`${userData.goldtrophy}`},
          {name:`🥇 gold medal`,value:`${userData.goldmedal}`},
          {name:`🥈 silver medal`,value:`${userData.silvermedal}`},
          {name:`🔑 key`,value:`${userData.key}`},);
          embed6.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
          embed6.setTimestamp();
 
          const embed7= new Discord.MessageEmbed();
          embed7.setTitle(`${message.author.username}'s inventory`);
          embed7.addFields( {name:`:lock: lock`,value:`${userData.lock}`},
           {name:`<:rifle:883578413888184350> Hunting Rifle`,value:`${userData.huntingrifle}`},
           {name:`:fishing_pole_and_fish: Fishing rod`,value:`${userData.fishingrod}`},
           {name:`<:boat:904243050279235675> Boat`,value:`${userData.boat}`}
          );
          embed7.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
          embed7.setTimestamp();

          const embed8 = new Discord.MessageEmbed();
          embed8.setTitle(`${message.author.username}'s inventory`);
          embed8.addFields({name:`🍕 pizza slice`,value:`${userData.pizzaslice}`},
          {name:`🍏 green apple`,value:`${userData.greenapple}`},
          {name:`:beer: beer`,value:`${userData.beer}`},
          {name:`:coffee: coffee`,value:`${userData.coffee}`},
          {name:`🧋 Bubble Tea`,value:`${userData.bubbletea}`},);
          embed8.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
          embed8.setTimestamp();

          const collectableembed = new Discord.MessageEmbed();
          collectableembed.setTitle(`${message.author.username}'s inventory`);
          collectableembed.addFields({name:`<:limitededitionlightsaber:889749246994169866> lightsaber`,value:`${userData.lightsaber}`},
          {name:`<:newbountyhunter:889745554387648573> The Mandalorian Helmet`,value:`${userData.mandohelmet}`},
          {name:`<:bobafettedition:889747878870917170> Boba Fett Helmet`,value:`${userData.bobahelmet}`},
          {name:`<:KylorenHelmet:889750172115017738> Kylo Ren Helmet`,value:`${userData.kylohelmet}`},
          {name:`<:squidgamedoll2:898879068030787614> Squid Game Doll`,value:`${userData.squiddoll}`}
          );
          collectableembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
          collectableembed.setTimestamp();

          const huntembed2 = new Discord.MessageEmbed();
          huntembed2.setTitle(`${message.author.username}'s inventory`);
          huntembed2.addFields({
           name:`Squirrel`,value:`${userData.squirrel}`
         },
         {
           name:`Fox`,value:`${userData.fox}`
         },
         {
           name:`woodpecker`,value:`${userData.woodpecker}`
         },
         {
           name:`wolf`,value:`${userData.wolf}`
         },
         {name:`humming bird`,value:`${userData.hummingbird}`}
         );
         huntembed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
         huntembed2.setTimestamp();

         const fishembed = new Discord.MessageEmbed();
         fishembed.setTitle(`${message.author.username}'s inventory`);
         fishembed.addFields({
           name:`🐟 Common Fish`,value:`${userData.commonfish}`
         },
         {
           name:`🐠 Gold Fish`,value:`${userData.goldfish}`
         },
         {
           name:`🐙 Octopus`,value:`${userData.octopus}`
         },
         {
           name:`🦈 Shark`,value:`${userData.shark}`
         }
         );
         fishembed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
         fishembed.setTimestamp();

         const digembed= new Discord.MessageEmbed();
         digembed.setTitle(`${message.author.username}'s inventory`);
         digembed.addFields({
           name:`<:grass:904040046049505381> grass`,value:`${userData.grass}`
         },{
          name:`<:dirt:904039581224153098> dirt`,value:`${userData.dirt}`
        },{
          name:`👢 boots`,value:`${userData.boots}`
        },{
          name:`<:ancientcoin:903586746640519178> Ancient Coins`,value:`${userData.ancientcoin}`
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
          message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
        }
      }
      }else{
        var msec = n - userData2.lastinv;
        console.log(msec);
        var ss = Math.floor(msec / 1000);
        var second = 35 - ss;
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Wait bro!`);
        embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check inventory again!. The default cooldown is of **35** seconds but for premium users it is of **25** seconds to become a premium user type ;premium.`);
        message.channel.send({embeds:[embed]});
        //message.channel.send(`${message.author}, You are in cooldown`);
      }
    }
}