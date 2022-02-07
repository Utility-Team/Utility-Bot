const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports = {
    name:'shares-stats',
    aliases:['shares-stats','sharesstats','stock-stats','stockstats'],
    async execute(message,args){
        const userData = await userModel.findOne({userID:message.author.id});
        if(userData){
            const embed = new Discord.MessageEmbed();
            embed.setAuthor(`${message.author.username}'s shares stats`,message.author.displayAvatarURL());
            embed.addFields({name:`Total Shares:`,value:`98`},
            {name:`Total money invested:`,value:`<:uc:922720730272137256> 5000`},
            {name:`Returns:`,value:`+ <:uc:922720730272137256> 500`},
            {name:`Current Price:`,value:`<:uc:922720730272137256> 5500`}
            );
            embed.setFooter(`Requested by ${message.author.username}`);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
        }
    }
}