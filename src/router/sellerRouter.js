const express = require("express");
const router = express.Router();
const {
  getSeller,
  selectPage,
  getSellerById,
  createSeller,
  loginSeller,
  updateSeller,
  deleteSeller,
} = require("../controller/sellerController");
const upload = require("../middleware/upload");

router.get("/paginate", selectPage);
router.get("/", getSeller);
router.get("/:seller_id", getSellerById);
router.post("/login", loginSeller);
router.post("/", createSeller);
router.put("/:seller_id", upload, updateSeller);
router.delete("/:seller_id", deleteSeller);

module.exports = router;
