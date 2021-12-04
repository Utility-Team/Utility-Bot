const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const profileModel = require('../models/profileSchema');
const botModel = require('../models/botSchema');
module.exports = {
    name:'convert',
    async execute(message,args){
        parseFloat(args[0])
      if(args[0]){
        if(Math.sign(args[0]) === 1){
        
       
      //  if(isNaN(args[0])){
            let userData = await userModel.findOne({userID:message.author.id});
            let profileData = await profileModel.findOne({guildID:message.guild.id});
            let botdata = await botModel.findOne({botid:1});
            let cryptovalue = botdata.cryptovalue;
            if(userData){
             
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
                var coin = args[0] * cryptovalue;
                const embed1 = new Discord.MessageEmbed();
                embed1.setTitle(`${message.author.username},You can't convert 0 cryptocoins into money!`);
                if(args[0] !== 0){
                      let number = args[0];
                      if(!isNaN(number) && Math.sign(number) === 1){
                        if(number % 1=== 0){
                              if(userData.cryptocoin >= args[0]){
                                if(userData.wallet < 1000000000 && userData.wallet + parseInt(args[0]) <= 1000000000){
                      
                                    var balance =userData.wallet + coin;
                                    var cryptocoin_new = userData.cryptocoin - args[0];
                                    const response = await userModel.findOneAndUpdate({
                                        userID:message.author.id,
                                      },
                                      {
                                        wallet:balance,
                                        networth:balance
                        
                                      }
                                      
                                      );
                                      const response2 = await userModel.findOneAndUpdate({
                                        userID:message.author.id,
                                      },{
                                        cryptocoin:cryptocoin_new
                                      }
                                      );
                                    console.log(userData.cryptocoin - args[0])
                                    const embed = new Discord.MessageEmbed();
                                    embed.setTitle(`${message.author.username}, Your ${args[0]} cryptocoins are converted into money`);
                                    embed.addFields({name:`Wallet`,value:`${balance} Utility Coins`},{name:`CryptoCoins`,value:`${cryptocoin_new} coin`});
                                    message.channel.send({embeds:[embed]});
                                }else{
                                  const embed = new Discord.MessageEmbed();
                                  embed.setTitle(`❌ Convert Failed`);
                                  embed.setDescription(`${message.author}, You can't have more than 1 billion coins your wallet`);
                                  message.channel.send({embeds:[embed]});
                                }
                                  
                            }else{
                                const embed = new Discord.MessageEmbed();
                                embed.setTitle(`${message.author.username} You don't have that much cryptocoins to convert!`);
                                message.channel.send({embeds:[embed]});
                            }
                        }else{
                          const embed = new Discord.MessageEmbed();
                          embed.setTitle(`${message.author.username}, Please enter a valid number!`);
                          message.channel.send({embeds:[embed]});
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Please enter a valid number!`);
                        message.channel.send({embeds:[embed]});
                      }
                  
                }else{
                 return message.channel.send(`${message.author.username} you can't convert 0 cryptocoins`);
                }
            }else{
                const embed = new Discord.MessageEmebed();
                embed.setTitle(`${message.author.username} Please join the currency game by typing ${profileData.prefix}join`);
                message.channel.send({embeds:[embed]});
            }
          }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.author.username}, Please enter a valid number!`);
            message.channel.send({embeds:[embed]});
          }
      }else{
       const embed = new Discord.MessageEmbed();
       embed.setTitle(`${message.author.username} Please enter amount of cryptocoin you want to convert into coins`);
       message.channel.send({embeds:[embed]});
      }
    }
}