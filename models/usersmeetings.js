var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var UsersMeetingsSchema   = new Schema({
    meeting_id: {type: Schema.Types.ObjectId, ref: 'Meetings' },
    user_id: {type: Schema.Types.ObjectId, ref: 'Users' },
    created_at: { type: Date, default: Date.now },
});

var UsersMeetings = module.exports = mongoose.model('UsersMeetings', UsersMeetingsSchema);