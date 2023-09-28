const express = require("express");
const router = express.Router();
const {
  getOrder,
  getOrderById,
  getOrderBySellerId,
  getOrderByCustomerId,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

router.get("/", getOrder);
router.get("/:order_id", getOrderById);
router.get("/seller/:seller_id", getOrderBySellerId);
router.get("/customer/:customer_id", getOrderByCustomerId);
router.post("/", createOrder);
router.put("/:order_id", updateOrder);
router.delete("/:order_id", deleteOrder);

module.exports = router;
