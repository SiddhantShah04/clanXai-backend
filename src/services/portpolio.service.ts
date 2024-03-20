import { Aggregate, PipelineStage } from "mongoose";
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

  public async aggregate(payload: PipelineStage[]) {
    return  this.portfolioModel.aggregate(payload);
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
}

export default PortpolioService;
