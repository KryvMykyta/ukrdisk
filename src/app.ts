import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CarChooseRouter } from "./routers/RimsRouter";
import { Telegraf } from "telegraf";
import { FeedbackRouter } from "./routers/FeedbackRouter";

dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

const RimsRoute = new CarChooseRouter('/rims')
const FeedbackRoute = new FeedbackRouter('/feedback')

const routes = [RimsRoute, FeedbackRoute];
routes.forEach((route) => {
  app.use(route.path, route.router);
});

app.listen(PORT, () => {
  console.log("started");
});
