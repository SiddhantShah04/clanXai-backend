import { StockModel } from "../models/Stock.model";

class StockService {
  public stockModel = StockModel;
  public async find(filter: object): Promise<any[]> {
    const stock: any[] = await this.stockModel.find(filter);
    return stock;
  }

  public async findOne(filter: object) {
    return this.stockModel.findOne(filter);
  }
}

export default StockService;
