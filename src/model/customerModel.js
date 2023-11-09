const db = require("../config/db");

const getCustomerM = (search, sort) => {
  return db.query(`
          SELECT * 
          FROM customer
          WHERE customer.name LIKE '%${search}%'
          ORDER BY customer.name ${sort}
      `);
};

const selectPagination = () => {
  return db.query("SELECT COUNT(*) AS total FROM customer");
};

const pagination = (limit, offset) => {
  return db.query(`SELECT *FROM customer LIMIT ${limit} OFFSET ${offset}`);
};

const getCustomerId = (customer_id) => {
  return db.query(
    `SELECT * FROM customer WHERE customer.customer_id=${customer_id}`
  );
};

const getCustomerEmail = (email) => {
  return new Promise((resolve, reject) =>
    db.query(
      `SELECT * FROM customer WHERE customer.email = '${email}'`,
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

const createCustomerM = (data) => {
  const { name, email, password } = data;
  const role = "customer";
  return new Promise((resolve, reject) =>
    db.query(
      `INSERT INTO customer(name, email, password, role) VALUES('${name}', '${email}', '${password}', '${role}')`,
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

const loginCustomerM = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM customer WHERE email = '${email}'`, (err, res) => {
      if (err) return reject(err);
      console.log(res );
      resolve(res);
    });
  });
};

const updateCustomerM = (data, customer_id) => {
  const { name, email, phone_number, gender, birthday, image } = data;
  return db.query(
    `UPDATE customer SET name='${name}', email='${email}', phone_number='${phone_number}', gender='${gender}', birthday='${birthday}', image='${image}' WHERE customer.customer_id = ${customer_id}`
  );
};

const deleteCustomerM = (customer_id) => {
  return db.query(
    `DELETE FROM customer WHERE customer.customer_id=${customer_id}`
  );
};

module.exports = {
  getCustomerM,
  selectPagination,
  pagination,
  getCustomerId,
  getCustomerEmail,
  createCustomerM,
  loginCustomerM,
  updateCustomerM,
  deleteCustomerM,
};
