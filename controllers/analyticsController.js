const Product = require("../models/product");

// PRODUCT RECOMMENDATIONS
const getRecommendations = async (req, res, next) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    const products = await Product.find(filter)
      .sort({
        rating: -1,
      })
      .limit(5);

    res.status(200).json({
      message: "Product recommendations generated",
      recommendations: products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
};