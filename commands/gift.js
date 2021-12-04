const Discord = require('discord.js');
const userModel = require('../models/userSchema');
const botModel = require('../models/botSchema');
module.exports={
    name:'gift',
    async execute(message,args){
        let userData = await userModel.findOne({userID:message.author.id});
        const target = message.mentions.users.first();
        let argsone;
        let argsone_name;
        let argstwo;
        let argstwo_name;
        let argsthree
        let argsthree_name;
        if(args[1]){
          argsone = args[1];
          argsone_name = argsone.toLowerCase();
        }
        if(args[2]){
          argstwo = args[2];
          argstwo_name = argstwo.toLowerCase();
        }
        if(args[3]){
          argsthree = args[3];
          argsthree_name = argsthree.toLowerCase(); 
        }
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
            if(target){
              let targetData = await userModel.findOne({userID:target.id});
              if(targetData){
                 if(argsone_name === 'beer'){
                    let number = args[2];
                    let price = args[3];
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.beer >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        beer:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        beer:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} :beer: beer to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} beer to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.beer >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    beer:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    beer:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 :beer: beer to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 beer to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }
                                    }
                     
                 }else if(argsone_name === 'coffee'){
                    let number = args[2];
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.coffee >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        coffee:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        coffee:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} :coffee: coffee to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} coffee to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.coffee >=1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    coffee:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    coffee:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 :coffee: coffee to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 coffee to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }

                                    }            
                 }if(argsone_name === 'pizza' && argstwo_name === 'slice'){
                    let number = args[3];
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.pizzaslice >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        pizzaslice:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        pizzaslice:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} 🍕 pizza slice to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} pizza slice to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.pizzaslice >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    pizzaslice:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    pizzaslice:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 🍕 pizza slice to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 pizza slice to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }
                                    }
                   
                     
                 }if(argsone_name === 'green' && argstwo_name === 'apple'){
                    let number = args[2];
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.greenapple >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        greenapple:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        greenapple:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} 🍏 green apple to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} green apple to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.greenapple >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    greenapple:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    greenapple:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 🍏 green apple to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 green apple to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }

                                    }
                                      
                 }if(argsone_name === 'lock'){
                    let number = args[2];
                 
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.lock >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        lock:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        lock:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} :lock: lock to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} lock to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.lock >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    lock:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    lock:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 :lock: lock to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 lock to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }
                                    }
                    
                     
                 }if(argsone_name === 'key'){
                    let number = args[2];
                  
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.key >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        key:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        key:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} :key: key to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} key to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.key >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    key:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    key:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 :key: key to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 key to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }

                                    }
                                    
                   
                     
                 }if(argsone_name === 'gold' && argstwo_name === 'trophy'){
                    let number = args[3];
              
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.goldtrophy >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        goldtrophy:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        goldtrophy:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} 🏆 gold trophy to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} gold trophy to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.goldtrophy >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    goldtrophy:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    goldtrophy:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 🏆 gold trophy to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 gold trophy to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }
                                    }
                                       
                 }if(argsone_name === 'gold' && argstwo_name === 'medal'){
                    let number = args[3];
                 
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.goldmedal >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        goldmedal:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        goldmedal:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} 🥇 gold medal to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} gold medal to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }   
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.goldmedal >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    goldmedal:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    goldmedal:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 🥇 gold medal to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 gold medal to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }

                                    }
                    
                     
                 }if(argsone_name === 'silver' && argstwo_name === 'medal'){
                    let number = args[3];
                
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.silvermedal >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        silvermedal:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        silvermedal:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} 🥈 silver medal to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} silver medal to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.silvermedal >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    silvermedal:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    silvermedal:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 🥈 silver medal to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 silver medal to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }

                                    }
                   
                }else if(argsone_name === 'hunting' && argstwo_name === 'rifle'){
                    let number = args[3];
                  
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.huntingrifle >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        huntingrifle:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        huntingrifle:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} <:rifle:883578413888184350> hunting rifle to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} hunting rifle to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.huntingrifle >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    huntingrifle:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    huntingrifle:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 <:rifle:883578413888184350> hunting rifle to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 hunting rifle  to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }

                                    }
                                          
                }else if(argsone_name === 'fishing' && argstwo_name === 'rod'){
                    let number = args[3];
                 
               
                                    if(number){
                                        if(!isNaN(number) && Math.sign(number) === 1){
                                        if(number % 1=== 0){
                                            if(userData.fishingrod >= number){
                                                const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                    $inc:{
                                                        fishingrod:-number
                                                    }
                                                });

                                                const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                    $inc:{
                                                        fishingrod:number
                                                    }
                                                });

                                                const embed2 = new Discord.MessageEmbed();
                                                embed2.setTitle(`✅ Successfully Gifted`);
                                                embed2.setColor(`#30CC71`);
                                                embed2.setDescription(`${message.author}, You have successfully gifted ${number} :fishing_pole_and_fish: fishing rod to ${target}`);
                                                embed2.setTimestamp();
                                                message.channel.send({embeds:[embed2]});

                                            }else{
                                                const embed = new Discord.MessageEmbed();
                                                embed.setTitle(`${message.author.username}, You don't have ${number} fishing rod to gift`);
                                                message.channel.send({embeds : [embed]});
                                            }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                            message.channel.send({embeds:[embed]});
                                        }
                                    }else{
                                        if(userData.fishingrod >= 1){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    fishingrod:-1
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    fishingrod:1
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted 1 :fishing_pole_and_fish: fishing rod to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});
                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have 1 fishing rod to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }

                                    }
                   
                                           
               }else if(argsone_name === 'cryptocoin'){
                let number = args[2];
                let price = args[3];
           
                                if(number){
                                    if(!isNaN(number) && Math.sign(number) === 1){
                                    if(number % 1=== 0){
                                        if(userData.cryptocoin >= number){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    cryptocoin:-number
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    cryptocoin:number
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted ${number} cryptocoin to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});

                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have ${number} cryptocoin to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    if(userData.cryptocoin >= 1){
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                                cryptocoin:-1
                                            }
                                        });

                                        const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                            $inc:{
                                                cryptocoin:1
                                            }
                                        });

                                        const embed2 = new Discord.MessageEmbed();
                                        embed2.setTitle(`✅ Successfully Gifted`);
                                        embed2.setColor(`#30CC71`);
                                        embed2.setDescription(`${message.author}, You have successfully gifted 1 cryptocoin to ${target}`);
                                        embed2.setTimestamp();
                                        message.channel.send({embeds:[embed2]});
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, You don't have 1 cryptocoin to gift`);
                                        message.channel.send({embeds : [embed]});
                                    }

                                }
                                
                                                        
               }else if(argsone_name === 'bubble' && argstwo_name === 'tea'){
                let number = args[3];
           
                                if(number){
                                    if(!isNaN(number) && Math.sign(number) === 1){
                                    if(number % 1=== 0){
                                        if(userData.bubbletea >= number){
                                            const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                                $inc:{
                                                    bubbletea:-number
                                                }
                                            });

                                            const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                                $inc:{
                                                    bubbletea:number
                                                }
                                            });

                                            const embed2 = new Discord.MessageEmbed();
                                            embed2.setTitle(`✅ Successfully Gifted`);
                                            embed2.setColor(`#30CC71`);
                                            embed2.setDescription(`${message.author}, You have successfully gifted ${number} 🧋 bubble tea to ${target}`);
                                            embed2.setTimestamp();
                                            message.channel.send({embeds:[embed2]});

                                        }else{
                                            const embed = new Discord.MessageEmbed();
                                            embed.setTitle(`${message.author.username}, You don't have ${number} bubble tea to gift`);
                                            message.channel.send({embeds : [embed]});
                                        }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, Please mention a valid number!`);
                                        message.channel.send({embeds:[embed]});
                                    }
                                }else{
                                    if(userData.bubbletea >= 1){
                                        const response = await userModel.findOneAndUpdate({userID:message.author.id},{
                                            $inc:{
                                                bubbletea:-1
                                            }
                                        });

                                        const response2 = await userModel.findOneAndUpdate({userID:target.id},{
                                            $inc:{
                                                bubbletea:1
                                            }
                                        });

                                        const embed2 = new Discord.MessageEmbed();
                                        embed2.setTitle(`✅ Successfully Gifted`);
                                        embed2.setColor(`#30CC71`);
                                        embed2.setDescription(`${message.author}, You have successfully gifted 1 🧋 bubble tea to ${target}`);
                                        embed2.setTimestamp();
                                        message.channel.send({embeds:[embed2]});
                                    }else{
                                        const embed = new Discord.MessageEmbed();
                                        embed.setTitle(`${message.author.username}, You don't have 1 bubble tea to gift`);
                                        message.channel.send({embeds : [embed]});
                                    }
                                }
               }


              }else{
                  message.channel.send(`${target}, You haven't joined the currency game. Please use join command to join the game.`);
              }
            }
        }else{
            message.channel.send(`${message.author}, You haven't joined the currency game. Please use join command to join the game.`);
        }
    }
}