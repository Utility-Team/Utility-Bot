const Discord = require('discord.js');
const warnModel = require('../models/warnSchema');
module.exports={
    name:`unwarn`,
    async execute(message,args){
        const target = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            if(message.member.permissions.has('ADMINISTRATOR')){
              let warnData = await warnModel.findOne({userid:target.id,guildID:message.guild.id});
              let number = args[1];
              if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){  
                        if(warnData){
                                let arrnumber = number -1;
                                if(warnData.reasons[arrnumber]){
                                    let reasonsarray = warnData.reasons;
                                     //  delete reasonsarray[arrnumber];
                                    reasonsarray.splice(arrnumber,1);
                                    console.log(reasonsarray);
                                    const response = await warnModel.findOneAndUpdate({userid:target.id,guildID:message.guild.id},{
                                        $inc:{
                                            totalwarns:-1
                                        },
                                        reasons:reasonsarray

                                    });
                                    let embed = new Discord.MessageEmbed();
                                    embed.setTitle(`Warn (${number}) has been removed!`);
                                    embed.setColor(`#30CC71`);
                                    message.channel.send({embeds:[embed]});
                                }else{
                                    message.channel.send(`${message.author}, warn (${number}) doesn't exists`);
                                }

                        }else{
                            message.channel.send(`${message.author}, the person you mentioned doesn't have any warns history`);
                        }
                    }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                        message.channel.send({embeds:[embed]});
                    }
              }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                message.channel.send({embeds:[embed]});
              }
            }else{
             message.channel.send(`${message.author}, You do not have required permissions to warn someone!`);
            }
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setAuthor(`${message.author.username}, Please mention someone who is in the server!`);
            embed.setDescription(`Follow this format: unwarn @name warn number 
            example - unwarn @name 1`);
            message.channel.send({embeds:[embed]});
        }
    }
}