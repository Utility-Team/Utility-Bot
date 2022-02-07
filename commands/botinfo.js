const Discord = require('discord.js');
const botModel = require('../models/botSchema');
module.exports={
    name:'botinfo',
    aliases:['botinfo','binfo'],
    async execute(message,args,client){
        let botData = await botModel.findOne({botid:1});
        var d = new Date();
        var n = d.getTime();
        let uptime = botData.uptime;
        let next_work = n - uptime ;
        let seconds = next_work/1000;
        let mins = next_work/60000;
        let hrs = next_work/3600000;
        const embed = new Discord.MessageEmbed();
        embed.setAuthor(`Utility Bot Info:`,'https://i.ibb.co/tYb8d0f/w-Gs-Oh-JDa6a57w-AAAABJRU5-Erk-Jggg.png');
        embed.setFields({name:`<:rightarrow:888654444798025728> Developer: abhishekkholiya#5152`,value:`**<:rightarrow:888654444798025728> Uptime:**${seconds}secs`},
         {name:`<:rightarrow:888654444798025728> Version: 4.1.5 [BETA]`,value:`**<:rightarrow:888654444798025728> Total Servers: ${client.guilds.cache.size}**`},
         {name:`**<:rightarrow:888654444798025728> Total Users: ${client.users.cache.size}**`,value:`**<:rightarrow:888654444798025728> Total Commands: 94 + commands**`},
        );
        embed.setThumbnail('https://i.ibb.co/tYb8d0f/w-Gs-Oh-JDa6a57w-AAAABJRU5-Erk-Jggg.png');
        embed.setFooter(`Thanks for choosing Utility!`,'https://i.ibb.co/tYb8d0f/w-Gs-Oh-JDa6a57w-AAAABJRU5-Erk-Jggg.png');
        embed.setColor(`#4336FE`);

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel('❓| Support')
                .setStyle('LINK')
                .setURL('https://discord.gg/6nPnrzv6'),
            new Discord.MessageButton()
                .setLabel('➕| Invite Bot')
                .setStyle('LINK')
                .setURL('https://discord.com/oauth2/authorize?client_id=824626723878207499&permissions=8&scope=bot'),
            new Discord.MessageButton()
                .setLabel('Utility Premium')
                .setStyle('LINK')
                .setEmoji('<:patreonpremium:934410962990141440>')
                .setURL('https://google.com')
        );
        message.channel.send({embeds:[embed],components:[row]});
    }
}