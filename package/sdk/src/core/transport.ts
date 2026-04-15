import axios from "axios";
import { config, DSN_URL } from "./utils";

export async function sendError(error: any) {
  try {
    const data = JSON.stringify(error, Object.getOwnPropertyNames(error));
    console.log("data from the user", data);
    const response = await axios({
      method: "POST",
      url: DSN_URL,
      data: {
        error: data,
        projectId: config.projectId,
        APIKEY: config.APIKEY,
      },
    });
    console.log("response from the frontend", response);
  } catch (error) {
    return console.log("Unable to send Error to backend", error);
  }
}
