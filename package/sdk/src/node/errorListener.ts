// process.on('uncaughtException')

import { sendError } from "../core/transport";

export async function UncaughtException() {
  process.on("uncaughtException", async (err) => {
    try {
      console.log("this is process.on start......>");
      const response = await sendError(err);
      console.log("this is end of process.on end.....>");
    } catch (error) {
      console.log("unable to send error on server");
    }
  });
}
