import express, { Router } from "express";
import TradeController from "../../controllers/Trade.controller";

const router: Router = express.Router();

const tradecontroller = new TradeController();

router.post(`/`, tradecontroller.addTrade);
router.patch(`/`, tradecontroller.updateTrade);
router.delete(`/`, tradecontroller.removeTrade);

export default router;
