import { ModelData } from "@/types/types";

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
}
