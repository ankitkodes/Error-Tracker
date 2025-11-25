import { BrowserInit } from "./browser";
import { SDKconfig } from "./core/types";
import { NodeInit } from "./node";

export function init({ projectId, user_id, Environment }: SDKconfig) {
  if (typeof window !== 'undefined') {
    BrowserInit({ projectId, user_id, Environment });
  } else if (typeof process !== 'undefined' && process.versions?.node) {
    NodeInit({ projectId, user_id, Environment });
  } else {
    console.log("some Invalid Error has occured");
  }
}
