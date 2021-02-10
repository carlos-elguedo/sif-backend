const express = require('express');
const passportConfig = require('../config/passport');
const router = express.Router();
const MessageCtrl = require('../controllers/messageCtrl');

//Get all the data
router.get('/', passportConfig.userIsAuthenticated, MessageCtrl.getMessages);

// List of all professions
router.post('/', passportConfig.userIsAuthenticated, MessageCtrl.sendMessage);

module.exports = router;
