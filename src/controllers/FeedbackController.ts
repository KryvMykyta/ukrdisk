import { Request, Response } from "express";
import botInstance from "@/utils/BotInstance";
import mailerInstance from "@/utils/MailerInstance";
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
        products: OrderProduct;
      }
    >,
    res: Response
  ) => {
    try {
      const { question, email, phone, products } = req.body;
      await botInstance.sendOrder(question, email, phone, products);
      await mailerInstance.sendOrder(question, email, phone, products);
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
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
    try {
      const { question, email, phone } = req.body;
      await botInstance.sendQuestion(question, phone, email);
      await mailerInstance.sendQuestion(question, phone, email);
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
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
    try {
      const { phone } = req.body;
      await botInstance.sendCall(phone);
      await mailerInstance.sendCall(phone);
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  };
}
