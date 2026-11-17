const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  authMiddleware,
  requireAdmin,
} = require("../middleware/authMiddleware");

// Public
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin
router.post(
  "/",
  authMiddleware,
  requireAdmin,
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  requireAdmin,
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  deleteProduct
);

module.exports = router;