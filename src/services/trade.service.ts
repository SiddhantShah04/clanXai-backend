import { PortfolioModel } from "../models/Portfolio.model";
import { TradeModel } from "../models/trade.schema";

class TradeService {
  public tradeModel = TradeModel;

  public async find(): Promise<any[]> {
    const trade: any[] = await this.tradeModel.find().populate("Stock");
    return trade;
  }

  public async save(data: object): Promise<any> {
    const newTrade = new this.tradeModel(data);

    // Save the new trade
    await newTrade.save();
    return newTrade;
  }
}

export default TradeService;
