import { BrowserInit } from "./browser";
import { SDKconfig } from "./core/types";
import { NodeInit } from "./node";

export function init({ projectId, user_id, environment }: SDKconfig) {
  if (typeof window !== "undefined") {
    BrowserInit({ projectId, user_id, environment });
  } else if (typeof process !== "undefined" && process.versions?.node) {
    NodeInit({ projectId, user_id, environment });
  } else {
    console.log("some Invalid Error has occured");
  }
}
