import express, { Router } from "express";
import PortfolioController from "../../controllers/Portfolio.controller";

const router: Router = express.Router();

const portfoliocontroller = new PortfolioController();

router.get(`/`, portfoliocontroller.getPortfolio);



// this.router.get(`${this.path}/holdings`, this.usersController.getUserById);
// this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
// this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
// this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);

// router
//   .get('/holdings', PortfolioController)
//   .get('/returns', PortfolioController)

export default router;
