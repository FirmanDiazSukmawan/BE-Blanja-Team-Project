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
  updateOrderStatus,
  updateOrderStatusPaid,
  updateOrderStatusDelivery,
  updateOrderStatusDelivered,
  getOrderByCustomerIdByStatus,
} = require("../controller/orderController");

router.get("/", getOrder);
router.get("/:order_id", getOrderById);
router.get("/seller/:seller_id", getOrderBySellerId);
router.get("/customer/:customer_id", getOrderByCustomerId);
router.get("/:customer_id/:status", getOrderByCustomerIdByStatus);
router.post("/", createOrder);
router.put("/:order_id", updateOrder);
router.patch("/status/:customer_id", updateOrderStatus);
router.patch("/status/paid/:customer_id", updateOrderStatusPaid);
router.patch(
  "/status/delivery/:customer_id/:seller_id",
  updateOrderStatusDelivery
);
router.patch("/status/delivered/:customer_id", updateOrderStatusDelivered);

router.delete("/:order_id", deleteOrder);

module.exports = router;
