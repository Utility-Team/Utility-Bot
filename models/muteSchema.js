const mongoose = require('mongoose');
const muteSchema = new mongoose.Schema({
    userID:{type:Number,require:true},
    guildID:{type:Number,require:true},
    lastmuted:{type:Number,require:true},
    mutedfor:{type:Number,require:true},
    username:{type:String,require:true},
    forevermute:{type:String,require:true}

});
const model = mongoose.model('muteModels',muteSchema);
module.exports = model;