import express, { Router } from "express";
import { IRoute } from "../interfaces/routes.interface";
import portfolio from "./v1/portfolio.route";
import trade from "./v1/trade.route";


const router = express.Router();

const defaultIRoute: IRoute[] = [
  {
    path: "/portfolio",
    route: portfolio,
  },
  {
    path: "/trade",
    route: trade,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
