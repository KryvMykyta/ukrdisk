import { RimsRepository } from "@/models/RimsRepository";
import { DataFormatter } from "@/utils/DataFormatter";
import { Request, Response } from "express";

export class RimsController {
  constructor() {}

  public getMarkModels = async (
    req: Request<{}, {}, {}, { mark: string }>,
    res: Response
  ) => {
    try {
      const models = await RimsRepository.getMarkModels(req.query.mark);
      return res.status(200).send(models);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  public getModelYears = async (
    req: Request<{}, {}, {}, { modelId: number }>,
    res: Response
  ) => {
    try {
      const models = await RimsRepository.getModelYears(req.query.modelId);
      const responseData = DataFormatter.formatYears(models[0]);
      return res.status(200).send(responseData);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  public getRims = async (
    req: Request<
      {},
      {},
      {},
      { pcd?: string; diameters?: string; brand?: string; sort?: string }
    >,
    res: Response
  ) => {
    try {
      const { pcd, diameters, brand, sort } = req.query;
      const diametersArray = diameters ? diameters.split(",") : undefined;
      const rims = await RimsRepository.getRims(
        pcd,
        diametersArray,
        brand,
        sort
      );
      const grouppedRims = DataFormatter.groupRims(rims);
      return res.status(200).send(grouppedRims);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  public getMakers = async (req: Request, res: Response) => {
    try {
      const makers = await RimsRepository.getMakers();
      return res.status(200).send(makers);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  public getRim = async (
    req: Request<{}, {}, {}, { id: number }>,
    res: Response
  ) => {
    try {
      const rim = await RimsRepository.getRim(req.query.id);
      const rimResponse = DataFormatter.groupRimConfigs(rim);
      return res.status(200).send(rimResponse);
    } catch (e) {
      return res.status(500).send(e);
    }
  };
}
