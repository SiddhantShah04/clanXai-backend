import { NextFunction, Request, Response } from "express";
import PortpolioService from "../services/portpolio.service";
import StockService from "../services/stock.service";

class PortfolioController {
  public portpolioService = new PortpolioService();
  public stockService = new StockService();
  public getPortfolio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resp = await this.portpolioService.find();
      res.status(200).json({ data: resp, message: "findAll" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  public getHolding = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resp = await this.portpolioService.getHolding();
      res.status(200).json({ data: resp, message: "findAll" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  public getReturns = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resp = await this.portpolioService.returns();
      res.status(200).json({ data: resp, message: "findAll" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
}

export default PortfolioController;
