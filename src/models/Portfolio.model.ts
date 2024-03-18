import { model, Schema, Types } from "mongoose";
// import { EUSER_STATUS } from '../utils/constants/common';

const stockSchema = new Schema(
  {
    stocks: [{
        stock: {
            type: Schema.Types.ObjectId,
            ref: 'Stock',
            required: true
        },
        trades: [{
            type: Schema.Types.ObjectId,
            ref: 'Trade',
            required: true
        }]
    }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Stock = model('Stock', stockSchema);
