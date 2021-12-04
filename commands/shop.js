const  Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
module.exports={
    name:'shop',
    async execute(message,args,client){
      let userData = await userModel.findOne({userID:message.author.id});
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
    if(userData){
        var d = new Date();
        var n = d.getTime();
        var lastshop = userData.lastshop;
        if(n- lastshop >= 30000){
        var d2 = new Date();
        var n2 = d2.getTime();
        let botdata = await botModel.findOne({botid:1});
        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
          lastshop:n2
        })
        let diamond = botdata.diamondvalue;
        let trophy = botdata.trophyvalue;
        let key = botdata.keyvalue;
        let gold = botdata.goldvalue;
        let silver = botdata.silvervalue;
        let pizza = botdata.pizzavalue;
        let apple = botdata.greenvalue;
        let lock = botdata.lockvalue;
        let beer = botdata.beervalue;
        let coffee = botdata.coffeevalue;
        let rifle = botdata.huntgun;
        let fishingrod = botdata.fishingpole;
        let boat = botdata.boatvalue;
        let bubbletea = botdata.bubblevalue;
        let lightsaber = botdata.lightsabervalue;
        let mandohelmet =  botdata.mandohelmet;
        let bobahelmet = botdata.bobahelmet;
        let kylohelmet = botdata.kylohelmet;
        let squidgamedoll = botdata.squidgamedoll;
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Items available to Shop!`);
        embed.addFields(
        {name:`💍 Diamond Ring - <:UC:878195863413981214> ${diamond}`,value:`Perfect Gift for the crush of the Rich kids!`},
        {name:`🏆 Gold Trophy - <:UC:878195863413981214> ${trophy}`,value:`This is a Gold trophy only the kids richer than rich kids can own this.`},
        {name:`🔑 key - <:UC:878195863413981214> ${key}`,value:`This key is the key to the mansion`},
        {name:`🥇Gold Medal - <:UC:878195863413981214> ${gold}`,value:`This is a gold medal only the rich kids can own this.`},
        {name:`🥈Silver Medal - <:UC:878195863413981214> ${silver}`,value:`This is the medal for the kids who are less rich than the rich kids`},
        {name:`:lock: Lock - <:UC:878195863413981214> ${lock}`,value:`This item saves you from getting robbed.`},
        {name:`<:rifle:883578413888184350> Hunting Rifle - <:UC:878195863413981214> ${rifle}`,value:`This is the gun you need for hunting!`},
        {name:`:fishing_pole_and_fish: Fishing rod - <:UC:878195863413981214> ${fishingrod}`,value:`This is the rod you need for fishing!`},
        {name:`<:boat:904243050279235675> Boat - <:UC:878195863413981214> ${boat} `,value:`This is the boat for finding treasure.`}
        );
        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
        embed.setTimestamp();
        const embed3 = new Discord.MessageEmbed();
        embed3.setTitle(`Items available to Shop!`);
        embed3.addFields(
        {name:`💍 Diamond Ring - <:UC:878195863413981214> ${diamond}`,value:`Perfect Gift for the crush of the Rich kids!`},
        {name:`🏆 Gold Trophy - <:UC:878195863413981214> ${trophy}`,value:`This is Gold trophy only the kids richer than rich kids can own this.`},
        {name:`🔑 key - <:UC:878195863413981214> ${key}`,value:`This key is the key to the mansion`},
        {name:`🥇Gold Medal - <:UC:878195863413981214> ${gold}`,value:`This is gold medal only the rich kids can own this.`},
        {name:`🥈Silver Medal - <:UC:878195863413981214> ${silver}`,value:`This is the medal for the kids who are less rich than the rich kids`},
       );
        embed3.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())
        embed3.setTimestamp();
        const next = '➡️';
        const back = '⬅️';

        const embed2 = new Discord.MessageEmbed();
        embed2.setTitle(`Items Available to shop!`);
        embed2.addFields(
            {name:`🍕 Pizza Slice - <:UC:878195863413981214> ${pizza}`,value:`Get this to increase your daily & monthly rewards!`},
            {name:`🍏 Green Apple - <:UC:878195863413981214> ${apple}`,value:`Get this to increase your xp!`},
            {name:`:beer: Beer - <:UC:878195863413981214> ${beer}`,value:`Drink some beer to chill!`},
            {name:`:coffee: Coffee - <:UC:878195863413981214> ${coffee}`,value:`Caffeine will not let you sleep!`},
            {name:`🧋 Bubble Tea - <:UC:878195863413981214> 2500`,value:`drink to chill!`}

        );
        
        embed2.setFooter('More Coming Soon!');

        const embed4 = new Discord.MessageEmbed();
        embed4.setTitle('Limited Edition Items!');
        embed4.addFields({name:`<:limitededitionlightsaber:889749246994169866> Light saber - <:UC:878195863413981214> ${lightsaber}`,value:'The weapon of the jedi'},
         {name:`<:newbountyhunter:889745554387648573> The Mandalorian helmet -  <:UC:878195863413981214> ${mandohelmet}`,value:'The Mandalorian bounty hunter helmet!'},
         {name:`<:bobafettedition:889747878870917170> Boba Fett Helmet - <:UC:878195863413981214> ${bobahelmet}`,value:`The epic boba fett edition bounty hunter helmet!`},
         {name:`<:KylorenHelmet:889750172115017738> Kylo Ren Helmet - <:UC:878195863413981214> ${kylohelmet}`,value:'The awesome Kylo Ren Limited Edition Helmet'},
         {name:`<:squidgamedoll2:898879068030787614> squid game doll - <:UC:878195863413981214> ${squidgamedoll}`,value:"The doll from squid game's red light green light game"}
        );
        embed4.setFooter(`Requested by ${message.author.username}`);
        embed4.setTimestamp();
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('shop')
            .setPlaceholder('Other Stats...')
            .addOptions([
              {
                label:'Jewellery',
                value:'jewellery',
                description:'shows jewellery items'
              },
              {
               label:'Food',
               value:'food',
               description:'shows food items'
             },
             {
               label:'Default',
               value:'default',
               description:'shows items available to shop'
             },
             {
               label:'Limited Edition',
               value:'limitededition',
               description:'Limited edition items which are available for only 1 week'
             }
            ])
          )
          message.channel.send({embeds:[embed],components:[row]});
         const filter = (interaction)=> interaction.user.id === message.author.id ;
         let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
         collector.on("collect",async (interaction)=>{
      
           if(interaction.values[0]=='food'){
            await  interaction.reply({embeds:[embed2]});
           }
           if(interaction.values[0]=='jewellery'){
            await  interaction.reply({embeds:[embed3]});
           }
           if(interaction.values[0]=='default'){
            await  interaction.reply({embeds:[embed]});
           }
           if(interaction.values[0]=='limitededition'){
            await  interaction.reply({embeds:[embed4]});
           }
         });
         collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        }else{
          var msec = n - lastshop;
          console.log(msec);
          var ss = Math.floor(msec / 1000);
          var second = 30 - ss;
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`Wait bro!`);
          embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check profile again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
          message.channel.send({embeds:[embed]});
        }
      }else{
        message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
    
      }
    }
}