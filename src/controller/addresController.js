const {
  getAddresM,
  getAddresId,
  createAddresM,
  updateAddresM,
  deleteAddresM,
  getAddresByUsersId,
} = require("../model/addresModel");

const addresController = {
  getAddres: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset } = req.query;
    let data = {
      searchBy: searchBy || "home_addres",
      search: search || "",
      sortBy: sortBy || "home_addres",
      sort: sort || "ASC",
      limit: limit || 15,
      offset: offset || 0,
    };
    try {
      let result = await getAddresM(data);
      res.json({
        message: "get addres successfully ",
        data: result.rows,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error get addres",
      });
    }
  },

  getAddresById: async (req, res) => {
    const addres_id = req.params.addres_id;
    let result = await getAddresId(addres_id);
    try {
      res.json({
        message: "addres has been found",
        data: result.rows,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting addres",
      });
    }
  },

  getByUsersId: async (req, res) => {
    const users_id = req.params.users_id;
    try {
      const result = await getAddresByUsersId(users_id);
      res
        .status(200)
        .json({ data: result.rows, message: "get succes byusersid" });
      console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get product by users",
      });
    }
  },

  createAddres: async (req, res) => {
    try {
      const addres = {
        home_addres: req.body.home_addres,
        recipients_name: req.body.recipients_name,
        phone: req.body.phone,
        addres: req.body.addres,
        postal_code: req.body.postal_code,
        city: req.body.city,
        users_id: req.body.users_id,
      };
      if (
        !addres.home_addres ||
        !addres.recipients_name ||
        !addres.phone ||
        !addres.addres ||
        !addres.postal_code ||
        !addres.city
      ) {
        return res.status(400).json({ message: "Semua kolom harus diisi" });
      }
      let addresData = await createAddresM(addres);
      console.log(addres);
      res.status(200).json({
        message: "create addres successfully",
        data: addresData.rows,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error create addres",
      });
    }
  },

  updateAddres: async (req, res) => {
    try {
      let addres_id = req.params.addres_id;
      const dataAddres = await getAddresId(Number(addres_id));
      console.log(dataAddres);
      const addres = dataAddres.rows[0];
      let data = {
        home_addres: req.body.home_addres || addres.home_addres,
        recipients_name: req.body.recipients_name || addres.recipients_name,
        phone: req.body.phone || addres.phone,
        addres: req.body.addres || addres.addres,
        postal_code: req.body.postal_code || addres.postal_code,
        city: req.body.city || addres.city,
      };

      let result = await updateAddresM(data, Number(addres_id));
      console.log(result);
      res.status(202).json({
        message: "addres has been updated",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error updating addres",
      });
    }
  },

  deleteAddres: async (req, res) => {
    try {
      let addres_id = req.params.addres_id;
      const result = await deleteAddresM(addres_id);

      res.status(200).json({
        message: "addres deleted successfully",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error deleting addres",
      });
    }
  },
};

module.exports = addresController;
