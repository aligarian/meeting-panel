var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//mongoose.connect('mongodb://localhost/meeting');
var MeetingsSchema   = new Schema({
    title: String,
    time:String,
    users:[{ type: Schema.Types.ObjectId, ref: 'Users' }]
});

var Meetings = module.exports = mongoose.model('Meetings', MeetingsSchema);