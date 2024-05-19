const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      email,
      orderItems,
    } = req.body;

    // Log giá trị của các tham số nhận được
    console.log("Received parameters:", {
      userId,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      email,
      orderItems,
    });

    // Kiểm tra xem tất cả các tham số có giá trị không
    if (!userId) {
      console.log("Missing userId");
    }
    if (!paymentMethod) {
      console.log("Missing paymentMethod");
    }
    if (!itemsPrice) {
      console.log("Missing itemsPrice");
    }
    if (!shippingPrice) {
      console.log("Missing shippingPrice");
    }
    if (!totalPrice) {
      console.log("Missing totalPrice");
    }
    if (!fullName) {
      console.log("Missing fullName");
    }
    if (!address) {
      console.log("Missing address");
    }
    if (!city) {
      console.log("Missing city");
    }
    if (!phone) {
      console.log("Missing phone");
    }
    if (!email) {
      console.log("Missing email");
    }
    if (!orderItems) {
      console.log("Missing orderItems");
    }

    if (
      !userId ||
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !fullName ||
      !address ||
      !city ||
      !phone ||
      !email ||
      !orderItems
    ) {
      return res.status(400).json({
        status: "ERR",
        message: "Parameter(s) required",
      });
    }

    const response = await OrderService.createOrder({ userId, ...req.body });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllOrderDetails = async (request, respond) => {
  try {
    const userId = request.params.id;
    if (!userId) {
      return respond.status(200).json({
        status: "ERR",
        message: "userId required",
      });
    }
    const response = await OrderService.getAllOrderDetails(userId);
    return respond.status(200).json(response);
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

const getDetailsOrder = async (request, respond) => {
  try {
    const orderId = request.params.id;
    if (!orderId) {
      return respond.status(200).json({
        status: "ERR",
        message: "userId required",
      });
    }
    const response = await OrderService.getOrderDetails(orderId);
    return respond.status(200).json(response);
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

const cancelOrderDetails = async (request, respond) => {
  try {
    const data = request.body.orderItems;
    const orderId = request.body.orderId;
    if (!orderId) {
      return respond.status(200).json({
        status: "ERR",
        message: "orderId required",
      });
    }
    const response = await OrderService.cancelOrderDetails(orderId, data);
    return respond.status(200).json(response);
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

const getAllOrder = async (request, respond) => {
  try {
    const data = await OrderService.getAllOrder();
    return respond.status(200).json(data);
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
};
