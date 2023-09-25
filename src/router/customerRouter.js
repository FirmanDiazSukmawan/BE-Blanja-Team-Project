const express = require("express");
const router = express.Router();
const {
    getCustomer,
    getCustomerById,
    selectPage,
    createCustomer,
    loginCustomer,
    updateCustomer,
    deleteCustomer
  } = require("../controller/customerController");
const upload = require("../middleware/upload");

router.get("/paginate", selectPage);
router.get("/", getCustomer);
router.get("/:customer_id", getCustomerById);
router.post("/login", loginCustomer);
router.post("/", createCustomer);
router.put("/:customer_id", upload, updateCustomer);
router.delete("/:customer_id", deleteCustomer);

module.exports = router;
