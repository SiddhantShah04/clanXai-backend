import { NextFunction, Request, Response } from "express";

class TradeController {
  public getTrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ data: [], message: "findAll" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  public updateTrade = async (
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

  public removeTrade = async (
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

export default TradeController;
