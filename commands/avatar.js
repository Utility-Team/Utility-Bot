var Discord = require('discord.js');
const DIG = require("discord-image-generation");
module.exports  ={
    name:'avatar',
    aliases:['avatar','av'],
    description:'This commands gets the info and avatar of the person',
   async execute(message,args){
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            if(args[1] === 'blur'){
                let avatar = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Blur().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"blur.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'delete'){
                let avatar = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Delete().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'gay'){
                let avatar = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Gay().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'grey'){
                let avatar = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Greyscale().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'ad'){
                let avatar = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Ad().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'affect'){
                let avatar = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Affect().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'slap'){
                let avatar1 = message.author.displayAvatarURL({dynamic:false,format:'png'});
                let avatar2 = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Batslap().getImage(avatar1,avatar2);
                let attach = new Discord.MessageAttachment(img,"slap.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'spank'){
                let avatar1 = message.author.displayAvatarURL({dynamic:false,format:'png'});
                let avatar2 = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Spank().getImage(avatar1,avatar2);
                let attach = new Discord.MessageAttachment(img,"spank.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'wanted'){
                let avatar2 = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Wanted().getImage(avatar2,'$');
                let attach = new Discord.MessageAttachment(img,"wanted.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'trash'){
                let avatar2 = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Trash().getImage(avatar2);
                let attach = new Discord.MessageAttachment(img,"trash.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'rip'){
                let avatar2 = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Rip().getImage(avatar2);
                let attach = new Discord.MessageAttachment(img,"rip.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'discord'){
                let avatar2 = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.DiscordBlue().getImage(avatar2);
                let attach = new Discord.MessageAttachment(img,"discordblue.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'bed' || args[1] === 'monster'){
                let avatar1 = message.author.displayAvatarURL({dynamic:false,format:'png'});
                let avatar2 = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Bed().getImage(avatar1,avatar2);
                let attach = new Discord.MessageAttachment(img,"bed.png");
                message.channel.send({files:[attach]});
            }else if(args[1] === 'beautiful'){
                let avatar2 = memberTarget.user.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Beautiful().getImage(avatar2);
                let attach = new Discord.MessageAttachment(img,"beautiful.png");
                message.channel.send({files:[attach]});
            }else{
              
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${memberTarget.user.username}'s avatar`);
                embed.setImage(memberTarget.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                embed.setFooter(`Requested by ${message.author.username}`);
                embed.setTimestamp(); 
                embed.setColor(`#404EED`);
                message.channel.send({embeds:[embed]});
            }
        }else{
            if(args[0] === 'blur'){
                let avatar = message.author.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Blur().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"blur.png");
                message.channel.send({files:[attach]});
            }else if(args[0] === 'delete'){
                let avatar = message.author.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Delete().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else if(args[0] === 'gay'){
                let avatar = message.author.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Gay().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else if(args[0] === 'grey'){
                let avatar = message.author.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Greyscale().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else if(args[0] === 'ad'){
                let avatar = message.author.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Ad().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else if(args[0] === 'affect'){
                let avatar = message.author.displayAvatarURL({dynamic:false,format:'png'});
                let img = await new DIG.Affect().getImage(avatar);
                let attach = new Discord.MessageAttachment(img,"delete.png");
                message.channel.send({files:[attach]});
            }else{
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`${message.author.username}'s avatar`);
                embed.setImage(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));
                embed.setFooter(`Requested by ${message.author.username}`);
                embed.setTimestamp(); 
                embed.setColor(`#404EED`);
                message.channel.send({embeds:[embed]});
            }
        }
    }
}