const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: "tweet",
    description: "tweet something on twitter!",
     async execute ( message, args) {
      if(args[0]){
        fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.join(' ')}`)
        .then((res) => res.json())
        .then((data) => {
            let embed = new MessageEmbed()
            .setTitle("Tweet!")
            .setImage(data.message)
            .setTimestamp()
            message.channel.send({embeds:[embed]});
        });
      }else{
          let embed = new MessageEmbed();
          embed.setTitle(`${message.author.username}, you didn't mention what you want to tweet!`);
          message.channel.send({embeds:[embed]});
      }
       
    }
}