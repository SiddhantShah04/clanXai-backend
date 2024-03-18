import { model, Schema, Types } from "mongoose";
// import { EUSER_STATUS } from '../utils/constants/common';

const PortfolioSchema = new Schema(
  {
    stock: {
      type: Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    trades: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trade",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const PortfolioModel = model("Portfolio", PortfolioSchema);
