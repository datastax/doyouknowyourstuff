import dotenv from "dotenv";
import { db } from "./db";
import { processUrl } from "./processUrl";

dotenv.config();

export const getQuestions = async (url: string) => {
  const data = await fetch(process.env.LANGFLOW_URL!, {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.LANGFLOW_API_KEY}`,
    },
    body: JSON.stringify({
      tweaks: {
        "Text Input": {
          input_value: url,
        },
      },
    }),
  })
    .then((res) => res.json())
    .then((d) => {
      return JSON.parse(d.outputs[0].outputs[0].results.message.data.text);
    });

  return data.questions;
};
