const mongoose = require('mongoose');
const warnSchema = new mongoose.Schema({
  userid:{type:Number,require:true},
  guildID:{type:Number,require:true},
  executorid:{type:String,require:true},
  totalwarns:{type:Number,require:true},
  reasons:{type:Array,require:true}
});
const model = mongoose.model('WarnModels',warnSchema);
module.exports = model;