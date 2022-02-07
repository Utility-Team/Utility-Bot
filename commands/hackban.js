const Discord = require('discord.js');
module.exports = {
    name:'hackban',
    aliases:['hackban','hban'],
    async execute(message,args,client){
        if(message.member.permissions.has('BAN_MEMBERS')){
            if(args[0]){
                if(!isNaN(args[0]) && Math.sign(args[0]) === 1){
                    let userID = args[0];
                    let reason = args.slice(1).join(" ");
                    if(!reason) reason = 'no reason provided';
                    client.users.fetch(userID).then(async user=>{
                        console.log(user);
                        console.log(user.id);
                        await message.guild.members.ban(user.id,{reason:reason});
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`✅ ${user.username} has been banned successfully`);
                        embed.setColor(`#30CC71`);
                        embed.setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL());
                        embed.setTimestamp();
                        message.channel.send({embeds:[embed]});
                    }).catch(error=>{
                        return message.channel.send('An error occured');
                    })
                }else{
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`${message.author.username}, Please enter a valid user id`);
                    message.channel.send({embeds:[embed]});
                }
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}, Please also mention a user id`);
                message.channel.send({embeds:[embed]});
            }
        }else{
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`${message.member.user.username} You do not have permissions to hack ban someone`)
            message.channel.send({embeds:[embed]});
        }
    }
}