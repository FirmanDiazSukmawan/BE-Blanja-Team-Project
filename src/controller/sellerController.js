const {
  getSellerM,
  selectPagination,
  pagination,
  getSellerId,
  getSellerEmail,
  createSellerM,
  loginSellerM,
  updateSellerM,
  deleteSellerM,
} = require("../model/sellerModel");
const { generateToken, refreshToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinaryConfig");
// const redis = require("../config/redisConfig");

const sellerController = {
  getSeller: async (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    try {
      let result = await getSellerM(search, sort);
      res.status(200).json({
        message: "get Seller successfully",
        data: result.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error getting Seller ",
      });
    }
  },

  selectPage: async (req, res) => {
    let { limit, page } = req.query;
    let pageValue = page ? Number(page) : 1;
    let limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;
    const allData = await selectPagination();
    const totalData = Number(allData.rows[0].total);

    try {
      let result = await pagination(limitValue, offsetValue);
      res.status(200).json({
        message: "user has been selected by limit and offset",
        currentPage: pageValue,
        dataPerPage: limitValue,
        totalPage: Math.ceil(totalData / limitValue),
        totalData,
        data: result.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  getSellerById: async (req, res) => {
    try {
      const seller_id = req.params.seller_id;
      const result = await getSellerId(seller_id);
      res.status(200).json({
        data: result.rows[0],
        message: "get data successfully",
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error getting user",
      });
    }
  },

  createSeller: async (req, res) => {
    try {
      const { name, email, phone, password, store_name } = req.body;

      if (!name || !email || !phone || !password || !store_name) {
        return res.status(400).json({ message: "Semua kolom harus diisi" });
      }
      let { rowCount } = await getSellerEmail(email);
      if (rowCount) {
        return res
          .status(400)
          .json({ message: "email already in use,please use another email" });
      }
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "Error hashing password",
            error: err.message,
          });
        }

        const user = {
          name,
          email,
          phone,
          password: hash,
          store_name,
        };
        console.log(user);

        try {
          const userData = await createSellerM(user);
          // console.log("User data:", userData);
          res.status(200).json({
            message: "Seller has been created successfully",
            data: userData,
          });
        } catch (err) {
          console.error("Error creating sellerr:", err);
          res.status(400).json({
            message: "Error creating sellerr",
            err: err.message,
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error creating seller Catch",
        err: err,
      });
    }
  },

  loginSeller: async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await loginSellerM(email);
      //   console.log(result.rows);

      if (result.rowCount > 0) {
        const passwordHash = result.rows[0].password;
        const PasswordValid = await bcrypt.compare(password, passwordHash);
        const user = result.rows[0];

        // console.log(result);

        if (PasswordValid) {
          const token = await generateToken({
            seller: user,
          });

          return res.status(200).json({
            message: "Login successful",
            token: token,
            data: user,
          });
        } else {
          res.status(400).json({ message: "Invalid email or password " });
        }
      } else {
        res.status(400).json({ message: "Invalid email or password " });
      }
    } catch (error) {
      res.status(400).json({ error, message: "error during login" });
    }
  },

  updateSeller: async (req, res) => {
    try {
      const seller_id = req.params.seller_id;
      // console.log(req);
      const sellerImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "seller",
      });
      const result = await getSellerId(Number(seller_id));
      const user = result.rows[0];
      const data = {
        store_name: req.body.store_name ?? user.store_name,
        email: req.body.email ?? user.email,
        phone: req.body.phone ?? user.phone,
        store_description: req.body.store_description ?? user.store_description,
        image: sellerImage.secure_url ?? user.image,
      };

      await updateSellerM(data, Number(seller_id));

      res.status(200).json({
        message: "Update Successfull",
      });
    } catch (error) {
      res.status(400).json({
        message: "Update Error",
        error: error.message,
      });
    }
  },

  deleteSeller: async (req, res) => {
    try {
      const seller_id = req.params.seller_id;
      const result = await deleteSellerM(seller_id);
      const data = await cloudinary.uploader.destroy(result);
      res.json({
        message: "delete data sucessfully",
        data: `id ${data} has been deleted`,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error deleting data",
      });
    }
  },
};

module.exports = sellerController;
