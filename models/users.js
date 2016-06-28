var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//mongoose.connect('mongodb://localhost/meeting');
var UsersSchema   = new Schema({
    name: String,
    password:String,
    role:String,
    meetings : [{ type: Schema.Types.ObjectId, ref: 'Meetings' }]
});

var Users = module.exports = mongoose.model('Users', UsersSchema);