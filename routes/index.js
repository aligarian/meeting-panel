var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var meetings = require('./meetings.js');
var user = require('./users.js');
var users_meetings = require('./usersmeetings.js');


/*
 * Routes that can be accessed by any one
 */
router.post( '/login', auth.login);
/*
 * Routes that can be accessed only by autheticated users
 */
router.post('/api/join_meeting', users_meetings.create);
router.get('/api/join_meeting/:id', users_meetings.getAllWithUser);
router.delete('/api/join_meeting/:user_id/:meeting_id', users_meetings.delete);


//router.get('/api/meetings', meetings.getAll);
// router.get('/api/meeting/:id', meetings.getOne);
// router.post('/api/meeting', meetings.create);
// router.put('/api/meeting/:id', meetings.update);
// router.delete('/api/meeting/:id', meetings.delete);
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/admin/users', user.getAll);
router.get('/api/admin/user/:id', user.getOne);
router.post('/api/admin/user', user.create);
router.put('/api/admin/user/:id', user.update);
router.delete('/api/admin/user/:id', user.delete);

router.get('/api/admin/meetings', meetings.getAll);
router.get('/api/admin/meeting/:id', meetings.getOne);
router.post('/api/admin/meeting', meetings.create);
router.put('/api/admin/meeting/:id', meetings.update);
router.delete('/api/admin/meeting/:id', meetings.delete);

router.get('/api/admin/meetings_user/:meeting_id', users_meetings.getByMeetingId);

module.exports = router;