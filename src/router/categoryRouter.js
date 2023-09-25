const express = require("express");
const router = express.Router();
const {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");
const upload = require("../middleware/upload");

router.get("/", getCategory);
router.get("/:category_id", getCategoryById);
router.post("/", upload, createCategory);
router.put("/:category_id", updateCategory);
router.delete("/:category_id", deleteCategory);

module.exports = router;
