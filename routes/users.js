var Users = require('./../models/users');

var users = {
  getAll: function(req, res) {
    Users.find(function(err, users) {
        if (err)
          res.send(err);
        res.json(users);
    });
  },
  getOne: function(req, res) {
    Users.findById(req.params.id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
  },
  create: function(req, res) {
    var User = new Users();      // create a new instance of the users model
        User.name = req.body.name;  // set the bears name (comes from the request)
        User.password = req.body.password;
        if(req.body.role){
          User.role = req.body.role;
        }else{
          User.role = 'Guest';
        }
        // save the bear and check for errors
        User.save(function(err) {
            if (err)
              res.send(err);
            res.json({ message: 'User created!' });
        });
   
  },
  update: function(req, res) {
    Users.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name; 
        user.password = req.body.password;
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User updated!' });
        });

    });
  },
  delete: function(req, res) {
    console.log(req.params);
    Users.remove({
            _id: req.params.id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
  }
};
 

module.exports = users;