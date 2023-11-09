const db = require("../config/db");

const getSellerM = (search, sort) => {
  return db.query(`
        SELECT * 
        FROM seller 
        WHERE seller.name LIKE '%${search}%'
        ORDER BY seller.name ${sort}
    `);
};

const selectPagination = () => {
  return db.query("SELECT COUNT(*) AS total FROM seller");
};

const pagination = (limit, offset) => {
  return db.query(`SELECT *FROM seller LIMIT ${limit} OFFSET ${offset}`);
};

const getSellerId = (seller_id) => {
  return db.query(`SELECT * FROM seller WHERE seller.seller_id=${seller_id}`);
};

const getSellerEmail = (email) => {
  return new Promise((resolve, reject) =>
    db.query(
      `SELECT * FROM seller WHERE seller.email = '${email}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err.message);
        }
      }
    )
  );
};

const createSellerM = (data) => {
  const { name, email, phone, password, store_name } = data;
  const role = "seller";
  return new Promise((resolve, reject) =>
    db.query(
      `INSERT INTO seller(name,email,phone,password,store_name,role) VALUES('${name}','${email}', '${phone}', '${password}', '${store_name}','${role}')`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err.message);
        }
      }
    )
  );
};

const loginSellerM = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM seller WHERE email = '${email}'`, (err, res) => {
      if (err) return reject(err);

      resolve(res);
    });
  });
};

const updateSellerM = (data, seller_id) => {
  const { store_name, email, phone, store_description, image } = data;
  return db.query(
    `UPDATE seller SET store_name='${store_name}', email='${email}',phone='${phone}',store_description ='${store_description}',image='${image}' WHERE seller.seller_id = ${seller_id}`
  );
};

const deleteSellerM = (seller_id) => {
  return db.query(`DELETE FROM seller WHERE seller.seller_id=${seller_id}`);
};

module.exports = {
  getSellerM,
  selectPagination,
  pagination,
  getSellerId,
  getSellerEmail,
  createSellerM,
  loginSellerM,
  updateSellerM,
  deleteSellerM,
};
