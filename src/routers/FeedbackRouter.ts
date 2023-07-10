import { FeedbackController } from "@/controllers/FeedbackController";
import { Router } from "express";

export class FeedbackRouter {
  router: Router;
  path: string;
  controller: FeedbackController;

  constructor(path: string) {
    (this.router = Router()), (this.path = path);
    this.controller = new FeedbackController();
    this.router.post('/makeOrder', this.controller.makeOrder)
    this.router.post('/askCall',this.controller.callRequest)
    this.router.post('/question', this.controller.questionRequest)
  }
}
