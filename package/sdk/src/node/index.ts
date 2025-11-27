import { SDKconfig } from "../core/types";
import { config } from "../core/utils";
import { UncaughtException } from "./errorListener";

export function NodeInit({ projectId, user_id, environment }: SDKconfig) {
  ((config.projectId = projectId),
    (config.user_id = user_id),
    (config.environment = environment));

  UncaughtException();
}
