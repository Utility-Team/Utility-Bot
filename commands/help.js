const Discord = require('discord.js')
const profileModel = require('../models/profileSchema');
module.exports={
    name:"help",
    description:"Tells the commmands of the bot",
    async execute(message,args){
    let profileData = await profileModel.findOne({guildID: message.guild.id});
    var prefix = profileData.prefix;
    let lastembed = 1;
  if(!args[0]){
    var embed = new Discord.MessageEmbed();
    embed.setTitle(`Utility Bot Help Categories - Use Prefix ${prefix} `);
    embed.setThumbnail('https://i.ibb.co/tYb8d0f/w-Gs-Oh-JDa6a57w-AAAABJRU5-Erk-Jggg.png')
    embed.addFields({name:`${prefix}help moderation`,value:`Shows all the moderation commands`},
    {name:`${prefix}help fun`,value:'Shows all the fun commands'},
    {name:`${prefix}help configure`,value:'Shows configureable commands'},
    {name:`${prefix}help bot`,value:'Shows commands related to bot'},
    {name:`${prefix}help currency`,value:`Shows currency system commands`},
    {name:`${prefix}help settings`,value:'Shows settings commands'},
    {name:`${prefix}report userid reason`,value:`let's you report a particular user`},
   
    );
    embed.setTimestamp();
    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
    embed.setColor(`#404EED`);
    message.channel.send({embeds:[embed]});

  }
  if(args[0]){
  
    if(args[0] ==='moderation'){
      const embed = new Discord.MessageEmbed();
      embed.setTitle(`Utility moderation commands - Use Prefix ${prefix}`);
      embed.addFields({name:`${prefix}kick @name`,value:`kicks the mentioned person`},
      {name:`${prefix}ban @name`,value:`bans the mentioned person`},
      {name:`${prefix}hackban userid`,value:`bans user before joining the server`},
      {name:`${prefix}unban userid`,value:`unbans a user`},
      {name:`${prefix}slowmode number`,value:`sets the slowmode of a channel for the number of seconds`},{name:`${prefix}mute @name time`,value:`mutes the mentioned person for the given time exmaple - ${prefix}mute @abhishek 10m `},
      {name:`${prefix}unmute @name`,value:`unmutes the mentioned user`},{name:`${prefix}cc`,value:`deletes all the chats of the current channel`},
      {name:`${prefix}warn @name reason`,value:`warns the mentioned user for the given reason`},
      {name:`${prefix}warns @name`,value:`shows total number of warnings a person has`},
      {name:`${prefix}unwarn @name number`,value:`removes a particular warn of the user`},
      {name:`${prefix}channeladd userid`,value:`adds a particular user to the current channel`},
      {name:`${prefix}channelremove userid`,value:`removes a particular user from the current channel`}
      );
      embed.setTimestamp();
      embed.setColor(`#404EED`);
      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
      message.channel.send({embeds:[embed]});
    }else if(args[0] === 'fun'){
      var embed = new Discord.MessageEmbed();
      embed.setTitle(`Utility fun commands - Use Prefix ${prefix}`);
      embed.addFields({name:`${prefix}ping`,value:`tells the latency`},
      {name:`${prefix}meme`,value:`shows meme`},
      {name:`${prefix}serverinfo`,value:`tells about the server`},
      {name:`${prefix}avatar`,value:`tells about you`},
      {name:`${prefix}avatar @name`,value:`tells about the mentioned user`},
      {name:`${prefix}tweet something`,value:`tweets whatever you want to tweet`},
      {name:`${prefix}topic`,value:`gives random topics to talk about`},
      {name:`${prefix}gay @name`,value:`tells your or mentioned person's gay percentage`},
      );
      embed.setTimestamp();
      embed.setColor(`#404EED`);
      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
    

      var embed2 = new Discord.MessageEmbed();
      embed2.setTitle(`Utility fun commands - Use Prefix ${prefix}`);
      embed2.addFields( {name:`${prefix}truth`,value:'gives you question that has to be answered truthfully'},
      {name:`${prefix}dare`,value:'gives a dare that has to be completed'},
      {name:`${prefix}kiss @name`,value:'shows you the kissing gif'},
      {name:`${prefix}hug @name`,value:'shows you the hugging gif'},
      {name:`${prefix}userinfo`,value:'shows userinfo'},
      {name:`${prefix}userinfo @name`,value:'shows userinfo of the mentioned person'},
      {name:`${prefix}set-hobby hobby`,value:'sets your hobby'},
      {name:`${prefix}set-bio bio`,value:'sets your bio'},
      {name:`${prefix}inspire`,value:'gives new thought to inspire you'}
      );
      embed2.setTimestamp();
      embed2.setColor(`#404EED`);
      embed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());

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
          
      );
      const m = await message.channel.send({embeds:[embed],components:[row]});
      const ifilter = i => i.user.id === message.author.id;
      const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });

      collector.on('collect', async i => {
          
          if (i.customId === `page1`) {
            await i.update({ embeds:[embed]});
          }
          if(i.customId===`page2`){
            await i.update({embeds:[embed2]});
          }
      });

      collector.on('end', collected => console.log(`Collected ${collected.size} items`));
  
   


      
     
    }else if(args[0]==='configure'){
      var embed = new Discord.MessageEmbed();
      embed.setTitle(`Utility configurable commands - Use Prefix ${prefix}`);
      embed.addFields({name:`${prefix}prefix prefixyouwant`,value:`sets the prefix to the prefix you want `},
      {name:`${prefix}clogs #channel`,value:`configure the logs channel to the mentioned channel`},
      {name:`${prefix}cwelcome #channel`,value:`configure the welcome embed channel to the mentioned channel`},
      {name:`${prefix}cleave #channel`,value:`configure the member leave embed channel to the mentioned channel`}
      );
      embed.setTimestamp();
      embed.setColor(`#404EED`);
      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
      message.channel.send({embeds:[embed]});
      
    }else if(args[0]==='bot'){
      var embed = new Discord.MessageEmbed();
      embed.setTitle(`Utility bot related commands - Use Prefix ${prefix}`);
      embed.addFields({name:`${prefix}aboutbot`,value:'tells about the bot'},
      {name:`${prefix}botinfo`,value:`gives info about the bot`},
      {name:`${prefix}support`,value:'gives the link of the support server'},
      {name:`${prefix}version`,value:'tells the version of the bot'},
      {name:`${prefix}suggestion your suggestion`,value:'you can suggest things about bot'},
      {name:`${prefix}inviteme`,value:'dms the invite link of the bot'},
      {name:`${prefix}donate`,value:'support us in the keep the bot running!'},
      {name:`${prefix}updates`,value:`shows messages & notifications from developers`}
      );
      embed.setTimestamp();
      embed.setColor(`#404EED`);
      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
   

      message.channel.send({embeds:[embed]});

       
    }else if(args[0] === 'currency'){
      var embed = new Discord.MessageEmbed();
      embed.setTitle(`Utility currency system commands - Use Prefix ${prefix}`);
      embed.addFields({name:`${prefix}bal`,value:'shows your balance'},
      {name:`${prefix}profile`,value:'shows your profile'},
      {name:`${prefix}profile @name`,value:'shows the profile of the mentioned person'},
      {name:`${prefix}shop`,value:'shows items available to purchase'},
      {name:`${prefix}work`,value:'use work command to work and earn money'},
      {name:`${prefix}jobslist`,value:'shows all the jobs available'},
      {name:`${prefix}fish`,value:'use fish command to do fishing'},
      {name:`${prefix}hunt`,value:'use hunt to hunt animals'}
      );
      embed.setTimestamp();
      embed.setColor(`#404EED`);
      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
   
      var embed2 = new Discord.MessageEmbed();
      embed2.setTitle(`Utility currency system commands - Use Prefix ${prefix}`);
      embed2.addFields({name:`${prefix}shares`,value:'shows your shares'},
      {name:`${prefix}sharemarket`,value:'shows the sharemarket'},
      {name:`${prefix}inv`,value:'shows your inventory'},
      {name:`${prefix}gamble money`,value:'gambles your money'},
      {name:`${prefix}beg`,value:'beg to get money'},
      {name:`${prefix}daily`,value:'use it to get your daily money'},
      {name:`${prefix}sell item quantity`,value:'use sell command to sell your items'},
      {name:`${prefix}trade @name item quantity price`,value:'use trade command to trade items with the mentioned person'},
      );
      embed2.setTimestamp();
      embed2.setColor(`#404EED`);
      embed2.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());

      const embed3 = new Discord.MessageEmbed();
      embed3.setTitle(`Utility currency system commands - Use Prefix ${prefix}`);
      embed3.addFields({name:`${prefix}buy item quantity`,value:'use buy command to buy items from shop'},
       {name:`${prefix}partner`,value:`tells your or the mentioned person's partner`},
       {name:`${prefix}propose @name`,value:'to propose someone'},
       {name:`${prefix}divorce @name`,value:'to divorce someone'},
       {name:`${prefix}partnerinv`,value:`shows your partner's inventory`},
       {name:`${prefix}monthly`,value:`to earn your monthly money`},
       {name:`${prefix}weekly`,value:'use it to get your weekly money'},
       {name:`${prefix}rps`,value:'use this to play rock paper scissor and earn money'},
      );
      embed3.setTimestamp();
      embed3.setColor(`#404EED`);
      embed3.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());

      const embed4 = new Discord.MessageEmbed();
      embed4.setTitle(`Utility currency system commands - Use Prefix ${prefix}`);
      embed4.addFields({name:`${prefix}use item name quantity`,value:'use the item you want'},
      {name:`${prefix}gift @name item quantity`,value:'gifts item to the mentioned person'},
      {name:`${prefix}rob @name`,value:'to rob the mentioned person'},
      {name:`${prefix}mode`,value:'to select active or unactive mode'},
      {name:`${prefix}with amount`,value:'to withdraw money from your bank'},
      {name:`${prefix}dep amount`,value:'to deposit money in your bank'},
      {name:`${prefix}value`,value:'to get the value of the cryptocoin'},
      {name:`${prefix}premium`,value:"use it to become a premium user"}
      );
      embed4.setTimestamp();
      embed4.setColor(`#404EED`);
      embed4.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());

      const embed5 = new Discord.MessageEmbed();
      embed5.setTitle(`Utility currency system commands - Use Prefix ${prefix}`);
      embed5.addFields({name:`${prefix}lottery amount`,value:'use lottery to earn money'},
      {name:`${prefix}dig`,value:'digs underground for items'},
      {name:`${prefix}treasure amount`,value:'use to find treasure'},
      {name:`${prefix}leaderboard`,value:'shows top 10 richest players of the server'},
      {name:`${prefix}rank`,value:`shows top 10 global richest players`},
      {name:`${prefix}scramble amount`,value:`plays scramble game for the given amount`},
      {name:`${prefix}coinflip amount`,value:`plays coin flip game for the given amount`},
      {name:`${prefix}rewards`,value:`shows achievements list and rewards`}
      );
      embed5.setTimestamp();
      embed5.setColor(`#404EED`);
      embed5.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());


      const embed6 = new Discord.MessageEmbed();
      embed6.setTitle(`Utility currency system commands - Use Prefix ${prefix}`);
      embed6.addFields({name:`${prefix}race @name`,value:'for doing type races with your friends!'},
      {name:`${prefix}race-leaderboard`,value:'shows type racing leaderboard of the server'},
      {name:`${prefix}race-rank`,value:'shows top 10 global leaderboard of type racers'},
      {name:`${prefix}race-stat @user`,value:'shows type racing stat of the mentioned user'},
      {name:`${prefix}badges`,value:`shows badges owned by you`},
      {name:`${prefix}play`,value:`play with gadgets to earn money`},
      {name:`${prefix}collect`,value:`collect your premium perks with this command`},
      {name:`${prefix}lootbox`,value:`collect your lootbox items`}
      );
      embed6.setTimestamp();
      embed6.setColor(`#404EED`);
      embed6.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
      const embed7 = new Discord.MessageEmbed();
      embed7.setTitle(`Utility currency system commands - Use Prefix ${prefix}`);
      embed7.addFields({name:`${prefix}force-divorce @name`,value:`let's you force fully divorce with your partner`},
      {name:`${prefix}set-avatar url`,value:`let's you set your custom avatar`},
      {name:`${prefix}set-bg url`,value:`let's you set custom background`},
      );
      
      embed7.setTimestamp();
      embed7.setColor(`#404EED`);
      embed7.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());

      let embeds = [embed,embed2,embed3,embed4,embed5,embed6,embed7];
      
      
      
      const row = new Discord.MessageActionRow()
      .addComponents(
          new Discord.MessageButton()
              .setCustomId(`page1${message.author.id}`)
              .setLabel('<')
              .setStyle('PRIMARY'),
          new Discord.MessageButton()
              .setCustomId(`page2${message.author.id}`)
              .setLabel('>')
              .setStyle('PRIMARY'),
          
      );
      const m = await message.channel.send({embeds:[embed],components:[row]});
      const ifilter = i => i.user.id === message.author.id;
      const collector = m.createMessageComponentCollector({ filter:ifilter, time: 45000 });
        let val = 0;
      collector.on('collect', async i => {
          
          if (i.customId === `page1${message.author.id}`) {
            if(val > 0){            
              val = val - 1;
            }else{
              val = 0;
            }
            await i.update({embeds:[embeds[val]]});       
          }
          if(i.customId=== `page2${message.author.id}`){
            if(val < embeds.length - 1){
              val = val + 1;
              console.log('val ' + val);
             }else if(val === 4){
               console.log('val' + val);
               val = 0;
             }
            await i.update({embeds:[embeds[val]]});

          }
      });

      collector.on('end', collected => console.log(`Collected ${collected.size} items`));
  
   

    }else if(args[0] === 'settings'){
      const embed = new Discord.MessageEmbed();
      embed.setTitle(`Utility settings commands - Use Prefix ${prefix}`);
      embed.addFields({name:`${prefix}settings-bio disable`,value:`disables your bio for userinfo command`},
      {name:`${prefix}settings-hobby disable`,value:`disables your hobbies list for userinfo command`},
      {name:`${prefix}settings-rob disable/enable`,value:`disables/enables rob command for the whole server`},
      {name:`${prefix}settings-welcome disable`,value:`disables welcome embed`},
      {name:`${prefix}settings-leave disable`,value:'disables leave embed'},
      {name:`${prefix}settings-logs disable`,value:'disables logs channel'}
      );
      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
      embed.setColor(`#404EED`);
      embed.setTimestamp();
      message.channel.send({embeds:[embed]});
      
    }else{
      var embed = new Discord.MessageEmbed();
      embed.setTitle(`Utility Bot Help Categories - Use Prefix ${prefix} `);
      embed.setThumbnail('https://i.ibb.co/tYb8d0f/w-Gs-Oh-JDa6a57w-AAAABJRU5-Erk-Jggg.png')
      embed.addFields({name:`${prefix}help moderation`,value:`Shows all the moderation commands`},
      {name:`${prefix}help fun`,value:'Shows all the fun commands'},
      {name:`${prefix}help configure`,value:'Shows configureable commands'},
      {name:`${prefix}help bot`,value:'Shows commands related to bot'},
      {name:`${prefix}help currency`,value:`Shows currency system commands`},
      {name:`${prefix}help settings`,value:'Shows settings commands'}
    
      );
      embed.setTimestamp();
      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
      embed.setColor(`#404EED`);
      message.channel.send({embeds:[embed]});
    }
    
  }
    
    //let's first test this
    
    }
}