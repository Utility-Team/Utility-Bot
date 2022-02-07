const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
    name:'set-bio',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(userData){
           
                let bio = args.join(' ');
                if(bio && bio!== ''){
                    console.log(bio.length);
                    if(bio.length <= 190){
                        const response = await userModel.findOneAndUpdate({userID:message.author.id},
                            {
                                bio:bio
                            }
                        );
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`${message.author.username}, Your bio has been updated successfully`);
                        embed.setColor(`#30CC71`);
                        message.channel.send({embeds:[embed]});
                    }else{
                        message.channel.send(`${message.author}, You can't set a bio of more than 190 characters!`);
                    }
               
            }else{
                message.channel.send(`${message.author}, You can't set an empty bio! `);
            }

        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);

        }
    }
}
