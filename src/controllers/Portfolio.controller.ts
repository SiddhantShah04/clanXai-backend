import { NextFunction, Request, Response } from "express";

class PortfolioController {
  public getPortfolio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.status(200).json({ data: [], message: "findAll" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
}

export default PortfolioController;
