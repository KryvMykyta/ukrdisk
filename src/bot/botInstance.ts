import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { ContextType, OrderProduct } from "@/types/types";
dotenv.config();

const BOT_MESSAGES = {};

class BotInstance {
  private bot: Telegraf;
  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    process.once("SIGINT", () => this.bot.stop("SIGINT"));
    process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
  }

  public sendOrder = async (
    name: string,
    phone: string,
    email: string,
    products: OrderProduct[]
  ) => {
    const msg = `Customer with name ${name}, phone ${phone}, email ${email} ordered the following products:\n ${JSON.stringify(products,null,'\t')}`
    await this.bot.telegram.sendMessage(-1001951644285, msg);
    return;
  };

  public sendCall = async (phone: string) => {
    const msg = `Customer with phone number ${phone} asked for a call`
    await this.bot.telegram.sendMessage(-1001951644285, msg);
    return;
  };

  public sendQuestion = async (
    question: string,
    phone: string,
    email?: string,
  ) => {
    const msg = `question: ${question}\nphone: ${phone}\nemail: ${email}`
    await this.bot.telegram.sendMessage(-1001951644285, msg);
    return;
  };
}

const botInstance = new BotInstance();

export default botInstance;
