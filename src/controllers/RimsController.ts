import { RimsRepository } from "@/models/RimsRepository";
import { DataFormatter } from "@/utils/DataFormatter";
import { Request, Response } from "express";

export class RimsController {
  constructor() {}

  public getMarkModels = async (
    req: Request<{}, {}, {}, { mark: string }>,
    res: Response
  ) => {
    const models = await RimsRepository.getMarkModels(req.query.mark);
    return res.status(200).send(models);
  };

  public getModelYears = async (
    req: Request<{}, {}, {}, { modelId: number }>,
    res: Response
  ) => {
    const models = await RimsRepository.getModelYears(req.query.modelId);
    const responseData = DataFormatter.formatYears(models[0]);
    return res.status(200).send(responseData);
  };

  public getRims = async (
    req: Request<{}, {}, {}, { pcd: string, diameters: string }>,
    res: Response
  ) => {
    const {pcd, diameters} = req.query;
    const diametersArray = diameters.split(',');
    const rims = await RimsRepository.getRims(pcd, diametersArray);
    return res.status(200).send(rims);
  };
}
