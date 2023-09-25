const express = require("express");
const router = express.Router();
const {
  getAddres,
  getAddresById,
  getByUsersId,
  createAddres,
  updateAddres,
  deleteAddres,
} = require("../controller/addresController");

router.get("/", getAddres);
router.get("/:addres_id", getAddresById);
router.get("/users/:users_id", getByUsersId);
router.post("/", createAddres);
router.put("/:addres_id", updateAddres);
router.delete("/:addres_id", deleteAddres);

module.exports = router;
