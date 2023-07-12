import { GrouppedRims, ModelData, RimConfig, RimItem, RimsInfo } from "@/types/types";

export class DataFormatter {
  public static formatYears = (modelData: ModelData) => {
    const yearsData: { [key: string]: any } = {};
    if (modelData.info) {
      const info = modelData.info;
      info.years.forEach((year) => {
        const yearValue = year.value;
        const yearConfig = info.years.find((y) => y.value === yearValue);
        if (yearConfig) {
          yearsData[yearConfig.value] = {
            pcd: yearConfig.configs[0].pcd,
            diameters: yearConfig.configs[0].rims.map((rim) => rim.diameter),
          };
        }
      });
    }

    return yearsData;
  };

  public static groupRims = (rims: RimsInfo[]) => {
    const grouppedRims: GrouppedRims[]= []
    const uniqueId = [...new Set(rims.map(rim => rim.id))]
    uniqueId.forEach(id => {
      const rimsGroup = rims.filter(rim => rim.id === id)
      const configs: RimConfig[] = []
      rimsGroup.forEach(rim => {
        configs.push({
          width: rim.width,
          diameter: rim.diameter,
          price: rim.price
        })
      })
      const priceToShow = Math.min(...rimsGroup.map(rim => rim.price || 0))
      grouppedRims.push({
        id,
        images: rimsGroup[0].images,
        brandName: rimsGroup[0].brandName,
        modelName: rimsGroup[0].modelName,
        configs,
        nameSuffix: rimsGroup[0].nameSuffix,
        thumbnail: rimsGroup[0].thumbnail,
        priceToShow
      })
    })
    return grouppedRims
  }

  public static groupRimConfigs = (rim: RimItem[]) => {
    const pcd: string[] = []
    const configs = rim.map(item => {
      if(item.pcd){
        pcd.push(...item.pcd.split("/"))
      }
      return {
        id: item.configId,
        diameter: item.diameter,
        price: item.price,
        width: item.width,
      }
    })
    return {
      id: rim[0].id,
      images: rim[0].images,
      brandName: rim[0].brandName,
      modelName: rim[0].modelName,
      nameSuffix: rim[0].nameSuffix,
      thumbnail: rim[0].thumbnail,
      pcd,
      configs
    }
  }

}
