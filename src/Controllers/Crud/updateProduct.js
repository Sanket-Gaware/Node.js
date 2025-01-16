import Product from "../../Models/product.model.js";

const updatedProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default updatedProduct;
