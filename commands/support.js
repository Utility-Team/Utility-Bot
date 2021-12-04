const Discord = require('discord.js')
module.exports = {
  name:'support',
  async execute(message,args){
   const embed = new Discord.MessageEmbed();
   const server_name = 'https://discord.gg/F3eUMqgPcW'
   embed.setTitle('Utility Support!');
   embed.setDescription('Click the support button to join the support server');
   embed.setFooter('Thanks for choosing Utility!','https://i.ibb.co/tYb8d0f/w-Gs-Oh-JDa6a57w-AAAABJRU5-Erk-Jggg.png');
   embed.setTimestamp();
   embed.setColor(`#4336FE`);
   const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel('❓| Support')
            .setStyle('LINK')
            .setURL('https://discord.gg/6nPnrzv6')
    );
    let send = true;
      message.author.send({embeds:[embed],components:[row]}).catch(()=>{
        send = false;
        message.channel.send({embeds:[embed],components:[row]});
      });
      if(send){
        message.channel.send(`${message.author} the link for support has been sent to your dm`);
      }
 
  }
}