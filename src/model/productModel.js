const db = require("../config/db");

const productQuery = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return db.query(`SELECT * 
    FROM product WHERE product.${searchBy} ILIKE '%${search}%' ORDER BY product.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const allProduct = () => {
  return db.query("SELECT * FROM product ");
};

const getProductId = (product_id) => {
  return db.query(
    ` SELECT 
    product.*, 
    seller.store_name  
FROM 
    product
LEFT JOIN 
    seller
ON 
    product.users_id = seller.seller_id
WHERE 
    product.product_id = ${product_id};`
  );
};

const getProductByUsersId = (users_id) => {
  return db.query(` 
    SELECT 
    product.*, 
    seller.store_name  
FROM 
    product
LEFT JOIN 
    seller
ON 
    product.users_id = seller.seller_id
WHERE 
    product.users_id = ${users_id};
`);
};

const createProductM = (data) => {
  const {
    name_product,
    price,
    color,
    size,
    stock,
    condition,
    image_product,
    description,
    users_id,
    category_id,
  } = data;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO product (
        name_product, 
        price, 
        color, 
        size, 
        stock, 
        condition, 
        image_product, 
        description, 
        users_id, 
        category_id
    ) VALUES ('${name_product}',${price},'${color}','${size}','${stock}','${condition}','${image_product}','${description}',${users_id},${category_id})`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updateProductM = (data, product_id) => {
  const {
    name_product,
    price,
    color,
    size,
    stock,
    image_product,
    description,
  } = data;
  return db.query(
    `UPDATE product SET name_product = '${name_product}', price = ${price},color = '${color}',size ='${size}', stock = '${stock}',image_product= '${image_product}',description = '${description}' WHERE product.product_id=${product_id}`
  );
};

const deleteProductM = (product_id) => {
  return db.query(
    `DELETE FROM product WHERE product.product_id = ${product_id}`
  );
};
module.exports = {
  productQuery,
  allProduct,
  getProductId,
  getProductByUsersId,
  createProductM,
  updateProductM,
  deleteProductM,
};
