import { PortfolioModel } from '../models/Portfolio.model';
import { TradeModel } from '../models/trade.schema';

class TradeService {
  public tradeModel = TradeModel;

  public async find(): Promise<any[]> {
    const portfolio: any[] = await this.tradeModel.find().populate('stocks.Stock')
    return portfolio;
  }

}

export default TradeService;
