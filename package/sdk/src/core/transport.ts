import axios from "axios";
import { config, DSN_URL } from "./utils";

export async function sendError(error: any) {
  try {
    const data = JSON.stringify(error, Object.getOwnPropertyNames(error));
    await axios({
      method: "POST",
      url: DSN_URL,
      data: {
        error: data,
        projectId: config.projectId,
        APIKEY: config.APIKEY,
      },
    });
  } catch (error) {
    return console.log("Unable to send Error to backend", error);
  }
}
