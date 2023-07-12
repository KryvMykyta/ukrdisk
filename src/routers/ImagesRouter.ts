import { ImagesController } from "@/controllers/ImagesController";
import { Router } from "express";

export class ImagesRouter {
  router: Router;
  path: string;
  controller: ImagesController;

  constructor(path: string) {
    (this.router = Router()), (this.path = path);
    this.controller = new ImagesController();
    this.router.get('/:path',this.controller.sendImage)
  }
}
