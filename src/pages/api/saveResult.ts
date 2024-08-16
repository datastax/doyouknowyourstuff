import type { APIRoute } from "astro";
import dotenv from "dotenv";
import { db } from "../../util/db";

dotenv.config();

export const POST: APIRoute = async ({ request }) => {
  const { username, questions, answers, url } = await request.json();

  const client = db.collection("results");
  const result = await client.insertOne({
    username,
    questions,
    answers,
    url,
    $vectorize: JSON.stringify(questions.map((q: any) => q.question)),
  });

  return new Response(JSON.stringify({ id: result.insertedId }), {
    headers: {
      "content-type": "application/json",
    },
  });
};
