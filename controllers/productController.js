const Product = require("../models/product");

// CREATE PRODUCT - ADMIN
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          brand: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category
    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    // Price
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "price_asc":
        sortOption.price = 1;
        break;

      case "price_desc":
        sortOption.price = -1;
        break;

      case "rating":
        sortOption.rating = -1;
        break;

      case "newest":
        sortOption.createdAt = -1;
        break;

      case "name":
        sortOption.name = 1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE PRODUCT
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// UPDATE PRODUCT - ADMIN
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT - ADMIN
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};