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
//const keepAlive = require('./server');




//const keepAlive = require('./server')


client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
 
let shareValueDown = async ()=>{
  let botdata = await botModel.findOne({botid:1});
  let alphabet2 = Number((1 * botdata.alphabetvalue/100).toFixed(10));
  let alphabet = Math.round(alphabet2);
  let utility2 =Number((1 * botdata.utilityvalue/100).toFixed(10));
  let utility = Math.round(utility2);
  let facebook2 =Number((1 * botdata.facebookvalue/100).toFixed(10));
  let facebook = Math.round(facebook2);
  let microsoft2 = Number((1 * botdata.microsoftvalue/100).toFixed(10));
  let microsoft = Math.round(microsoft2);
  let apple2 = Number((1 * botdata.applevalue/100).toFixed(10));
  let apple = Math.round(apple2);
  let tesla2 = Number((1 * botdata.teslavalue/100).toFixed(10));
  let tesla = Math.round(tesla2);
  let cryptocoin2 =Number((1 * botdata.cryptovalue/100).toFixed(10));
  let cryptocoin = Math.round(cryptocoin2);
  const response = await botModel.findOneAndUpdate({botid:1},{
    $inc:{
      alphabetvalue:-50,
      utilityvalue:-50,
      facebookvalue:-50,
      microsoftvalue:-50,
      applevalue:-50,
      teslavalue:-50,
      cryptocoinvalue:-50,
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
    //(function(){ shareValueDown(); }, 600000);


  

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
client.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    var embed = new Discord.MessageEmbed();
    embed.setTitle('Thanks for inviting Utility to the server');
    embed.addFields({name:'For knowing what all i can do type',value:';help'});
   // channel.send({embeds:[embed]});
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
// client.on('guildMemberRemove', async member => {
//  // const guild = Client.guilds.cache.find(member.guild.id);
//   if(member.guild.me.hasPermission("ADMINISTRATOR")) {
//     console.log("I have the Permission Administrator");
  
//   //if (member.guild.me.hasPermission("ADMINISTRATOR")){
//      const fetchedLogs = await member.guild.fetchAuditLogs({
//          limit: 1,
//          type: 'MEMBER_KICK',
//      });
//      	const fetchedLogs2 = await member.guild.fetchAuditLogs({
// 	 	limit: 1,
// 	 	type: 'MEMBER_BAN_ADD',
// 	 });
//         const leaveEmbed = new Discord.MessageEmbed();
//         leaveEmbed.setColor('#5cf000')
//         leaveEmbed.setTitle(`**  ${member.user.tag} ** has left the server. Now there are ${member.guild.memberCount} members left in the server`)
//         leaveEmbed.setImage("https://i.ibb.co/6Y7YSJZ/baby-yoda-bye-bye-icegif.gif")
//         leaveEmbed.setThumbnail(member.user.displayAvatarURL())
        
//         const profile = await profileModel.findOne({guildID:member.guild.id});
//         const logsID = profile.logschannel
//         if(profile){
//             const channelID = profile.cleave
//             console.log(channelID)
//             const leave_new = member.guild.channels.cache.find(i=>i.id ===channelID);
//             if(leave_new){
//                await leave_new.send({embeds:[leaveEmbed]}); 
//             }
//         }
//         const logs_channel = member.guild.channels.cache.find(i=>i.id ===logsID);
//         console.log(fetchedLogs);
//         console.log(fetchedLogs2);
//      if(!fetchedLogs2){ 
//         if(logs_channel){
//             const embed = new Discord.MessageEmbed();
//             embed.setTitle(`Member Left`);
//             embed.setThumbnail(`${member.user.displayAvatarURL()}`);
//             embed.setColor(`#C41731`)
//             embed.addFields({name:`${member.user.username}`,value:`ID: ${member.user.id}`});
//             embed.setTimestamp();
//             logs_channel.send({embeds:[embed]});
//         }
//     }
//   }
//  // }
// });

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
  let findUser = await userModel.findOne({userID:message.author.id});
  if(findUser){
    const response = await userModel.findOneAndUpdate({
      userID:message.author.id
    },
    {
      username:message.author.username
    }
    );
  }
}

client.on('messageCreate', async (message)=>{

  update(message);
 console.log(message.guild.id);
 //shareUpdate();
 if(message.mentions.has(client.user)&& message.content.endsWith('prefix')){
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
    const command = args.shift().toLowerCase();
    console.log(prefix)
    if (message.content === prefix + 'ping') {
        const embed = new Discord.MessageEmbed();
        console.log('2 error')
        message.channel.send('Loading data').then (async (msg) =>{
          msg.delete()
          embed.setTitle(`🏓Latency:${client.ws.ping}ms`);
          message.channel.send({embeds:[embed]});
        })
        //console.log(prefix)
    }
    if(message.content.startsWith(prefix + 'voteme')){
        console.log('3 error')
      var embed = new Discord.MessageEmbed();
      embed.setTitle(`${message.author.username} Here is the link to vote me`)
      embed.addFields({name:'You can vote after every 12 hours  in the Top.gg through the link-',value:'https://top.gg/bot/824626723878207499/vote'})
      embed.setFooter('Thanks for choosing Utility')
      console.log(message.author.username + '' + 'voting')
      message.channel.send({embeds:[embed]});
    }
      if(command === 'avatar'){
        console.log('1 error')
        client.commands.get('avatar').execute(message, args,client);
    } 
    if(command === 'ban'){
        console.log('4 error')
        client.commands.get('ban').execute(message, args,client);
    } 
    if(command === 'unban'){
        console.log('4 error')
        client.commands.get('unban').execute(message, args,client);
    } 
    if(command === 'kick'){
        console.log('5 error')
        client.commands.get('kick').execute(message, args,client);
    }
    if(command === 'help'){
        console.log('6 error')
        client.commands.get('help').execute(message, args);
    } 
    if(command === 'slowmode'){
        console.log('7 error')
        client.commands.get('slowmode').execute(message, args);
    } 
    if(command === 'warn'){
        console.log('8 error')
        client.commands.get('warn').execute(message, args);
    } 
    if(command === 'mute'){
        console.log('9 error')
        client.commands.get('mute').execute(message, args);
    } 
    if(command === 'nuke'){
        client.commands.get('nuke').execute(message, args);
    } 
    if(command === 'unmute'){
        client.commands.get('unmute').execute(message, args);
    } 
    if(command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }
    if(command === 'meme'){
        client.commands.get('meme').execute(message, args);
    }
     if(command === 'inviteme'){
        client.commands.get('inviteme').execute(message, args);
    }  
     if(command === 'topic'){
        client.commands.get('topic').execute(message, args);
    }  
      if(command === 'version'){
        client.commands.get('version').execute(message, args);
    }  
     if(command === 'aboutbot'){
        client.commands.get('aboutbot').execute(message, args);
    } 
    if(command === 'support'){
        client.commands.get('support').execute(message, args);
    }  
    if(command === 'tweet'){
        client.commands.get('tweet').execute(message, args);
    }  
    if(command === 'prefix'){
        client.commands.get('prefix').execute(message, args);
    }  
    if(command === 'cwelcome'){
        client.commands.get('cwelcome').execute(message, args);
    }  
    if(command === 'cleave'){
        client.commands.get('cleave').execute(message, args);
    } 
    if(command === 'clogs'){
        client.commands.get('clogs').execute(message, args);
    }
    if(command === 'suggestion'){
        client.commands.get('suggestion').execute(message, args,client);
    }
    if(command === 'bal'){
        client.commands.get('bal').execute(message, args,client);
    }
    if(command === 'join'){
        client.commands.get('join').execute(message, args,client);
    }
    if(command === 'value'){
        client.commands.get('value').execute(message, args,client);
    }
    if(command === 'convert'){
        client.commands.get('convert').execute(message, args,client);
    }
    if(command === 'with'){
        client.commands.get('with').execute(message, args,client);
    }
    if(command === 'dep'){
        client.commands.get('dep').execute(message, args,client);
    }
    if(command === 'jobslist'){
        client.commands.get('jobslist').execute(message, args,client);
    }
     if(command === 'work'){
        client.commands.get('work').execute(message, args,client);
    }
    if(command === 'profile'){
        client.commands.get('profile').execute(message, args,client);
    }
    if(command === 'daily'){
        client.commands.get('daily').execute(message, args,client);
    }
    if(command === 'monthly'){
        client.commands.get('monthly').execute(message, args,client);
    }
    if(command === 'gamble'){
        client.commands.get('gamble').execute(message, args,client);
    }
    if(command === 'shop'){
        client.commands.get('shop').execute(message, args,client);
    }
    if(command === 'buy'){
        client.commands.get('buy').execute(message, args,client);
    }
    if(command === 'sharemarket'){
        shareUpdate();
        client.commands.get('sharemarket').execute(message, args,client);
    }
    if(command === 'resign'){
        client.commands.get('resign').execute(message, args,client);
    }
    if(command === 'shares'){
        client.commands.get('shares').execute(message, args,client);
    }
    if(command === 'give'){
        client.commands.get('give').execute(message, args,client);
    }
    if(command === 'sell'){
        client.commands.get('sell').execute(message, args,client);
    }
    if(command === 'inventory'){
        client.commands.get('inventory').execute(message, args,client);
    }
    if(command === 'mode'){
        client.commands.get('mode').execute(message, args,client);
    }
    if(command === 'raid'){
        client.commands.get('raid').execute(message, args,client);
    }
    if(command === 'use'){
        client.commands.get('use').execute(message, args,client);
    }
    if(command === 'inv'){
        client.commands.get('inv').execute(message, args,client);
    }
    if(command === 'propose'){
        client.commands.get('propose').execute(message, args,client);
    }
    if(command === 'beg'){
        client.commands.get('beg').execute(message, args,client);
    }
    if(command === 'divorce'){
        client.commands.get('divorce').execute(message, args,client);
    }
    if(command === 'partner'){
        client.commands.get('partner').execute(message, args,client);
    }
    if(command === 'gay'){
        client.commands.get('gay').execute(message, args,client);
    }   
    if(command === 'trade'){
        client.commands.get('trade').execute(message, args,client);
    }  
    if(command === 'botinfo'){
        client.commands.get('botinfo').execute(message, args,client);
    }
    if(command === 'fish'){
        client.commands.get('fish').execute(message, args,client);
    }     
    if(command === 'truth'){
        client.commands.get('truth').execute(message, args,client);
    }     
    if(command === 'dare'){
        client.commands.get('dare').execute(message, args,client);
    } 
    if(command === 'hunt'){
        client.commands.get('hunt').execute(message, args,client);
    }    
    if(command === 'kiss'){
        client.commands.get('kiss').execute(message, args,client);
    }    
    if(command === 'hug'){
        client.commands.get('hug').execute(message, args,client);
    }  
    if(command === 'rps'){
        client.commands.get('rps').execute(message, args,client);
    }  
    if(command === 'userinfo'){
        client.commands.get('userinfo').execute(message, args,client);
    } 
    if(command === 'set-bio'){
        client.commands.get('set-bio').execute(message, args,client);
    } 
    if(command === 'set-hobby'){
        client.commands.get('set-hobby').execute(message, args,client);
    } 
    if(command === 'familyinv'){
        client.commands.get('familyinv').execute(message, args,client);
    } 
    if(command === 'find'){
        client.commands.get('find').execute(message, args,client);
    } 
    if(command === 'settings-raid'){
        client.commands.get('settings-raid').execute(message, args,client);
    }
    if(command === 'settings-welcome'){
        client.commands.get('settings-welcome').execute(message, args,client);
    }
    if(command === 'settings-leave'){
        client.commands.get('settings-leave').execute(message, args,client);
    }
    if(command === 'settings-logs'){
        client.commands.get('settings-logs').execute(message, args,client);
    }

    if(command === 'settings-hobby'){
        client.commands.get('settings-hobby').execute(message, args,client);
    }

      if(command === 'gift'){
        client.commands.get('gift').execute(message, args,client);
    }
    if(command === 'settings-bio'){
        client.commands.get('settings-bio').execute(message, args,client);
    }
    if(command === 'donate'){
        client.commands.get('donate').execute(message, args,client);
    }
    if(command === 'premium'){
      client.commands.get('premium').execute(message, args,client);
  }
  if(command === 'weekly'){
    client.commands.get('weekly').execute(message, args,client);
  }
  if(command === 'dig'){
    client.commands.get('dig').execute(message, args,client);
}
if(command === 'leaderboard'){
  client.commands.get('leaderboard').execute(message, args,client);
}
if(command === 'lottery'){
  client.commands.get('lottery').execute(message, args,client);
}
if(command === 'treasure'){
  client.commands.get('treasure').execute(message, args,client);
}
if(command === 'rank'){
  client.commands.get('rank').execute(message, args,client);
}

  
    
    

   
    
    
    if(message.content.startsWith(prefix + 'serverinfo')){
    //  var categories = message.guild.categories.size;
      //console.log(categories)
      //const categoryChannels = message.guild.channels.forEach(channel => channel.type === "category"); 
      //console.log(categoryChannels)
     // var voice_channles = message.guild.channels.filter((c) => c.type === "voice").size
   //  console.log(message.guild.categories)
      var embed = new Discord.MessageEmbed();
      embed.setTitle(`Server Info`);
      const {guild} = message;
      const icon = guild.iconURL()
      var serverIcon = message.guild.iconURL();
      const ownername = message.guild.members.cache.get(message.guild.ownerId);
      console.log(ownername);
      embed.addFields({name:'Server name -',value:`${message.guild.name}`},
      {name:'ID:',value:`${message.guild.id}`},
      {name:'Owner -',value:`<@!${message.guild.ownerId}>`},
      {name:'Region',value:`${message.guild.preferredLocale}`},
      
      {name:'Total Members:',value: `${message.guild.memberCount}`},
      {name:'Created At',value:`${message.guild.createdAt}`},
      {name:'Total Roles',value:`${message.guild.roles.cache.size}`},
      )
      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
      embed.setColor(`#404EED`);
      embed.setTimestamp();
     // console.log(message.guild.createdAt);
      //console.log(message.guild.roles);
      console.log(message.guild.channels);
     // console.log(message.guild)
      //console.log(message.guild.region)
      embed.setThumbnail(icon)
      message.channel.send({embeds:[embed]})
    }
  
   
})
//keepAlive()
//keepAlive()
//keepAlive();
client.login(process.env.token);