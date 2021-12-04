const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports={
    name:'give',
    async execute(message,args){
        const target = message.mentions.users.first();
        let userData = await userModel.findOne({userID:message.author.id});
     


        if(userData){
            if(target){ 
                let targetData = await userModel.findOne({userID:target.id});    
                if(targetData){

                    if(!isNaN(args[1]) && Math.sign(args[1]) === 1){
                        if(userData.wallet >= args[1]){
                            if(targetData.wallet < 1000000000 && targetData.wallet + parseInt(args[1])<=1000000000 ){
                                let wallet = userData.wallet - args[1];
                                let networth = userData.networth - args[1];
                                let wallet2 = targetData.wallet + args[1];
                                let networth2 = targetData.networth + args[1];
                                const response = await userModel.findOneAndUpdate({
                                    userID:message.author.id,
                                },
                                {  
                                $inc: {
                                    wallet:-args[1],
                                    networth:-args[1]

                                },
                                }
                                )
                                const response2 = await userModel.findOneAndUpdate({
                                    userID:target.id,
                                },
                                {  
                                $inc: {
                                    wallet:args[1],
                                    networth:args[1]
                                },
                                }
                                )
                                const embed = new Discord.MessageEmbed();
                                embed.setAuthor(`✅ Successfully Transferred`);
                                embed.setDescription(`You have successfully transferred ${args[1]} to <@!${target.id}>. Now your currrent wallet balance is ${wallet}`);
                                embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                                embed.setTimestamp();
                                embed.setColor(`#30CC71`);
                                message.channel.send({embeds:[embed]});
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`❌ Transaction Failed`);
                                embed.setDescription(`${target} can't have more than 1 billion coins in their wallet`);
                                message.channel.send({embeds:[embed]});
                            }
                

                        }else{
                            message.channel.send(`${message.author}, You dont' have enough money in your wallet!`);
                        }
                        
                    }else{
                            message.channel.send(`${message.author} Please mention a valid number!`);
                    }
                        
                }else{
                    message.channel.send(`${target}, You haven't joined the game type ;join to join the game.`);
                }
            }else{
                message.channel.send(`${message.author}, Please mention the person to give money!`);
            }
        }else{
            message.channel.send(`${message.author}, You haven't joined the game type ;join to join the game.`);
        }
    }
}