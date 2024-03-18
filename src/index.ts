import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Backend service working',
  });
});

app.get('/health-check', (req, res) => {
  res.status(200).json({
    message: 'Backend service working',
  });
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});