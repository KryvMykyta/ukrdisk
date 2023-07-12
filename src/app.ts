import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CarChooseRouter } from "./routers/RimsRouter";
import { FeedbackRouter } from "./routers/FeedbackRouter";
import { ImagesRouter } from "./routers/ImagesRouter";

dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

const RimsRoute = new CarChooseRouter('/rims')
const FeedbackRoute = new FeedbackRouter('/feedback')
const ImagesRoute = new ImagesRouter('/images')

const routes = [RimsRoute, FeedbackRoute, ImagesRoute];
routes.forEach((route) => {
  app.use(route.path, route.router);
});

app.listen(PORT, () => {
  console.log("started");
});
