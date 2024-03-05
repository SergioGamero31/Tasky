const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post(
  '/refresh-token',
  authMiddleware.authenticateToken,
  authController.refreshToken
);

module.exports = router;
