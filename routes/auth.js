var jwt = require('jwt-simple');
var Users = require('./../models/users');
 
var auth = {
 
  login: function(req, res) {
    //console.log(req.body);
    var username = req.body.username || '';
    var password = req.body.password || '';
 
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validate(username, password, function(err, user){
      //console.log(err, user);
      if (err){
        // If authentication fails, we send a 401 back
        console.log(err);
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
      if(user){
        // If authentication is success, we will generate a token
        // and dispatch it to the client
       
        res.json(genToken(user));
        return; 
      }else{
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
    });
    
    
    
 
  },
 
  validate: function(username, password, fn) {
    //var dbUserObj;
    //console.log(username, password);
    
    Users.findOne({'name':username, 'password':password}, function(err, user) {
     
        return fn(err, user);
        //return user;
      
    });
  },
 
  validateUser: function(username, fn) {
    Users.findOne({'name':username}, function(err, user) {
        if (err)
            fn(err);
        else{
          fn(null, user);
        }
    });
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
  return {
    token: token,
    expires: expires,
    user: { _id:user._id, name:user.name, role:user.role}
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;