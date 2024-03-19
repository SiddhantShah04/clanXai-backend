import express, { Router } from "express";
import PortfolioController from "../../controllers/Portfolio.controller";

const router: Router = express.Router();

const portfoliocontroller = new PortfolioController();

router.get(`/`, portfoliocontroller.getPortfolio);
router.get(`/holding`, portfoliocontroller.getHolding);
router.get(`/returns`, portfoliocontroller.getReturns);


export default router;
