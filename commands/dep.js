const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'dep',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
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
                 let level = Math.round(userinfo.xp/1500);
                 const response = await userModel.findOneAndUpdate({
                     userID:message.author.id,
                   },
                   {
                     xp:userinfo.xp + 15,
                     commands:userinfo.commands + 1,
                     level:level
       
                   }
                   
                   );
                }
              }
           if(args[0]){
             if(args[0] === 'all'){
                let bank_limit = userData.level * 10000;
                if(userData.level === 0){
                  bank_limit = 5000;
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
              let bank_limit = userData.level * 10000;
              if(userData.level === 0){
                bank_limit = 5000;
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
                      let bank_limit = userData.level * 10000;
                      if(userData.level === 0){
                        bank_limit = 5000;
                      }
                      let bank_balance = userData.bank;
                      let wallet_balance = userData.wallet;
                      let moneyto_transfer;
                      let diff_money = bank_limit - bank_balance;
                      if(number > diff_money){
                        message.channel.send(`${message.author}, Your bank doesn't have enough space to deposit this much money!`);
                      }else if(number <= diff_money){
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            wallet:-number,
                            bank:number
                          }
                        });
                        let current_balance = wallet_balance - number;
                        message.channel.send(`${message.author}, ${number} has been deposited to your bank. Your current wallet balance = ${current_balance}`);
        
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
          message.channel.send(`${message.author}, You haven't joined the currency game. Please use join command to join the game.`);
        }      
    }
}