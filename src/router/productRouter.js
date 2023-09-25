const express = require("express");
const router = express.Router();
const {
  getProductQuery,
  getAllProduct,
  getProductById,
  getByUsersId,
  createProduct,
  updateProduct,
  deleteProduct,
  getByCategoryId,
} = require("../controller/productController");
const uploadProduct = require("../middleware/uploadProduct");

router.get("/", getProductQuery);
router.get("/all", getAllProduct);
router.get("/:product_id", getProductById);
router.get("/users/:users_id", getByUsersId);
router.get("/category/:category_id", getByCategoryId);
router.post("/", uploadProduct, createProduct);
router.put("/:product_id", uploadProduct, updateProduct);
router.delete("/:product_id", deleteProduct);

module.exports = router;
