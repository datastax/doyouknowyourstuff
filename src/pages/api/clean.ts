// Used by Langflow between hits
import type { APIRoute } from "astro";
import dotenv from "dotenv";
import { db } from "../../util/db";

dotenv.config();

export const GET: APIRoute = async ({ url }) => {
  const params = new URLSearchParams(url.search);
  const collection = db.collection("stuff");

  await collection.deleteMany();
  return new Response("ok", {
    status: 302,
    headers: { location: params.get("next")! },
  });
};
