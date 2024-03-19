import { NextFunction, Request, Response } from "express";
import TradeService from "../services/trade.service";
import StockService from "../services/stock.service";
import PortpolioService from "../services/portpolio.service";
import mongoose from "mongoose";

class TradeController {
  public tradeService = new TradeService();
  public stockService = new StockService();
  public portpolioService = new PortpolioService();

  public getTrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ data: [], message: "findAll" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  public addTrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { stockId, type, quantity } = req.body;
      // find stock
      const stockData = await this.stockService.findOne({
        _id: new mongoose.Types.ObjectId(stockId),
      });
      if (!stockData) {
        res.status(404).json({ success: false, message: "Stock not found" });
      }
      const newTrade = await this.tradeService.save({
        stock: stockData?._id,
        date: new Date(),
        price: stockData?.price,
        type,
        quantity,
      });

      await this.portpolioService.save({
        stockData,
        tradeId: newTrade._id,
      });

      res.status(200).json({ data: [], message: "findAll" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  public updateTrade = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { tradeId, type, quantity } = req.body;

      // find stock
      const tradeData = await this.tradeService.findOne({
        _id: new mongoose.Types.ObjectId(tradeId),
      });

      if (!tradeData) {
        res.status(404).json({ success: false, message: "Stock not found" });
      }

      const updated = await this.tradeService.updateOne(
        {
          _id: new mongoose.Types.ObjectId(tradeId),
        },
        {
          type,
          quantity,
        }
      );

      res.status(200).json({ data: updated, message: "findAll" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  public removeTrade = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { tradeId } = req.body;
      this.tradeService.deleteOne({
        _id: new mongoose.Types.ObjectId(tradeId),
      });
      res.status(200).json({ data: [], message: "findAll" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
}

export default TradeController;
