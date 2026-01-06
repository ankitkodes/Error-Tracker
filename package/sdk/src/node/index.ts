import { sendError } from "../core/transport";
import { config } from "../core/utils";
import { UncaughtException } from "./errorListener";

export function NodeInit(APIKEY: string, projectId: string) {
  ((config.APIKEY = APIKEY),
    (config.projectId = projectId),
    UncaughtException());
}

export async function captureError(error: any) {
  await sendError(error);
}
