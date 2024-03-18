import { model, Schema, Types } from "mongoose";
// import { EUSER_STATUS } from '../utils/constants/common';

const stockSchema = new Schema(
  {
    symbol: {
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

export const Stock = model('Stock', stockSchema);
