import { PortfolioModel } from "../models/Portfolio.model";

class PortpolioService {
  public portfolioModel = PortfolioModel;

  public async find(): Promise<any[]> {
    const portfolio: any[] = await this.portfolioModel
      .find()
      .populate("stock")
      .populate("trades");
    return portfolio;
  }

  public findOne(filter: Object) {
    return this.portfolioModel.findOne(filter);
  }

  public updateOne(filter: Object, payload: Object) {
    return this.portfolioModel.updateOne(filter, payload);
  }

  public async getHolding(): Promise<any[]> {
    const portfolio: any[] = await this.portfolioModel.aggregate([
      {
        $lookup: {
          from: "stocks", // Name of your Trade collection
          localField: "stock", // Array field referencing Trade IDs
          foreignField: "_id", // Field in Trade that stores document ID
          as: "stock", // Alias for the joined trade documents
        },
      },
      {
        $unwind: "$stock",
      },
      {
        $lookup: {
          from: "trades", // Name of your Trade collection
          localField: "trades", // Array field referencing Trade IDs
          foreignField: "_id", // Field in Trade that stores document ID
          as: "trades", // Alias for the joined trade documents
        },
      },
      {
        $unwind: "$trades",
      },
      {
        $group: {
          _id: "$stock",
          totalQuantity: {
            $sum: {
              $cond: [
                { $eq: ["$trades.type", "BUY"] },
                "$trades.quantity",
                { $multiply: [-1, "$trades.quantity"] },
              ],
            },
          },
          totalCost: {
            $sum: {
              $multiply: [
                {
                  $cond: [
                    { $eq: ["$trades.type", "BUY"] },
                    "$trades.quantity",
                    { $multiply: [-1, "$trades.quantity"] },
                  ],
                },
                "$trades.price",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          stock: "$_id.name",
          totalQuantity: 1,
          totalCost: 1,
          averageBuyingPrice: { $divide: ["$totalCost", "$totalQuantity"] },
        },
      },
    ]);
    return portfolio;
  }

  public async save(Data: any): Promise<any> {
    const { stockData, tradeId } = Data;
    let portfolio = await this.findOne({
      stock: stockData?._id,
    });

    if (!portfolio) {
      portfolio = new this.portfolioModel({
        stock: stockData?._id,
        trades: [tradeId], // Add the trade to the trades array
      });
    } else {
      portfolio.trades.push(tradeId);
    }

    await portfolio.save();
  }
  public async returns(): Promise<any> {
    const portfolio: any[] = await this.portfolioModel.aggregate([
      {
        $lookup: {
          from: "stocks", // Name of your Trade collection
          localField: "stock", // Array field referencing Trade IDs
          foreignField: "_id", // Field in Trade that stores document ID
          as: "stock", // Alias for the joined trade documents
        },
      },
      {
        $unwind: "$stock",
      },
      {
        $lookup: {
          from: "trades", // Name of your Trade collection
          localField: "trades", // Array field referencing Trade IDs
          foreignField: "_id", // Field in Trade that stores document ID
          as: "trades", // Alias for the joined trade documents
        },
      },
      {
        $unwind: "$trades",
      },
      {
        $group: {
          _id: null,
          totalInvestment: {
            $sum: {
              $cond: [{ $eq: ["$trades.type", "BUY"] }, "$trades.price", 0],
            },
          },
          totalReturns: {
            $sum: {
              $cond: [{ $eq: ["$trades.type", "SELL"] }, "$trades.price", 0],
            },
          },
        },
      },
      {
        $project: {
          totalInvestment: 1,
          totalReturns: 1,
          cumulativeReturn: {
            $multiply: [
              {
                $divide: [
                  { $subtract: ["$totalReturns", "$totalInvestment"] },
                  "$totalInvestment",
                ],
              },
              100,
            ],
          },
        },
      },
    ]);
    return portfolio;
  }
}

export default PortpolioService;
