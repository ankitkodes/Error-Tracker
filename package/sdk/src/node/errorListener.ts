// process.on('uncaughtException')

import { sendError } from "../core/transport";

export async function UncaughtException() {
  process.on("uncaughtException", async (err) => {
    try {
      const response = await sendError(err);
    } catch (error) {
      console.log("unable to send error on server");
    }
  });
}
