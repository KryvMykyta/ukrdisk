import { OrderProduct } from "@/types/types";
import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailerInstance {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  public sendOrder = async (
    name: string,
    phone: string,
    email: string,
    products: OrderProduct
  ) => {
    const mailOptionsEmployee = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: `Order from ${name}, ${phone}`,
      text: `Customer with name ${name}, phone ${phone}, email ${email} ordered the following products:\n ${JSON.stringify(
        products,
        null,
        "\t"
      )}`,
    };
    await this.transporter.sendMail(mailOptionsEmployee);

    const mailOptionsClient = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Order notification from ukrdisk",
      text: "Your order has been received",
    };
    await this.transporter.sendMail(mailOptionsClient);
    return;
  };

  public sendCall = async (phone: string) => {
    const mailOptionsEmployee = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: `Asked for a call to ${phone}`,
      text: `Customer asked for a call to ${phone}`,
    };
    await this.transporter.sendMail(mailOptionsEmployee);
    return;
  };

  public sendQuestion = async (
    question: string,
    phone: string,
    email?: string
  ) => {
    const mailOptionsEmployee = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: `Question from ${phone}`,
      text: `question: ${question}\nphone: ${phone}\nemail: ${email}`,
    };
    await this.transporter.sendMail(mailOptionsEmployee);
    if (email) {
      const mailOptionsClient = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Question to ukrdisk",
        text: "Your question has been received and will be answered soon",
      };
      await this.transporter.sendMail(mailOptionsClient);
    }

    return;
  };
}

const mailerInstance = new MailerInstance();

export default mailerInstance;
