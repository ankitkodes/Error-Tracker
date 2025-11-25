import axios from "axios";
import { config } from "./utils";
require("dotenv").config();

export async function sendError(error: any) {
  try {
    await axios({
      method: "POST",
      url: "http://localhost:3000/api/bugs",
      data: {
        error,
        projectId: config.projectId,
      },
    });
  } catch (error) {
    return console.log("Unable to send Error to backend", error);
  }
}
