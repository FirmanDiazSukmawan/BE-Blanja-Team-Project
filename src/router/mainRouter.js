const express = require("express");
const router = express.Router();
// const categoryRouter = require("./categoryRouter");
const sellerRouter = require("./sellerRouter");
const productRouter = require("./productRouter");

router.use("/seller", sellerRouter);
router.use("/product", productRouter);
// router.use("/category", categoryRouter);

module.exports = router;
