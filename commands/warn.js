const Discord = require('discord.js');
const warnModel = require('../models/warnSchema');
module.exports = {
  name: 'warn',
  description: "This command warns a member!",
  async  execute(message, args){
    const target = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
      if(target){   
          if(target && message.member.permissions.has('ADMINISTRATOR')){
                const memberTarget = message.guild.members.cache.get(target.id);
                if(!memberTarget.permissions.has('ADMINISTRATOR')){
                  let warnData = await warnModel.findOne({userid:target.id , guildID:message.guild.id});
                  if(warnData){
                      let reason1 = args;
                      delete reason1[0];
                      let reason = args.join(' ');
                      console.log(reason);
                      if(reason === '' || reason === null){
                            reason = 'not specified';
                      }
                      let newwarnname = warnData.totalwarns + 1;
                      let insertReason = {
                        warnname:`warn${newwarnname}`,
                        reason:`${reason}`,
                        executorid:`${message.author.username}#${message.author.discriminator}`
                      }
                      let reasonarray = warnData.reasons;
                      reasonarray.push(insertReason);
                      let newWarnData2 = await warnModel.findOneAndUpdate({userid:target.id,guildID:message.guild.id},{
                        $inc:{
                          totalwarns:1,
                        },   
                        reasons:reasonarray,
                        executorid:`${message.author.username}#${message.author.discriminator}`
                      });
                      const {guild} = message;
                      const icon = guild.iconURL();
                      var embed2 = new Discord.MessageEmbed();
                      embed2.setTitle(`From ${message.guild.name}`);
                      embed2.addFields({name:`**:warning: Warn Alert**`,value:`You were warned by ${message.author} for **${reason}**`});
                      embed2.setThumbnail(icon);
                      embed2.setColor(`#404EED`);
                      embed2.setTimestamp();
                      memberTarget.send({embeds:[embed2]}).catch((err)=>{
                        console.log(err);
                      });
                      let embed = new Discord.MessageEmbed();
                      embed.setTitle(`Warned!`);
                      embed.setThumbnail(`${target.displayAvatarURL()}`);
                      embed.setDescription(`${target} has been warned for **${reason}**`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      message.channel.send({embeds:[embed]});
                  }else{
                    let reason1 = args;
                    delete reason1[0];
                    let reason = args.join(' ');
                    console.log(reason);
                    if(reason === '' || reason === null){
                          reason = 'not specified';
                    }
                    const {guild} = message;
                    const icon = guild.iconURL()
                    var embed2 = new Discord.MessageEmbed();
                    embed2.setTitle(`From ${message.guild.name}`);
                    embed2.addFields({name:`**:warning: Warn Alert**`,value:`You were warned by ${message.author} for **${reason}**`});
                    embed2.setThumbnail(icon);
                    embed2.setColor(`#404EED`);
                    embed2.setTimestamp();
                    memberTarget.send({embeds:[embed2]}).catch((err)=>{
                      console.log(err)
                    })
                    let embed = new Discord.MessageEmbed();
                    embed.setTitle(`Warned!`);
                    embed.setThumbnail(`${target.displayAvatarURL()}`);
                    embed.setDescription(`${target} has been warned for **${reason}**`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});
                    let authorid = target;
                    let newWarnData = await warnModel.create({
                      userid:target.id,
                      username:memberTarget.user.username,
                      executorid:`${message.author.username}#${message.author.discriminator}`,
                      guildID:message.guild.id,
                      totalwarns:1,
                      reasons:[{
                        warnname:'warn1',
                        reason:`${reason}`,
                        executorid:`${message.author.username}#${message.author.discriminator}`
                      }]
                    });
                    newWarnData.save();
                  }
                 }else{
                   message.channel.send(`${message.author} you can not warn the mentioned person has admin perms`);
                 }
          }else{
                message.channel.send(`${message.author}, You do not have required permissions to warn someone!`);
          }
        }else{
            message.channel.send('Kindly specify a name to warn');
        }
  }
}