import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    target_audience: {
      type: String,
      enum: ["men", "women", "unisex", "kids"],
      required: true,
    },
    images: [
      {
        src: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    colors: [
      {
        name: { type: String, required: true },
        colorCode: { type: String, required: true },
      },
    ],
    sizes: [
      {
        name: { type: String, required: true },
        inStock: { type: Boolean, required: true },
      },
    ],
    description: { type: String, required: true },
    highlights: [
      {
        type: String,
        required: true,
      },
    ],
    details: { type: String, required: true },
    countInStock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Product", ProductSchema);
