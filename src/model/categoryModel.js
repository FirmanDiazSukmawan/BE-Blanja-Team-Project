const db = require("../config/db");

const getCategoryM = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return db.query(`SELECT * 
  FROM category WHERE category.${searchBy} ILIKE '%${search}%' ORDER BY category.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const getCategoryId = (category_id) => {
  return db.query(
    `SELECT * FROM category WHERE category.category_id =${category_id}`
  );
};

const createCategoryM = (data) => {
  const { name_category, image } = data;
  return db.query(
    `INSERT INTO category (name_category,image) VALUES ('${name_category}','${image}')`
  );
};

const updateCategoryM = (name_category, category_id) => {
  return db.query(
    `UPDATE category SET name_category='${name_category}' WHERE category.category_id = ${category_id}`
  );
};

const deleteCategoryM = (category_id) => {
  return db.query(
    `DELETE FROM category WHERE category.category_id = ${category_id}`
  );
};

module.exports = {
  getCategoryM,
  getCategoryId,
  createCategoryM,
  updateCategoryM,
  deleteCategoryM,
};
