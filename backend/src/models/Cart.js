import { Schema, Types, model } from "mongoose";

const CartSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: [
      {
        product: { type: Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default model("Cart", CartSchema);
