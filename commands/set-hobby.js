const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:`set-hobby`,
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.fidnOne({guildID:message.guild.id});
        if(userData){
         let hobby = args.join(' ');
         if(hobby && hobby !== ''){
              if(hobby.length <= 70){
                const response = await userModel.findOneAndUpdate({userID:message.author.id},
                    {
                        hobby:hobby
                    }
                );
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, Your hobby list has been updated successfully`);
                embed.setColor(`#30CC71`);
                message.channel.send({embeds:[embed]});
              }else{
                  message.channel.send(`${message.author}, Your hobby list can't be longer than 70 characters`);
              }
         }else{
             message.channel.send(`${message.author}, hobby can't be empty!`);
         }
         
        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

        }
    }
}