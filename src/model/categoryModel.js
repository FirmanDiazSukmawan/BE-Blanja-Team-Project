const db = require("../config/db");

const getCategory = () => {
  return db.query("SELECT * FROM category ");
};

const getCategoryId = (category_id) => {
  return db.query(
    `SELECT * FROM category WHERE category.category_id =${category_id}`
  );
};

const getCategoryProductId = (product_id) => {
  return db.query(
    `SELECT * FROM category WHERE category.product_id =${product_id}`
  );
};

const createCategoryM = (data) => {
  const { name_category, image, users_id, product_id } = data;
  return db.query(
    `INSERT INTO category (name,image,users_id,product_id) VALUES ('${name_category}','${image}''${users_id}','${product_id}')`
  );
};

const updateCategoryM = (name_category, category_id) => {
  return db.query(
    `UPDATE category SET name='${name_category}' WHERE category.category_id = ${category_id}`
  );
};

const deleteCategoryM = (category_id) => {
  return db.query(
    `DELETE FROM category WHERE category.category_id = ${category_id}`
  );
};

module.exports = {
  getCategory,
  getCategoryId,
  getCategoryProductId,
  createCategoryM,
  updateCategoryM,
  deleteCategoryM,
};
