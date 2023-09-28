const {
  getOrderM,
  getOrderId,
  getOrderSellerId,
  getOrderCustomerId,
  createOrderM,
  updateOrderM,
  deleteOrderM,
} = require("../model/orderModel");

const orderController = {
  getOrder: async (req, res) => {
    try {
      let result = await getOrderM();
      res.json({
        message: "get order successfully ",
        data: result.rows,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error get order",
      });
    }
  },

  getOrderById: async (req, res) => {
    const order_id = req.params.order_id;
    let result = await getOrderId(order_id);
    try {
      res.json({
        message: "order has been found",
        data: result.rows,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting order",
      });
    }
  },

  getOrderBySellerId: async (req, res) => {
    const seller_id = req.params.seller_id;
    let result = await getOrderSellerId(seller_id);
    try {
      res.json({
        message: "order has been found",
        data: result.rows,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting order",
      });
    }
  },

  getOrderByCustomerId: async (req, res) => {
    try {
      const customer_id = req.params.customer_id;
      let result = await getOrderCustomerId(customer_id);
      res.json({
        message: "order has been found",
        data: result.rows,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting order",
      });
    }
  },

  createOrder: async (req, res) => {
    try {
      const order = {
        order_size: req.body.order_size,
        order_color: req.body.order_color,
        quantity: req.body.quantity,
        customer_id: req.body.customer_id,
        seller_id: req.body.seller_id,
        product_id: req.body.product_id,
      };

      let orderData = await createOrderM(order);
      //   console.log(orderData);
      res.status(200).json({
        message: "create order successfully",
        data: orderData.rows,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error create order",
      });
    }
  },

  updateOrder: async (req, res) => {
    try {
      let order_id = req.params.order_id;
      let { quantity } = req.body;

      let result = await updateOrderM(quantity, Number(order_id));
      //   console.log(result);
      res.status(202).json({
        message: "order has been updated",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error updating order",
      });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      let order_id = req.params.order_id;
      const result = await deleteOrderM(order_id);

      res.status(200).json({
        message: "order deleted successfully",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error deleting order",
      });
    }
  },
};

module.exports = orderController;
