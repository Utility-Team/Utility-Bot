const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    //user's id
    userID:{type:Number,require:true,unique:true},
    //user's username
    username:{type:String,require:true},
    //money in wallet
    wallet:{type:Number,require:true},
    //money in bank
    bank:{type:Number,require:true},
    //total money
    networth:{type:Number,require:true},
    //job name
    job:{type:String,require:true},
    //total commands runned
    commands:{type:Number,require:true},
    //last daily time
    dailytime:{type:Number,require:true},
    //last monthly time
    monthlytime:{type:Number,require:true},
    //last daily worked
    dailywork:{type:Number,require:true},
    //total gambles played
    totalgamble:{type:Number,require:true},
    //total gambles won
    wongamble:{type:Number,require:true},
    //total gambles lost
    lostgamble:{type:Number,require:true},
    //current salary
    salary:{type:Number,require:true},
    //total hours worked
    totalwork:{type:Number,require:true},
    //total items user has
    totalitems:{type:Number,require:true},
    //Utility CryptoCoins
    cryptocoin:{type:Number,require:true},
    //total shares user has
    totalshares:{type:Number,require:true},
    //last gamble played
    lastgamble:{type:Number,required:true},
    //number of gambles tie
    tiegamble:{type:Number,require:true},
    //number of diamond rings
    diamondring:{type:Number,require:true},
    //number of gold trophies
    goldtrophy:{type:Number,require:true},
    //number of keys
    key:{type:Number,require:true},
    //number of gold medals
    goldmedal:{type:Number,require:true},
    //number of silver medals
    silvermedal:{type:Number,require:true},
    //number of pizza slice
    pizzaslice:{type:Number,require:true},
    //number of green apple
    greenapple:{type:Number,require:true},
    //xp
    xp:{type:Number,require:true},
    //level
    level:{type:Number,require:true},
    //alphabet shares
    alphabet:{type:Number,require:true},
    //Utility shares
    utility:{type:Number,require:true},
    //facebook shares
    facebook:{type:Number,require:true},
    //microsoft shares
    microsoft:{type:Number,require:true},
    //apple shares
    apple:{type:Number,require:true},
    //tesla shares
    tesla:{type:Number,require:true},
    //hunting rifles
    huntingrifle:{type:Number,require:true},
    //fishing rods
    fishingrod:{type:Number,require:true},
    //beers
    beer:{type:Number,require:true},
    //coffees
    coffee:{type:Number,require:true},
    //locks
    lock:{type:Number,require:true},
    //bank limit
    banklimit:{type:Number,require:true},
    //mode
    mode:{type:String,require:true,default:'active'},
    //lock active or not
    lockactive:{type:String,require:true,default:'disable'},
    //last raid done by the user
    lastraid:{type:Number,require:true},
    //last resign
    lastresign:{type:Number,require:true},
    //last beg
    lastbeg:{type:Number,require:true},
    //number of locks in use
    nolock:{type:Number,require:true},
    //partner id
    partner:{type:Number,require:true},
    //partner name
    partnername:{type:String,require:true},
    //number of gold fish
    goldfish:{type:Number,require:true},
    //number of common fish
    commonfish:{type:Number,require:true},
    //number of octopus
    octopus:{type:Number,require:true},
    //number of shark
    shark:{type:Number,require:true},
    //number of rare coin
    rarecoin:{type:Number,require:true},
    //last time the user got raided
    gotraided:{type:Number,require:true},
    //last profile
    lastprofile:{type:Number,require:true},
    //last inventory
    lastinv:{type:Number,require:true},
    //bio
    bio:{type:String,require:true},
    //hobby
    hobby:{type:String,require:true},
    //number of squirrel
    squirrel:{type:Number,require:true},
    //number of fox
    fox:{type:Number,require:true},
    //wood pecker
    woodpecker:{type:Number,require:true},
    //wolf
    wolf:{type:Number,require:true},
    //humming bird
    hummingbird:{type:Number,require:true},
    //last family inv
    lastfamilyinv:{type:Number,require:true},
    //last find
    lastfind:{type:Number,require:true},
    //last fish
    lastfish:{type:Number,require:true},
    //last hunt
    lasthunt:{type:Number,require:true},
    //total rps
    totalrps:{type:Number,require:true},
    //won rps
    wonrps:{type:Number,require:true},
    //lost rps
    lostrps:{type:Number,require:true},
    //tie rps
    tierps:{type:Number,require:true},
    //last rps
    lastrps:{type:Number,require:true},
    //lightsaber
    lightsaber:{type:Number,require:true},
    //mando helmet
    mandohelmet:{type:Number,require:true},
    //boba fett
    bobahelmet:{type:Number,require:true},
    //kylo ren
    kylohelmet:{type:Number,require:true},
    //squid game
    squiddoll:{type:Number,require:true},
    //premium
    premium:{type:String,require:true,default:false},
    //last premium
    lastpremium:{type:Number,require:true},
    //last passive
    lastpassive:{type:Number,require:true},
    //last shop
    lastshop:{type:Number,require:true},
    //total dirt
    dirt:{type:Number,require:true},
    //total boots
    boots:{type:Number,require:true},
    //last grass
    grass:{type:Number,require:true},
    //total ancient coins
    ancientcoin:{type:Number,require:true},
    //boats
    boat:{type:Number,require:true},
    //bubble tea
    bubbletea:{type:Number,require:true},
    //last lottery
    lastlottery:{type:Number,require:true},
    //last dig
    lastdig:{type:Number,require:true},
    //last treasure
    lasttreasure:{type:Number,require:true},
    //last buy
    lastbuy:{type:Number,require:true},
    //last sell
    lastsell:{type:Number,require:true},
    //last use
    lastuse:{type:Number,require:true}
});
const model = mongoose.model('UserModels',userSchema);
module.exports = model;