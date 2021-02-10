const express = require('express');
const passportConfig = require('../config/passport');
const router = express.Router();
const MessageCtrl = require('../controllers/messageCtrl');

//Get all the data
router.get('/', passportConfig.userIsAuthenticated, MessageCtrl.getMessages);

// Save a message
router.post('/', passportConfig.userIsAuthenticated, MessageCtrl.sendMessage);

// List of all messages
router.get(
  '/all',
  passportConfig.userIsAuthenticated,
  MessageCtrl.getChatMessage
);

module.exports = router;
