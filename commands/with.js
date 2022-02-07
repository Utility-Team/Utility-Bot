const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'with',
    aliases:['with','withdraw'],
    async execute(message,args){
      let userData = await userModel.findOne({userID:message.author.id});
      let serverData = await serverModel.findOne({guildID:message.guild.id});
      if(userData){
            let userinfo = await userModel.findOne({userID:message.author.id});
            if(userinfo){
              if(userinfo.xp / 1500 === 0){
                const response = await userModel.findOneAndUpdate({
                    userID:message.author.id,
                  },
                  {
                    $inc:{
                      xp:1,
                      level:1,
                      commands:1
                    },
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
          if(args[0]){
            if(args[0] === 'all'){
               if(userData.bank >= 0){
                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                  $inc:{
                    wallet:userData.bank,
                    bank:-userData.bank
                  }
                });
                message.channel.send(`${message.author}, ${userData.bank} have been withdrawn from your bank and are transferred to your wallet!`);
               }else{
                 message.channel.send(`${message.author}, There is no money to withdraw from your bank.`);
               }
            }else if(args[0] === 'max'){
              if(userData.bank >= 0){
                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                  $inc:{
                    wallet:userData.bank,
                    bank:-userData.bank
                  }
                });
                message.channel.send(`${message.author}, ${userData.bank} have been withdrawn from your bank and are transferred to your wallet!`);
               }else{
                 message.channel.send(`${message.author}, There is no money to withdraw from your bank.`);
               }
            }else{
              let number = args[0];
              if(userData.bank >= number){
                if(!isNaN(number) && Math.sign(number) === 1){
                  if(number % 1=== 0){
                    if(userData.bank >= 0){
                      if(userData.wallet < 5000000000 && userData.wallet + parseInt(number) <= 5000000000 ){
                        let d = new Date();
                        let n = d.getTime();
                        let lastwith;
                        if(userData.lastwith){
                          lastwith = userData.lastwith;
                        }else{
                          lastwith = 0;
                        }
                        let timeup;
                        let timeup2;
                        if(userData.premium === 'enable'){
                          timeup = 3000;
                          timeup2 = 3;
                        }else{
                          timeup = 5000;
                          timeup2 = 5;
                        }
                        if(n - lastwith >= timeup){
                            message.channel.send(`${message.author}, ${number} have been withdrawn from your bank and are transferred to your wallet!`);  
                            let d2 = new Date();
                            let n2 = d2.getTime();
                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                              $inc:{
                                wallet:number,
                                bank:-number
                              },
                              lastwith:n2
                            });
                        }else{
                          var msec = n - lastwith;
                          console.log(msec);
                          var ss = Math.floor(msec / 1000);
                          var second = timeup2 - ss;
                          if(userData.premium !== 'enable'){
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Wait bro!`);
                            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to withdraw again!. The default cooldown is of **5** seconds but for premium users it is of **3** seconds to become a premium user use premium command.`);
                            message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Chill bro!`);
                            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to withdraw again!.`);
                            embed.setColor('#025CFF');
                            message.channel.send({embeds:[embed]});
                          }
                        }
                      }else{
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`❌ Withdraw Failed`);
                        embed.setDescription(`${message.author}, You can't have more than 1 billion coins in your wallet`);
                        message.channel.send({embeds:[embed]});
                      }
                    }else{
                      message.channel.send(`${message.author}, There is no money to withdraw from your bank.`);
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
                message.channel.send(`${message.author}, You don't have that much money in your bank to withdraw`);
              }

            }

          }
      }else{
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

      }
    
    }
}