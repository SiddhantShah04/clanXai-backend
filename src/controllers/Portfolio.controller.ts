import { NextFunction, Request, Response } from "express";
import PortpolioService from "../services/portpolio.service";

class PortfolioController {
  public portpolioService = new PortpolioService()
  public getPortfolio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
     const resp = await this.portpolioService.find()
      res.status(200).json({ data: resp, message: "findAll" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
}

export default PortfolioController;
