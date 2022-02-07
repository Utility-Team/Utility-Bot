const Discord = require('discord.js')
module.exports = {
  name:'inviteme',
  aliases:['inviteme','invitebot'],
  async execute(message,args){
    const embed = new Discord.MessageEmbed();
    embed.setTitle('Utility the multipurpose bot your server needs!');
    embed.setDescription('**Click the invite button to add it to your server**');
    embed.setFooter('Thanks for choosing Utility!','https://i.ibb.co/tYb8d0f/w-Gs-Oh-JDa6a57w-AAAABJRU5-Erk-Jggg.png');
    embed.setTimestamp();
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
            .setURL('https://discord.com/oauth2/authorize?client_id=824626723878207499&permissions=8&scope=bot')
    );
      let send = true;
      message.author.send({embeds:[embed],components:[row]}).catch(()=>{
        send = false;
        message.channel.send({embeds:[embed],components:[row]});
      });
      if(send){
        message.channel.send(`${message.author} the invite link of the bot has been sent to your dm`);
      }
    
  }
}