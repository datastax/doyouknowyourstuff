import dotenv from "dotenv";
import { db } from "./db";
import { processUrl } from "./processUrl";

dotenv.config();

export const getQuestions = async (url: string) => {
  // const cache = db.collection("question_cache");
  // const cachedQuestions = await cache.findOne({ url });
  // if (cachedQuestions) {
  //   return cachedQuestions.questions;
  // }

  const data = await fetch(process.env.LANGFLOW_URL!, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      tweaks: {
        "TextInput-AQrEg": {
          input_value: url,
        },
      },
    }),
  })
    .then((res) => res.json())
    .then((d) => {
      console.dir(d, { depth: Infinity });
      return JSON.parse(d.outputs[0].outputs[0].results.message.data.text);
    });

  // await cache.insertOne({ url, questions: data.questions });
  await db.collection(processUrl(url)).drop();
  return data.questions;
};
