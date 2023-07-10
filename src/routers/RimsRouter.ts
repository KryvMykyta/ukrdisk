import { RimsController } from "@/controllers/RimsController";
import { Router } from "express";

export class CarChooseRouter {
  router: Router;
  path: string;
  controller: RimsController;

  constructor(path: string) {
    (this.router = Router()), (this.path = path);
    this.controller = new RimsController();
    this.router.get('/models',this.controller.getMarkModels)
    this.router.get('/years',this.controller.getModelYears)
    this.router.get('/',this.controller.getRims)
    this.router.get('/makers',this.controller.getMakers)
  }
}
