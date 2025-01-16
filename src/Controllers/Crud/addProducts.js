import Product from "../../Models/product.model.js";

const addProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (product.price < 0) {
      throw new Error("Price cannot be negative.");
    }
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default addProducts;
