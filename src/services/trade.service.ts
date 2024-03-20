import { ClientSession } from "mongoose";
import { PortfolioModel } from "../models/Portfolio.model";
import { TradeModel } from "../models/trade.schema";

class TradeService {
  public tradeModel = TradeModel;

  public findOne(filter: Object): any {
    return this.tradeModel.findOne(filter);
  }

  public async save(data: object, session: ClientSession): Promise<any> {
    const newTrade = new this.tradeModel(data);

    // Save the new trade
    await newTrade.save({ session: session as ClientSession });
    return newTrade;
  }
  public updateOne(filter: Object, payload: Object) {
    return this.tradeModel.findOneAndUpdate(filter, payload, {
      new: true,
    });
  }

  public deleteOne(filter: Object) {
    return this.tradeModel.deleteOne(filter);
  }
}

export default TradeService;
