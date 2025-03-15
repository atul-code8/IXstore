import { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);


export default model('Cart', CartSchema);