const mongoose = require('mongoose');
const suggestionSchema = new mongoose.Schema({
username:{type:String,require:true},
userID:{type:Number,require:true},
discriminator:{type:Number,require:true},
totalreports:{type:Number,require:true},
reports:{type:Array,require:true},
lastreport:{type:Number,require:true},
lastsuggestion:{type:Number,require:true},
totalsuggestions:{type:Number,require:true},
suggestions:{type:Array,require:true},
reported:{type:Number,require:true},
timesreported:{type:Array,require:true},
lastseen:{type:Array,require:true}
});
const model = mongoose.model('suggestionModels',suggestionSchema);
module.exports = model;