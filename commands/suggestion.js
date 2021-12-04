const Discord = require('discord.js');
const { execute } = require("./help");
module.exports = {
    name:`suggestion`,
    async execute(message,args,client){
        message.channel.send(`${message.author}, this command is not available for some time. Sorry for the inconvenience`);
    //  if(args[0]){
    //     let reason1 = args;
    //     let reason = args.join(' ');
    //     const embed = new Discord.MessageEmbed();
    //     embed.setTitle(`Thanks for your suggestion!`);
    //     message.channel.send({embeds:[embed]});
    //     let guilds = client.guilds.cache.get('819180667673378816');
    //     const suggestions = guilds.channels.cache.find(i=>i.name ==='suggestions');
    //     const embed2 = new Discord.MessageEmbed();
    //     embed2.setTitle(`Suggestion from ${message.author.username}`);
    //     embed2.setDescription(`Suggestion - ${reason}`);
    //     suggestions.send({embeds:[embed]});
    //     console.log(guilds)
    //  }else{
    //      const embed = new Discord.MessageEmbed();
    //      embed.setTitle(`${message.author.username} please also mention your suggestion`);
    //      message.channel.send({embeds:[embed]});
    //  }
    }
}