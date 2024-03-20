import { NextFunction, Request, Response } from "express";
import PortpolioService from "../services/portpolio.service";
import StockService from "../services/stock.service";

class PortfolioController {
  public portpolioService = new PortpolioService();
  public stockService = new StockService();
  public getPortfolio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resp = await this.portpolioService.find();
      res.status(200).json({ data: resp, success:true,message: "findAll" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  public getHolding = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resp = await this.portpolioService.aggregate([
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
      res.status(200).json({ data: resp, success:true,message: "findAll" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  public getReturns = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resp = await this.portpolioService.aggregate([
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
      res.status(200).json({ data: resp, success:true,message: "Returns" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
}

export default PortfolioController;
