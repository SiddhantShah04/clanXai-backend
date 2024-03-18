// import { CreateUserDto } from '@dtos/users.dto';
// import { HttpException } from '@exceptions/HttpException';
// import { User } from '@interfaces/users.interface';
// import userModel from '@models/users.model';
// import { isEmpty } from '@utils/util';
import { PortfolioModel } from '../models/Portfolio.model';

class PortpolioService {
  public portfolioModel = PortfolioModel;

  public async find(): Promise<any[]> {
    const portfolio: any[] = await this.portfolioModel.find().populate('stock').populate('trades')
    return portfolio;
  }

}

export default PortpolioService;
