import { PortfolioModel } from '../models/Portfolio.model';

class PortpolioService {
  public portfolioModel = PortfolioModel;

  public async find(): Promise<any[]> {
    const portfolio: any[] = await this.portfolioModel.find().populate('stock').populate('trades')
    return portfolio;
  }

}

export default PortpolioService;
