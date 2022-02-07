const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports={
    name:'inspire-me',
    aliases:['inspire-me','inspireme','inspire','quote','thought'],
    async execute(message,args){
        let response = await fetch("https://zenquotes.io/api/random")
        let json_data = await response.json(response.text)
        let quote = json_data[0]['q'] + " -" + json_data[0]['a']
        message.channel.send(quote);
    }
}