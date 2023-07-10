import { Request, Response } from "express";
import botInstance from "@/bot/botInstance";
import { OrderProduct } from "@/types/types";

export class FeedbackController {
  constructor() {}

  public makeOrder = async (
    req: Request<
      {},
      {
        name: string;
        phone: string;
        email: string;
        products: OrderProduct[];
      }
    >,
    res: Response
  ) => {
    const { question, email, phone, products } = req.body;
    await botInstance.sendOrder(question, email, phone, products);
    return res.status(200).send();
  };

  public questionRequest = async (
    req: Request<
      {},
      {
        question: string;
        phone: string;
        email?: string;
      }
    >,
    res: Response
  ) => {
    const { question, email, phone } = req.body;
    await botInstance.sendQuestion(question, phone, email);
    return res.status(200).send();
  };

  public callRequest = async (
    req: Request<
      {},
      {
        phone: string;
      }
    >,
    res: Response
  ) => {
    const { phone } = req.body;
    await botInstance.sendCall(phone);
    return res.status(200).send();
  };
}
