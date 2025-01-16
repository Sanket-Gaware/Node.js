import Product from "../../Models/product.model.js";

const deleteByName = async (req, res) => {
  const { name } = req.params;
  console.log(name);
  try {
    await Product.deleteMany({ name });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default deleteByName;
