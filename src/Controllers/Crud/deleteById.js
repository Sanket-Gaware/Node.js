import Product from "../../Models/product.model.js";

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default deleteById;
