const Discord = require('discord.js');
module.exports = {
    name: 'warn',
    description: "This command warns a member!",
  async  execute(message, args){
      if(args[0]){
          const target = message.mentions.users.first();
          if(target && message.member.permissions.has('ADMINISTRATOR')){
                const memberTarget = message.guild.members.cache.get(target.id);
                if(!memberTarget.permissions.has('ADMINISTRATOR')){
                    let reason1 = args;
                    delete reason1[0];
                    let reason = args.join(' ');
                    console.log(reason);
                    if(reason === '' || reason === null){
                          reason = 'not specified';
                    }
                    var embed2 = new Discord.MessageEmbed();
                    embed2.setTitle(`From ${message.guild.name}`);
                    embed2.setDescription(`You were warned by ${message.author.username} for ${reason}`);
                    embed2.setThumbnail(target.displayAvatarURL())
                    embed2.setTimestamp();
                    target.send({embeds:[embed2]});
                    message.channel.send(`${target} has been warned for ${reason}`);
                }else{
                  message.channel.send(`${message.author} you can not warn the mentioned person has admin perms`);
                }
          }else{
                message.channel.send(`${message.author}, You do not have required permissions to warn someone!`);
          }
        }else{
            message.channel.send('Kindly specify a name to warn');
        }
  }
}