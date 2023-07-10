export type ModelData = {
    id: number;
    name: string | null;
    config: unknown;
    info: {
        years: ModelYearInfo[];
    } | null;
    carMakerId: number | null;
};

export type ModelYearInfo = {
  value: number;
  configs: {
    pcd: string;
    rims: {
      width: number;
      diameter: number;
    }[];
    engines: string[];
  }[];
};
