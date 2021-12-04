const Discord = require('discord.js');
const { findOneAndUpdate } = require('../models/userSchema');
const userModel = require("../models/userSchema");

module.exports = {
    name:`resign`,
    async execute(message,args){
       const userID = await userModel.findOne({userID:message.author.id});
       if(userID){
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
         if(userID.job && userID.job!==''){
              var d = new Date();
              var n = d.getTime();
             const job = userID.job;
            const response = await userModel.findOneAndUpdate({
                userID:message.author.id,
              },
              {
                job:'',
                salary:0,
                lastresign:n

               }
              
              );
            message.channel.send(`${message.author}, You have successfully resigned from your ${job} job.`);
         }
       }else{ 
        message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
       }
    }
}