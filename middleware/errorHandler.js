const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      error: error.message,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: "Duplicate value already exists",
    });
  }

  res.status(500).json({
    message: "Internal server error",
    error: error.message,
  });
};

module.exports = errorHandler;