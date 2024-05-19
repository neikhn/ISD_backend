const Product = require("../models/ProductModel");

const createProduct = async (newProduct) => {
  const {
    name,
    image,
    type,
    countInStock,
    price,
    rating,
    description,
    discount,
  } = newProduct;
  try {
    const checkProduct = await Product.findOne({ name });
    if (checkProduct !== null) {
      return {
        status: "ERR",
        message: "Product name already exists",
      };
    }
    const product = new Product({
      name,
      image,
      type,
      countInStock: Number(countInStock),
      price,
      rating,
      description,
      discount: Number(discount),
    });
    await product.save();
    return {
      status: "OK",
      message: "SUCCESS",
      data: product,
    };
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

const updateProduct = async (id, data) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedProduct) {
      return {
        status: "ERR",
        message: "Undefined product",
      };
    }
    return {
      status: "OK",
      message: "SUCCESS",
      data: updatedProduct,
    };
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return {
        status: "ERR",
        message: "Undefined product",
      };
    }
    return {
      status: "OK",
      message: "Product deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

const deleteManyProduct = async (ids) => {
  try {
    await Product.deleteMany({ _id: { $in: ids } });
    return {
      status: "OK",
      message: "Products deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

const getDetailsProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return {
        status: "ERR",
        message: "Undefined product",
      };
    }
    return {
      status: "OK",
      message: "SUCCESS",
      data: product,
    };
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

const getAllProduct = async (limit, page, sort, filter) => {
  try {
    const query = {};
    if (filter) {
      const [key, value] = filter;
      query[key] = { $regex: value, $options: "i" };
    }
    const totalProduct = await Product.countDocuments(query);
    let products = Product.find(query)
      .skip(page * limit)
      .limit(limit)
      .sort({ createdAt: -1, updatedAt: -1 });

    if (sort) {
      const [order, field] = sort;
      const sortObject = {};
      sortObject[field] = order === "asc" ? 1 : -1;
      products = products.sort(sortObject);
    }

    const productList = await products.exec();

    return {
      status: "OK",
      message: "Success",
      data: productList,
      total: totalProduct,
      pageCurrent: Number(page + 1),
      totalPage: Math.ceil(totalProduct / limit),
    };
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

const getAllType = async () => {
  try {
    const allTypes = await Product.distinct("type");
    return {
      status: "OK",
      message: "Success",
      data: allTypes,
    };
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType,
};
