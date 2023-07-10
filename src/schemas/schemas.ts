import { ModelYearInfo } from "@/types/types";
import { InferModel } from "drizzle-orm";
import {
  bigint,
  char,
  jsonb,
  pgTable,
  integer,
  doublePrecision,
  real,
} from "drizzle-orm/pg-core";

export const carMaker = pgTable("car_maker", {
  id: bigint("id", { mode: "number" }).notNull(),
  name: char("name", { length: 256 }),
});

export const carModel = pgTable("car_model", {
  id: bigint("id", { mode: "number" }).notNull(),
  info: jsonb("info").$type<{ years: ModelYearInfo[] }>(),
  name: char("name", { length: 256 }),
  carMakerId: bigint("car_maker_id", { mode: "number" }),
  config: jsonb("config"),
});

export const details = pgTable("details", {
  id: bigint("id", { mode: "number" }).notNull(),
});

export const hibernateSequence = pgTable("hibernate_sequence", {
  sequenceName: char("name", { length: 256 }).notNull(),
  nextVal: bigint("next_val", { mode: "number" }),
});

export const items = pgTable("items", {
  dtype: char("dtype", { length: 32 }).notNull(),
  id: bigint("id", { mode: "number" }).notNull(),
  brandName: char("brand_name", { length: 256 }),
  imageQuality: integer("image_quality").notNull(),
  images: jsonb("images"),
  name: char("name", { length: 256 }),
  thumbnail: char("thumbnail", { length: 256 }),
  visitsCount: integer("visits_count").notNull(),
  attrs: jsonb("attrs"),
});

export const offers = pgTable("offers", {
  id: bigint("id", { mode: "number" }).notNull(),
  dtype: char("dtype", { length: 32 }).notNull(),
  itemId: bigint("item_id", { mode: "number" }).notNull(),
  attrs: jsonb("attrs"),
});

export const rimConfigs = pgTable("rim_configs", {
  id: bigint("id", { mode: "number" }).notNull(),
  cb: doublePrecision("cb"),
  d: char("d", { length: 256 }),
  et: integer("et"),
  pcd: char("pcd", { length: 256 }),
  priceUsd: doublePrecision("price_usd"),
  w: char("w", { length: 256 }),
  rimId: bigint("rim_id", { mode: "number" }),
  searchIndex: char("search_index", { length: 256 }),
});

export const rimOffers = pgTable("rim_offers", {
  id: bigint("id", { mode: "number" }).notNull(),
  priceUsd: doublePrecision("price_usd"),
  rimId: bigint("rim_id", { mode: "number" }),
  rimConfigId: bigint("rim_config_id", { mode: "number" }),
  vendor: char("name", { length: 256 }),
});

export const rims = pgTable("rims", {
  id: bigint("id", { mode: "number" }).notNull(),
  brandName: char("brand_name", { length: 256 }),
  color: char("color", { length: 256 }),
  images: jsonb("images").$type<string[]>(),
  name: char("name", { length: 256 }),
  nameSuffix: char("name_suffix", { length: 256 }),
  thumbnail: char("thumbnail", { length: 256 }),
  type: char("type", { length: 256 }),
});

export const tireConfig = pgTable("tire_config", {
  id: bigint("id", { mode: "number" }).notNull(),
  carType: char("car_type", { length: 256 }),
  diameter: real("diameter"),
  height: integer("height"),
  loadIndex: char("load_index", { length: 256 }),
  searchIndex: char("search_index", { length: 256 }),
  season: char("season", { length: 256 }),
  speedIndex: char("speed_index", { length: 256 }),
  thorns: char("thorns", { length: 256 }),
  width: integer("width"),
  tireId: bigint("tire_id", { mode: "number" }),
});

export const tireOffers = pgTable("tire_offers", {
  id: bigint("id", { mode: "number" }).notNull(),
  city: char("city", { length: 256 }),
  price: char("price", { length: 256 }),
  tireCountry: char("tire_country", { length: 256 }),
  vendor: char("vendor", { length: 256 }),
  year: integer("year"),
  tireId: bigint("tire_id", { mode: "number" }),
  tireConfigId: bigint("tire_config_id", { mode: "number" }),
});

export const tires = pgTable("tires", {
  id: bigint("id", { mode: "number" }).notNull(),
  brandName: char("brand_name", { length: 256 }),
  images: jsonb("images"),
  name: char("name", { length: 256 }),
  thumbnail: char("thumbnail", { length: 256 }),
})

