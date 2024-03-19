import express, { Router } from "express";
import PortfolioController from "../../controllers/Portfolio.controller";

const router: Router = express.Router();

const portfoliocontroller = new PortfolioController();

router.get(`/`, portfoliocontroller.getPortfolio);
router.get(`/holding`, portfoliocontroller.getHolding);

export default router;
