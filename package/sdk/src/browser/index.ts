import { sendError } from "../core/transport";
import { config } from "../core/utils";
import { handleWindowerror } from "./errorsListener";

export function BrowserInit(APIKEY: string) {
  ((config.APIKEY = APIKEY), handleWindowerror());
}

export function captureError(error: any) {
  sendError(error);
}
