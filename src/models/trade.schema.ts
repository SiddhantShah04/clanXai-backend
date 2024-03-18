import { model, Schema, Types } from "mongoose";
import { ETRADE_TYPES } from "../config";

const tradeSchema = new Schema(
  {
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ETRADE_TYPES,
        required: true
    },
    stock: {
        type: Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const TradeModel = model('Trade', tradeSchema);
