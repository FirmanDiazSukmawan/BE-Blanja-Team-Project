const {
  productQuery,
  allProduct,
  getProductId,
  getProductByUsersId,
  getProductByCategoryId,
  createProductM,
  updateProductM,
  deleteProductM,
  countData,
} = require("../model/productModel");
const cloudinary = require("../config/cloudinaryConfig");
const recipeController = {
  getProductQuery: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset, page } = req.query;
    let data = {
      page: page || 1,
      searchBy: searchBy || "name_product",
      search: search || "",
      sortBy: sortBy || "product_id",
      sort: sort || "ASC",
      limit: limit || 100,
      offset: (page - 1) * limit || 0,
    };

    try {
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      // console.log(totalData);
      const totalPage = Math.ceil(totalData / data.limit);
      console.log(totalPage);
      // console.log(limit);
      const pagination = {
        currentPage: data.page,
        limit: data.limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      let results = await productQuery(data);
      res.status(200).json({
        message: "product got by query",
        pagination: pagination,
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "product not found",
      });
    }
  },

  getAllProduct: async (req, res) => {
    try {
      let result = await allProduct();
      res.status(200).json({
        message: "get All Product Succesfuly",
        data: result.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "Error Getting Product",
      });
    }
  },

  getProductById: async (req, res) => {
    const product_id = req.params.product_id;
    try {
      let result = await getProductId(product_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error finding recipes",
      });
    }
  },

  getByUsersId: async (req, res) => {
    const users_id = req.params.users_id;
    try {
      const result = await getProductByUsersId(users_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get product by users",
      });
    }
  },

  

  getByCategoryId: async (req, res) => {
    const category_id = req.params.category_id;
    try {
      const result = await getProductByCategoryId(category_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get product by users",
      });
    }
  },
  

  createProduct: async (req, res) => {
    try {
      let productImage = await cloudinary.uploader.upload(
        req.file && req.file?.path,
        {
          folder: "product",
        }
      );
      // console.log(productImage);
      if (!productImage) {
        return res.json({ messsage: "need upload image" });
      }
      const product = {
        name_product: req.body.name_product,
        price: req.body.price,
        color: req.body.color,
        size: req.body.size,
        stock: req.body.stock,
        condition: req.body.condition,
        image_product: productImage.secure_url,
        description: req.body.description,
        users_id: req.body.users_id,
        category_id: req.body.category_id,
      };
      if (
        !product.name_product ||
        !product.price ||
        !product.color ||
        !product.size ||
        !product.stock ||
        !product.condition ||
        !product.image_product ||
        !product.description
      ) {
        return res.status(400).json({ message: "Semua kolom harus diisi" });
      }
      let productData = await createProductM(product);
      // console.log(product);
      res.status(200).json({
        message: "create product successfully",
        data: productData.rows,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error create product",
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      let product_id = req.params.product_id;
      let productImage = await cloudinary.uploader.upload(
        req.file && req.file?.path,
        {
          folder: "product",
        }
      );

      if (!productImage) {
        return res.json({ messsage: "need upload image" });
      }
      let product = await getProductId(Number(product_id));
      let data = product.rows[0];
      // console.log(data);
      let productData = {
        name_product: req.body.name_product || data.name_product,
        price: req.body.price || data.price,
        color: req.body.color || data.color,
        size: req.body.size || data.size,
        stock: req.body.stock || data.stock,
        image_product: productImage.secure_url || data.image_product,
        description: req.body.description || data.description,
      };
      // console.log(recipeData);
      await updateProductM(productData, Number(product_id));
      res.status(200).json({
        message: "product updated successfully",
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error update product",
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      let product_id = req.params.product_id;
      const result = await deleteProductM(product_id);
      const data = await cloudinary.uploader.destroy(result);
      console.log(product_id);

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

module.exports = recipeController;
