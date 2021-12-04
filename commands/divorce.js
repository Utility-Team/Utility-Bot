const Discord = require('discord.js');
const userModel = require('../models/userSchema');
module.exports={
    name:'divorce',
    async execute(message,args,client){
        let userData = await userModel.findOne({userID:message.author.id});
        const target = message.mentions.users.first();
        
        if(userData){
            let userinfo = await userModel.findOne({userID:message.author.id});
            if(userinfo){
                 if(userinfo.xp / 1500 === 0){
                   const response = await userModel.findOneAndUpdate({
                       userID:message.author.id,
                     },
                     {
                       xp:userinfo.xp + 15,
                       level:userinfo.level + 1,
                       commands:userinfo.commands + 1
         
                       }
                     
                     );
                 }else{
                   let level = Math.round(userinfo.xp/1500);
                   const response = await userModel.findOneAndUpdate({
                       userID:message.author.id,
                     },
                     {
                       xp:userinfo.xp + 15,
                       commands:userinfo.commands + 1,
                       level:level
         
                     }
                     
                     );
                  }
                }
          let partner = userData.partner;
            if(target){
                let targetData = await userModel.findOne({userID:target.id});
               if(targetData){
                   let partner1 = toString(target.id)
                   partner1 = partner1.substring(0, partner1.length - 3);
                   let partner2 = toString(userData.partner);
                   partner2 = partner2.substring(0,partner2.length- 3);
                   let partnername = client.users.cache.find(user => user.id === userData.partner);
                   console.log(partnername)
                 if(partner1 === partner2 && partner1 !== 0 && partner2 !== 0){
                    const embed = new Discord.MessageEmbed();
                    embed.setDescription(`**${target}. Do you wanna divorce with ${message.author} ? Answer with yes or no**`);
                    embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
                    embed.setTimestamp();

                    const embed2 = new Discord.MessageEmbed();
                    embed2.setTitle(`${message.author.username} and ${target.username} are now divorced!.`);

                    const row = new Discord.MessageActionRow()
                     .addComponents(
                         new Discord.MessageButton()
                             .setCustomId('yes')
                             .setLabel('Yes')
                             .setStyle('SUCCESS'),
                         new Discord.MessageButton()
                             .setCustomId('no')
                             .setLabel('No')
                             .setStyle('DANGER')
                         
                     );
                    const m = await message.channel.send({embeds:[embed],components:[row]});
                     const ifilter = i => i.user.id === target.id;
 
                     const collector = m.createMessageComponentCollector({ filter:ifilter, time: 15000 });
 
                     collector.on('collect', async i => {
                        console.log(i.guildId);
                         if (i.customId === 'yes') {
                         
                             //console.log(target.id);
                             const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                 partner:0
                             });
                             const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                 partner:0
                             });
 
                             await i.update({ embeds:[embed2],components:[]});
                         }else if(i.customId==='no'){
                             await i.update({components: [] });
                             message.channel.send(`${message.author}, ${target.username} said no!`)
                         }
                     });
 
                     collector.on('end', collected => console.log(`Collected ${collected.size} items`));
 
                 }else{
                     message.channel.send(`${message.author}, You aren't married to ${target}`);
                 }
               }else{
                message.channel.send(`${target}, You are not registered to the game. Please use join command to join the game.`);
               }
            }else{
                message.channel.send(`${message.author}, Please mention someone who is in the server!`);
            }
        }else{
            message.channel.send(`${message.author}, You are not registered to the game. Please use join command to join the game.`);
        }
    }
}