import { db } from "@/libs/rimsDb";
import { carMaker, carModel, items, rimConfigs, rims } from "@/schemas/schemas";
import { RimItem } from "@/types/types";
import { and, eq, inArray, desc, sql } from "drizzle-orm";

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

  public static getRims = async (
    pcd?: string,
    diameters?: string[],
    brand?: string,
    sort?: string
  ) => {
    const rimsData = db
      .select({
        id: rims.id,
        images: rims.images,
        price: rimConfigs.priceUsd,
        brandName: rims.brandName,
        modelName: rims.name,
        nameSuffix: rims.nameSuffix,
        thumbnail: rims.thumbnail,
        diameter: rimConfigs.d,
        width: rimConfigs.w,
      })
      .from(rimConfigs)
      .innerJoin(rims, eq(rimConfigs.rimId, rims.id))
    if(pcd && diameters) {
      rimsData.where(and(eq(rimConfigs.pcd, pcd), inArray(rimConfigs.d, diameters)));
    }
    if (brand) {
      rimsData.where(eq(rims.brandName, brand));
    }
    if (sort && sort === "POPULAR") {
      rimsData
        .innerJoin(items, eq(items.id, rims.id))
        .orderBy(desc(items.visitsCount));
    }
    return rimsData;
  };

  public static getMakers = async () => {
    const makers = await db
      .select({
        maker: carMaker.name,
        makerId: carMaker.id,
      })
      .from(carMaker);
    return makers;
  };

  public static getRim = async (id: number): Promise<RimItem[]> => {
    const rimsData = await db
      .select({
        id: rims.id,
        images: rims.images,
        brandName: rims.brandName,
        modelName: rims.name,
        nameSuffix: rims.nameSuffix,
        thumbnail: rims.thumbnail,
        configId: rimConfigs.id,
        diameter: rimConfigs.d,
        price: rimConfigs.priceUsd,
        width: rimConfigs.w,
        pcd: rimConfigs.pcd,
      })
      .from(rimConfigs)
      .innerJoin(rims, eq(rimConfigs.rimId, rims.id))
      .where(eq(rimConfigs.rimId, id))
    return rimsData;
  }
}
