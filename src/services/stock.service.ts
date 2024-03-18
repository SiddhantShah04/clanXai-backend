import { StockModel } from "../models/Stock.model";

class StockService {
  public stockModel = StockModel;
  public async findAllPortpolio(): Promise<any[]> {
    const users: any[] = await this.stockModel.find();
    return users;
  }
}

export default StockService;
