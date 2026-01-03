import { sendError } from "../core/transport";
import { config } from "../core/utils";
import { UncaughtException } from "./errorListener";

export function NodeInit(APIKEY: string) {
  ((config.APIKEY = APIKEY), UncaughtException());
}

export async function captureError(error: any) {
  await sendError(error);
}
