const express = require('express');
const boardController = require('../controllers/boardController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post(
  '/create-board',
  authMiddleware.authenticateToken,
  boardController.createBoard
);

router.get(
  '/all-boards',
  authMiddleware.authenticateToken,
  boardController.getAllBoards
);

router.get(
  '/board/:boardId',
  authMiddleware.authenticateToken,
  boardController.getBoardById
);

router.post(
  '/invite-member',
  authMiddleware.authenticateToken,
  boardController.inviteMember
);

router.delete(
  '/remove-member',
  authMiddleware.authenticateToken,
  boardController.removeMember
);

router.get(
  '/user/:id',
  authMiddleware.authenticateToken,
  boardController.getUserById
);

module.exports = router;
