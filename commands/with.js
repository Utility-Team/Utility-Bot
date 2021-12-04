const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports={
    name:'with',
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
                      if(userData.wallet < 1000000000 && userData.wallet + number <= 1000000000 ){
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                          $inc:{
                            wallet:number,
                            bank:-number
                          }
                        });
                        message.channel.send(`${message.author}, ${number} have been withdrawn from your bank and are transferred to your wallet!`);
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
        message.channel.send(`${message.author}, You haven't joined the currency game. Please use join command to join the game.`);
      }
    
    }
}