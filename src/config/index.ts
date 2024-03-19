import { config } from "dotenv";
config();

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
} = process.env;

export const ETRADE_TYPES = ["BUY", "SELL"];

// "holdings": [
//     {
//         "stock": "RELIANCE",
//         "holding": {
//             "quantity": 150,
//             "average_buying_price": 875.5
//         }
//     },
//     {
//         "stock": "HDFCBANK",
//         "holding": {
//             "quantity": 100,
//             "average_buying_price": 1000
//         }
//     }
// ]

// RELIANCE:
// BUY 100@900 10/04/2015

// SELL 50@1000 10/05/2015

// BUY 100@850 10/06/2015

// HDFCBANK:

// BUY 200@1000 11/05/2015

// SELL 100@800 12/07/2015
