import axios from "axios";
import { config, DSN_URL } from "./utils";

export async function sendError(error: any) {
  try {
    await axios({
      method: "POST",
      url: DSN_URL,
      data: {
        error,
        projectId: config.projectId,
      },
    });
  } catch (error) {
    return console.log("Unable to send Error to backend", error);
  }
}
