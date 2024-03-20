import { NextFunction, Request, Response } from "express";
import TradeService from "../services/trade.service";
import StockService from "../services/stock.service";
import PortfolioService from "../services/portfolio.service";
import mongoose from "mongoose";

class TradeController {
  public tradeService = new TradeService();
  public stockService = new StockService();
  public portfolioService = new PortfolioService();

  // Add new trade
  public addTrade = async (req: Request, res: Response, next: NextFunction) => {
        const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { stockId, type, quantity } = req.body;

      // Find stock by ID
      const stockData = await this.stockService.findOne({
        _id: new mongoose.Types.ObjectId(stockId),
      });

      // If stock not found, return 404
      if (!stockData) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ success: false, message: "Stock not found" });
      }

      // Create new trade
      const newTrade = await this.tradeService.save({
        stock: stockData._id,
        date: new Date(),
        price: stockData.price,
        type,
        quantity,
      },session);

      // Update portfolio with new trade
      await this.portfolioService.save({
        stockData,
        tradeId: newTrade._id,
      },session);


      
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

      // Send success response
      res.status(200).json({ success: true, data: newTrade, message: "Trade added successfully" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error adding trade:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  // Update existing trade
  public updateTrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tradeId, type, quantity } = req.body;

      // Find trade by ID
      const tradeData = await this.tradeService.findOne({
        _id: new mongoose.Types.ObjectId(tradeId),
      });

      // If trade not found, return 404
      if (!tradeData) {
        return res.status(404).json({ success: false, message: "Trade not found" });
      }

      // Update trade
      const updatedTrade = await this.tradeService.updateOne(
        { _id: new mongoose.Types.ObjectId(tradeId) },
        { type, quantity }
      );

      // Send success response
      res.status(200).json({ success: true, data: updatedTrade, message: "Trade updated successfully" });
    } catch (error) {
      console.error("Error updating trade:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  // Remove trade
  public removeTrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tradeId } = req.body;

      // Delete trade by ID
      await this.tradeService.deleteOne({
        _id: new mongoose.Types.ObjectId(tradeId),
      });

      // Send success response
      res.status(200).json({ success: true, data: [], message: "Trade removed successfully" });
    } catch (error) {
      console.error("Error removing trade:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}

export default TradeController;
