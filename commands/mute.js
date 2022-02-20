const Discord = require('discord.js');
const muteModel = require('../models/muteSchema');
const serverModel = require('../models/profileSchema');
const ms = require('ms');
module.exports={
  name:'mute',
  async execute(message,args,client){
    const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let serverData = await serverModel.findOne({guildID:message.guild.id});
    if(target){
      let mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
      const memberTarget = message.guild.members.cache.get(target.id);
      if(message.member.permissions.has('MANAGE_MESSAGES')){
        if(memberTarget.roles.highest.name.toLowerCase() === 'muted'){
          return message.channel.send(`${message.author}, the person you mentioned is already muted`);
        }
        if(args[1]){
              console.log(message.guild.me.roles.highest.name);
              if(mutedRole){
                if(!memberTarget.permissions.has('ADMINISTRATOR')){
                  if(memberTarget.roles.highest.comparePositionTo(message.guild.roles.cache.find(role => role.name === 'Muted')) < 0){
                    console.log(message.guild.me.roles.highest.name);
                      if(message.guild.me.roles.highest.comparePositionTo(message.guild.roles.cache.find(role=>role.name === 'Muted'))>=0){
                        console.log(target.roles);
                        memberTarget.roles.add(mutedRole);
                        let embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Muted`);
                        embed.addFields({name:`User:`,value:`${memberTarget.user.username}`},
                          {name:`Muted by:`,value:`${message.author.username}`}
                        );
                        embed.setThumbnail(memberTarget.user.displayAvatarURL());
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});

                        let muteData = await muteModel.findOne({userID:memberTarget.id});
                        if(muteData){
                          let d = new Date();
                          let n = d.getTime();
                          const response = await muteModel.findOneAndUpdate({userID:memberTarget.id,guildID:message.guild.id},{
                            lastmuted:n,
                            mutedfor:ms(args[1])
                          });
                        }else{
                          let d = new Date();
                          let n = d.getTime();
                          let profile = await muteModel.create({
                            userID:memberTarget.id,
                            lastmuted:n,
                            mutedfor:ms(args[1]),
                            guildID:message.guild.id,
                            username:memberTarget.user.username
                          });
                          profile.save();
                        }

                        let embed2 = new Discord.MessageEmbed();
                        embed2.setAuthor(`From ${message.guild.name}`,message.guild.iconURL());
                        embed2.addFields({name:`Action:`,value:`Mute`},
                          {name:`Mute Duration:`,value:`${ms(args[1])}`}
                        );
                        embed2.setTimestamp();
                        memberTarget.send({embeds:[embed2]}).catch((err)=>{
                          console.log(err);
                        });

                        let embed3 = new Discord.MessageEmbed();
                        embed3.setAuthor(`Action: Mute`,memberTarget.user.displayAvatarURL());
                        embed3.addFields({name:`Offender: ${memberTarget.user.username}`,value:`**Duration**: ${args[1]}`},
                          {name:`muted executed in: ${message.channel.name}`,value:`executed by: ${message.author}`}
                        );
                        embed3.setFooter(`user ID: ${memberTarget.user.id}`);
                        embed3.setColor(`#fc9803`);
                        embed3.setTimestamp();
                        let channelID = serverData.logschannel;
                        const logschannel = message.guild.channels.cache.find(i=>i.id ===channelID);
                        if(logschannel){
                            logschannel.send({embeds:[embed3]}); 
                        }
                        setTimeout(function(){
                          memberTarget.roles.remove(mutedRole);
                        },ms(args[1]));
                    }else{
                      const embed = new Discord.MessageEmbed();
                      embed.setTitle(`❌ Can't mute that person`);
                      embed.setDescription(`Kindly drag bot's role above muted roled`);
                      embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                      embed.setTimestamp();
                      embed.setColor('#ED4245');
                      message.channel.send({embeds:[embed]});
                    }
                  }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`❌ Can't mute that person`);
                    embed.setDescription(`Kindly drag muted role above the mentioned person's highest role`);
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setColor('#ED4245');
                    message.channel.send({embeds:[embed]});
                  }

                }else{
                  const embed = new Discord.MessageEmbed();
                  embed.setTitle(`❌ Can't mute that member is an admin/mod`)
                  message.channel.send({embeds:[embed]});
                }
              }else{
                    try{
                      let mutedRole = await message.guild.roles.create({
                      name:'Muted',
                      permissions:[],
                      position:memberTarget.roles.highest.position + 1  
                      });

                      message.guild.channels.cache.map((x)=>{
                        if(!x.isThread()){
                          x.permissionOverwrites.edit(
                            mutedRole,
                            {
                              MANAGE_WEBHOOKS:false,
                              SEND_MESSAGES:false,
                              ADD_REACTIONS:false,
                              USE_PUBLIC_THREADS:false,
                              USE_PRIVATE_THREADS:false,
                              ATTACH_FILES:false,
                              SEND_TTS_MESSAGES:false,
                              MANAGE_THREADS:false,
                              MANAGE_MESSAGES:false,
                              MENTION_EVERYONE:false,
                            },
                        

                          ).catch(err=>console.log(err));
                        }
                      })

                      let role2 = message.guild.roles.cache.find((role)=>role.name ==='Muted');
                      if(role2){
                        memberTarget.roles.add(mutedRole);
                        console.log(memberTarget.roles);
                        let embed = new Discord.MessageEmbed();
                        embed.setAuthor(`✅ Successfully Muted`);
                        embed.addFields({name:`User:`,value:`${memberTarget.user.username}`},
                          {name:`Muted by:`,value:`${message.author.username}`}
                        );
                        embed.setThumbnail(memberTarget.user.displayAvatarURL());
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setColor(`#30CC71`);
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});

                        let embed2 = new Discord.MessageEmbed();
                        embed2.setAuthor(`From ${message.guild.name}`,message.guild.iconURL());
                        embed2.addFields({name:`Action:`,value:`Mute`},
                          {name:`Mute Duration:`,value:`${ms(args[1])}`}
                        );
                        embed2.setTimestamp();
                        memberTarget.send({embeds:[embed2]}).catch((err)=>{
                          console.log(err);
                        });
                        let muteData = await muteModel.findOne({userID:memberTarget.id});
                        if(muteData){
                          let d = new Date();
                          let n = d.getTime();
                          const response = await muteModel.findOneAndUpdate({userID:memberTarget.id,guildID:message.guild.id},{
                            lastmuted:n,
                            mutedfor:ms(args[1]),
                          });
                        }else{
                          let d = new Date();
                          let n = d.getTime();
                          let profile = await muteModel.create({
                            userID:memberTarget.id,
                            lastmuted:n,
                            mutedfor:ms(args[1]),
                            guildID:message.guild.id,
                            username:memberTarget.user.username,
                          });
                          profile.save();
                        }
                      }

                    }catch(error){
                      console.log(error);
                    }
                    let embed3 = new Discord.MessageEmbed();
                    embed3.setAuthor(`Action: Mute`,memberTarget.user.displayAvatarURL());
                    embed3.addFields({name:`Offender: ${memberTarget.user.username}`,value:`**Duration**: ${args[1]}`},
                      {name:`muted executed in: ${message.channel.name}`,value:`executed by: ${message.author}`}
                    );
                    embed3.setFooter(`user ID: ${memberTarget.user.id}`);
                    embed3.setColor(`#fc9803`);
                    embed3.setTimestamp();
                    let channelID = serverData.logschannel;
                    const logschannel = message.guild.channels.cache.find(i=>i.id ===channelID);
                    if(logschannel){
                        logschannel.send({embeds:[embed3]}); 
                    }

                    setTimeout(function(){
                      memberTarget.roles.remove(mutedRole)
                    },ms(args[1]));
              }
        }else{
          //
          
          let mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
          if(mutedRole){
            if(!memberTarget.permissions.has('ADMINISTRATOR')){
              if(memberTarget.roles.highest.comparePositionTo(message.guild.roles.cache.find(role => role.name === 'Muted')) < 0){
                    console.log(target.roles);
                    memberTarget.roles.add(mutedRole);
                    let embed = new Discord.MessageEmbed();
                    embed.setAuthor(`✅ Successfully Muted`);
                    embed.addFields({name:`User:`,value:`${memberTarget.user.username}`},
                      {name:`Muted by:`,value:`${message.author.username}`}
                    );
                    embed.setThumbnail(memberTarget.user.displayAvatarURL());
                    embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                    embed.setColor(`#30CC71`);
                    embed.setTimestamp();
                    message.channel.send({embeds:[embed]});

                    let muteData = await muteModel.findOne({userID:memberTarget.id});
                    if(muteData){
                      let d = new Date();
                      let n = d.getTime();
                      const response = await muteModel.findOneAndUpdate({userID:memberTarget.id,guildID:message.guild.id},{
                        lastmuted:n,
                        mutedfor:0,
                        forevermute:'true'
                      });
                    }else{
                      let d = new Date();
                      let n = d.getTime();
                      let profile = await muteModel.create({
                        userID:memberTarget.id,
                        lastmuted:n,
                        mutedfor:0,
                        forevermute:'true',
                        guildID:message.guild.id,
                        username:memberTarget.user.username
                      });
                      profile.save();
                    }

                    let embed2 = new Discord.MessageEmbed();
                    embed2.setAuthor(`From ${message.guild.name}`,message.guild.iconURL());
                    embed2.addFields({name:`Action:`,value:`Mute`},
                      {name:`Muted by:`,value:`${message.author.username}`}
                    );
                    embed2.setTimestamp();
                    memberTarget.send({embeds:[embed2]}).catch((err)=>{
                      console.log(err);
                    });
              }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`❌ Can't mute that person`);
                embed.setDescription(`Kindly drag muted role above the mentioned person's highest role`);
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setTimestamp();
                embed.setColor('#ED4245');
                message.channel.send({embeds:[embed]});
              }

            }else{
              const embed = new Discord.MessageEmbed();
              embed.setTitle(`❌ Can't mute that member is an admin/mod`)
              message.channel.send({embeds:[embed]});
            }
          }else{
            try{
              let mutedRole = await message.guild.roles.create({
              name:'Muted',
              permissions:[],
              position:memberTarget.roles.highest.position + 1  
              });

              message.guild.channels.cache.map((x)=>{
                if(!x.isThread()){
                  x.permissionOverwrites.edit(
                    mutedRole,
                    {
                      MANAGE_WEBHOOKS:false,
                      SEND_MESSAGES:false,
                      ADD_REACTIONS:false,
                      USE_PUBLIC_THREADS:false,
                      USE_PRIVATE_THREADS:false,
                      ATTACH_FILES:false,
                      SEND_TTS_MESSAGES:false,
                      MANAGE_THREADS:false,
                      MANAGE_MESSAGES:false,
                      MENTION_EVERYONE:false,
                    }

                  ).catch(err=>console.log(err));
                }
              })

              let role2 = message.guild.roles.cache.find((role)=>role.name ==='Muted');
              if(role2){
                memberTarget.roles.add(mutedRole);
                console.log(memberTarget.roles);
                let embed = new Discord.MessageEmbed();
                embed.setAuthor(`✅ Successfully Muted`);
                embed.addFields({name:`User:`,value:`${memberTarget.user.username}`},
                  {name:`Muted by:`,value:`${message.author.username}`}
                );
                embed.setThumbnail(memberTarget.user.displayAvatarURL());
                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                embed.setColor(`#30CC71`);
                embed.setTimestamp();
                message.channel.send({embeds:[embed]});

                let embed2 = new Discord.MessageEmbed();
                embed2.setAuthor(`From ${message.guild.name}`,message.guild.iconURL());
                embed2.addFields({name:`Action:`,value:`Mute`},
                  {name:`Muted by:`,value:`${message.author.username}`}
                );
                embed2.setTimestamp();
                memberTarget.send({embeds:[embed2]}).catch((err)=>{
                  console.log(err);
                });
                let muteData = await muteModel.findOne({userID:memberTarget.id});
                if(muteData){
                  let d = new Date();
                  let n = d.getTime();
                  const response = await muteModel.findOneAndUpdate({userID:memberTarget.id,guildID:message.guild.id},{
                    lastmuted:n,
                    mutedfor:0,
                    forevermute:'true'
                  });
                }else{
                  let d = new Date();
                  let n = d.getTime();
                  let profile = await muteModel.create({
                    userID:memberTarget.id,
                    lastmuted:n,
                    mutedfor:0,
                    forevermute:'true',
                    guildID:message.guild.id,
                    username:memberTarget.user.username
                  });
                  profile.save();
                }
              }
            }catch(error){
              console.log(error);
            }
          }
        }
      }
    }
  }
}