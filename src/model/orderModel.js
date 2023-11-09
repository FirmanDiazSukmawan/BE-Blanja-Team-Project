const db = require("../config/db");

const getOrderM = () => {
  return db.query(`SELECT * 
  FROM orders`);
};

const getOrderId = (order_id) => {
  return db.query(`SELECT * FROM orders WHERE orders.order_id =${order_id} `);
};

const getOrderSellerId = (seller_id) => {
  return db.query(`SELECT 
  orders.*, 
  product.name_product,product.image_product,product.price,addres.*
FROM 
  orders
LEFT JOIN 
  product
ON 
  orders.product_id = product.product_id
LEFT JOIN 
  addres
ON 
  orders.addres_id = addres.addres_id
WHERE 
orders.seller_id = ${seller_id}

  `);
};

const getOrderCustomerId = (customer_id) => {
  return db.query(`SELECT
  orders.*, 
  product.name_product,product.image_product,product.price,addres.*
FROM 
  orders
LEFT JOIN 
  product
ON 
  orders.product_id = product.product_id
LEFT JOIN 
  addres
ON 
  orders.addres_id = addres.addres_id
WHERE 
orders.customer_id = ${customer_id}
`);
};

const getOrderByCustomedIdStatus = (customer_id, status) => {
  return db.query(
    `SELECT
  orders.*, 
  product.name_product,product.image_product,product.price,addres.*
FROM 
  orders
LEFT JOIN 
  product
ON 
  orders.product_id = product.product_id
LEFT JOIN 
  addres
ON 
  orders.addres_id = addres.addres_id
WHERE 
orders.customer_id = ${customer_id} 
AND
orders.status = '${status}'
`
  );
};

const createOrderM = (data) => {
  const {
    order_size,
    order_color,
    quantity,
    customer_id,
    seller_id,
    product_id,
  } = data;
  return db.query(
    `INSERT INTO orders (order_size,order_color,quantity,customer_id,seller_id,product_id) VALUES ('${order_size}','${order_color}','${quantity}',${customer_id},${seller_id},${product_id})`
  );
};

const updateOrderM = (quantity, order_id) => {
  return db.query(
    `UPDATE orders SET quantity='${quantity}' WHERE orders.order_id = ${order_id}`
  );
};

const deleteOrderM = (order_id) => {
  return db.query(`DELETE FROM orders WHERE orders.order_id = ${order_id}`);
};

const orderStatus = (customer_id) => {
  const status = "unpaid";
  return db.query(
    `UPDATE orders SET status = '${status}' WHERE orders.customer_id = ${customer_id}`
  );
};

const updateStatus = (customer_id) => {
  const status = "paid";
  return db.query(
    `UPDATE orders SET status = '${status}' WHERE orders.customer_id = ${customer_id}`
  );
};

const updateStatusDelivery = (seller_id) => {
  const status = "on delivery";
  return db.query(
    `UPDATE orders SET status = '${status}' WHERE orders.seller_id = ${seller_id}`
  );
};

const updateStatusDelivered = (customer_id) => {
  const status = "delivered";
  return db.query(
    `UPDATE orders SET status = '${status}' WHERE orders.customer_id = ${customer_id}`
  );
};

module.exports = {
  getOrderM,
  getOrderId,
  getOrderSellerId,
  getOrderCustomerId,
  createOrderM,
  updateOrderM,
  deleteOrderM,
  orderStatus,
  updateStatus,
  updateStatusDelivery,
  updateStatusDelivered,
  getOrderByCustomedIdStatus,
};
