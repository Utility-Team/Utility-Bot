const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'dep',
    aliases:['dep','deposit'],
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(userData){
          let userinfo = await userModel.findOne({userID:message.author.id});
          if(userinfo){
               if(userinfo.xp / 1500 === 0){
                 const response = await userModel.findOneAndUpdate({
                     userID:message.author.id,
                   },{
                      $inc:{
                        xp:15,
                        commands:1,
                        level:1
                      }
                   }
                   );
               }else{
                 let level = Math.round(userinfo.xp/1500);
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
                let banklimit;
                if(userData.banklimit){
                  banklimit = userData.banklimit;
                }else{
                  banklimit = 0;
                }
                let bank_limit = userData.level * 10000 + banklimit;
                if(userData.level === 0){
                 bank_limit = 5000 + banklimit;
                }
                let bank_balance = userData.bank;
                let wallet_balance = userData.wallet;
                let moneyto_transfer;
                let diff_money = bank_limit - bank_balance;
                if(diff_money !== 0){
                   if(wallet_balance > diff_money){
                     const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                       $inc:{
                         wallet:-diff_money,
                         bank:diff_money
                       }
                     });
                     let current_balance = wallet_balance - diff_money;
                     message.channel.send(`${message.author}, ${diff_money} has been deposited to your bank. Your current wallet balance = ${current_balance}`);
                   }else if(wallet_balance <= diff_money){
                      const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                        $inc:{
                          wallet:-wallet_balance,
                          bank:wallet_balance
                        }
                      });
                      let current_balance = wallet_balance - diff_money;
                      message.channel.send(`${message.author}, ${wallet_balance} has been deposited to your bank. Your current wallet balance = ${current_balance}`);
                    }
                }else{
                  message.channel.send(`${message.author} Transaction Failed! as your bank has no more space`);
                }
             }else if(args[0] === 'max'){
              let bank_limit = userData.level * 10000 + userData.banklimit;
              if(userData.level === 0){
               bank_limit = 5000 + userData.banklimit;;
              }
              let bank_balance = userData.bank;
              let wallet_balance = userData.wallet;
              let moneyto_transfer;
              let diff_money = bank_limit - bank_balance;
              if(diff_money !== 0){
                 if(wallet_balance > diff_money){
                   const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                     $inc:{
                       wallet:-diff_money,
                       bank:diff_money
                     }
                   });
                   let current_balance = wallet_balance - diff_money;
                   message.channel.send(`${message.author}, ${diff_money} has been deposited to your bank. Your current wallet balance = ${current_balance}`);
                 }else if(wallet_balance <= diff_money){
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                      $inc:{
                        wallet:-wallet_balance,
                        bank:wallet_balance
                      }
                    });
                    let current_balance = wallet_balance - diff_money;
                    message.channel.send(`${message.author}, ${wallet_balance} has been deposited to your bank. Your current wallet balance = ${current_balance}`);
                  }
              }else{
                message.channel.send(`${message.author} Transaction Failed! as your bank has no more space`);
              }
             }else{
              let number = args[0];
              if(userData.wallet>= number){
                  if(!isNaN(number) && Math.sign(number) === 1){
                    if(number % 1=== 0){
                      let banklimit;
                      if(userData.banklimit){
                        banklimit = userData.banklimit;
                      }else{
                        banklimit = 0;
                      }
                      let bank_limit = userData.level * 10000 + banklimit;
                      if(userData.level === 0){
                       bank_limit = 5000 + banklimit;;
                      }
                      let bank_balance = userData.bank;
                      let wallet_balance = userData.wallet;
                      let moneyto_transfer;
                      let diff_money = bank_limit - bank_balance;
                      if(number > diff_money){
                        message.channel.send(`${message.author}, Your bank doesn't have enough space to deposit this much money!`);
                      }else if(number <= diff_money){
                        let d = new Date();
                        let n = d.getTime();
                        let lastdep;
                        if(userData.lastdep){
                          lastdep = userData.lastdep;
                        }else{
                          lastdep = 0;
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
                        if(n - lastdep >= timeup){
                          let current_balance = wallet_balance - number;
                          message.channel.send(`${message.author}, ${number} has been deposited to your bank. Your current wallet balance = ${current_balance}`);
                          let d2 = new Date();
                          n2 = d2.getTime();
                          const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                            $inc:{
                              wallet:-number,
                              bank:number
                            },
                            lastdep:n2
                          });
                        }else{
                          var msec = n - lastdep;
                          console.log(msec);
                          var ss = Math.floor(msec / 1000);
                          var second = timeup2 - ss;
                          if(userData.premium !== 'enable'){
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Wait bro!`);
                            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to deposit again!. The default cooldown is of **5** seconds but for premium users it is of **3** seconds to become a premium user use premium command.`);
                            message.channel.send({embeds:[embed]});
                          }else{
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(`Chill bro!`);
                            embed.setDescription(`You are in a cooldown. Please wait for ${second} seconds to deposit again!.`);
                            embed.setColor('#025CFF');
                            message.channel.send({embeds:[embed]});
                          }
                        }
        
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
                 message.channel.send(`${message.author}, Your wallet doesn't have that much money to deposit!`);
               }
             }
           }
        }else{
          message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
         
        }      
    }
}