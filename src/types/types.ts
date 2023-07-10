import { Context, NarrowedContext } from "telegraf";
import { Update, Message } from "telegraf/typings/core/types/typegram";

export type OrderProduct = {
  productName: string,
  productId: string,
  productPrice: number,
  totalPrice: number,
  amount: number
}

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

export type RimsInfo = {
  id: number;
  images: string[] | null;
  price: number | null;
  brandName: string | null;
  modelName: string | null;
  nameSuffix: string | null;
  thumbnail: string | null;
  diameter: string | null;
  width: string | null;
}

export type GrouppedRims = {
  id: number;
  images: string[] | null;
  brandName: string | null;
  modelName: string | null;
  nameSuffix: string | null;
  thumbnail: string | null;
  configs: {
    diameter: string | null;
    width: string | null;
    price: number | null;
  }[];
  priceToShow: number
};

export type RimConfig = {
  width:string | null,
  diameter: string | null,
  price: number | null
}


export type ContextType = NarrowedContext<
  Context<Update>,
  {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
  }
>;