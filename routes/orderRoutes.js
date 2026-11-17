const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  authMiddleware,
  requireAdmin,
} = require("../middleware/authMiddleware");

// User
router.post(
  "/",
  authMiddleware,
  createOrder
);

router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);

router.get(
  "/:id",
  authMiddleware,
  getOrder
);

// Admin
router.get(
  "/",
  authMiddleware,
  requireAdmin,
  getAllOrders
);

router.put(
  "/:id/status",
  authMiddleware,
  requireAdmin,
  updateOrderStatus
);

module.exports = router;