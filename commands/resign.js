const Discord = require('discord.js');
const { findOneAndUpdate } = require('../models/userSchema');
const userModel = require("../models/userSchema");
const serverModel = require('../models/profileSchema');
module.exports = {
    name:`resign`,
    async execute(message,args){
       const userID = await userModel.findOne({userID:message.author.id});
       const serverData = await serverModel.findOne({guildID:message.guild.id});
       if(userID){
        let userinfo = await userModel.findOne({userID:message.author.id});
        if(userinfo){
       if(userinfo.xp / 1500 === 0){
         const response = await userModel.findOneAndUpdate({
             userID:message.author.id,
           },
           {
             $inc:{
               xp:15,
               commands:1,
               level:1
             }
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
        message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

       }
    }
}