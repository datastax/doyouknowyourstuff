import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";
dotenv.config();

export const db = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN!).db(
  process.env.ASTRA_DB_API_ENDPOINT!
);
