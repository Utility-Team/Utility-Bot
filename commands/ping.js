const Discord = require('discord.js');
module.exports ={
    name:`ping`,
    async execute(message,args,client){
        const embed = new Discord.MessageEmbed();
        message.channel.send('Loading data').then (async (msg) =>{
          msg.delete();
          embed.setTitle(`🏓Latency:${client.ws.ping}ms`);
          embed.setColor(`#404EED`);
          message.channel.send({embeds:[embed]});
        });
    }
}