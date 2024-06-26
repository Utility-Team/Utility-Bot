const userModel = require('../models/userSchema');
const profileModel = require('../models/profileSchema');
const botModel = require('../models/botSchema');
module.exports={
    name:'join',
    async execute(message){
      let userData;
      let serverData;
      try{
       userData = await userModel.findOne({userID: message.author.id});
       serverData = await profileModel.findOne({guildID:message.guild.id});
      if(!userData){
          let profile = await userModel.create({
             //user's id
              userID:message.author.id,
             //username
             username:message.author.username,
              //money in wallet
              wallet:1000,
              //money in bank
              bank:0,
              //total money
              networth:1000,
              //job name
              job:'',
              //total commands runned
              commands:0,
              //last daily time
              dailytime:0,
              //last monthly time
              monthlytime:0,
              //last daily worked
              dailywork:0,
              //total gambles played
              totalgamble:0,
              //total gambles won
              wongamble:0,
              //total gambles lost
              lostgamble:0,
              //current salary
              salary:0,
              //total hours worked
              totalwork:0,
              //Utility CryptoCoins
              cryptocoin:0,
              //last gamble played
              lastgamble:0,
              //number of gambles tie
              tiegamble:0,
              //xp
              xp:0,
              //level
              level:0,
              //alphabet shares
              alphabet:0,
              //Utility shares
              utility:0,
              //facebook shares
              facebook:0,
              //microsoft shares
              microsoft:0,
              //apple shares
              apple:0,
              //tesla shares
              tesla:0,
              //mode
              mode:'active',
              //lock active or not
              lockactive:'disable',
              //last raid done by the user
              lastraid:0,
              //last resign
              lastresign:0,
              //last beg
              lastbeg:0,
              //number of locks in use
              nolock:0,
              //partner id
              partner:0,
              //partner name
              partnername:'',
              //last time the user got raided
              gotraided:0,
              //last profile
              lastprofile:0,
              //last inventory
              lastinv:0,
              //bio
              bio:'',
              //hobby
              hobby:'',
              //last family inv
              lastfamilyinv:0,
              //last find
              lastfind:0,
              //last fish
              lastfish:0,
              //last hunt
              lasthunt:0,
              //total rps
              totalrps:0,
              //won rps
              wonrps:0,
              //lost rps
              lostrps:0,
              //tie rps
              tierps:0,
              //last rps
              lastrps:0,
              //premium
              premium:'disable',
              //last premium
              lastpremium:0,
              //last passive
              lastpassive:0,
              //last shop
              lastshop:0,
              //last lottery
              lastlottery:0,
              //last dig
              lastdig:0,
              //last treasure
              lasttreasure:0,
              //last buy
              lastbuy:0,
              //last sell
              lastsell:0,
              //last use
              lastuse:0,
              avatar:'',
              background:'',
              premiumtype:0,
              huntingrifle:0,
              fishingrod:0,
              boat:0,
              lock:0,
              creditpoints:0,
              totalmoneydonated:0,
              totalmoneyreceived:0,
              totalitemsdonated:0,
              totalitemsreceived:0
           });
           profile.save();
           message.channel.send(`${message.author}, Your Profile has been registered successfully to check balance type ${serverData.prefix}bal`);
         }else{
            message.channel.send(`${message.author}, You have already joined the currency game!`);
         }
       }catch(err){
          console.log(err)
        }
    }
}