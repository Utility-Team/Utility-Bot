const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const serverModel = require('../models/profileSchema');
module.exports = {
  name:'partnerinv',
  aliases:['partnerinv','partnerinventory','pinv','pinventory'],
  async execute(message,args){
    let userData = await userModel.findOne({userID:message.author.id});
    let serverData = await userModel.findOne({guildID:message.guild.id});
    let prefix;
    if(serverData){
       prefix = serverData.prefix;
    }else{
      prefix = ';';
    }
    if(userData){
      let avatar;
      if(userData.avatar && userData.premium === 'enable'){
        avatar = userData.avatar;
      }else{
        avatar - message.author.displayAvatarURL();
      }
      if(userData.partner !== 0){
        let partnerData = await userModel.findOne({userID:userData.partner});
        let mainembed = new Discord.MessageEmbed();
        mainembed.setTitle(`${userData.partnername}'s inventory`);
        mainembed.addFields({name:`Total Items:`,value:`${partnerData.inventory.length}`});
        mainembed.setFooter(`Requested by ${userData.partnername}`,avatar);
        mainembed.setTimestamp();
        let jewelleryembed = new Discord.MessageEmbed();
        let toolsembed = new Discord.MessageEmbed();
        let gadgetsembed = new Discord.MessageEmbed();
        let foodembed = new Discord.MessageEmbed();
        let collectableembed = new Discord.MessageEmbed();
        let huntfishembed = new Discord.MessageEmbed();

        let toolsembed2 = new Discord.MessageEmbed();
        toolsembed2.setAuthor(`${userData.partnername}'s inventory`);
        toolsembed2.setDescription(`You don't own any tools.`);
        toolsembed2.setFooter(`use ${prefix}buy item (to buy an item)`);

        let gadgetsembed2 = new Discord.MessageEmbed();
        gadgetsembed2.setAuthor(`${userData.partnername}'s inventory`);
        gadgetsembed2.setDescription(`You don't own any gadgets.`);
        gadgetsembed2.setFooter(`use ${prefix}buy item (to buy an item)`);

        let foodembed2 = new Discord.MessageEmbed();
        foodembed2.setAuthor(`${userData.partnername}'s inventory`);
        foodembed2.setDescription(`You don't own any food items.`);
        foodembed2.setFooter(`use ${prefix}buy item (to buy an item)`);

        let jewelleryembed2 = new Discord.MessageEmbed();
        jewelleryembed2.setAuthor(`${userData.partnername}'s inventory`);
        jewelleryembed2.setDescription(`You don't own any jewellery items`);
        jewelleryembed2.setFooter(`use ${prefix}buy item (to buy an item)`);

        let collectableembed2 = new Discord.MessageEmbed();
        collectableembed2.setAuthor(`${userData.partnername}'s inventory`);
        collectableembed2.setDescription(`You don't own any collectable items`);
        collectableembed2.setFooter(`use ${prefix}buy item (to buy an item)`);

        let huntfishembed2 = new Discord.MessageEmbed();
        huntfishembed2.setAuthor(`${userData.partnername}'s inventory`);
        huntfishembed2.setDescription(`You don't have any item`);
        huntfishembed2.setFooter(`use ${prefix}buy item (to buy an item)`);

        if(partnerData.inventory && partnerData.inventory.length>0){
            for(var x = 0;x<=partnerData.inventory.length;x++){
                if(partnerData.inventory[x]){
                    if(x<5){
                        if(partnerData.inventory[x].category === 'hunt'){
                            mainembed.addFields({name:`${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});
                        }else{
                            mainembed.addFields({name:`${partnerData.inventory[x].emoji} ${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});

                        }
                    }
                    if(partnerData.inventory[x].category === 'jewellery'){
                        jewelleryembed.addFields({name:`${partnerData.inventory[x].emoji} ${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});
                    }
                    if(partnerData.inventory[x].category === 'tools'){
                        console.log('they exists');
                        toolsembed.addFields({name:`${partnerData.inventory[x].emoji} ${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});
                    }
                    if(partnerData.inventory[x].category=== 'food'){
                        foodembed.addFields({name:`${partnerData.inventory[x].emoji} ${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});  
                    }
                    if(partnerData.inventory[x].category=== 'gadgets'){
                            gadgetsembed.addFields({name:`${partnerData.inventory[x].emoji} ${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});  
                    }
                    if(partnerData.inventory[x].category === 'collectables'){
                        collectableembed.addFields({name:`${partnerData.inventory[x].emoji} ${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});
                    }
                    if(partnerData.inventory[x].category === 'fish'){
                        huntfishembed.addFields({name:`${partnerData.inventory[x].emoji} ${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});
                    }
                    if(partnerData.inventory[x].category === 'hunt'){
                        huntfishembed.addFields({name:`${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});

                    }
                    if(partnerData.inventory[x].category === 'dig'){
                        huntfishembed.addFields({name:`${partnerData.inventory[x].emoji} ${partnerData.inventory[x].name}`,value:`${partnerData.inventory[x].quantity}`});

                    }
                    if(x === partnerData.inventory.length - 1){
                        jewelleryembed.setTitle(`${userData.partnername}'s inventory`);
                        jewelleryembed.setThumbnail(`${avatar}`);
                        jewelleryembed.setFooter(`type ${prefix}use item (to use an item)`);
                        gadgetsembed.setAuthor(`${userData.partnername}'s inventory`);
                        gadgetsembed.setFooter(`type ${prefix}use item (to use an item)`);
                        toolsembed.setAuthor(`${userData.partnername}'s inventory`);
                        toolsembed.setFooter(`type ${prefix}use item (to use an item)`);
                        foodembed.setAuthor(`${userData.partnername}'s inventory`);
                        foodembed.setFooter(`type ${prefix}use item (to use an item)`);
                        collectableembed.setAuthor(`${userData.partnername}'s inventory`);
                        collectableembed.setFooter(`type ${prefix}use item (to use an item)`);
                        huntfishembed.setAuthor(`${userData.partnername}'s inventory`);
                        huntfishembed.setFooter(`type ${prefix}use item (to use an item)`);
                        console.log(jewelleryembed);
                        const row = new Discord.MessageActionRow().addComponents(
                            new Discord.MessageSelectMenu()
                            .setCustomId('option')
                            .setPlaceholder('Other Stats...')
                            .addOptions([
                            {
                            label:'Food',
                            value:'food2',
                            description:'shows food items owned by you'
                            },
                            {
                            label:'Tools',
                            value:'tools2',
                            description:'shows tools owned by you'
                            },
                            {
                            label:'Hunt , Fish & Dig',
                            value:'hunt',
                            description:'shows items related to hunting & fishing'
                            },
                            {
                            label:'Collectables',
                            value:'collectables2',
                            description:'shows collectables items owned by you'
                        },
                        {
                            label:'Gadgets',
                            value:'gadgets2'
                        },
                        {
                            label:'Jewellery',
                            value:'jewellery2'
                        }
                            
                            ])
                        );
                        const m = await message.channel.send({embeds:[mainembed],components:[row]});
                        const filter = (interaction)=> interaction.user.id === message.author.id || target.id ;
                        let collector = message.channel.createMessageComponentCollector({filter,time:20000,componentType:"SELECT_MENU"});
                        collector.on("collect",async (interaction)=>{
                        
                        if(interaction.values[0]=='food2'){
                            if(foodembed.fields.length>0){
                                await  interaction.reply({embeds:[foodembed]});
                            }else{
                                await interaction.reply({embeds:[foodembed2]});
                            }
                        }
                        if(interaction.values[0]=='tools2'){
                                if(toolsembed.fields.length>0){
                                    await interaction.reply({embeds:[toolsembed]});
                                }else{
                                    await interaction.reply({embeds:[toolsembed2]});
                                }
                        }
                        if(interaction.values[0]=='collectables2'){
                            if(collectableembed.fields.length>0){
                                await interaction.reply({embeds:[collectableembed]});
                            }else{
                                await interaction.reply({embeds:[collectableembed2]});
                            }
                        }
                        if(interaction.values[0]== 'hunt'){
                            if(huntfishembed.fields.length>0){
                                await interaction.reply({embeds:[huntfishembed]});
                            }else{
                                await interaction.reply({embeds:[huntfishembed2]});
                            }
                        }
                        
                        if(interaction.values[0] == 'gadgets2'){
                            if(gadgetsembed.fields.length>0){
                            await interaction.reply({embeds:[gadgetsembed]});
                            }else{
                                await interaction.reply({embeds:[gadgetsembed2]});
                            }
                        }

                        if(interaction.values[0] == 'jewellery2'){
                            if(jewelleryembed.fields.length>0){
                                await interaction.reply({embeds:[jewelleryembed]});
                            }else{
                                await interaction.reply({embeds:[jewelleryembed2]});
                            }
                        }
                    
                        
                        });   
                        collector.on('end', collected =>{ 
                          console.log(`Collected ${collected.size} items`);
                        });
                    }
                    
                }
            }
        }else{
            let embed = new Discord.MessageEmbed();
            embed.setTitle(`${userData.partnername}'s inventory`);
            embed.setThumbnail(`${avatar}`);
            embed.setDescription(`${userData.partnername} doesn't have any items in the inventory`);
            embed.setFooter(`Requested by ${userData.partnername}`,avatar);
            embed.setTimestamp();
            message.channel.send({embeds:[embed]});
        }
      }
    }
  }
}