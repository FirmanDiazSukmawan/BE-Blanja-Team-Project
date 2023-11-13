const {
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
} = require("../model/orderModel");

const orderController = {
  getOrder: async (req, res) => {
    try {
      let result = await getOrderM();
      res.status(200).json({
        message: "get order successfully ",
        data: result.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get order",
      });
    }
  },

  getOrderById: async (req, res) => {
    const order_id = req.params.order_id;
    let result = await getOrderId(order_id);
    try {
      res.status(200).json({
        message: "order has been found",
        data: result.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error getting order",
      });
    }
  },

  getOrderBySellerId: async (req, res) => {
    const seller_id = req.params.seller_id;
    let result = await getOrderSellerId(seller_id);
    try {
      res.status(200).json({
        message: "order has been found",
        data: result.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error getting order",
      });
    }
  },

  getOrderByCustomerId: async (req, res) => {
    try {
      const customer_id = req.params.customer_id;
      let result = await getOrderCustomerId(customer_id);
      res.status(200).json({
        message: "order has been found",
        data: result.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error getting order",
      });
    }
  },

  getOrderByCustomerIdByStatus: async (req, res) => {
    try {
      const customer_id = req.params.customer_id;
      const status = String(req.params.status);
      console.log(status);
      const result = await getOrderByCustomedIdStatus(customer_id, status);
      res.status(200).json({
        message: "order has been found",
        data: result.rows,
      });
    } catch (error) {
      res.status(404).json({
        message: "error getting order",
        error: error.message,
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

  updateOrderStatus: async (req, res) => {
    try {
      let customer_id = req.params.customer_id;
      let status = req.params.status;
      let result = await getOrderCustomerId(customer_id);
      // console.log(result.rows);
      if (!result) {
        return res.status(300).json({
          message: "customer no have order",
        });
      }
      const statusChange = await orderStatus(customer_id, status);
      // console.log(statusChange);

      return res
        .status(200)
        .json({ data: statusChange, message: "status change" });
    } catch (err) {
      return res.status(400).json({
        err: err.message,
        message: "customer no have order",
      });
    }
  },

  updateOrderStatusPaid: async (req, res) => {
    try {
      let customer_id = req.params.customer_id;
      let status = req.params.status;
      let result = await getOrderCustomerId(customer_id, status);
      // console.log(result);
      if (!result) {
        return res.status(300).json({
          message: "customer no have order",
        });
      }
      const statusChange = await updateStatus(customer_id, status);

      return res
        .status(200)
        .json({ data: statusChange, message: "status change" });
    } catch (err) {
      return res.status(400).json({
        err: err.message,
        message: "error paid please try again",
      });
    }
  },

  updateOrderStatusDelivery: async (req, res) => {
    try {
      let seller_id = req.params.seller_id;
      // console.log(seller_id);
      let customer_id = req.params.customer_id;
      console.log(customer_id);
      let status = req.params.status;
      let result = await getOrderCustomerId(customer_id, status);
      // console.log(result);
      if (!result) {
        return res.status(300).json({
          message: "customer no have order",
        });
      }
      const statusChange = await updateStatusDelivery(seller_id, result);

      return res
        .status(200)
        .json({ data: statusChange, message: "status change" });
    } catch (err) {
      return res.status(400).json({
        err: err.message,
        message: "error change status to delivery",
      });
    }
  },

  updateOrderStatusDelivered: async (req, res) => {
    try {
      let customer_id = req.params.customer_id;
      let status = req.params.status;

      let result = await getOrderCustomerId(customer_id, status);
      if (!result) {
        return res.status(300).json({
          message: "customer no have order",
        });
      }
      const statusChange = await updateStatusDelivered(customer_id, status);

      return res
        .status(200)
        .json({ data: statusChange, message: "status change" });
    } catch (err) {
      return res.status(400).json({
        err: err.message,
        message: "error paid please try again",
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
