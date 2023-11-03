const {
  getCustomerM,
  selectPagination,
  pagination,
  getCustomerId,
  getCustomerEmail,
  createCustomerM,
  loginCustomerM,
  updateCustomerM,
  deleteCustomerM,
} = require("../model/customerModel");

const { generateToken, refreshToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinaryConfig");

const customerController = {
  getCustomer: async (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    try {
      let result = await getCustomerM(search, sort);
      // console.log(result);
      res.status(200).json({
        message: "get customer successfully",
        data: result.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error getting customer ",
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

  getCustomerById: async (req, res) => {
    try {
      const customer_id = req.params.customer_id;
      const result = await getCustomerId(customer_id);
      res.json({
        data: result.rows[0],
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting user",
      });
    }
  },
  
  createCustomer: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Semua kolom harus diisi" });
      }
      let { rowCount } = await getCustomerEmail(email);
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
          name: name || "",
          email: email || "",
          password: hash,
        };
        console.log(user);

        try {
          const userData = await createCustomerM(user);
          console.log(userData);
          res.status(200).json({
            message: "Customer has been created successfully",
            data: userData,
          });
        } catch (err) {
          console.error("Error creating Customer:", err);
          res.status(400).json({
            message: "Error creating Customer",
            err: err.message,
          });
        }
      });
    } catch (err) {
      res.status(400).json({
        message: "Error creating customer Catch",
        err: err.message,
      });
    }
  },

  loginCustomer: async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await loginCustomerM(email);
      //   console.log(result.rows);

      if (result.rowCount > 0) {
        const passwordHash = result.rows[0].password;
        const PasswordValid = await bcrypt.compare(password, passwordHash);
        const user = result.rows[0];

        // console.log(result);

        if (PasswordValid) {
          const token = await generateToken({
            customer: user,
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

  updateCustomer: async (req, res) => {
    try {
      const customer_id = req.params.customer_id;
      // console.log(req);
      const customerImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "customer",
      });
      const result = await getCustomerId(Number(customer_id));
      console.log(result);
      const user = result.rows[0];
      const data = {
        name: req.body.name ?? user.name,
        email: req.body.email ?? user.email,
        phone_number: req.body.phone_number ?? user.phone_number,
        gender: req.body.gender ?? user.gender,
        birthday: req.body.birthday ?? user.birthday,
        image: customerImage.secure_url ?? user.image,
      };

      await updateCustomerM(data, Number(customer_id));

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

  deleteCustomer: async (req, res) => {
    try {
      const customer_id = req.params.customer_id;
      const result = await deleteCustomerM(customer_id);
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

module.exports = customerController;
