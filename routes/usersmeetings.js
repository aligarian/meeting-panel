var UsersMeetings = require('./../models/usersmeetings');
var Users = require('./../models/users');
var Meetings = require('./../models/meetings');
var usersmeetings = {
    getAllWithUser: function(req, res) {
        // UsersMeetings.find({user_id : req.params.id})
        // .populate('user_id')
        // .populate('meeting_id')
        // .exec(function(err, usersmeetings){
        //     if(err){
        //         console.log(err);
        //     }
        //   console.log(usersmeetings);
        // });
        //console.log(req.body);
        Meetings.find()
        .populate({
            path:'users',
            select:'_id name',
            match:{'_id':req.params.id}
        })
        .exec(function(err, usersmeetings){
            if(err){
                res.send(err);
            }else{
                 res.send(usersmeetings);
            }
           
          //console.log(usersmeetings);
        });
        
    },
    getByUserId: function(req, res) {
        UsersMeetings.find({user_id : req.params.user_id}, function(err, meetings) {
            if (err)
              res.send(err);
            res.json(meetings);
        });
    },
    getByMeetingId: function(req, res) {
        UsersMeetings.find(function(err, meetings) {
            if (err)
              res.send(err);
            res.json(meetings);
        });
    },
    create: function(req, res) {
        // console.log(req.body)
        // console.log(req.body)
        // var UsersObj = new Users();//.find({'_id':req.body.user_id}); 
        // var MeetingsObj = new Meetings();//.find({'_id':req.body.meeting_id}); ;// create a new instance of the meetings model
       
        Users.findById(req.body.user_id,function(err,user){
            if (err)
                  res.json(err);
            user.meetings.push(req.body.meeting_id);
            user.save(function(err) {
                if (err)
                  res.json(err);
                Meetings.findById(req.body.meeting_id, function(err, meeting){
                    if (err)
                        res.json(err);
                    meeting.users.push(req.body.user_id);
                    meeting.save(function(err) {
                        if (err)
                            res.json(err);
                        Meetings.find()
                            .populate({
                                path:'users',
                                select:'_id name',
                                match:{'_id':req.params.id}
                            })
                            .exec(function(err, usersmeetings){
                                if(err){
                                    res.send(err);
                                }else{
                                     res.send(usersmeetings);
                                }
                            });
                    });
                });
               // res.json({ message: 'Join succesfully!' });
            });
        });
    },
    delete: function(req, res) {
        Meetings.findOneAndUpdate({'_id': req.params.meeting_id}, {$pull: {users: req.params.user_id}}, function(err, data){
            if(err) {
              return res.status(500).json({'error' : 'error in deleting address'});
            }else{
                Users.findOneAndUpdate({'_id': req.params.user_id}, {$pull: {meetings: req.params.meeting_id}}, function(err, data){
                    if(err) {
                      return res.status(500).json({'error' : 'error in deleting address'});
                    }
                    Meetings.find()
                            .populate({
                                path:'users',
                                select:'_id name',
                                match:{'_id':req.params.id}
                            })
                            .exec(function(err, usersmeetings){
                                if(err){
                                    res.send(err);
                                }else{
                                     res.send(usersmeetings);
                                }
                            });
                });
            }
            // res.json(data);
        });
        
        // Meetings.findById(req.params.meeting_id)
        
        // .exec(function(err, usersmeetings){
        //     console.log(usersmeetings, req.params.user_id);
        //     usersmeetings.users.forEach(function(elm,idx){
        //         if(elm == req.params.user_id){
        //             usersmeetings.users[idx].remove();
        //         }
        //     });
        //     usersmeetings.save(function(err){
        //         if(err){
        //             res.send(err);
        //         }else{
        //              res.send(usersmeetings);
        //         }
        //     });
           
           
        //   //console.log(usersmeetings);
        // });
    }
};
 

module.exports = usersmeetings;