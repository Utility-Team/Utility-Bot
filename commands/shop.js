const  Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'shop',
    async execute(message,args,client){
      let userData = await userModel.findOne({userID:message.author.id});
      let userinfo = await userModel.findOne({userID:message.author.id});
      let serverData = await serverModel.findOne({guildID:message.guild.id});
      if(userinfo){
     if(userinfo.xp / 1500 === 0){
       const response = await userModel.findOneAndUpdate({
           userID:message.author.id,
         },
         {
           $inc:{
             xp:15,
             commands:1,
             level:1
           }
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
    if(userData){
        var d = new Date();
        var n = d.getTime();
        var lastshop;
        if(userData.lastshop){
          lastshop = userData.lastshop;
        }else{
          lastshop = 0;
        }
        let timeup;
        let timeup2;
        if(userData.premium === 'enable'){
          timeup = 15000;
          timeup2 = 15;
        }else{
          timeup = 30000;
          timeup2 =30;
        }
        if(n- lastshop >= timeup){
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
        let spideybadge = botdata.spideyvalue;
        let santavalue = botdata.santavalue;
        let jedilightsabervalue = botdata.jedilightsabervalue;
        let sithlightsabervalue = botdata.sithlightsabervalue;
        let mobilevalue = botdata.mobilevalue;
        let laptopvalue = botdata.laptopvalue;
        let whitekeyboardvalue = botdata.whitekeyboardvalue;
        let blackkeyboardvalue = botdata.blackkeyboardvalue;
        let whitemousevalue = botdata.whitemousevalue;
        let blackmousevalue = botdata.blackmousevalue;
        let monitorvalue = botdata.monitorvalue;
        let pcvalue = botdata.pcvalue;
        let avatar;
        if(userData.avatar){
          if(userData.avatar !== '' && userData.premium === 'enable'){
            avatar = userData.avatar;
          }else{
            avatar = message.author.displayAvatarURL();
          }
        }else{
          avatar = message.author.displayAvatarURL();
        }
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Items available to Shop!`);
        embed.addFields(
        {name:`💍 Diamond Ring - <:uc:922720730272137256> ${diamond}`,value:`Perfect Gift for the crush of the Rich kids!`},
        {name:`🏆 Gold Trophy - <:uc:922720730272137256> ${trophy}`,value:`This is a Gold trophy only the kids richer than rich kids can own this.`},
        {name:`🔑 key - <:uc:922720730272137256> ${key}`,value:`This key is the key to the mansion`},
        {name:`🥇Gold Medal - <:uc:922720730272137256> ${gold}`,value:`This is a gold medal only the rich kids can own this.`},
        {name:`🥈Silver Medal - <:uc:922720730272137256> ${silver}`,value:`This is the medal for the kids who are less rich than the rich kids`},
        {name:`:lock: Lock - <:uc:922720730272137256> ${lock}`,value:`This item saves you from getting robbed.`},
        {name:`<:rifle:883578413888184350> Hunting Rifle - <:uc:922720730272137256> ${rifle}`,value:`This is the gun you need for hunting!`},
        {name:`:fishing_pole_and_fish: Fishing rod - <:uc:922720730272137256> ${fishingrod}`,value:`This is the rod you need for fishing!`},
        {name:`<:boat:904243050279235675> Boat - <:uc:922720730272137256> ${boat} `,value:`This is the boat for finding treasure.`},   
        {name:`<:creditpoint:925956240209772564> Credit Points - <:uc:922720730272137256> 20`,value:`use credit points to increase your bank space`}
        );
        embed.setFooter(`Requested by ${message.author.username}`,avatar);
        embed.setTimestamp();
        const embed3 = new Discord.MessageEmbed();
        embed3.setTitle(`Items available to Shop!`);
        embed3.addFields(
        {name:`💍 Diamond Ring - <:uc:922720730272137256> ${diamond}`,value:`Perfect Gift for the crush of the Rich kids!`},
        {name:`🏆 Gold Trophy - <:uc:922720730272137256> ${trophy}`,value:`This is Gold trophy only the kids richer than rich kids can own this.`},
        {name:`🔑 key - <:uc:922720730272137256> ${key}`,value:`This key is the key to the mansion`},
        {name:`🥇Gold Medal - <:uc:922720730272137256> ${gold}`,value:`This is gold medal only the rich kids can own this.`},
        {name:`🥈Silver Medal - <:uc:922720730272137256> ${silver}`,value:`This is the medal for the kids who are less rich than the rich kids`},
       );
        embed3.setFooter(`Requested by ${message.author.username}`,avatar);
        embed3.setTimestamp();
        
        const embed2 = new Discord.MessageEmbed();
        embed2.setTitle(`Items Available to shop!`);
        embed2.addFields(
            {name:`🍕 Pizza Slice - <:uc:922720730272137256> ${pizza}`,value:`Get this to increase your daily & monthly rewards!`},
            {name:`🍏 Green Apple - <:uc:922720730272137256> ${apple}`,value:`Get this to increase your xp!`},
            {name:`:beer: Beer - <:uc:922720730272137256> ${beer}`,value:`Drink some beer to chill!`},
            {name:`:coffee: Coffee - <:uc:922720730272137256> ${coffee}`,value:`Caffeine will not let you sleep!`},
            {name:`🧋 Bubble Tea - <:uc:922720730272137256> ${bubbletea}`,value:`drink to chill!`}

        );
        
        embed2.setFooter('More Coming Soon!');

        const embed4 = new Discord.MessageEmbed();
        embed4.setTitle('Winter Season Limited Edition Items!');
        embed4.addFields(
          {name:`<:spiderman:918017281106255922> Spidey Badge - <:uc:922720730272137256> ${spideybadge}`,value:`get the spidey badge now!`},
          {name:`<:santacap:925292343291170826> Santa Cap - <:uc:922720730272137256> ${santavalue}`,value:`get the santa cap for you and your friends!`},
          {name:`<:jedilightsaber:918028605945167902> Jedi Lightsaber - <:uc:922720730272137256> ${jedilightsabervalue}`,value:`get the jedi lightsaber`},
          {name:`<:sithlightsaber:918027995539705917> Sith Lightsaber - <:uc:922720730272137256> ${sithlightsabervalue}`,value:"get the sith lightsaber"}
        );
        embed4.setFooter(`Requested by ${message.author.username}`,avatar);;
        embed4.setTimestamp();
        embed4.setColor(`#E2DCD7`)

        const embed5 = new Discord.MessageEmbed();
        embed5.setTitle('Gadgets!');
        embed5.addFields({name:`<:gamingpc:918053046498512906> beast pc - <:uc:922720730272137256> ${pcvalue}`,value:`the pc you need!`},
        {name:`<:monitor:918053577266708500> monitor - <:uc:922720730272137256> ${monitorvalue} `,value:`the monitor you need! `},
        {name:`<:blackmouse:918054201765027850> black mouse - <:uc:922720730272137256> ${blackmousevalue}`,value:'black mouse for your setup'},
        {name:`<:whitemouse:918061503029055488> white mouse - <:uc:922720730272137256> ${whitemousevalue}`,value:'white mouse for your setup'},
        {name:`<:gamingkeyboard:918055261854392330> black keyboard - <:uc:922720730272137256> ${blackkeyboardvalue}`,value:'keyboard for some noise'},
        {name:`<:whitegamingkeyboard:918055512132698133> white keyboard - <:uc:922720730272137256> ${whitekeyboardvalue}`,value:'white keyboard for more noise'},
        {name:`<:laptop:918059938612404255> laptop - <:uc:922720730272137256> ${laptopvalue}`,value:'laptop for work'},
        {name:`<:smartphone:918057432264101978> smartphone - <:uc:922720730272137256> ${mobilevalue}`,value:'smartphone you need'}
        
        );
        embed5.setFooter(`Requested by ${message.author.username}`,avatar);;
        embed5.setTimestamp();
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('shop')
            .setPlaceholder('Other Stats...')
            .addOptions([
              {
                label:'Jewellery',
                value:`jewellery${message.author.id}`,
                description:'shows jewellery items'
              },
              {
               label:'Food',
               value:`food${message.author.id}`,
               description:'shows food items'
             },
             {
               label:'Default',
               value:`default${message.author.id}`,
               description:'shows items available to shop'
             },
             {
               label:'Limited Edition',
               value:`limitededition${message.author.id}`,
               description:'Limited edition items which are available for only 1 week'
             },
             {
              label:'Gadgets',
              value:`gadgets${message.author.id}`,
              description:'Gadgets for doing stuff'
             }
            ])
          )
          message.channel.send({embeds:[embed],components:[row]});
         const filter = (interaction)=> interaction.user.id === message.author.id ;
         let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
         collector.on("collect",async (interaction)=>{
      
           if(interaction.values[0]==`food${message.author.id}`){
            await  interaction.update({embeds:[embed2]});
           }
           if(interaction.values[0]==`jewellery${message.author.id}`){
            await  interaction.update({embeds:[embed3]});
           }
           if(interaction.values[0]==`default${message.author.id}`){
            await  interaction.update({embeds:[embed]});
           }
           if(interaction.values[0]==`limitededition${message.author.id}`){
            await  interaction.update({embeds:[embed4]});
           }
           if(interaction.values[0]==`gadgets${message.author.id}`){
            await  interaction.update({embeds:[embed5]});
           }
         });
         collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        }else{
          var msec = n - lastshop;
          console.log(msec);
          var ss = Math.floor(msec / 1000);
          var second = timeup2 - ss;
          if(userData.premium !== 'enable'){
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Wait bro!`);
            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check shop again!. The default cooldown is of **30** seconds but for premium users it is of **20** seconds to become a premium user use premium command.`);
            message.channel.send({embeds:[embed]});
          }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Chill bro!`);
            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to check shop again!.`);
            embed.setColor('#025CFF');
            message.channel.send({embeds:[embed]});
          } 
        }
      }else{
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

    
      }
    }
}