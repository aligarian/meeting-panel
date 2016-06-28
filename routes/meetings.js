var Meetings = require('./../models/meetings');

var meetings = {
  getAll: function(req, res) {
    Meetings.find(function(err, meetings) {
        if (err)
          res.send(err);
        res.json(meetings);
    });
  },
  getOne: function(req, res) {
    Meetings.findById(req.params.id, function(err, meeting) {
            if (err)
                res.send(err);
            res.json(meeting);
        });
  },
  create: function(req, res) {
    console.log(req.body)
    var Meeting = new Meetings();      // create a new instance of the meetings model
        Meeting.title = req.body.title;  // set the meetings name (comes from the request)
        Meeting.time = req.body.time;
        // save the bear and check for errors
        Meeting.save(function(err) {
            if (err)
              res.send(err);
            res.json({ message: 'Meeting created!' });
        });
   
  },
 
  update: function(req, res) {
    Meetings.findById(req.params.id, function(err, meeting) {
        if (err)
            res.send(err);
        meeting.title = req.body.title; 
        meeting.time = req.body.time;
        meeting.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Meeting updated!' });
        });

    });
  },
 
  delete: function(req, res) {
    Meetings.remove({
            _id: req.params.id
        }, function(err, meeting) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
  }
};
 

module.exports = meetings;