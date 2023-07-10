import { db } from "@/libs/rimsDb";
import { carMaker, carModel, rimConfigs } from "@/schemas/schemas";
import { and, eq, inArray } from "drizzle-orm";

export class RimsRepository {
  public static getModelYears = async (modelId: number) => {
    const modelData = await db
      .select()
      .from(carModel)
      .where(eq(carModel.id, modelId));
    return modelData;
  };

  public static getMarkModels = async (mark: string) => {
    const models = await db
      .select({
        model: carModel.name,
        modelId: carModel.id,
      })
      .from(carMaker)
      .innerJoin(carModel, eq(carModel.carMakerId, carMaker.id))
      .where(eq(carMaker.name, mark));
    return models;
  };

  public static getRims = async (pcd: string, diameters: string[]) => {
    const rims = await db
      .select()
      .from(rimConfigs)
      .where(and(eq(rimConfigs.pcd, pcd), inArray(rimConfigs.d, diameters)));
    return rims;
  };
}
