const Discord = require('discord.js');
const profileModel = require('../models/profileSchema');
const fs = require('fs');
const path = require("path");
module.exports={
  name:'prefix',
  aliases:['prefix','p'],
  async execute(message,args){
   if(message.member.permissions.has('ADMINISTRATOR')){
    if(!args[0]){
      let profileData = await profileModel.findOne({guildID: message.guild.id});
      const embed = new Discord.MessageEmbed();
      embed.setTitle(`The current prefix of the bot is ${profileData.prefix}`);
      message.channel.send({embeds:[embed]});
    }else{
      if(args[0].length<=4){
          let profileData = await profileModel.findOne({guildID: message.guild.id});
            
          const response = await profileModel.findOneAndUpdate({
            guildID:message.guild.id,
          },
          {  
            prefix:args[0]
          }
          );
          var obj;
         
          fs.readFile('profileSchema.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
         //   prefix = obj.prefix;
            if(obj.data[String(message.guild.id)]){
            //  / console.log('yes')
              console.log(obj.data)
              obj.data[String(message.guild.id)].prefix = args[0];
              fs.writeFileSync(path.resolve(__dirname, 'profileSchema.json'), JSON.stringify(obj));
            }else if(obj[String(message.guild.id)]){
              obj[String(message.guild.id)].prefix = args[0];
              fs.writeFileSync(path.resolve(__dirname, 'profileSchema.json'), JSON.stringify(obj));
            }
            //console.log(obj);
          });
        
          
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`${message.author.username} the prefix of the bot has been set to ${args[0]}`)
          message.channel.send({embeds:[embed]});
          let logschannel = profileData.logschannel;
          const logs_channel = message.guild.channels.cache.find(i=>i.id ===logschannel);
          if(logs_channel){
            const embed1 = new Discord.MessageEmbed();
            var serverIcon = message.guild.iconURL();
            embed1.setAuthor(`Prefix Changed`,serverIcon);
            embed1.addFields({name:`${message.author.username} has changed the bot's prefix`,value:`new prefix - **${args[0]}**`});
            embed1.setColor(`#30CC71`);
            embed1.setTimestamp();
            logs_channel.send({embeds:[embed1]});
          }
      }else{
        const embed = new Discord.MessageEmbed();
        embed.setAuthor(`${message.author.username}, you can't set a prefix of more than 4 characters!`);
        message.channel.send({embeds:[embed]});
      }

    }
   }else{
     const embed = new Discord.MessageEmbed();
     embed.setTitle(`${message.author.username}, You don't have the perms to change the prefix`);
     message.channel.send({embeds:[embed]});
   }
  }
}