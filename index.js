const Discord = require('discord.js');
const {Client,Intents} = require('discord.js')
const client = new Client({
     intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INVITES,Intents.FLAGS.GUILD_PRESENCES
    ] });
const mongoose = require('mongoose');
var prefix = ';';
const fs = require('fs');
const profileModel = require('./models/profileSchema');
const userModel = require('./models/userSchema');
const fetch = require("node-fetch");    
const { userInfo } = require('os');
require('dotenv').config()
let botModel = require('./models/botSchema');
const muteModel = require('./models/muteSchema');
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
 
let shareValueDown = async ()=>{
  
  let chance = Math.floor(Math.random()*2);
  let chance2;
  if(chance ===0){
    chance2 = 50;
  }else{
    chance2= -50;
  }
  console.log(chance);
  const response = await botModel.findOneAndUpdate({botid:1},{
    $inc:{
      alphabetvalue:chance2,
      utilityvalue:chance2,
      facebookvalue:chance2,
      microsoftvalue:chance2,
      applevalue:chance2,
      teslavalue:chance2,
      cryptocoinvalue:chance2,
    }
  }); 
}
 
client.on('ready',async on_ready=>{
    console.log('Online');
    client.user.setActivity(`${prefix}help for help`,{type:"PLAYING"});
    console.log(prefix);
    var d = new Date();
    var n = d.getTime();
    let botData = await botModel.findOneAndUpdate({botid:1},{
     uptime:n
    });
   
   


  

  });
mongoose.connect(process.env.MONGODB_SRV,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('Connected to the database!')
}).catch((err)=>{
    console.log(err)
});
client.on('guildCreate', async guild => {
 
    const channel = guild.channels.cache.find(channel => channel.type === 'text' );
   
    var embed = new Discord.MessageEmbed();
    embed.setTitle('Thanks for inviting Utility to the server');
    embed.addFields({name:'For knowing what all i can do type',value:';help'});
    if(channel){
      console.log(channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
      await channel.send({embeds:[embed]});
    }
})
client.on('guildMemberAdd',async member => {

    const welcomeEmbed = new Discord.MessageEmbed()

    welcomeEmbed.setColor('#5cf000')
    welcomeEmbed.setTitle(`**  ${member.user.tag} ** Welcome to the ${member.guild.name} server . Hope you will enjoy your stay here. Now there are ${member.guild.memberCount} members in the server.`)
    welcomeEmbed.setImage("https://i.pinimg.com/originals/8c/9a/07/8c9a079986a4ce112882fea6db3ffdee.gif")
    welcomeEmbed.setThumbnail(member.user.displayAvatarURL())
     
    const profile = await profileModel.findOne({guildID:member.guild.id});
    const logsID = profile.logschannel
    if(profile){
    const channelID = profile.cwelcome
   
    console.log(channelID)
    const welcome_new = member.guild.channels.cache.find(i=>i.id ===channelID);
    if(welcome_new){
        welcome_new.send({embeds:[welcomeEmbed]}); 
    }
    }
    const logs_channel = member.guild.channels.cache.find(i=>i.id ===logsID);
    if(logs_channel){
    const embed = new Discord.MessageEmbed();
    const new_member = member.guild.members.cache.find(i=>i.id === member.id);
    embed.setTitle(`✅ Member Joined`);
    embed.setThumbnail(`${new_member.user.displayAvatarURL()}`);
    embed.setColor(`#30CC71`);

    embed.addFields({name:`${new_member.user.username}`,value:`ID: ${new_member.user.id}`});
    embed.setTimestamp();
    logs_channel.send({embeds:[embed]});
    }
    let d2 = new Date();
    let n2 = d2.getTime();
    let memberData = await muteModel.findOne({userID:member.id,guildID:member.guild.id});
    if(memberData){
      console.log('here 1 comes');
        console.log(n2 - memberData.lastmuted);
        console.log('here 2 comes');
        if(memberData.forevermute === 'true'){
          let mutedRole = member.guild.roles.cache.find(role => role.name === 'Muted');
          if(mutedRole){
            console.log('here 3 comes')
            member.roles.add(mutedRole);
          }
          
        }else{
          if(n2 - memberData.lastmuted < memberData.mutedfor){
            let mutedRole = member.guild.roles.cache.find(role => role.name === 'Muted');
            if(mutedRole){
              console.log('here 3 comes')
              member.roles.add(mutedRole);
            }
          }
        }
      
    }

    
});
client.on('guildBanAdd', async (guild, user) => {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
    const profileData = await profileModel.findOne({guildID:guild.id});
	// Since there's only 1 audit log entry in this collection, grab the first one
	const banLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

	// Now grab the user object of the person who banned the member
	// Also grab the target of this action to double-check things
	const { executor, target } = banLog;

	// Update the output with a bit more information
	// Also run a check to make sure that the log returned was for the same banned member
	if (target.id === user.id) {
		const logsID = profileData.logschannel
    if(logsID){
     const logs_channel = guild.channels.cache.find(i=>i.id ===logsID);
     if(logs_channel){
     const embed = new Discord.MessageEmbed();
   //  const new_member = member.guild.members.cache.find(i=>i.id === );
     embed.setTitle(`✅ Member banned`);
     embed.setColor(`#30CC71`);
     embed.setThumbnail(user.displayAvatarURL());
     embed.addFields({name:`${user.username} has been banned`,value:`User ID: ${user.id}`});
     embed.setTimestamp();
     logs_channel.send({embeds:[embed]});
     }
    }
    console.log(banLog.action)
	} else {    
		console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
	}
});
client.on('guildMemberRemove', async member => {
  const guild = member.guild;
  if (guild.members.cache.find(user=> user.id === client.user.id).permissions.has("ADMINISTRATOR")){
    console.log("I have the Permission Administrator");
  
  if (member.guild.me.permissions.has("ADMINISTRATOR")){
     const fetchedLogs = await member.guild.fetchAuditLogs({
         limit: 1,
         type: 'MEMBER_KICK',
     });
     	const fetchedLogs2 = await member.guild.fetchAuditLogs({
	 	limit: 1,
	 	type: 'MEMBER_BAN_ADD',
	 });
        const leaveEmbed = new Discord.MessageEmbed();
        leaveEmbed.setColor('#5cf000')
        leaveEmbed.setTitle(`**  ${member.user.tag} ** has left the server. Now there are ${member.guild.memberCount} members left in the server`)
        leaveEmbed.setImage("https://i.ibb.co/6Y7YSJZ/baby-yoda-bye-bye-icegif.gif")
        leaveEmbed.setThumbnail(member.user.displayAvatarURL())
        
        const profile = await profileModel.findOne({guildID:member.guild.id});
        const logsID = profile.logschannel
        if(profile){
            const channelID = profile.cleave
            console.log(channelID)
            const leave_new = member.guild.channels.cache.find(i=>i.id ===channelID);
            if(leave_new){
               await leave_new.send({embeds:[leaveEmbed]}); 
            }
        }
        const logs_channel = member.guild.channels.cache.find(i=>i.id ===logsID);
        // console.log(fetchedLogs);
        // console.log(fetchedLogs2);
        console.log(logs_channel);
    // if(!fetchedLogs2){ 
        if(logs_channel){
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Member Left`);
            embed.setThumbnail(`${member.user.displayAvatarURL()}`);
            embed.setColor(`#C41731`)
            embed.addFields({name:`${member.user.username}`,value:`ID: ${member.user.id}`});
            embed.setTimestamp();
            await logs_channel.send({embeds:[embed]});
        }
    //}
  }
  }
});

client.on('messageDelete', async(message, channel)=>{
    console.log('Test, a message was deleted.');
    const profileData = await profileModel.findOne({"guildID":message.guild.id});
    console.log(profileData);
    const channelID = profileData.logschannel;
    const logs = message.guild.channels.cache.find(i=>i.id ===channelID);
    if(logs){
      
    if(message && message.author.id !== client.user.id){
          if(!message.author.bot){
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`Message Author: ${message.author.username}`);
                embed.setAuthor(`Message Deleted`,message.author.displayAvatarURL());
                embed.addFields({name:`Channel:`,value:`<#${message.channel.id}>`},{name:`Deleted Message`,value:`${message.content}`});
                embed.setTimestamp();
                embed.setColor('#ED4245');
                embed.setFooter(`User id: ${message.author.id}`);
                logs.send({embeds:[embed]});
          }
        }
    }
});
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if(oldMember.roles.size < newMember.roles.size) {
        const fetchedLogs = await oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_ROLE_UPDATE',
    });
    
        const roleAddLog = fetchedLogs.entries.first();
        if (!roleAddLog ) return;
        const { executor, target, extra } = roleAddLog;
        console.log(`Role ${extra.name} added to <@${target.id}> by <@${executor.id}>`)
    }
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
    const profileData = await profileModel.findOne({"guildID":oldMessage.guild.id});
    
    const channelID = profileData.logschannel
    const leave_new = oldMessage.guild.channels.cache.find(i=>i.id ===channelID);
    if(leave_new){
      if(oldMessage && oldMessage.author.id !== client.user.id && !oldMessage.author.bot){

        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Message Author: ${oldMessage.author.username}`);
        embed.setAuthor(`Message Edited`,oldMessage.author.displayAvatarURL());
        embed.addFields(
            {name:`Channel:`,value:`<#${oldMessage.channel.id}>`},
            {name:`Old Message`,value:`${oldMessage}`},
            {name:`New Message`,value:`${newMessage}`},
        );
   
        embed.setTimestamp();
        embed.setColor('#ED4245');
        embed.setFooter(`User id: ${oldMessage.author.id}`);
        leave_new.send({embeds:[embed]});
      }
    }
    console.log(oldMessage.content);
    console.log(newMessage.content);
 });
 const shareUpdate =  async ()=>{
    let botdata = await botModel.findOne({botid:1});
    let alphabet2 = Number((0.5 * botdata.alphabetvalue/100).toFixed(2));
    let alphabet = Math.round(alphabet2);
    let utility2 =Number((0.5 * botdata.utilityvalue/100).toFixed(2));
    let utility = Math.round(utility2);
    let facebook2 =Number((0.5 * botdata.facebookvalue/100).toFixed(2));
    let facebook = Math.round(facebook2);
    let microsoft2 = Number((0.5 * botdata.microsoftvalue/100).toFixed(2));
    let microsoft = Math.round(microsoft2);
    let apple2 = Number((0.5 * botdata.applevalue/100).toFixed(2));
    let apple = Math.round(apple2);
    let tesla2 = Number((0.5 * botdata.teslavalue/100).toFixed(2));
    let tesla = Math.round(tesla2);
    let cryptocoin2 =Number((0.5 * botdata.cryptovalue/100).toFixed(2));
    let cryptocoin = Math.round(cryptocoin2);
    let totalalphabet = botdata.totalalphabet % 2;
    let totalutility = botdata.totalutilityteam  % 2;
    let totalfacebook = botdata.totalfacebook % 2;
    let totalmicrosoft = botdata.totalmicrosoft % 2;
    let totalapple = botdata.totalapple % 2;
    let totaltesla = botdata.totaltesla % 2;
    let totalcryptocoin = botdata.totalcryptocoin % 2;
    if(totalalphabet === 0 && botdata.totalalphabet !== 0 && Math.sign(botdata.totalalphabet) === 1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalalphabet:0,
        $inc:{
          alphabetvalue:alphabet
        }
      });
    }
    if(totalutility === 0 && botdata.totalutilityteam !== 0 && Math.sign(botdata.totalutilityteam) === 1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalutilityteam:0,
        $inc:{
          utilityvalue:utility
        }
      });
    }
    if(totalfacebook === 0 && botdata.totalfacebook !== 0 && Math.sign(botdata.totalfacebook) === 1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalfacebook:0,
        $inc:{
          facebookvalue:facebook
        }
      });
    }

    if(totalmicrosoft === 0 && botdata.totalmicrosoft !== 0 && Math.sign(botdata.totalmicrosoft) === 1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalmicrosoft:0,
        $inc:{
          microsoftvalue:microsoft
        }
      });
    }

    if(totalapple === 0 && botdata.totalapple !== 0 && Math.sign(botdata.totalapple) === 1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalapple:0,
        $inc:{
          applevalue:apple
        }
      });
    }

    if(totaltesla === 0 && botdata.totaltesla !== 0 && Math.sign(botdata.totaltesla) === 1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totaltesla:0,
        $inc:{
          teslavalue:tesla
        }
      });
    }
    if(totalcryptocoin === 0 && botdata.totalcryptocoin !== 0 && Math.sign(botdata.totalcryptocoin) === 1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalcryptocoin:0,
        $inc:{
         cryptovalue:cryptocoin
        }
      });
    }
//for loss making shares
    if(totalalphabet === 0 && botdata.totalalphabet !== 0 && Math.sign(botdata.totalalphabet) === -1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalalphabet:0,
        $inc:{
          alphabetvalue:-1000
        }
      });
    }
    if(totalutility === 0 && botdata.totalutilityteam !== 0 && Math.sign(botdata.totalutilityteam) === -1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalutilityteam:0,
        $inc:{
          utilityvalue:-1000
        }
      });
    }
    if(totalfacebook === 0 && botdata.totalfacebook !== 0 && Math.sign(botdata.totalfacebook) === -1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalfacebook:0,
        $inc:{
          facebookvalue:-1000
        }
      });
    }

    if(totalmicrosoft === 0 && botdata.totalmicrosoft !== 0 && Math.sign(botdata.totalmicrosoft) === -1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalmicrosoft:0,
        $inc:{
          microsoftvalue:-1000
        }
      });
    }

    if(totalapple === 0 && botdata.totalapple !== 0 && Math.sign(botdata.totalapple) === -1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalapple:0,
        $inc:{
          applevalue:-1000
        }
      });
    }

    if(totaltesla === 0 && botdata.totaltesla !== 0 && Math.sign(botdata.totaltesla) === -1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totaltesla:0,
        $inc:{
          teslavalue:-1000
        }
      });
    }
    if(totalcryptocoin === 0 && botdata.totalcryptocoin !== 0 && Math.sign(botdata.totalcryptocoin) === -1){
      const response = await botModel.findOneAndUpdate({botid:1},{
        totalcryptocoin:0,
        $inc:{
         cryptovalue:-1000
        }
      });
    }


  }

let update = async (message)=>{
  console.log('step 1');
  let findUser = await userModel.findOne({userID:message.author.id});
  if(findUser){
    console.log('step 2');
    const response = await userModel.findOneAndUpdate({
      userID:message.author.id
    },
    {
      username:message.author.username
    }
    );
    console.log(findUser.premium);
    if(findUser.premium === 'enable'){
      console.log('step 3');
      console.log('here is 1');
      let d = new Date();
      let n = d.getTime();
      if(n - findUser.lastpremium  >= 2592000000){
        const response2 = await userModel.findOneAndUpdate({userID:message.author.id},{
          premium:'disable',
          premiumtype:0,
          avatar:'',
          background:'',
          collected:'false',
          lootbox:0
        }); 
        if(findUser.badges){
          let badgesData = findUser.badges;
          console.log(findUser)
          for(var x =0;x<=findUser.badges.length;x++){
            if(findUser.badges[x]){
              if(findUser.badges[x].name === 'Premium'){
                  
                  badgesData.splice(x,1);
                  const response3 = await userModel.findOneAndUpdate({userID:message.author.id},{
                    badges:badgesData
                  });
              }
            }
          }
        }
      }
    }
  }
}

let randomStuff = async (message)=>{
  if(message.author.bot !== true && !message.content.startsWith(`${prefix}`)){
    const randomNumber = Math.floor(Math.random()*20);
    console.log(randomNumber)
    if(randomNumber === 15){
      const embed = new Discord.MessageEmbed();
      embed.setTitle(`Someone lost their wallet! Wanna pick it up?`);
      embed.setImage('https://i.ibb.co/F8H3W6C/20n.gif');
      const row = new Discord.MessageActionRow()
      .addComponents(
          new Discord.MessageButton()
              .setCustomId('claim')
              .setLabel('Claim It!')
              .setStyle('SUCCESS'),    
      );
    const m = await message.channel.send({embeds:[embed],components:[row]});
      const ifilter = i => message.guild.members.cache.get(i.user.id);

      const collector = m.createMessageComponentCollector({ filter:ifilter, time: 15000 });

      collector.on('collect', async i => {
          console.log('hello there' + i.guildId);
          if (i.customId === 'claim') {
            const randomNumber2 = Math.floor(Math.random()* 2000 + 10);
            await i.update({components:[]});
            const embed2 = new Discord.MessageEmbed();
            embed2.setTitle(`Successfully Claimed!`); 
            embed2.setDescription(`${i.user.username}, you got ${randomNumber2}`);
            embed2.setColor(`#30CC71`);
            message.channel.send({embeds:[embed2]});

            const userData = await userModel.findOne({userID:message.author.id});
            if(userData){
              const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                $inc:{
                  networth:randomNumber2,
                  wallet:randomNumber2
                }
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
                 huntingrifle:0,
                 fishingrod:0,
                 boat:0,
                 lock:0,
                 creditpoints:0,
              });
              profile.save();
            }

          }
      });

      collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
  }
}

client.on('messageCreate', async (message)=>{
 

  update(message);
  // setTimeout(()=>{
  //   randomStuff(message);},
  // 10000
  // );
  
 console.log(message.guild.id);
 if(message.mentions.has(client.user)&& message.content.endsWith('prefix')){
  console.log(message.content);
  const profileData2 = await profileModel.findOne({"guildID":message.guild.id});
  const newprefix = profileData2.prefix;  
  if(profileData2){
  console.log('working ');
  const embed = new Discord.MessageEmbed();
  embed.setTitle(`${message.author.username} The current prefix is ${newprefix}`);
  embed.setDescription(`To change prefix use ${newprefix}prefix prefix`);
  message.channel.send({embeds:[embed]});
  }
}
// if(message.mentions.has(client.user)&& !message.content.endsWith('prefix') && message.content.includes('prefix')){
//     if(message.member.permissions.has('ADMINISTRATOR')){
       
//        let msg =    message.content.replace(`<@!${client.user.id}> prefix`,'');
      
         
//       //  msg.replace(/^\s+|\s+$/gm,'');
      
//         console.log('replace with' + msg);
//         const profileData2 = await profileModel.findOne({"guildID":message.guild.id});
//         const newprefix = profileData2.prefix;  
//         if(profileData2){
//           const response = await profileModel.findOneAndUpdate({"guildID":message.guild.id},
//           { 
//             prefix:msg
//           }
//           );
//           const embed = new Discord.MessageEmbed();
//           embed.setTitle(`${message.author.username} the prefix of the bot has been set to ${msg}`)
//           message.channel.send({embeds:[embed]});
//         }else{
//           const embed = new Discord.MessageEmbed();
//           embed.setTitle(`${message.author.username}, You don't have the perms to change the prefix`);
//           message.channel.send({embeds:[embed]});
//         }
//  }
// }   
 if(message.author){
     let userData = await userModel.findOne({partner:message.author.id});
     if(userData){
         if(userData.partner !== 0){
             const response = await userModel.findOneAndUpdate({partner:message.author.id},
              {
                partnername:message.author.username +'#' +  message.author.discriminator
              }    
            );
         }
     }
 } 


 if(message.guild){
  let profileData = await profileModel.findOne({guildID:message.guild.id});
  if(profileData){
    prefix = profileData.prefix
  }else{
     let profile = await profileModel.create({
            guildID: message.guild.id,
            prefix:';',
            logschannel:'',
            newschannel:''
           });
           profile.save()
     var findData =  await profileModel.findOne({guildID: message.guild.id})
    prefix = findData.prefix
  }
}
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();
    const command = client.commands.get(cmdName) || client.commands.find(cmd=>cmd.aliases&& cmd.aliases.includes(cmdName));
    console.log(prefix);
    try{
      command.execute(message,args,client);
      shareValueDown();
      randomStuff(message);
    }catch(err){
      console.log(err);
    }
    
   
});
client.login(process.env.token);