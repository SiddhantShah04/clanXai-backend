import { model, Schema, Types } from "mongoose";

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
