const express = require("express");
const router = express.Router();
const categoryRouter = require("./categoryRouter");
const sellerRouter = require("./sellerRouter");
const productRouter = require("./productRouter");
const customerRouter = require("../router/customerRouter");
const addresRouter = require("../router/addresRouter");
const orderRouter = require("../router/orderRouter");

router.use("/seller", sellerRouter);
router.use("/customer", customerRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/addres", addresRouter);
router.use("/order", orderRouter);

module.exports = router;
