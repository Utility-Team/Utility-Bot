const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports={
    name:'achievement',
    aliases:['achievement','achievements','reward','rewards'],
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        let serverData = await serverModel.findOne({guildID:message.guild.id});
        if(userData){
            let avatar;
            if(userData.avatar){
                if(userData.avatar !== '' && userData.premium === 'enable'){
                    avatar = userData.avatar;
                }else{
                    const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                        avatar:message.author.displayAvatarURL()
                    });
                    avatar = message.author.displayAvatarURL();
                }
            }else{
                avatar = message.author.displayAvatarURL();
            }
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Rewards & Achievements!`);
            embed.addFields({name:`<:connector:925703924747501569> Donation of 100k coins`,value:`Reward: <:uc:922720730272137256> **10k** and <:moneysharingbadge:925707445593051177> **money sharing badge!**`},
            {name:`<:connector:925703924747501569> Donation of 10 items`,value:'Reward: **500 xp!** and <:commonitemssharingbadge:925708875750080562> **10 items sharing badge!**'},
            {name:`<:connector:925703924747501569> Donation of 50 items`,value:'Reward: **1000 xp!** and <:50itemssharingbadge:925713392591835136> **50 items sharing badge!**'},
            {name:`<:connector:925703924747501569> Donation of 100 items`,value:'Reward: **1500 xp!** and <:100itemssharingbadge:925728246174208000> **100 items sharing badge!**'},
            {name:`<:connector:925703924747501569> Execution of 1000 commands`,value:'Reward: <:uc:922720730272137256> **25k** and <:1000commandsbadge:925729580680097833> **1000 commands execution badge!**'},
            {name:`<:connector:925703924747501569> Successfully playing 100 rps games`,value:`Reward: **1000 xp!** and <:playing100rpsgamesbadge:925730545747521546> **100 rps games badge!**`},
            );
            embed.setFooter(`Requested by ${message.author.username}`,avatar);
            embed.setTimestamp();
            embed.setColor(`#358BFC`);

            const embed2 = new Discord.MessageEmbed();
            embed2.setTitle(`Rewards & Achievements!`);
            embed2.addFields({name:`<:connector:925703924747501569> Successfully playing 100 gambles`,value:`Reward: **500 xp!** and <:playing100gambles:925732172277620746> **successfully playing 100 gambles badge!**`},
            {name:`<:connector:925703924747501569> Winning 100 gambles`,value:`Reward: <:uc:922720730272137256> **15k** and <:supergamblerbadge:925733231532322837> **super gambler badge!**`},
            {name:`<:connector:925703924747501569> Winning 100 rps games`,value:`Reward: <:uc:922720730272137256> **15k** and <:winning100rpsgamesbadge:925735618712043552> **super rps gamer badge!**`},
            {name:`<:connector:925703924747501569> Successfully playing 1000 gambles`,value:`Reward: <:uc:922720730272137256> **50k** and <:playing1000gambles:925737559689150475> **successfully playing 1000 gambles badge!** `},
            {name:`<:connector:925703924747501569> Successfully playing 1000 rps games`,value:`Reward: <:uc:922720730272137256> **50k** and <:playing1000rpsgamesbadge:925749675020124252> **successfully playing 1000 rps games badge!**`},
            {name:`<:connector:925703924747501569> Winning 1000 rps games`,value:`Reward: <:uc:922720730272137256> **500k** and <:winning1000rpsgamesbadge:925779028298838046> **epic rps gamer badge!**`}
            );
            embed2.setFooter(`Requested by ${message.author.username}`,avatar);
            embed2.setColor(`#358BFC`);
            embed2.setTimestamp();
            
            const embed3 = new Discord.MessageEmbed();
            embed3.setTitle(`Rewards & Achievements!`);
            embed3.addFields({name:`<:connector:925703924747501569> Winning 1000 gambles`,value:`Reward: <:uc:922720730272137256> **500k** and <:winning1000gamblesbadge:938451521241239612> **successfully winning 1000 gambles badge!**`},
            {name:`<:connector:925703924747501569> Execution of 5000 commands`,value:`Reward: <:uc:922720730272137256> **45k** and <:supergamblerbadge:925733231532322837> **5000 commands badge**`},
            {name:`<:connector:925703924747501569> Execution of 10000 commands`,value:`Reward: <:uc:922720730272137256> **100k** and <:10000commandsbadge:938432131108077628> **10000 commands badge**`},
            {name:`<:connector:925703924747501569> Successfully playing 100 typing races`,value:`Reward: <:100racesbadge:938433859350040666> **100 type races badge!** `},
            );
            embed3.setFooter(`More coming soon!`,avatar);
            embed3.setColor(`#358BFC`);
            embed3.setTimestamp();  
          

            const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('page1')
                    .setLabel('1')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('page2')
                    .setLabel('2')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('page3')
                    .setLabel('3')
                    .setStyle('PRIMARY'),
                
            );
            const m = await message.channel.send({embeds:[embed],components:[row]});
            const ifilter = i => i.user.id === message.author.id;
            const collector = m.createMessageComponentCollector({ filter:ifilter, time: 30000 });

            collector.on('collect', async i => {
                
                if (i.customId === 'page1') {
                    await i.update({ embeds:[embed]});
                }
                if(i.customId==='page2'){
                    await i.update({embeds:[embed2]});
                }
                if(i.customId==='page3'){
                    await i.update({embeds:[embed3]});
                }
            });

            collector.on('end', collected => console.log(`Collected ${collected.size} items`));

        }else{
            message.channel.send(`${message.author}, You haven't joined the game. Type ${serverData.prefix}join to join the game`);
            
        }
    }
}