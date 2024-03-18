import express, { Router } from "express";
import TradeController from "../../controllers/Trade.controller";

const router: Router = express.Router();

const tradecontroller = new TradeController();

router.post(`/`, tradecontroller.getTrade);
router.patch(`/`, tradecontroller.updateTrade);
router.delete(`/`, tradecontroller.getTrade);




// this.router.get(`${this.path}/holdings`, this.usersController.getUserById);
// this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
// this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
// this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);

// router
//   .get('/holdings', tradeController)
//   .get('/returns', tradeController)

export default router;
