import { model, Schema, Types } from "mongoose";

const stockSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Assuming each stock symbol is unique
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const StockModel = model('Stock', stockSchema);
