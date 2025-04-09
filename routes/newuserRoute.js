const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.post('/signup', userController.signup);
router.post('/gather', userController.gather);
router.get('/profile', userController.profile);
router.post('/logout', userController.logout);
router.post('/login', userController.login);

module.exports = router;
