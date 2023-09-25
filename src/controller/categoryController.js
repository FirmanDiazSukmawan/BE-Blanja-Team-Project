const {
  getCategoryM,
  getCategoryId,
  createCategoryM,
  updateCategoryM,
  deleteCategoryM,
} = require("../model/categoryModel");
const cloudinary = require("../config/cloudinaryConfig");

const categoryController = {
  getCategory: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset } = req.query;
    let data = {
      searchBy: searchBy || "name_category",
      search: search || "",
      sortBy: sortBy || "name_category",
      sort: sort || "ASC",
      limit: limit || 15,
      offset: offset || 0,
    };
    try {
      let result = await getCategoryM(data);
      res.json({
        message: "get Category successfully ",
        data: result.rows,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error get category",
      });
    }
  },

  getCategoryById: async (req, res) => {
    const category_id = req.params.category_id;
    let result = await getCategoryId(category_id);
    try {
      res.json({
        message: "category has been found",
        data: result.rows,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting category",
      });
    }
  },

  createCategory: async (req, res) => {
    try {
      let categoryImage = await cloudinary.uploader.upload(
        req.file && req.file?.path,
        {
          folder: "product",
        }
      );
      //   console.log(categoryImage);
      if (!categoryImage) {
        return res.json({ messsage: "need upload image" });
      }
      const category = {
        name_category: req.body.name_category,
        image: categoryImage.secure_url,
      };
      let categoryData = await createCategoryM(category);
      //   console.log(category);
      res.status(200).json({
        message: "create category successfully",
        data: categoryData.rows,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error create category",
      });
    }
  },

  updateCategory: async (req, res) => {
    try {
      let category_id = req.params.category_id;
      let { name_category } = req.body;

      let result = await updateCategoryM(name_category, Number(category_id));
      //   console.log(result);
      res.status(202).json({
        message: "category has been updated",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error updating category",
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      let category_id = req.params.category_id;
      const result = await deleteCategoryM(category_id);
      const data = await cloudinary.uploader.destroy(result);

      res.status(200).json({
        message: "product deleted successfully",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error deleting product",
      });
    }
  },
};

module.exports = categoryController;
