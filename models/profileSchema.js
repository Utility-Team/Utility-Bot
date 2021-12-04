const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    guildID:{type:String,require:true,unique:true},
    prefix:{type:String,default:';'},
    logschannel: { type: String, require: true},
    newschannel:{type:String,require:true},
    adschannel:{type:String,require:true},
    cwelcome:{type:String,require:true},
    cleave:{type:String,require:true},
    topic:{type:Number,require:true},
    truth:{type:Number,require:true},
    dare:{type:Number,require:true},
    raid:{type:String,require:true,default:'enable'}
});
const model = mongoose.model('ProfileModels',profileSchema);
module.exports = model;