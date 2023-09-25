const express = require("express");
const router = express.Router();

const sellerRouter = require("./sellerRouter");
const customerRouter = require("./customerRouter");
const productRouter = require("./productRouter");


router.use("/seller", sellerRouter);
router.use("/customer", customerRouter);
router.use("/product", productRouter);


module.exports = router;
