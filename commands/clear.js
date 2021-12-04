module.exports = {
    name:'clear',
    description:"Clear Messages",
    async execute(message,args){
       if(message.member.permissions.has('MANAGE_MESSAGES')){
         if(!args[0]) return message.reply("please enter the amount of messages that you want to clear!");
         if(isNaN(args[0])) return message.reply("please enter a number!");

         if(args[0] >100) return message.reply("You can not delete more than 100 messages");
         if(args[0]<1) return message.reply(" You must delete at least one message!");

         await message.channel.messages.fetch({limit:args[0]}).then(messages=>{
             message.channel.bulkDelete(messages);
         }).catch(err=>{
            console.log(err)
            message.channel.send(err)
         })
       }else{
           message.channel.send(" Sorry you don't have the role needed to delete chats")
       }
    }

}