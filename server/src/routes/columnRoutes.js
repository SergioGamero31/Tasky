const express = require("express");
const columnController = require("../controllers/columnController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-column",
  authMiddleware.authenticateToken,
  columnController.createColumn
);

router.put(
  "/update-column-title",
  authMiddleware.authenticateToken,
  columnController.updateTitle
);

router.put(
  "/swap-column",
  authMiddleware.authenticateToken,
  columnController.swapColumnOrder
);

router.delete(
  "/delete-column",
  authMiddleware.authenticateToken,
  columnController.deleteColumn
);

module.exports = router;
