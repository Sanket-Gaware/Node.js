import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name"],
    },
    quantity: {
      type: Number,
      required: [true, "please enter quantity"],
    },
    price: {
      type: Number,
      required: [true, "please enter price "],
    },
    image: {
      type: String,
      required: false,
    }, 
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", ProductSchema);
export default Product;
